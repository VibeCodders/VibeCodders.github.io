// Shared i18n helper.
// Resolves the active language from localStorage, falling back to the browser
// language (Italian if the browser is Italian, otherwise English), mounts a
// language selector into any [data-lang-switch] container, applies static
// translations to [data-i18n-*] elements and notifies subscribers on change.
window.I18N = (function () {
    const KEY = 'vc-lang';
    const SUPPORTED = ['it', 'en'];
    const listeners = [];

    function detect() {
        try {
            const saved = localStorage.getItem(KEY);
            if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
        } catch (e) { /* localStorage unavailable */ }
        const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
        return nav.indexOf('it') === 0 ? 'it' : 'en';
    }

    let current = detect();

    function apply() {
        document.documentElement.lang = current;

        // Static text translations: <el data-i18n-it="..." data-i18n-en="...">
        document.querySelectorAll('[data-i18n-it], [data-i18n-en]').forEach((el) => {
            const val = el.getAttribute('data-i18n-' + current);
            if (val !== null) el.textContent = val;
        });

        // Attribute translations: <el data-i18n-attr="aria-label" data-i18n-attr-it="..." data-i18n-attr-en="...">
        document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
            const attr = el.getAttribute('data-i18n-attr');
            const val = el.getAttribute('data-i18n-attr-' + current);
            if (attr && val !== null) el.setAttribute(attr, val);
        });

        document.querySelectorAll('.lang-btn').forEach((b) => {
            const active = b.dataset.lang === current;
            b.classList.toggle('active', active);
            b.setAttribute('aria-pressed', String(active));
        });

        listeners.forEach((fn) => fn(current));
    }

    function set(lang) {
        if (SUPPORTED.indexOf(lang) === -1) return;
        if (lang !== current) {
            current = lang;
            try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
        }
        apply();
    }

    function mountSelector(container) {
        if (!container || container.dataset.langMounted) return;
        container.dataset.langMounted = '1';
        container.classList.add('lang-switch');
        container.setAttribute('role', 'group');
        container.setAttribute('aria-label', 'Language');
        SUPPORTED.forEach((lang) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'lang-btn';
            b.dataset.lang = lang;
            b.textContent = lang.toUpperCase();
            b.setAttribute('aria-label', lang === 'it' ? 'Italiano' : 'English');
            b.addEventListener('click', () => set(lang));
            container.appendChild(b);
        });
    }

    function init() {
        document.querySelectorAll('[data-lang-switch]').forEach(mountSelector);
        apply();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        get: () => current,
        set: set,
        onChange: (fn) => { listeners.push(fn); }
    };
})();
