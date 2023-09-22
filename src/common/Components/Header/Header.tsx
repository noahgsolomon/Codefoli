import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { toggleTheme } from "../../../util/toggleTheme.ts";
import {
  LOCALSTORAGE_THEME_KEY,
  LIGHT_THEME_KEY,
  DARK_THEME_KEY,
} from "../../../util/constants";

const Header: FC<{ authenticated: boolean }> = ({ authenticated }) => {
  const [theme, setTheme] = useState<
    typeof LIGHT_THEME_KEY | typeof DARK_THEME_KEY
  >(
    (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
      | typeof LIGHT_THEME_KEY
      | typeof DARK_THEME_KEY) || LIGHT_THEME_KEY
  );

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
        {authenticated ? null : (
            <header className="relative z-40 mx-5 flex items-center py-5 font-bold transition-all">
              <div
                  className="mx-auto flex w-full max-w-[50rem] flex-row flex-wrap items-center justify-center rounded-xl border-2 border-black
 px-4 py-3 shadow-custom transition-all dark:bg-[#1a1a1a] sm:justify-between"
              >
                <Link
                    to={'/'}
                    className="cursor-pointer select-none px-1 text-4xl text-gray-800 transition-all hover:-translate-y-0.5 dark:text-gray-50"
                >
                  Codefoli
                </Link>
                <div className={"flex flex-row items-center"}>
                  <Link
                      to="/login"
                      className="my-2 text-current no-underline transition-all"
                  >
                    <button className="inline-block cursor-pointer rounded-full bg-black px-6 py-2 text-center font-custom text-lg text-white no-underline transition-all hover:bg-blue-500 dark:bg-gray-50 dark:text-gray-800 dark:hover:opacity-80">
                      Hop In!
                    </button>
                  </Link>
                  <div className={"ml-5"} onClick={handleToggleTheme}>
                    {theme === LIGHT_THEME_KEY ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-5 w-5 cursor-pointer fill-yellow-500 transition-all hover:opacity-80"
                        >
                          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.844a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06 1.06l1.59-1.591a.75.75 0 00-1.061-1.06l-1.59 1.591z" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-5 w-5 cursor-pointer fill-yellow-200 transition-all hover:opacity-80"
                        >
                          <path
                              fillRule="evenodd"
                              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                              clipRule="evenodd"
                          />
                        </svg>
                    )}
                  </div>
                </div>
              </div>
            </header>
            )}

      </>
  );
};

export default Header;
