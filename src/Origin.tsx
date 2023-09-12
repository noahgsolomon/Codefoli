import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toggleTheme } from "./util/toggleTheme.ts";
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "./util/constants.ts";
import Footer from "Components/Footer/Footer.tsx";
import gapFilledDark from "assets/gap-filled-dark.png";
import gapFilledLight from "assets/gap-filled-light.png";
import journeyDark from "assets/journey-dark.png";
import journeyLight from "assets/journey-light.png";

const Origin: FC = () => {
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
      <header
        className={`relative z-40 mx-5 mb-20 flex items-center py-5 font-bold transition-all`}
      >
        <div className="mx-auto flex w-full max-w-[50rem] flex-row flex-wrap items-center justify-center rounded-xl border-2 border-black px-4 py-3 shadow-custom transition-all dark:bg-[#1a1a1a] sm:justify-between">
          <Link
            to={"/"}
            className="cursor-pointer select-none px-1 text-4xl text-gray-800 transition-all hover:-translate-y-0.5 dark:text-gray-50"
          >
            Codefoli
          </Link>
          <div
            onClick={() => {
              toggleTheme();
              setTheme(
                (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
                  | typeof LIGHT_THEME_KEY
                  | typeof DARK_THEME_KEY) || typeof LIGHT_THEME_KEY
              );
            }}
          >
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
      </header>
      <div>
        <h1 className={"mb-20 text-center text-6xl font-bold"}>Origin</h1>
        <div
          className={
            "mx-10 md:mx-20 mb-10 flex flex-col justify-center transition-all lg:mx-32 lg:flex-row lg:gap-[100px] xl:gap-[200px]"
          }
        >
          <div className={"lg:max-w-[40%]"}>
            <h2 className={"text-4xl"}>Idea Genesis</h2>
            <p>
              The inspiration for Codefoli stemmed from gaps in existing portfolio building options tailored to developers. While generalized site
              builders existed, they lacked features specifically designed for programmer needs. At best, they required manual integration of
              custom code samples and projects. And hosting options were either expensive or technically complex for most students and early career
              coders. There was an unmet need for an easy yet robust platform combining portfolio creation with free hosting—providing end-to-end
              solutions for programmers to showcase their work. With this problem and user segment in mind, Codefoli was envisioned as a frictionless
              portfolio builder and host designed by developers, for developers.
            </p>
          </div>
          <div className={"lg:w-[400px] xl:w-[500px]"}>
            <img
              className={"w-full rounded-xl border-2 border-black"}
              src={"https://images.codefoli.com/codefolilogo.png"}
              alt={"idea genesis image"}
            />
          </div>
        </div>
        <div
          className={
            "mx-10 md:mx-20 mb-10 flex flex-col justify-center transition-all lg:mx-32 lg:flex-row lg:gap-[100px] xl:gap-[200px]"
          }
        >
          <div className={"lg:max-w-[40%]"}>
            <h2 className={"text-4xl"}>Gaps Filled</h2>
            <p>
              Codefoli fills three core gaps in portfolio solutions for coders. Firstly, seamless
              integration of code snippets, project highlights, and technical details—critical for developer portfolios—yet absent
              on most platforms. Secondly, free and automated hosting removes financial and technical hurdles. Thirdly, downloadable source
              code enables full customization aligned with developer needs. Codefoli combines these must-have features
              into a unified platform providing the ideal portfolio experience for programmers at any stage of their journey.
            </p>
          </div>
          <div className={"lg:w-[400px] xl:w-[500px]"}>
            <img
              className={"w-full rounded-xl border-2 border-black"}
              src={
                currentTheme === DARK_THEME_KEY ? gapFilledDark : gapFilledLight
              }
              alt={"idea genesis image"}
            />
          </div>
        </div>
        <div
          className={
            "mx-10 md:mx-20 flex flex-col justify-center transition-all lg:mx-32 lg:flex-row lg:gap-[100px] xl:gap-[200px]"
          }
        >
          <div className={"lg:max-w-[40%]"}>
            <h2 className={"text-4xl"}>Journey</h2>
            <p>
              Codefoli's journey began by identifying portfolio pain points faced by coders.
              With developers in mind, Codefoli set out to eliminate these frictions through tailored solutions
              like easy code integration. Technically, Codefoli started as a simple React application but quickly
              evolved into a robust cloud architecture for reliability and scalability. New features like customizable
              layouts, dark mode, analytics, and a marketplace were prioritized based on direct coder feedback.
              But our mission remains the same—to empower programmers at any career stage to create portfolios as unique as their skills.
              There’s more ground to cover, but the journey thus far reaffirms that Codefoli is for developers, by developers.
            </p>
          </div>
          <div className={"lg:w-[400px] xl:w-[500px]"}>
            <img
              className={"w-full rounded-xl border-2 border-black"}
              src={currentTheme === DARK_THEME_KEY ? journeyDark : journeyLight}
              alt={"idea genesis image"}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Origin;
