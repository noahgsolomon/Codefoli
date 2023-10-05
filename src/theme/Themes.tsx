import { FC, useEffect, useState } from "react";
import CurrentPages from "./Components/CurrentPage/CurrentPages.tsx";
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "../util/constants.ts";
import ThemePages from "./Components/Themes/ThemePages.tsx";
import { toggleTheme } from "../util/toggleTheme.ts";
import { Frame } from "lucide-react";
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

  const handleToggleTheme = () => {
    toggleTheme();
    setTheme(
      (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
        | typeof LIGHT_THEME_KEY
        | typeof DARK_THEME_KEY) || typeof LIGHT_THEME_KEY
    );
  };

  return (
    <>
      <header>
        <div
          className={
            "mx-5 flex flex-row items-center justify-between pt-10 md:mx-20"
          }
        >
          <div className={"flex cursor-pointer flex-row items-center gap-4"}>
            <Frame className="h-5 w-5 opacity-80 transition-all hover:opacity-60 lg:h-10 lg:w-10" />
          </div>
          <h2 className="bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-4xl font-bold text-gray-900 text-transparent dark:from-gray-100 dark:to-gray-600 dark:text-gray-300 lg:text-6xl">
            Codefoli
          </h2>
          <div className="flex flex-row gap-4">
            {theme === LIGHT_THEME_KEY ? (
              <svg
                onClick={handleToggleTheme}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 cursor-pointer transition-all hover:opacity-80"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            ) : (
              <svg
                onClick={handleToggleTheme}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 cursor-pointer transition-all hover:opacity-80"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            )}
          </div>
        </div>
      </header>
      <CurrentPages themes={themes} />
      <ThemePages currentTheme={currentTheme} themes={themes} />
    </>
  );
};

export default Themes;
