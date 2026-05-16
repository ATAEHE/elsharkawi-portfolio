const settingsBtn = document.getElementById('settingsBtn');
const settingsMenu = document.getElementById('settingsMenu');
const themeInlineBtn = document.getElementById('themeInlineBtn');
const themeIcon = themeInlineBtn?.querySelector('i');
const themeText = document.getElementById('theme-text');
const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');
const currentLangText = document.getElementById('current-lang-text');

// Per-page flag: se presente come attributo `data-ignore-theme="true"` sul body,
// la pagina ignora le modifiche di tema (mantiene il suo aspetto), ma continuerà
// a ricevere le modifiche di lingua.
const ignoreTheme = document.body && document.body.dataset && document.body.dataset.ignoreTheme === 'true';

function applySavedTheme() {
    if (ignoreTheme) return; // non cambiare il tema su questa pagina
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        if (themeText) themeText.innerText = 'الوضع المنير';
    } else {
        document.body.classList.remove('dark-theme');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        if (themeText) themeText.innerText = 'الوضع الداكن';
    }
}

function applySavedLanguage() {
    const savedLang = localStorage.getItem('selectedLang') || 'ar';
    changeLang(savedLang, false);
}

function toggleTheme() {
    if (ignoreTheme) return; // questa pagina non gestisce il tema
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');

    if (isDark) {
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        if (themeText) themeText.innerText = 'الوضع المنير';
        localStorage.setItem('theme', 'dark');
    } else {
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
        if (themeText) themeText.innerText = 'الوضع الداكن';
        localStorage.setItem('theme', 'light');
    }
}

function changeLang(lang, save = true) {
    if (save) localStorage.setItem('selectedLang', lang);
    updatePageContent(lang);
    if (currentLangText) currentLangText.textContent = lang.toUpperCase();
}

function updatePageContent(lang) {
    const elements = document.querySelectorAll('[data-ar]');
    elements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`) || el.getAttribute('data-ar');
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = text;
        } else {
            el.innerHTML = text;
        }
    });

    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';
}

function setupSettingsMenu() {
    if (!settingsBtn || !settingsMenu) return;

    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        settingsMenu.classList.remove('show');
    });

    settingsMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function setupLangMenu() {
    if (!langBtn || !langMenu) return;

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        langMenu.classList.remove('show');
    });
}

function setupThemeButton() {
    if (!themeInlineBtn || !themeIcon || !themeText) return;
    themeInlineBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTheme();
    });
}

function initSettings() {
    setupSettingsMenu();
    setupLangMenu();
    setupThemeButton();
    applySavedTheme();
    applySavedLanguage();
}

window.addEventListener('DOMContentLoaded', initSettings);

// Sincronizza cambiamenti tra schede finestre aperte (quando localStorage cambia)
window.addEventListener('storage', (e) => {
    if (e.key === 'selectedLang') {
        // Applica la lingua senza riscriverla (evita loop)
        changeLang(e.newValue, false);
    }
    if (e.key === 'theme') {
        // Se la pagina ignora il tema, non applicarlo
        if (ignoreTheme) return;
        applySavedTheme();
    }
});