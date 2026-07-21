document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || systemTheme;

    const themeLabels = {
        zh: {
            light: '\u2600\uFE0F \u65E5\u95F4\u6A21\u5F0F',
            dark: '\uD83C\uDF19 \u591C\u95F4\u6A21\u5F0F'
        },
        en: {
            light: '\u2600\uFE0F Day Mode',
            dark: '\uD83C\uDF19 Night Mode'
        }
    };

    if (initialTheme === 'dark') {
        enableDarkTheme();
    } else {
        updateThemeLabel();
    }

    function toggleTheme() {
        body.classList.contains('dark-theme') ? disableDarkTheme() : enableDarkTheme();
    }

    function enableDarkTheme() {
        body.classList.add('dark-theme');
        updateThemeLabel();
        localStorage.setItem('theme', 'dark');
    }

    function disableDarkTheme() {
        body.classList.remove('dark-theme');
        updateThemeLabel();
        localStorage.setItem('theme', 'light');
    }

    function updateThemeLabel() {
        if (!themeToggle) {
            return;
        }
        const lang = localStorage.getItem('siteLanguage') === 'en' ? 'en' : 'zh';
        themeToggle.textContent = body.classList.contains('dark-theme') ? themeLabels[lang].light : themeLabels[lang].dark;
    }

    window.updateThemeLanguageLabel = updateThemeLabel;

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!savedTheme) {
            e.matches ? enableDarkTheme() : disableDarkTheme();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const textMemory = new WeakMap();
    const attrMemory = new WeakMap();
    const languageKey = 'siteLanguage';
    const exactTranslations = {
        '\u9996\u9875': 'Home',
        '\u6D59\u6C5F\u5927\u5B66': 'Zhejiang University',
        '\u901A\u8BC6\u8BFE\u7A0B': 'General Education',
        '\u4E13\u4E1A\u5FC5\u4FEE': 'Required Courses',
        '\u4E13\u4E1A\u9009\u4FEE': 'Selective Courses',
        '\u5176\u4ED6\u8BFE\u7A0B': 'Other Courses',
        '\u4E8C\u4E09\u56DB\u8BFE\u5802': 'Second/Third/Fourth Classroom',
        '\u7559\u5B66\u7BC7': 'Study Abroad',
        '\u7533\u8BF7': 'Application',
        '\u5B9E\u9A8C\u6D41\u7A0B': 'Protocols',
        '\u4F7F\u7528\u8BF4\u660E': 'Instructions',
        '\u641C\u7D22\u5185\u5BB9': 'Search',
        '\u641C\u7D22\u529F\u80FD\u4E3A\u6587\u672C\u5339\u914D\uFF0C\u5B58\u5728\u8BE5\u5185\u5BB9\u5219\u81EA\u52A8\u8DF3\u8F6C\uFF0C\u5EFA\u8BAE\u8F93\u5165\u5355\u4E2A\u77ED\u5173\u952E\u8BCD': 'Search matches page text and jumps to matching content. A short keyword works best.',
        '\u6982\u8FF0': 'Overview',
        '\u9875\u9762\u8BF4\u660E': 'Page Notes',
        '\u4FE1\u606F\u6765\u6E90': 'Sources',
        '\u9879\u76EE\u4ECB\u7ECD': 'Program Intro',
        '\u8BFE\u7A0B\u5B89\u6392': 'Curriculum',
        '\u79D1\u7814\u8F6E\u8F6C': 'Research Rotation',
        '\u751F\u6D3B\u4FE1\u606F': 'Life Info',
        '\u7533\u8BF7\u5EFA\u8BAE': 'Application Tips',
        '\u57FA\u672C\u4FE1\u606F': 'Basic Info',
        '\u9002\u5408\u4EBA\u7FA4': 'Best Fit',
        '\u6838\u5FC3\u8BFE\u7A0B': 'Core Courses',
        '\u5B66\u4E60\u5EFA\u8BAE': 'Study Tips',
        '\u9009\u62E9\u5B9E\u9A8C\u5BA4': 'Choosing a Lab',
        '\u8F6E\u8F6C\u8BB0\u5F55': 'Rotation Notes',
        '\u884C\u524D\u51C6\u5907': 'Pre-departure',
        '\u5230\u6821\u4E4B\u540E': 'After Arrival',
        '\u80CC\u666F\u51C6\u5907': 'Background Prep',
        '\u6587\u4E66\u65B9\u5411': 'Essay Direction',
        '\u65F6\u95F4\u7EBF': 'Timeline',
        '\u6750\u6599\u51C6\u5907': 'Materials',
        '\u9009\u6821\u5B9A\u4F4D': 'School List',
        '\u6587\u4E66\u63A8\u8350': 'Essays and Recommendations',
        '\u9762\u8BD5\u7B7E\u8BC1': 'Interviews and Visa',
        '\u6574\u4F53\u601D\u8DEF': 'Overall Strategy',
        '\u5E38\u7528\u6750\u6599': 'Common Materials',
        '\u7533\u8BF7\u524D\u4E00\u5E74': 'One Year Before Applying',
        '\u7533\u8BF7\u5B63': 'Application Season',
        '\u9879\u76EE\u8868\u683C': 'Program Spreadsheet',
        '\u5339\u914D\u5EA6\u5224\u65AD': 'Fit Assessment',
        '\u63A8\u8350\u4EBA\u6C9F\u901A': 'Recommender Communication',
        '\u6587\u4E66\u7248\u672C\u7BA1\u7406': 'Essay Version Control',
        '\u9762\u8BD5\u51C6\u5907': 'Interview Prep',
        '\u7B7E\u8BC1\u4E0E\u884C\u524D': 'Visa and Pre-departure',
        '\u601D\u653F\u7C7B': 'Ideological and Political Courses',
        '\u519B\u4F53\u7C7B': 'Military and PE',
        '\u7F8E\u80B2\u7C7B': 'Aesthetic Education',
        '\u52B3\u80B2\u7C7B': 'Labor Education',
        '\u5916\u8BED\u7C7B': 'Foreign Languages',
        '\u8BA1\u7B97\u673A\u7C7B': 'Computer Science',
        '\u81EA\u7136\u79D1\u5B66': 'Natural Sciences',
        '\u521B\u65B0\u521B\u4E1A': 'Innovation and Entrepreneurship',
        '\u901A\u8BC6\u9009\u4FEE': 'General Electives',
        '\u5927\u4E00': 'Year 1',
        '\u5927\u4E8C': 'Year 2',
        '\u5927\u4E09': 'Year 3',
        '\u5927\u56DB': 'Year 4',
        '\u5FC5\u4FEE': 'Required',
        '\u9009\u4FEE': 'Elective',
        '\u7C7B\u522B': 'Category',
        '\u8BFE\u7A0B\u53F7': 'Course Code',
        '\u8BFE\u7A0B\u540D\u79F0': 'Course Name',
        '\u5B66\u5206': 'Credits',
        '\u5468\u5B66\u65F6': 'Weekly Hours',
        '\u5EFA\u8BAE\u5B66\u5E74\u5B66\u671F': 'Suggested Term',
        '\u8003\u6838\u65B9\u5F0F': 'Assessment',
        '\u8BFE\u7A0B\u6750\u6599': 'Course Materials',
        '\u6559\u6750': 'Textbook',
        '\u4F53\u9A8C\u62A5\u544A': 'Experience Report',
        '\u5E73\u65F6\u8BBA\u6587': 'Term Essay',
        '\u671F\u672B\u8003\u8BD5': 'Final Exam',
        '\u5C0F\u7EC4\u5C55\u793A': 'Group Presentation',
        '\u8BFE\u5802\u51FA\u52E4': 'Attendance',
        '\u8C03\u7814\u62A5\u544A': 'Research Report',
        '\u8BFB\u4E66\u62A5\u544A': 'Reading Report',
        '\u5F62\u52BF\u4E0E\u653F\u7B56 I': 'Situation and Policy I',
        '\u5F62\u52BF\u4E0E\u653F\u7B56II': 'Situation and Policy II',
        '\u601D\u60F3\u9053\u5FB7\u4E0E\u6CD5\u6CBB': 'Morality and Rule of Law',
        '\u4E2D\u56FD\u8FD1\u73B0\u4EE3\u53F2\u7EB2\u8981': 'Outline of Modern Chinese History',
        '\u9A6C\u514B\u601D\u4E3B\u4E49\u57FA\u672C\u539F\u7406': 'Basic Principles of Marxism',
        '\u6BDB\u6CFD\u4E1C\u601D\u60F3\u548C\u4E2D\u56FD\u7279\u8272\u793E\u4F1A\u4E3B\u4E49\u7406\u8BBA\u4F53\u7CFB\u6982\u8BBA': 'Mao Zedong Thought and Theoretical System of Socialism with Chinese Characteristics',
        '\u4E60\u8FD1\u5E73\u65B0\u65F6\u4EE3\u4E2D\u56FD\u7279\u8272\u793E\u4F1A\u4E3B\u4E49\u601D\u60F3\u6982\u8BBA': 'Introduction to Xi Jinping Thought on Socialism with Chinese Characteristics for a New Era',
        '\u519B\u4E8B\u7406\u8BBA': 'Military Theory',
        '\u5927\u5B66\u82F1\u8BED IV': 'College English IV',
        '\u8BA1\u7B97\u673A\u79D1\u5B66\u57FA\u7840\uFF08A\uFF09': 'Foundations of Computer Science (A)',
        'Python \u7A0B\u5E8F\u8BBE\u8BA1': 'Python Programming',
        '\u5FAE\u79EF\u5206\uFF08\u4E59\uFF09\u2160 / \u2161': 'Calculus (B) I / II',
        '\u5206\u6790\u5316\u5B66\uFF08\u4E59\uFF09': 'Analytical Chemistry (B)',
        '\u5927\u5B66\u5316\u5B66\u5B9E\u9A8C\uFF08O\uFF09': 'College Chemistry Lab (O)',
        '\u5927\u5B66\u5316\u5B66\u5B9E\u9A8C\uFF08P\uFF09': 'College Chemistry Lab (P)',
        '\u6709\u673A\u5316\u5B66': 'Organic Chemistry',
        '\u7269\u7406\u5316\u5B66': 'Physical Chemistry',
        '\u7EC6\u80DE\u751F\u7269\u5B66\u53CA\u5B9E\u9A8C\uFF08\u4E59\uFF09': 'Cell Biology and Lab (B)',
        '\u751F\u7406\u5B66': 'Physiology',
        '\u4EBA\u4F53\u89E3\u5256\u4E0E\u7EC4\u7EC7\u5B66': 'Human Anatomy and Histology',
        '\u533B\u5B66\u5FAE\u751F\u7269\u4E0E\u514D\u75AB\u5B66': 'Medical Microbiology and Immunology',
        '\u751F\u7269\u5316\u5B66\u4E0E\u5206\u5B50\u751F\u7269\u5B66 / \u5B9E\u9A8C': 'Biochemistry and Molecular Biology / Lab',
        '\u5929\u7136\u836F\u7269\u5316\u5B66 / \u5B9E\u9A8C': 'Natural Pharmaceutical Chemistry / Lab',
        '\u836F\u7269\u6CE2\u8C31\u89E3\u6790': 'Drug Spectrum Analysis',
        '\u533B\u836F\u7EDF\u8BA1\u5B66': 'Medical Statistics',
        '\u836F\u7269\u5316\u5B66 / \u5B9E\u9A8C': 'Medicinal Chemistry / Lab',
        '\u836F\u7406\u5B66 / \u5B9E\u9A8C': 'Pharmacology / Lab',
        '\u836F\u7269\u4EEA\u5668\u5206\u6790 / \u5B9E\u9A8C': 'Instrumental Analysis of Drugs / Lab',
        '\u836F\u7269\u7814\u53D1\u524D\u6CBF': 'Frontiers in Drug Discovery',
        '\u836F\u5242\u5B66 / \u5B9E\u9A8C': 'Pharmaceutics / Lab',
        '\u836F\u7269\u5206\u6790\u5B66 / \u5B9E\u9A8C': 'Pharmaceutical Analysis / Lab',
        '\u751F\u7269\u836F\u5242\u5B66\u4E0E\u836F\u7269\u52A8\u529B\u5B66 / \u5B9E\u9A8C': 'Biopharmaceutics and Pharmacokinetics / Lab',
        '\u836F\u4E8B\u7BA1\u7406': 'Pharmacy Administration',
        '\u7BA1\u7406\u89C4\u5B9A': 'Management Rules',
        '\u5B9E\u9A8C\u8BBE\u8BA1': 'Experimental Design',
        '\u4EEA\u5668\u64CD\u4F5C': 'Instrument Operation',
        '\u5B9E\u9A8C\u65B9\u6CD5': 'Experimental Methods',
        '\u5B9E\u9A8C\u5BA4\u4F7F\u7528\u53CA\u7BA1\u7406\u89C4\u5B9A': 'Laboratory Use and Management Rules',
        '\u5B9E\u9A8C\u5BA4\u57FA\u672C\u4F7F\u7528\u89C4\u8303': 'Basic Laboratory Use Rules',
        '\u52A8\u7269\u5B9E\u9A8C\u7533\u8BF7\u53CA\u5B9E\u9A8C\u5BA4\u4F7F\u7528\u6D41\u7A0B': 'Animal Experiment Application and Lab Use Process',
        '\u9AD8\u538B\u84B8\u6C7D\u706D\u83CC\u4E0E\u6D17\u6D88\u95F4\u4F7F\u7528': 'Autoclaving and Washroom Use',
        '\u5B9E\u9A8C\u52A8\u7269\u4E0E\u5C4F\u969C\u8BBE\u65BD': 'Lab Animals and Barrier Facilities',
        '\u59D4\u6258\u5B9E\u9A8C': 'Entrusted Experiments',
        '\u5206\u5B50\u76F8\u5173\u5B9E\u9A8C\u8BBE\u8BA1': 'Molecular Experiment Design',
        '\u5B9E\u9A8C\u4EEA\u5668\u64CD\u4F5C': 'Lab Instrument Operation',
        '\u8367\u5149\u5012\u7F6E\u663E\u5FAE\u955C': 'Fluorescence Inverted Microscope',
        '\u6052\u6E29CO2\u7EC6\u80DE\u57F9\u517B\u7BB1': 'Constant-temperature CO2 Incubator',
        '\u6D41\u5F0F\u7EC6\u80DE\u4EEA\uFF08\u5206\u6790\uFF09': 'Flow Cytometer (Analysis)',
        '\u5206\u5149\u5149\u5EA6\u4E0E\u9176\u6807\u6CD5': 'Spectrophotometry and Plate Reader Methods',
        '\u8D85\u901F\u79BB\u5FC3\u673A': 'Ultracentrifuge',
        '\u9176\u6807\u4EEA': 'Plate Reader',
        '\u5C0F\u9F20\u89E3\u5256\u5B9E\u9A8C': 'Mouse Dissection',
        '\u6D41\u5F0F\u7EC6\u80DE\u5206\u9009': 'Flow Cytometry Sorting',
        '\u514D\u75AB\u7EC4\u5316': 'Immunohistochemistry',
        '\u52A8\u7269\u884C\u4E3A\u5B66\u5B9E\u9A8C': 'Animal Behavior Experiments',
        '\u5206\u6790\u6D4B\u8BD5\u64CD\u4F5C': 'Analytical Testing',
        '\u7535\u751F\u7406\u5B66': 'Electrophysiology',
        '\u8BD5\u5242\u914D\u5236\u65B9\u6CD5': 'Reagent Preparation',
        '\u7EC6\u80DE\u57F9\u517B\u64CD\u4F5C': 'Cell Culture',
        '\u4F60\u597D\u5440': 'Hello',
        '\u6B22\u8FCE\u6765\u6211\u7684\u7F51\u7AD9': 'Welcome to my website',
        '\u6765\u4E86\u5C31\u628A\u8FD9\u5F53\u5BB6': 'Make yourself at home',
        '\u6709\u4EFB\u4F55\u95EE\u9898\u6B22\u8FCE\u8054\u7CFB': 'Feel free to contact me with any questions',
        '\u8FD9\u662F\u5FB7\u514B\u8428\u65AF\uFF0C\u5979\u5F88\u5E05': 'This is Texas. She is very cool.'
    };
    const phraseTranslations = {
        '\u57F9\u517B\u65B9\u6848': 'curriculum plan',
        '\u836F\u5B66\u4E13\u4E1A': 'pharmaceutical science major',
        '\u8BFE\u7A0B': 'course',
        '\u5B66\u4E60\u8D44\u6599': 'study materials',
        '\u5B66\u5206': 'credits',
        '\u8001\u5E08': 'instructor',
        '\u8003\u8BD5': 'exam',
        '\u590D\u4E60': 'review',
        '\u5EFA\u8BAE': 'suggestion',
        '\u5185\u5BB9': 'content',
        '\u6750\u6599': 'materials',
        '\u5B9E\u9A8C': 'experiment',
        '\u4ECB\u7ECD': 'introduction',
        '\u6982\u5FF5': 'concept',
        '\u57FA\u672C': 'basic',
        '\u4E3B\u8981': 'main',
        '\u9700\u8981': 'need',
        '\u53EF\u4EE5': 'can',
        '\u6BD4\u8F83': 'relatively',
        '\u5E38\u89C1': 'common',
        '\u9879\u76EE': 'program',
        '\u6587\u4E66': 'essay',
        '\u63A8\u8350\u4FE1': 'recommendation letter',
        '\u6210\u7EE9\u5355': 'transcript',
        '\u8BED\u8A00\u6210\u7EE9': 'language score'
    };

    injectLanguageButton();
    applyLanguage(localStorage.getItem(languageKey) === 'en' ? 'en' : 'zh');
    observeDynamicText();

    function injectLanguageButton() {
        if (document.querySelector('.language-switcher')) {
            return;
        }

        const style = document.createElement('style');
        style.textContent = [
            '.language-switcher{position:fixed;top:20px;right:142px;z-index:1300;min-width:74px;height:40px;border:0;border-radius:22px;padding:0 16px;cursor:pointer;background:rgba(31,33,36,.92);color:#fff;font:700 14px/1 "Microsoft YaHei","PingFang SC",Arial,sans-serif;box-shadow:0 10px 24px rgba(0,0,0,.16);transition:transform .2s ease,opacity .2s ease,background .2s ease}',
            '.language-switcher:hover{transform:translateY(-1px);background:rgba(10,12,14,.96)}',
            '.dark-theme .language-switcher{background:rgba(245,246,248,.92);color:#181a1d}',
            '.dark-theme .language-switcher:hover{background:#fff}',
            '@media (max-width:720px){.language-switcher{top:74px;right:16px}}'
        ].join('');
        document.head.appendChild(style);

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'language-switcher';
        button.addEventListener('click', function() {
            const nextLanguage = document.body.dataset.siteLanguage === 'en' ? 'zh' : 'en';
            applyLanguage(nextLanguage);
        });
        document.body.appendChild(button);
    }

    function applyLanguage(language) {
        const isEnglish = language === 'en';
        document.body.dataset.siteLanguage = language;
        document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';
        localStorage.setItem(languageKey, language);
        translateTextNodes(isEnglish);
        translateAttributes(isEnglish);
        updateTypedText(isEnglish);
        updateLanguageButton(isEnglish);
        if (typeof window.updateThemeLanguageLabel === 'function') {
            window.updateThemeLanguageLabel();
        }
    }

    function translateTextNodes(isEnglish) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode: function(node) {
                const parent = node.parentElement;
                if (!parent || !node.nodeValue.trim()) {
                    return NodeFilter.FILTER_REJECT;
                }
                if (parent.closest('script, style, code, pre, textarea, svg, .language-switcher')) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        const nodes = [];
        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        nodes.forEach(function(node) {
            if (!textMemory.has(node)) {
                textMemory.set(node, node.nodeValue);
            }
            const original = textMemory.get(node);
            node.nodeValue = isEnglish ? translateText(original) : original;
        });
    }

    function translateAttributes(isEnglish) {
        Array.from(document.querySelectorAll('[placeholder], [title], [alt], [aria-label]')).forEach(function(el) {
            if (el.closest('.language-switcher')) {
                return;
            }
            if (!attrMemory.has(el)) {
                attrMemory.set(el, {});
            }
            const stored = attrMemory.get(el);
            ['placeholder', 'title', 'alt', 'aria-label'].forEach(function(attr) {
                if (!el.hasAttribute(attr)) {
                    return;
                }
                if (!stored[attr]) {
                    stored[attr] = el.getAttribute(attr);
                }
                el.setAttribute(attr, isEnglish ? translateText(stored[attr]) : stored[attr]);
            });
        });
    }

    function updateLanguageButton(isEnglish) {
        const button = document.querySelector('.language-switcher');
        if (!button) {
            return;
        }
        button.textContent = isEnglish ? '\u4E2D\u6587' : 'EN';
        button.title = isEnglish ? '\u5207\u6362\u5230\u4E2D\u6587' : 'Switch to English';
        button.setAttribute('aria-label', button.title);
    }

    function updateTypedText(isEnglish) {
        if (!document.querySelector('.multiple-text') || typeof Typed !== 'function') {
            return;
        }
        if (window.typed && typeof window.typed.destroy === 'function') {
            window.typed.destroy();
        }
        window.typed = new Typed('.multiple-text', {
            strings: isEnglish ? [
                'Welcome to my website',
                'Make yourself at home',
                'Feel free to contact me'
            ] : [
                '\u6B22\u8FCE\u6765\u6211\u7684\u7F51\u7AD9',
                '\u6765\u4E86\u5C31\u628A\u8FD9\u5F53\u5BB6',
                '\u6709\u4EFB\u4F55\u95EE\u9898\u6B22\u8FCE\u8054\u7CFB'
            ],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }

    function translateText(text) {
        const leading = text.match(/^\s*/)[0];
        const trailing = text.match(/\s*$/)[0];
        const core = text.trim().replace(/\s+/g, ' ');
        if (!core) {
            return text;
        }
        if (exactTranslations[core]) {
            return leading + exactTranslations[core] + trailing;
        }
        if (!/[\u3400-\u9fff]/.test(core)) {
            return text;
        }
        return leading + translateByTerms(core) + trailing;
    }

    function translateByTerms(text) {
        let output = text;
        Object.keys(exactTranslations)
            .concat(Object.keys(phraseTranslations))
            .sort(function(a, b) {
                return b.length - a.length;
            })
            .forEach(function(term) {
                const translated = exactTranslations[term] || phraseTranslations[term];
                output = output.split(term).join(translated);
            });

        return output
            .replace(/，/g, ', ')
            .replace(/。/g, '. ')
            .replace(/；/g, '; ')
            .replace(/：/g, ': ')
            .replace(/（/g, ' (')
            .replace(/）/g, ') ')
            .replace(/、/g, ', ')
            .replace(/！/g, '!')
            .replace(/？/g, '?')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function observeDynamicText() {
        let timer = null;
        const observer = new MutationObserver(function(mutations) {
            const hasAddedText = mutations.some(function(mutation) {
                return Array.from(mutation.addedNodes).some(function(node) {
                    return node.nodeType === Node.TEXT_NODE || (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim());
                });
            });
            if (!hasAddedText || document.body.dataset.siteLanguage !== 'en') {
                return;
            }
            clearTimeout(timer);
            timer = setTimeout(function() {
                translateTextNodes(true);
                translateAttributes(true);
            }, 40);
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});

(function($) {
  function init() {
    $('.btnMenu').on('click', toggleMenu);
    $('.botonera > ul > li').hover(handleHoverIn, handleHoverOut);
    initBackgroundMusic();
    initCentering();
    initAnchors();
    handleMobile();
  }

  function initBackgroundMusic() {
    if (document.querySelector('.bgm-record-button')) {
      return;
    }

    let playlist = window.backgroundMusicPlaylist || [
      'songs/AYANE - \u3054\u3081\u3093\u306d.mp3'
    ];

    const musicStateKey = 'backgroundMusicState';
    const savedMusicState = readMusicState();
    let currentIndex = 0;
    let failedTracks = 0;
    let wantsPlayback = !!savedMusicState.isPlaying;
    let pendingResumeTime = Number(savedMusicState.currentTime) || 0;
    let volumeLevel = typeof savedMusicState.volume === 'number' ? savedMusicState.volume : 0.6;
    const audio = new Audio();
    const panel = document.createElement('div');
    const button = document.createElement('button');
    const icon = document.createElement('span');
    const volumeKnob = document.createElement('button');
    const volumeMarker = document.createElement('span');
    const playlistPanel = document.createElement('div');
    const playlistTitle = document.createElement('div');
    const playlistList = document.createElement('div');

    audio.preload = 'metadata';
    audio.volume = volumeLevel;
    audio.src = playlist[currentIndex];
    panel.className = 'bgm-control-panel';
    button.className = 'bgm-record-button';
    button.type = 'button';
    button.setAttribute('aria-label', '\u5F00\u542F\u80CC\u666F\u97F3\u4E50');
    button.title = '\u5F00\u542F\u80CC\u666F\u97F3\u4E50';
    icon.className = 'bgm-record-icon';
    icon.textContent = '\u266A';
    button.appendChild(icon);
    volumeKnob.className = 'bgm-volume-knob';
    volumeKnob.type = 'button';
    volumeKnob.setAttribute('aria-label', '\u8C03\u8282\u80CC\u666F\u97F3\u4E50\u97F3\u91CF');
    volumeKnob.setAttribute('aria-valuemin', '0');
    volumeKnob.setAttribute('aria-valuemax', '100');
    volumeKnob.setAttribute('role', 'slider');
    volumeMarker.className = 'bgm-volume-marker';
    volumeKnob.appendChild(volumeMarker);
    playlistPanel.className = 'bgm-playlist-panel';
    playlistTitle.className = 'bgm-playlist-title';
    playlistTitle.textContent = '\u6B4C\u5355';
    playlistList.className = 'bgm-playlist-list';
    playlistPanel.append(playlistTitle, playlistList);
    panel.append(button, volumeKnob, playlistPanel);
    document.body.append(panel, audio);
    updateVolumeKnob();
    renderPlaylist();
    restoreSavedTrack();
    if (wantsPlayback) {
      updateMusicButton(true);
      setTimeout(function() {
        if (wantsPlayback) {
          playCurrentTrack();
        }
      }, 150);
    }

    button.addEventListener('click', function() {
      if (audio.paused) {
        wantsPlayback = true;
        updateMusicButton(true);
        playCurrentTrack();
      } else {
        wantsPlayback = false;
        audio.pause();
        updateMusicButton(false);
        saveMusicState();
      }
    });

    audio.addEventListener('ended', function() {
      playNextTrack();
    });

    audio.addEventListener('timeupdate', throttleSaveMusicState);
    audio.addEventListener('play', saveMusicState);
    audio.addEventListener('pause', saveMusicState);
    audio.addEventListener('loadedmetadata', function() {
      if (pendingResumeTime > 0 && Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(pendingResumeTime, Math.max(0, audio.duration - 1));
        pendingResumeTime = 0;
      }
    });

    window.addEventListener('pagehide', saveMusicState);
    window.addEventListener('beforeunload', saveMusicState);

    volumeKnob.addEventListener('wheel', function(e) {
      e.preventDefault();
      setVolume(volumeLevel + (e.deltaY < 0 ? 0.05 : -0.05));
    }, { passive: false });

    volumeKnob.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        e.preventDefault();
        setVolume(volumeLevel + 0.05);
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setVolume(volumeLevel - 0.05);
      }
    });

    volumeKnob.addEventListener('pointerdown', function(e) {
      e.preventDefault();
      volumeKnob.setPointerCapture(e.pointerId);
      setVolumeFromPointer(e);
      volumeKnob.addEventListener('pointermove', setVolumeFromPointer);
      volumeKnob.addEventListener('pointerup', stopVolumeDrag, { once: true });
      volumeKnob.addEventListener('pointercancel', stopVolumeDrag, { once: true });
    });

    audio.addEventListener('error', function() {
      if (!wantsPlayback) {
        return;
      }
      failedTracks += 1;
      if (failedTracks >= playlist.length) {
        wantsPlayback = false;
        failedTracks = 0;
        updateMusicButton(false);
        saveMusicState();
        button.title = '\u672A\u627E\u5230\u53EF\u64AD\u653E\u7684\u97F3\u4E50\u6587\u4EF6';
        return;
      }
      playNextTrack();
    });

    function playCurrentTrack() {
      button.title = '\u5173\u95ED\u80CC\u666F\u97F3\u4E50';
      audio.volume = volumeLevel;
      audio.play().then(function() {
        failedTracks = 0;
        updateMusicButton(true);
        saveMusicState();
      }).catch(function() {
        audio.dispatchEvent(new Event('error'));
      });
    }

    function playNextTrack() {
      currentIndex = (currentIndex + 1) % playlist.length;
      audio.src = playlist[currentIndex];
      renderPlaylist();
      if (wantsPlayback) {
        playCurrentTrack();
      }
      saveMusicState();
    }

    function updateMusicButton(isPlaying) {
      button.classList.toggle('is-playing', isPlaying);
      panel.classList.toggle('is-playing', isPlaying);
      button.setAttribute('aria-label', isPlaying ? '\u5173\u95ED\u80CC\u666F\u97F3\u4E50' : '\u5F00\u542F\u80CC\u666F\u97F3\u4E50');
      button.title = isPlaying ? '\u5173\u95ED\u80CC\u666F\u97F3\u4E50' : '\u5F00\u542F\u80CC\u666F\u97F3\u4E50';
      icon.textContent = isPlaying ? '\u275A\u275A' : '\u266A';
      renderPlaylist();
    }

    loadPlaylist();

    function loadPlaylist() {
      discoverPlaylistFromDirectory()
        .then(function(foundTracks) {
          if (foundTracks.length) {
            setPlaylist(foundTracks);
            return null;
          }
          return fetch('songs/playlist.json', { cache: 'no-store' });
        })
        .then(function(response) {
          if (!response) {
            return null;
          }
          return response.ok ? response.json() : null;
        })
        .then(function(items) {
          if (!Array.isArray(items) || !items.length) {
            return;
          }

          setPlaylist(items);
        })
        .catch(function() {});
    }

    function discoverPlaylistFromDirectory() {
      return fetch('songs/', { cache: 'no-store' })
        .then(function(response) {
          return response.ok ? response.text() : '';
        })
        .then(function(html) {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          return Array.from(doc.querySelectorAll('a[href]'))
            .map(function(link) {
              return link.getAttribute('href');
            })
            .filter(function(href) {
              return href && /\.(mp3|m4a|ogg|wav|mp4|flac)$/i.test(href);
            });
        })
        .catch(function() {
          return [];
        });
    }

    function setPlaylist(items) {
      const tracks = items
        .filter(function(item) {
          return typeof item === 'string' && /\.(mp3|m4a|ogg|wav|mp4|flac)$/i.test(item);
        })
        .map(normalizeTrackPath)
        .filter(Boolean);
      const uniqueTracks = dedupeTracks(tracks);

      if (!uniqueTracks.length) {
        return;
      }

      playlist = uniqueTracks;
      restoreSavedTrack();
      audio.src = playlist[currentIndex];
      renderPlaylist();
      if (wantsPlayback) {
        playCurrentTrack();
      }
    }

    function normalizeTrackPath(item) {
      let track = item.split('#')[0].split('?')[0];
      try {
        track = decodeURIComponent(track);
      } catch (e) {}

      track = track.replace(/\\/g, '/');
      const songsIndex = track.lastIndexOf('/songs/');
      if (songsIndex !== -1) {
        track = track.slice(songsIndex + 7);
      }
      track = track.replace(/^\.?\/*/, '');
      track = track.replace(/^songs\//i, '');

      return /\.(mp3|m4a|ogg|wav|mp4|flac)$/i.test(track) ? 'songs/' + track : '';
    }

    function dedupeTracks(tracks) {
      const priority = {
        mp3: 6,
        m4a: 5,
        ogg: 4,
        wav: 3,
        mp4: 2,
        flac: 1
      };
      const byName = new Map();

      tracks.forEach(function(track) {
        const key = getTrackKey(track);
        const ext = getTrackExtension(track);
        const existing = byName.get(key);
        if (!existing || (priority[ext] || 0) > (priority[getTrackExtension(existing)] || 0)) {
          byName.set(key, track);
        }
      });

      return Array.from(byName.values());
    }

    function getTrackKey(track) {
      return track
        .replace(/^songs\//i, '')
        .replace(/\.(mp3|m4a|ogg|wav|mp4|flac)$/i, '')
        .replace(/[_\-\s,，]+/g, '')
        .toLowerCase();
    }

    function getTrackExtension(track) {
      const match = track.match(/\.([a-z0-9]+)$/i);
      return match ? match[1].toLowerCase() : '';
    }

    function setVolume(value) {
      volumeLevel = Math.max(0, Math.min(1, value));
      audio.volume = volumeLevel;
      updateVolumeKnob();
      saveMusicState();
    }

    function setVolumeFromPointer(e) {
      const angle = getClampedKnobAngle(e);
      setVolume((angle + 135) / 270);
    }

    function getClampedKnobAngle(e) {
      const rect = volumeKnob.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const degrees = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI + 90;
      const normalized = ((degrees + 180) % 360 + 360) % 360 - 180;
      return Math.max(-135, Math.min(135, normalized));
    }

    function stopVolumeDrag(e) {
      volumeKnob.releasePointerCapture(e.pointerId);
      volumeKnob.removeEventListener('pointermove', setVolumeFromPointer);
    }

    function updateVolumeKnob() {
      const degrees = -135 + volumeLevel * 270;
      volumeKnob.style.setProperty('--volume-rotation', degrees + 'deg');
      volumeKnob.setAttribute('aria-valuenow', Math.round(volumeLevel * 100));
      volumeKnob.title = '\u97F3\u91CF\uFF1A' + Math.round(volumeLevel * 100) + '%';
    }

    function renderPlaylist() {
      playlistList.innerHTML = '';
      playlist.forEach(function(track, index) {
        const songButton = document.createElement('button');
        songButton.type = 'button';
        songButton.className = 'bgm-playlist-item';
        songButton.textContent = formatTrackName(track);
        songButton.classList.toggle('active', index === currentIndex);
        songButton.addEventListener('click', function() {
          currentIndex = index;
          failedTracks = 0;
          wantsPlayback = true;
          audio.src = playlist[currentIndex];
          updateMusicButton(true);
          renderPlaylist();
          playCurrentTrack();
          saveMusicState();
        });
        playlistList.appendChild(songButton);
      });
    }

    function formatTrackName(track) {
      const name = track.split('/').pop() || track;
      return name.replace(/\.(mp3|m4a|ogg|wav|mp4|flac)$/i, '');
    }

    function restoreSavedTrack() {
      if (!savedMusicState.src) {
        return;
      }

      const savedTrack = normalizeTrackPath(savedMusicState.src);
      const savedIndex = playlist.findIndex(function(track) {
        return normalizeTrackPath(track) === savedTrack;
      });
      if (savedIndex !== -1) {
        currentIndex = savedIndex;
        audio.src = playlist[currentIndex];
      }
    }

    function readMusicState() {
      try {
        return JSON.parse(localStorage.getItem(musicStateKey)) || {};
      } catch (e) {
        return {};
      }
    }

    function saveMusicState() {
      try {
        localStorage.setItem(musicStateKey, JSON.stringify({
          src: playlist[currentIndex],
          currentTime: audio.currentTime || 0,
          volume: volumeLevel,
          isPlaying: wantsPlayback && !audio.paused
        }));
      } catch (e) {}
    }

    function throttleSaveMusicState() {
      if (!throttleSaveMusicState.lastSaved || Date.now() - throttleSaveMusicState.lastSaved > 1000) {
        throttleSaveMusicState.lastSaved = Date.now();
        saveMusicState();
      }
    }
  }

  function toggleMenu() {
    const $this = $(this);
    const isOpen = $this.hasClass('open');
    $this.toggleClass('open', !isOpen);
    $('nav').stop(true).fadeToggle('fast', function() {
      if (!isOpen){
         centrarV($('nav.botonera'));
          $('.subnav-bar a').addClass('disabled');
    } 
      else {
        $('.subnav-bar a').removeClass('disabled');
      }
    });
  }

  function handleHoverIn() {
    $(this).siblings().addClass('blur');
    $(this).removeClass('blur');
  }

  function handleHoverOut() {
    $('.botonera > ul > li').removeClass('blur');
  }

  function initCentering() {
    const $centered = $('.centered');
    let resizeTimeout;

    function updateCentering() {
      $centered.each((i, el) => centrarV($(el)));
    }
    updateCentering();
    $(window).on('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCentering, 200);
    });
  }

  function initAnchors() {
    $('a.arrowDown').on('click', function(e) {
      e.preventDefault();
      smoothScroll($(this).attr('href'), 300);
    });

    $('#casos .headCasos .arrowIr').on('click', function(e) {
      e.preventDefault();
      smoothScroll('.imgPrincipal', 1200);
    });

    $('#inicio, #slide1, #slide2').on('click', function(e) {
      e.preventDefault();
      smoothScroll($(this).attr('data-rel'), 300);
    });
  }

  function smoothScroll(target, duration) {
    const $target = $(target);
    if ($target.length) {
      $('html, body').stop(true).animate({
        scrollTop: $target.offset().top
      }, duration, 'easeOutCirc');
    }
  }

  function handleMobile() {
    const $legal = $('.legal');
    const updateLegal = () => {
      if ($(window).width() <= 480) {
        $legal.html('<strong>Estudio NK</strong>Dise帽ando con pasi贸n desde el 2006');
      }
    };
    updateLegal();
    $(window).on('resize', updateLegal);
  }

  $(document).ready(init);

  $(function () {
    $('.general-content').each(function() {
      const $content = $(this);
      const $firstMenu = $content.children('.expand-menu').first();
      if (!$firstMenu.length || $content.children('.overview-menu').length) {
        $content.children('.expand-menu').each(function(index) {
          const $menu = $(this);
          $menu.addClass('bookmark-index-' + index);
          if (!$menu.hasClass('overview-menu') && !$menu.find('.bookmark-page-title').length) {
            const title = $menu.children('.expand-menu-header').clone().children().remove().end().text().trim();
            $menu.children('.expand-menu-body').prepend($('<h2 class="bookmark-page-title"></h2>').text(title));
          }
        });
        return;
      }

      const $overviewItems = $firstMenu.prevAll().get().reverse();
      if (!$overviewItems.length) {
        return;
      }

      const $overview = $('<div class="expand-menu overview-menu open"></div>');
      const $header = $('<div class="expand-menu-header">\u6982\u8FF0<span class="expand-arrow">\u25BC</span></div>');
      const $body = $('<div class="expand-menu-body"></div>');
      $body.append($overviewItems);
      $overview.append($header, $body);
      $firstMenu.before($overview);
      $content.children('.expand-menu').each(function(index) {
        const $menu = $(this);
        $menu.addClass('bookmark-index-' + index);
        if (!$menu.hasClass('overview-menu') && !$menu.find('.bookmark-page-title').length) {
          const title = $menu.children('.expand-menu-header').clone().children().remove().end().text().trim();
          $menu.children('.expand-menu-body').prepend($('<h2 class="bookmark-page-title"></h2>').text(title));
        }
      });
    });
    $('.menu-btn').on('click', function() {
        $('.menu-btn').removeClass('active');
        $(this).addClass('active');
      
        var target = $(this).data('tab');
        $('.general-content').removeClass('active page-turning');
        const $target = $('#' + target);
        $target.find('.expand-menu').removeClass('open page-opening');
        $target.find('.overview-menu').addClass('open');
        $target.addClass('active page-turning');
    });
  });

    $(function () {
    $('.expand-menu-header').on('click', function() {
      const $menu = $(this).parent('.expand-menu');
      const isOpen = $menu.hasClass('open');
      $menu.siblings('.expand-menu').removeClass('open page-opening');
      $menu.removeClass('page-opening');
      void $menu[0].offsetWidth;
      $menu.toggleClass('open', !isOpen);
      if (!isOpen) {
        $menu.addClass('page-opening');
      }
    });
  }); 
})(jQuery);

function setHomeAvatar(src) {
  const image = document.getElementById('home_img');
  if (!image) {
    return;
  }
  image.src = src;
}

function change_img(site) {
  if (site == 'wechat') {
    setHomeAvatar('./img/wechat.jpg');
  } else if (site == 'qq') {
    setHomeAvatar('./img/qq.jpg');
  } else if (site == 'outlook') {
    setHomeAvatar('./img/outlook.png');
  } else if (site == 'home') {
    setHomeAvatar('./img/texas_blank.png');
  }
}

