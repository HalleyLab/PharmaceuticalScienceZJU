(function() {
    'use strict';

    const notes = Array.isArray(window.courseNotesData) ? window.courseNotesData : [];
    if (!notes.length) {
        return;
    }

    const noteMap = new Map(notes.map(function(note) {
        return [normalizeTitle(note.title), note];
    }));

    document.querySelectorAll('.general-content .expand-menu').forEach(function(menu) {
        const header = menu.querySelector(':scope > .expand-menu-header');
        const body = menu.querySelector(':scope > .expand-menu-body');
        if (!header || !body || body.querySelector('.course-note-toggle')) {
            return;
        }

        const title = header.cloneNode(true);
        title.querySelectorAll('.expand-arrow').forEach(function(arrow) {
            arrow.remove();
        });

        const note = noteMap.get(normalizeTitle(title.textContent));
        if (!note) {
            return;
        }

        body.appendChild(buildNoteLink(note));
    });

    function normalizeTitle(title) {
        return String(title || '')
            .normalize('NFKC')
            .replace(/\s+/g, '')
            .replace(/Ⅰ/g, 'I')
            .replace(/Ⅱ/g, 'II')
            .toLocaleLowerCase('zh-CN');
    }

    function buildNoteLink(note) {
        const link = document.createElement('a');
        link.className = 'course-note-toggle';
        link.href = 'notes.html#note=' + encodeURIComponent(note.id);
        link.target = '_blank';
        link.rel = 'noopener';
        link.innerHTML = '<i class="fa-solid fa-pen-to-square" aria-hidden="true"></i><span>学习笔记</span>';
        return link;
    }
})();
