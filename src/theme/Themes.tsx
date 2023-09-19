import { FC, useEffect, useState } from "react";
import Header from "./Header.tsx";
import CurrentPages from "./pages/CurrentPage/CurrentPages.tsx";
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "../util/constants.ts";
import ThemePages from "./pages/Themes/ThemePages.tsx";
import Sidebar from "./Sidebar.tsx";
const Themes: FC = () => {
  const [theme, setTheme] = useState<
    typeof LIGHT_THEME_KEY | typeof DARK_THEME_KEY
  >(
    (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
      | typeof LIGHT_THEME_KEY
      | typeof DARK_THEME_KEY) || LIGHT_THEME_KEY
  );

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem(LOCALSTORAGE_THEME_KEY)
  );

  useEffect(() => {
    const themeChangeListener = () => {
      setCurrentTheme(localStorage.getItem("theme"));
    };

    window.addEventListener("themeChanged", themeChangeListener);

    return () => {
      window.removeEventListener("themeChanged", themeChangeListener);
    };
  }, []);

  return (
    <>
      <div className="mb-20 flex">
        <Sidebar />
        <div className="flex w-full flex-col">
          <Header setTheme={setTheme} theme={theme} />
          <CurrentPages currentTheme={currentTheme} />
          <ThemePages currentTheme={currentTheme} />
        </div>
      </div>
    </>
  );
};

export default Themes;
