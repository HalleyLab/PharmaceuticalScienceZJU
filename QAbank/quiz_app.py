from __future__ import annotations

import random
import tkinter as tk
from pathlib import Path
from tkinter import messagebox, ttk

from question_loader import Question, load_questions, normalize_answer


APP_DIR = Path(__file__).resolve().parent
ALL = "全部"
UI_FONT = "Microsoft YaHei UI"
TEXT_FONT = "Microsoft YaHei"


class QuizApp:
    def __init__(self, root: tk.Tk, folder: Path = APP_DIR) -> None:
        self.root = root
        self.folder = folder
        self.questions: list[Question] = []
        self.pool: list[Question] = []
        self.current: Question | None = None
        self.choice_vars: dict[str, tk.BooleanVar] = {}
        self.total_answered = 0
        self.total_correct = 0

        self.root.title("QAbank 随机刷题")
        self.root.geometry("1100x760")
        self.root.minsize(900, 620)
        self.root.configure(bg="#f6f7fb")
        self.build_ui()
        self.reload_bank()

    def build_ui(self) -> None:
        style = ttk.Style()
        style.configure("Title.TLabel", font=(UI_FONT, 20, "bold"))
        style.configure("Info.TLabel", font=(UI_FONT, 10))
        style.configure("Question.TLabel", font=(TEXT_FONT, 15, "bold"))
        style.configure("Result.TLabel", font=(TEXT_FONT, 12), foreground="#334155")
        style.configure("TButton", font=(UI_FONT, 11))
        style.configure("TCombobox", font=(UI_FONT, 11))
        style.configure("TCheckbutton", font=(TEXT_FONT, 12))

        self.root.columnconfigure(0, weight=0)
        self.root.columnconfigure(1, weight=1)
        self.root.rowconfigure(1, weight=1)

        header = ttk.Frame(self.root, padding=(18, 14, 18, 8))
        header.grid(row=0, column=0, columnspan=2, sticky="ew")
        header.columnconfigure(5, weight=1)

        ttk.Label(header, text="QAbank 随机刷题", style="Title.TLabel").grid(row=0, column=0, columnspan=6, sticky="w")

        ttk.Label(header, text="学科").grid(row=1, column=0, padx=(0, 6), pady=(14, 0))
        self.subject_var = tk.StringVar(value=ALL)
        self.subject_box = ttk.Combobox(header, textvariable=self.subject_var, state="readonly", width=20)
        self.subject_box.grid(row=1, column=1, padx=(0, 18), pady=(14, 0))
        self.subject_box.bind("<<ComboboxSelected>>", lambda _event: self.reset_pool())

        ttk.Label(header, text="题型").grid(row=1, column=2, padx=(0, 6), pady=(14, 0))
        self.category_var = tk.StringVar(value=ALL)
        self.category_box = ttk.Combobox(header, textvariable=self.category_var, state="readonly", width=18)
        self.category_box.grid(row=1, column=3, padx=(0, 18), pady=(14, 0))
        self.category_box.bind("<<ComboboxSelected>>", lambda _event: self.reset_pool())

        ttk.Button(header, text="重扫题库", command=self.reload_bank).grid(row=1, column=4, padx=(0, 8), pady=(14, 0))
        ttk.Button(header, text="下一题", command=self.next_question).grid(row=1, column=5, sticky="w", pady=(14, 0))

        sidebar = ttk.Frame(self.root, padding=(18, 8, 8, 16))
        sidebar.grid(row=1, column=0, sticky="ns")
        sidebar.rowconfigure(4, weight=1)

        ttk.Label(sidebar, text="题库概览", font=(UI_FONT, 12, "bold")).grid(row=0, column=0, sticky="w", pady=(0, 8))
        self.summary = tk.Text(sidebar, width=28, height=22, wrap="word", borderwidth=0, bg="#f6f7fb", font=(TEXT_FONT, 10))
        self.summary.grid(row=1, column=0, sticky="nsew")
        self.summary.configure(state="disabled")

        self.stats_var = tk.StringVar(value="已答 0 / 正确 0")
        ttk.Label(sidebar, textvariable=self.stats_var, style="Info.TLabel").grid(row=2, column=0, sticky="w", pady=(18, 0))

        content = ttk.Frame(self.root, padding=(14, 8, 22, 22))
        content.grid(row=1, column=1, sticky="nsew")
        content.columnconfigure(0, weight=1)
        content.rowconfigure(1, weight=1)

        self.meta_var = tk.StringVar(value="请先选择学科和题型")
        ttk.Label(content, textvariable=self.meta_var, style="Info.TLabel").grid(row=0, column=0, sticky="w", pady=(0, 8))

        card = ttk.Frame(content, padding=(24, 22, 24, 18))
        card.grid(row=1, column=0, sticky="nsew")
        card.columnconfigure(0, weight=1)
        card.rowconfigure(1, weight=1)

        self.question_label = ttk.Label(card, text="点击“下一题”开始。", style="Question.TLabel", wraplength=720, justify="left")
        self.question_label.grid(row=0, column=0, sticky="ew", pady=(0, 18))

        self.answer_area = ttk.Frame(card)
        self.answer_area.grid(row=1, column=0, sticky="nsew")
        self.answer_area.columnconfigure(0, weight=1)

        self.result_var = tk.StringVar(value="")
        self.result_label = ttk.Label(card, textvariable=self.result_var, style="Result.TLabel", wraplength=720, justify="left")
        self.result_label.grid(row=2, column=0, sticky="ew", pady=(14, 8))

        actions = ttk.Frame(card)
        actions.grid(row=3, column=0, sticky="ew")
        ttk.Button(actions, text="提交", command=self.submit).pack(side="left", padx=(0, 8))
        ttk.Button(actions, text="查看答案", command=self.show_answer).pack(side="left", padx=(0, 8))
        ttk.Button(actions, text="跳过", command=self.next_question).pack(side="left")

    def reload_bank(self) -> None:
        try:
            self.questions = load_questions(self.folder)
        except Exception as exc:
            messagebox.showerror("读取失败", str(exc))
            self.questions = []
        self.update_filters()
        self.reset_pool()
        self.render_summary()
        if self.questions:
            self.question_label.configure(text="题库已载入，点击“下一题”开始。")
        else:
            self.question_label.configure(text="没有识别到题目。请检查文件是否包含“题目/答案”列，或文本中是否有“答案：”。")

    def update_filters(self) -> None:
        subjects = [ALL] + sorted({question.subject for question in self.questions})
        categories = [ALL] + sorted({question.category for question in self.questions})
        self.subject_box.configure(values=subjects)
        self.category_box.configure(values=categories)
        if self.subject_var.get() not in subjects:
            self.subject_var.set(ALL)
        if self.category_var.get() not in categories:
            self.category_var.set(ALL)

    def filtered_questions(self) -> list[Question]:
        subject = self.subject_var.get()
        category = self.category_var.get()
        return [
            question
            for question in self.questions
            if (subject == ALL or question.subject == subject)
            and (category == ALL or question.category == category)
        ]

    def reset_pool(self) -> None:
        self.pool = self.filtered_questions().copy()
        random.shuffle(self.pool)
        self.result_var.set("")
        self.render_summary()

    def render_summary(self) -> None:
        by_subject: dict[str, int] = {}
        by_category: dict[str, int] = {}
        for question in self.questions:
            by_subject[question.subject] = by_subject.get(question.subject, 0) + 1
            by_category[question.category] = by_category.get(question.category, 0) + 1

        lines = [f"总题数：{len(self.questions)}", ""]
        lines.append("按学科：")
        lines.extend(f"  {name}：{count}" for name, count in sorted(by_subject.items()))
        lines.append("")
        lines.append("按题型：")
        lines.extend(f"  {name}：{count}" for name, count in sorted(by_category.items()))
        lines.append("")
        lines.append(f"当前筛选：{len(self.filtered_questions())} 题")

        self.summary.configure(state="normal")
        self.summary.delete("1.0", "end")
        self.summary.insert("1.0", "\n".join(lines))
        self.summary.configure(state="disabled")

    def clear_answer_area(self) -> None:
        for child in self.answer_area.winfo_children():
            child.destroy()
        self.choice_vars = {}

    def next_question(self) -> None:
        if not self.pool:
            self.pool = self.filtered_questions().copy()
            random.shuffle(self.pool)
            if not self.pool:
                messagebox.showinfo("没有题目", "当前筛选条件下没有题目。")
                return
            messagebox.showinfo("重新开始", "这一组题已经做完，已重新洗牌。")

        self.current = self.pool.pop()
        self.result_var.set("")
        self.clear_answer_area()
        self.meta_var.set(f"{self.current.subject} / {self.current.category} / {self.current.source}")
        self.question_label.configure(text=self.current.prompt)
        if self.current.is_choice:
            self.render_choice_answer(self.current)
        else:
            self.render_text_answer()

    def render_choice_answer(self, question: Question) -> None:
        options = question.options
        if not options and normalize_answer(question.answer):
            options = {letter: letter for letter in "ABCDEFGH"[: max(4, len(normalize_answer(question.answer)))]}
        for row, letter in enumerate(sorted(options)):
            var = tk.BooleanVar(value=False)
            self.choice_vars[letter] = var
            text = f"{letter}. {options[letter]}"
            ttk.Checkbutton(self.answer_area, text=text, variable=var).grid(row=row, column=0, sticky="w", pady=4)

    def render_text_answer(self) -> None:
        self.text_answer = tk.Text(
            self.answer_area,
            height=6,
            wrap="word",
            font=(TEXT_FONT, 12),
            bg="#ffffff",
            fg="#1f2937",
            insertbackground="#334155",
            relief="flat",
            padx=14,
            pady=12,
            spacing1=3,
            spacing3=3,
        )
        self.text_answer.grid(row=0, column=0, sticky="nsew")
        self.answer_area.rowconfigure(0, weight=1)

    def submit(self) -> None:
        if not self.current:
            return
        user_answer = self.get_user_answer()
        correct_answer = normalize_answer(self.current.answer)
        self.total_answered += 1
        if self.current.is_choice:
            is_correct = user_answer == correct_answer
            if is_correct:
                self.total_correct += 1
                self.result_var.set(f"正确：{correct_answer}")
            else:
                self.result_var.set(f"不对。你的答案：{user_answer or '未作答'}；参考答案：{correct_answer}")
        else:
            self.result_var.set(f"参考答案：{self.current.answer}")
        self.update_stats()

    def get_user_answer(self) -> str:
        if self.choice_vars:
            selected = "".join(letter for letter, var in sorted(self.choice_vars.items()) if var.get())
            return normalize_answer(selected)
        if hasattr(self, "text_answer"):
            return self.text_answer.get("1.0", "end-1c").strip()
        return ""

    def show_answer(self) -> None:
        if not self.current:
            return
        self.result_var.set(f"参考答案：{self.current.answer}")

    def update_stats(self) -> None:
        self.stats_var.set(f"已答 {self.total_answered} / 正确 {self.total_correct}")


def run() -> None:
    root = tk.Tk()
    QuizApp(root)
    root.mainloop()


if __name__ == "__main__":
    run()
