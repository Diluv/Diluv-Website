export const darkmodejs = `(function() {
    let storageKey = "darkMode";
    let classNameDark = "mode-dark";
    let classNameLight = "mode-light";
    function setClassOnDocumentBody(darkMode) {
        document.body.classList.add(darkMode ? classNameDark : classNameLight);
        document.body.classList.remove(darkMode ? classNameLight : classNameDark);
    }
    let preferDarkQuery = "(prefers-color-scheme: dark)";
    let mql = window.matchMedia(preferDarkQuery);
    let supportsColorSchemeQuery = mql.media === preferDarkQuery;
    let localStorageTheme = null;
    try {
        localStorageTheme = localStorage.getItem(storageKey);
    } catch(err) {
    }
    let localStorageExists = localStorageTheme !== null;
    if(localStorageExists) {
        localStorageTheme = JSON.parse(localStorageTheme);
    }
    if(localStorageExists) {
        setClassOnDocumentBody(localStorageTheme);
    } else if(supportsColorSchemeQuery) {
        setClassOnDocumentBody(mql.matches);
        localStorage.setItem(storageKey, mql.matches);
    } else {
        var isDarkMode = document.body.classList.contains(classNameDark);
        localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
    }
})();`