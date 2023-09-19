import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "./constants.ts";

export const toggleTheme = () => {
  if (document.body.classList.contains(DARK_THEME_KEY)) {
    document.body.classList.remove(DARK_THEME_KEY);
    document.body.classList.add(LIGHT_THEME_KEY);
    window.localStorage.setItem(LOCALSTORAGE_THEME_KEY, LIGHT_THEME_KEY);
    const themeChangedEvent = new Event("themeChanged");
    window.dispatchEvent(themeChangedEvent);
  } else {
    document.body.classList.add(DARK_THEME_KEY);
    document.body.classList.remove(LIGHT_THEME_KEY);
    window.localStorage.setItem(LOCALSTORAGE_THEME_KEY, DARK_THEME_KEY);
    const themeChangedEvent = new Event("themeChanged");
    window.dispatchEvent(themeChangedEvent);
  }
};
