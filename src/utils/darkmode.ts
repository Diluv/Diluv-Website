export const darkmodejs = `(function() {
  let storageKey = "pageTheme";
  let classNameDark = "dark";
  let classNameLight = "light";
  let element = document.documentElement;
  let isDarkMode;

  function setClass(darkMode) {
    element.classList.add(darkMode ? classNameDark : classNameLight);
    element.classList.remove(darkMode ? classNameLight : classNameDark);
  }

  let preferDarkQuery = "(prefers-color-scheme: dark)";
  let mql = window.matchMedia(preferDarkQuery);
  let supportsColorSchemeQuery = mql.media === preferDarkQuery;
  let localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch(err) {
  }
  document.documentElement.style.overflow = "hidden";
  document.body.clientWidth;
  let localStorageExists = localStorageTheme !== null;
  if(localStorageExists) {
    isDarkMode = localStorageTheme === classNameDark;
    setClass(isDarkMode);
  } else if(supportsColorSchemeQuery) {
    isDarkMode = mql.matches;
    setClass(isDarkMode);
    localStorage.setItem(storageKey, isDarkMode ? "dark" : "light");
  } else {
    isDarkMode = element.classList.contains(classNameDark);
    localStorage.setItem(storageKey, isDarkMode ? "dark" : "light");
  }
  document.documentElement.setAttribute("data-color-scheme", isDarkMode ? "dark" : "light");
  document.documentElement.style.overflow = "";
})();`;
