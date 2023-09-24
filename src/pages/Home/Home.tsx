import { FC, useEffect, useState } from "react";
import { Balancer } from 'react-wrap-balancer';
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "../../util/constants.ts";
import {toggleTheme} from "../../util/toggleTheme.ts";
import {Button} from "./button.tsx";
import {Link} from "react-router-dom";
import {Github, Star, Twitter} from "../../util/ui/icons.ts";

const Home: FC = () => {

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem(LOCALSTORAGE_THEME_KEY)
  );

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

  console.log(currentTheme);

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
        <div className="h-screen">
          <div className="md:h-48 h-20 bg-gradient-to-b from-purple-100 to-transparent dark:from-gray-900">
            <header>
              <div className={'pt-10 mx-20 justify-between flex flex-row'}>
                <div onClick={handleToggleTheme} className={'cursor-pointer w-10 h-10'}>
                  {theme === LIGHT_THEME_KEY ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                  ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
                    )}
                </div>
                <Link
                    to={'/login'}
                    className="rounded-2xl bg-purple-400 text-white dark:bg-gray-800 dark:border-purple-400 dark:border-opacity-60 border-2 dark:text-purple-400 dark:hover:bg-purple-700 dark:hover:text-white opacity-80 hover:opacity-60 transition-all px-4 py-1 shadow-sm dark:hover:shadow-md"
                >
                  Login
                </Link>
              </div>
            </header>
          </div>
          <div className={'md:mt-28'}>
              {/*start*/}
            <section className="-mt-[56px] min-h-[calc(100vh)] overflow-hidden lg:min-h-0 lg:pt-[56px]">
              <div className="mb-10 container grid min-h-screen items-center justify-center lg:min-h-0 lg:grid-cols-2">
                <div className="flex w-full flex-col items-center justify-center gap-10 lg:items-start">
                  <div className="relative flex w-full items-center justify-center gap-4 lg:justify-start">
                    <h1 className="bg-gradient-to-r from-[#9b59b6] to-black bg-clip-text text-6xl font-extrabold text-transparent dark:to-white sm:text-8xl sm:leading-[5.5rem]">
                      Codefoli
                    </h1>
                    </div>

                    <p className="max-w-[55ch] bg-transparent px-8 text-center font-medium leading-8 text-black/60 dark:text-white/50 lg:px-0 lg:text-left">
                      <Balancer>Your go to tool to build and host <span className={'underline'}>your sites. For free. Forever.</span></Balancer>
                    </p>
                    <div className="flex flex-col gap-3 md:flex-row">
                      <Button
                          asChild
                          className="hero-join-button rounded-xl p-[2px] font-bold transition-all duration-300 hover:bg-transparent hover:shadow-[0_0_2rem_-0.5rem_#9b59b6] dark:hidden"
                      >
                        <Link to="/register">
            <span className="inline-flex h-full w-fit items-center gap-1 rounded-[10px] bg-white px-12 md:px-4 py-2 text-[#9b59b6] transition-all duration-300">
              Get started →
            </span>
                        </Link>
                      </Button>
                      <Button
                          asChild
                          className="  hero-join-button-dark hidden rounded-xl p-[2px] font-bold transition-all duration-300 dark:block dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8]"
                      >
                        <Link to="/register">
            <span className="inline-flex h-full w-fit items-center gap-1 rounded-[10px] px-12 md:px-4 py-2 transition-all duration-300 dark:bg-neutral-900 dark:text-white">
              Get started →
            </span>
                        </Link>
                      </Button>
                      <Button
                          asChild
                          className="flex items-center gap-2 rounded-xl border-2 px-4 py-2 dark:text-white"
                          variant="outline"
                      >
                        <a
                            target="_blank"
                            rel="noreferrer"
                            className="gap-1 md:inline-flex"
                            href="https://github.com/noahgsolomon/codefoli"
                        >
                          <Github className="h-4 w-4" />
                          Star on Github
                          <Star className="h-4 w-4 fill-yellow-500 opacity-80" />
                        </a>
                      </Button>
                      <Button
                          asChild
                          className="flex items-center gap-2 rounded-xl border-2 px-4 py-2 dark:text-white"
                          variant="outline"
                      >
                        <a
                            target="_blank"
                            rel="noreferrer"
                            className="gap-1 md:inline-flex"
                            href="https://twitter.com/noahgsolomon"
                        >
                          <Twitter className="h-4 w-4" />
                          Twitter
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
              {/*end*/}
              <div className={'flex flex-row gap-4 justify-center'}>


              </div>

            </div>
          </div>
      </>
  );
};

export default Home;
