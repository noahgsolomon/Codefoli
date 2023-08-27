import {FC, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import {toggleTheme} from "../../../util/toggleTheme.ts";

const Header: FC<{ authenticated: boolean }> = ({ authenticated }) => {
  const location = useLocation();
  const blank = ["/setup"].includes(location.pathname);

  const [theme, setTheme] = useState<'light' | 'dark'>(localStorage.getItem('theme') as ('light' | 'dark') || 'light');

  return (
    <header
      className={`relative z-40 mx-5 flex items-center justify-center py-5 font-bold transition-all ease-linear md:flex-row`}
    >
      <div
        className="mx-auto flex w-full flex-col items-center justify-between rounded-xl border-2 border-black dark:border-gray-300
 dark:bg-[#1a1a1a] px-4 py-3 shadow-custom dark:shadow-customDark transition-all md:flex-row"
        style={{ maxWidth: "50rem" }}
      >
        <Link
          to={authenticated ? (blank ? "#" : "/dashboard") : "/"}
          className="cursor-pointer dark:text-gray-100 dark:hover:text-blue-500 select-none text-4xl text-current no-underline transition-all hover:text-blue-500 md:text-2xl"
        >
          Codefoli
        </Link>
        {blank ? (
          <></>
        ) : authenticated ? (
          <>
            <div className="flex w-full flex-row items-center justify-center text-gray-800 md:flex-row md:text-base">
              <div className="flex flex-wrap md:nowrap items-center">
                <Link
                  to="/dashboard"
                  className="mx-3 py-1 dark:text-gray-100 text-sm  no-underline transition-all dark:hover:text-blue-500 hover:text-blue-500 sm:text-xl sm:font-extrabold md:mx-10"
                >
                  Dashboard
                </Link>
                <Link
                  to="/about"
                  className="mx-3 py-1 dark:text-gray-100 text-sm no-underline  transition-all dark:hover:text-blue-500 hover:text-blue-500 sm:text-xl sm:font-extrabold md:mx-10"
                >
                  About
                </Link>
                <Link
                  to="/projects"
                  className="mx-3 py-1 dark:text-gray-100 text-sm no-underline transition-all dark:hover:text-blue-500 hover:text-blue-500 sm:text-xl sm:font-extrabold md:mx-10"
                >
                  Projects
                </Link>
                <Link
                  to="/contact"
                  className="mx-3 py-1 dark:text-gray-100 text-sm no-underline transition-all dark:hover:text-blue-500 hover:text-blue-500 sm:text-xl sm:font-extrabold md:mx-10"
                >
                  Contact
                </Link>
                <div
                    onClick={() => {
                      toggleTheme();
                      setTheme(localStorage.getItem('theme') as ('light' | 'dark') || 'light');
                    }}>
                  {theme === 'light' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 cursor-pointer transition-all fill-yellow-500 hover:opacity-80">
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.844a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06 1.06l1.59-1.591a.75.75 0 00-1.061-1.06l-1.59 1.591z" />
                      </svg>
                  ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 cursor-pointer transition-all hover:opacity-80 fill-yellow-200">
                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                      </svg>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <Link
            to="/login"
            className="my-2 text-current no-underline transition-all md:my-0"
          >
            <button className="duration-400 inline-block cursor-pointer rounded-full bg-black px-6 py-2 text-center font-custom text-lg text-white no-underline transition-all ease-linear hover:translate-y-[-5px] hover:bg-blue-500">
              Hop In!
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
