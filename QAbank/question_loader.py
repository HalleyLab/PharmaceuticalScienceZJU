from __future__ import annotations

import csv
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable


SUPPORTED_SUFFIXES = {".xlsx", ".csv", ".txt", ".md"}
IGNORED_NAMES = {
    "readme.md",
}


@dataclass
class Question:
    subject: str
    source: str
    category: str
    prompt: str
    answer: str
    options: dict[str, str] = field(default_factory=dict)

    @property
    def is_choice(self) -> bool:
        return bool(self.options) or bool(re.fullmatch(r"[A-H]+", normalize_answer(self.answer)))


def normalize_text(value: object) -> str:
    if value is None:
        return ""
    text = str(value).replace("\u3000", " ").strip()
    text = re.sub(r"[ \t]+", " ", text)
    return text


def normalize_answer(value: object) -> str:
    text = normalize_text(value)
    text = text.replace("，", ",").replace("、", ",").replace("；", ";")
    choice = re.sub(r"[^A-Ha-h]", "", text)
    if choice and len(choice) <= 8 and re.fullmatch(r"[A-Ha-h]+", choice):
        return "".join(sorted(set(choice.upper()), key=choice.upper().index))
    return text


def clean_question_number(text: str) -> str:
    return re.sub(r"^\s*(?:第?\d+[题\.、\)]?|[一二三四五六七八九十]+[、\.])\s*", "", text).strip()


def infer_category(prompt: str, answer: str, options: dict[str, str], fallback: str = "") -> str:
    fallback = normalize_text(fallback)
    if fallback:
        return fallback
    normalized = normalize_answer(answer)
    if options:
        return "多选" if len(normalized) > 1 else "单选"
    if normalized in {"√", "×", "对", "错", "正确", "错误", "TRUE", "FALSE", "T", "F"}:
        return "判断"
    if len(answer) > 80 or re.search(r"[。；;]\s*", answer):
        return "问答"
    if len(clean_question_number(prompt)) <= 20:
        return "名词解释"
    return "问答"


def discover_question_files(folder: Path) -> list[Path]:
    files: list[Path] = []
    for path in folder.rglob("*"):
        if not path.is_file():
            continue
        if path.name.startswith("~$"):
            continue
        if path.name.lower() in IGNORED_NAMES:
            continue
        if path.suffix.lower() in SUPPORTED_SUFFIXES:
            files.append(path)
    return sorted(files, key=lambda p: (p.parent.as_posix(), p.name.lower()))


def load_questions(folder: str | Path) -> list[Question]:
    base = Path(folder)
    questions: list[Question] = []
    for file_path in discover_question_files(base):
        try:
            if file_path.suffix.lower() == ".xlsx":
                questions.extend(load_xlsx(file_path, base))
            elif file_path.suffix.lower() == ".csv":
                questions.extend(load_csv(file_path, base))
            elif file_path.suffix.lower() in {".txt", ".md"}:
                questions.extend(load_text(file_path, base))
        except Exception as exc:
            print(f"[跳过] {file_path.name}: {exc}")
    return deduplicate(questions)


def subject_from_path(path: Path, base: Path) -> str:
    relative = path.relative_to(base)
    if len(relative.parts) > 1:
        return relative.parts[0]
    return path.stem


def deduplicate(questions: Iterable[Question]) -> list[Question]:
    seen: set[tuple[str, str, str]] = set()
    result: list[Question] = []
    for question in questions:
        key = (question.subject, question.category, question.prompt)
        if key in seen:
            continue
        seen.add(key)
        result.append(question)
    return result


def find_header_indexes(headers: list[str]) -> dict[str, int]:
    normalized = [normalize_text(h).lower().replace(" ", "") for h in headers]
    aliases = {
        "prompt": {"题目", "问题", "题干", "question", "prompt", "stem"},
        "answer": {"答案", "参考答案", "正确答案", "answer", "key"},
        "category": {"类型", "题型", "分类", "category", "type"},
    }
    indexes: dict[str, int] = {}
    for field_name, names in aliases.items():
        for index, header in enumerate(normalized):
            if header in names or any(name in header for name in names):
                indexes[field_name] = index
                break
    return indexes


def option_indexes(headers: list[str]) -> dict[str, int]:
    result: dict[str, int] = {}
    for index, header in enumerate(headers):
        value = normalize_text(header).upper().replace("选项", "").replace(".", "").replace("、", "")
        if re.fullmatch(r"[A-H]", value):
            result[value] = index
    return result


def rows_to_questions(rows: list[list[object]], subject: str, source: str) -> list[Question]:
    if not rows:
        return []

    header_row = 0
    indexes: dict[str, int] = {}
    for i, row in enumerate(rows[:10]):
        indexes = find_header_indexes([normalize_text(cell) for cell in row])
        if "prompt" in indexes and "answer" in indexes:
            header_row = i
            break
    else:
        indexes = {"prompt": 0, "category": 1, "answer": 2}

    headers = [normalize_text(cell) for cell in rows[header_row]]
    option_cols = option_indexes(headers)
    questions: list[Question] = []
    for row in rows[header_row + 1 :]:
        prompt = normalize_text(get_cell(row, indexes.get("prompt", 0)))
        answer = normalize_text(get_cell(row, indexes.get("answer", 2)))
        if not prompt or not answer:
            continue

        category = normalize_text(get_cell(row, indexes.get("category", -1)))
        options = {
            letter: normalize_text(get_cell(row, col))
            for letter, col in option_cols.items()
            if normalize_text(get_cell(row, col))
        }
        extracted_prompt, extracted_options = extract_options(prompt)
        if extracted_options and not options:
            prompt = extracted_prompt
            options = extracted_options

        answer = normalize_answer(answer)
        questions.append(
            Question(
                subject=subject,
                source=source,
                category=infer_category(prompt, answer, options, category),
                prompt=clean_question_number(prompt),
                answer=answer,
                options=options,
            )
        )
    return questions


def get_cell(row: list[object], index: int) -> object:
    if index < 0 or index >= len(row):
        return ""
    return row[index]


def load_xlsx(path: Path, base: Path) -> list[Question]:
    try:
        import openpyxl
    except ImportError as exc:
        raise RuntimeError("读取 .xlsx 需要安装 openpyxl") from exc

    workbook = openpyxl.load_workbook(path, data_only=True)
    subject = subject_from_path(path, base)
    questions: list[Question] = []
    for sheet in workbook.worksheets:
        rows = [list(row) for row in sheet.iter_rows(values_only=True)]
        sheet_questions = rows_to_questions(rows, subject, f"{path.name}/{sheet.title}")
        questions.extend(sheet_questions)
    return questions


def load_csv(path: Path, base: Path) -> list[Question]:
    subject = subject_from_path(path, base)
    for encoding in ("utf-8-sig", "utf-8", "gb18030"):
        try:
            with path.open("r", encoding=encoding, newline="") as handle:
                rows = list(csv.reader(handle))
            return rows_to_questions(rows, subject, path.name)
        except UnicodeDecodeError:
            continue
    raise UnicodeDecodeError("unknown", b"", 0, 1, "无法识别文件编码")


def load_text(path: Path, base: Path) -> list[Question]:
    subject = subject_from_path(path, base)
    text = read_text_with_fallback(path)
    blocks = split_question_blocks(text)
    questions: list[Question] = []
    for block in blocks:
        parsed = parse_text_block(block)
        if not parsed:
            continue
        prompt, answer, options, category = parsed
        questions.append(
            Question(
                subject=subject,
                source=path.name,
                category=infer_category(prompt, answer, options, category),
                prompt=clean_question_number(prompt),
                answer=normalize_answer(answer),
                options=options,
            )
        )
    return questions


def read_text_with_fallback(path: Path) -> str:
    for encoding in ("utf-8-sig", "utf-8", "gb18030"):
        try:
            return path.read_text(encoding=encoding)
        except UnicodeDecodeError:
            continue
    return path.read_text(errors="ignore")


def split_question_blocks(text: str) -> list[str]:
    text = text.replace("\r\n", "\n")
    rough_blocks = re.split(r"\n\s*\n+", text)
    blocks: list[str] = []
    for block in rough_blocks:
        block = block.strip()
        if not block:
            continue
        numbered = re.split(r"\n(?=\s*(?:\d+[\.\、\)]|第\d+题))", block)
        blocks.extend(part.strip() for part in numbered if part.strip())
    return blocks


ANSWER_PATTERN = re.compile(r"(?:参考答案|正确答案|答案|Answer)\s*[:：]\s*(.+)", re.IGNORECASE | re.S)
TYPE_PATTERN = re.compile(r"(?:类型|题型|分类)\s*[:：]\s*(.+)")


def parse_text_block(block: str) -> tuple[str, str, dict[str, str], str] | None:
    answer_match = ANSWER_PATTERN.search(block)
    if not answer_match:
        return None
    answer = answer_match.group(1).strip()
    body = block[: answer_match.start()].strip()
    category = ""
    type_match = TYPE_PATTERN.search(body)
    if type_match:
        category = type_match.group(1).strip()
        body = (body[: type_match.start()] + body[type_match.end() :]).strip()
    prompt, options = extract_options(body)
    if not prompt:
        return None
    return prompt, answer, options, category


OPTION_LINE = re.compile(r"^\s*([A-Ha-h])[\.\、\)]\s*(.+)$")


def extract_options(text: str) -> tuple[str, dict[str, str]]:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    prompt_lines: list[str] = []
    options: dict[str, str] = {}
    for line in lines:
        match = OPTION_LINE.match(line)
        if match:
            options[match.group(1).upper()] = match.group(2).strip()
        else:
            prompt_lines.append(line)
    return "\n".join(prompt_lines).strip(), options


if __name__ == "__main__":
    bank = load_questions(Path(__file__).parent)
    print(f"识别到 {len(bank)} 道题")
    for subject in sorted({q.subject for q in bank}):
        count = sum(1 for q in bank if q.subject == subject)
        print(f"- {subject}: {count}")
