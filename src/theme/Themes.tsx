import { FC, useEffect, useState } from "react";
import Header from "./Header.tsx";
import CurrentPages from "./Components/CurrentPage/CurrentPages.tsx";
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "../util/constants.ts";
import ThemePages from "./Components/Themes/ThemePages.tsx";
import Sidebar from "./Sidebar.tsx";
import Footer from "./Footer.tsx";
const Themes: FC<{
  themes: {
    theme: string;
    header: string;
    about: string;
    image: string;
    domain: string;
    last_accessed: string;
    deployed: boolean;
  }[];
}> = ({ themes }) => {
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
          <CurrentPages themes={themes} />
          <ThemePages currentTheme={currentTheme} themes={themes} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Themes;
