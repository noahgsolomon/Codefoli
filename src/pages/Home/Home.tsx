import {FC, useEffect, useRef, useState} from "react";
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "../../util/constants.ts";
import {toggleTheme} from "../../util/toggleTheme.ts";
import {Button} from "./button.tsx";
import {Link} from "react-router-dom";
import {Github, Shuffle, Star, Twitter} from "../../util/ui/icons.ts";
import ratatoonie from 'assets/ratatoonieprofile.png';
import noah from 'assets/noahprofile.png';
import walterwhite from 'assets/walterwhiteprofile.png';
import ratatooniedark from 'assets/ratatoonieprofiledark.png';
import noahdark from 'assets/noahprofiledark.png';
import walterwhitedark from 'assets/walterwhiteprofiledark.png';
import amogus from 'assets/amogus.png';
import whiteamogus from 'assets/whiteamogus.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Typed from "typed.js";
import VideoCard from "./VideoCard.tsx";
import Balancer from "react-wrap-balancer";

const purpleTheme = {
  primary: '#9b59b6',
  secondary: '#643a79',
  headerGradient: 'from-purple-100 to-transparent',
  buttonGradient: 'from-purple-500 to-purple-800',
  ring: 'ring-purple-600',
  buttonFill: 'fill-purple-500',
  color1: '#d8b4fe',
  color2: '#a855f7',
  color3: '#7c3aed',
  color4: '#4c1d95',
}

const yellowTheme = {
  primary: '#f1c40f',
  secondary: '#f39c12',
  headerGradient: 'from-yellow-100 to-transparent',
  buttonGradient: 'from-yellow-500 to-yellow-800',
  ring: 'ring-yellow-600',
  buttonFill: 'fill-yellow-500',
  color1: '#fff200', // Lightest Yellow
  color2: '#ffcc00', // Light Yellow
  color3: '#ff9900', // Medium Yellow-Orange
  color4: '#cc6600', // Dark Orange-Brown
}


const orangeTheme = {
  primary: '#e67e22',
  secondary: '#d35400',
  headerGradient: 'from-orange-100 to-transparent',
  buttonGradient: 'from-orange-500 to-orange-800',
  ring: 'ring-orange-600',
  buttonFill: 'fill-orange-500',
  color1: '#ffad42', // Lightest Orange
  color2: '#ff8000', // Light Orange
  color3: '#ff5500', // Medium Orange-Red
  color4: '#cc4400', // Darkest Reddish-Brown
}


const greenTheme = {
  primary: '#2ecc71',
  secondary: '#27ae60',
  headerGradient: 'from-green-100 to-transparent',
  buttonGradient: 'from-green-500 to-green-800',
  ring: 'ring-green-600',
  buttonFill: 'fill-green-500',
  color1: '#6ab04c',
  color2: '#26de81',
  color3: '#10ac84',
  color4: '#0a3d62',
}

const blueTheme = {
  primary: '#3498db',
  secondary: '#2980b9',
  headerGradient: 'from-blue-100 to-transparent',
  buttonGradient: 'from-blue-500 to-blue-800',
  ring: 'ring-blue-600',
  buttonFill: 'fill-blue-500',
  color1: '#add8e6', // Lightest Blue
  color2: '#0099cc', // Light Blue
  color3: '#006699', // Medium Blue
  color4: '#003366', // Darkest Blue
}

const redTheme = {
  primary: '#ff5349',
  secondary: '#b33a2d',
  headerGradient: 'from-red-100 to-transparent',
  buttonGradient: 'from-red-500 to-red-800',
  ring: 'ring-red-600',
  buttonFill: 'fill-red-500',
  color1: '#ff6666', // Lightest Red
  color2: '#ff3333', // Light Red
  color3: '#cc0000', // Medium Red
  color4: '#990000', // Darkest Red
}

const Home: FC = () => {

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'Your AI-Powered Web Oasis.',
        'From Portfolios to Full-Scale Sites. All for Free.',
        'Customize, Deploy, Done. It\'s That Simple.',
        'Responsive, Fast, and Secure.',
        'Download, Edit, and Own Your Code.',
        'Elevate Your Web Presence.'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1000,
      loop: false,
      loopCount: 1
    });

    return () => {
      typed.destroy();
    }
  }, []);

  const [activeTheme, setActiveTheme] = useState(purpleTheme);

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

  const [currentImage, setCurrentImage] = useState(walterwhite);
  const [currentEditVideo, setCurrentEditVideo] = useState(theme === LIGHT_THEME_KEY ? 'https://images.codefoli.com/edit.mp4' : 'https://images.codefoli.com/darkedit.mp4');
  const [currentDownloadableVideo, setCurrentDownloadableVideo] = useState(theme === LIGHT_THEME_KEY ? 'https://images.codefoli.com/downloadable.mp4' : 'https://images.codefoli.com/downloadabledark.mp4');
  const [currentDeploymentVideo, setCurrentDeploymentVideo] = useState(theme === LIGHT_THEME_KEY ? 'https://images.codefoli.com/deployment.mp4' : 'https://images.codefoli.com/deploymentdark.mp4');
  const images = [walterwhite, noah, ratatoonie];
  const imagesDark = [walterwhitedark, noahdark, ratatooniedark];

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentTheme === DARK_THEME_KEY) {
      setCurrentImage(imagesDark[imageIndex]);
    } else {
      setCurrentImage(images[imageIndex]);
    }
  }, [currentTheme, imageIndex]);

  useEffect(() => {
    document.body.style.setProperty('--primary', activeTheme.primary);
    document.body.style.setProperty('--color-1', activeTheme.color1);
    document.body.style.setProperty('--color-2', activeTheme.color2);
    document.body.style.setProperty('--color-3', activeTheme.color3);
    document.body.style.setProperty('--color-4', activeTheme.color4);
  }, [activeTheme]);

  const handleToggleTheme = () => {
    toggleTheme();
    setTheme(
        (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
            | typeof LIGHT_THEME_KEY
            | typeof DARK_THEME_KEY) || typeof LIGHT_THEME_KEY
    );
  };

  useEffect(() => {
    const themeChangeListener = () => {
      setCurrentTheme(localStorage.getItem("theme"));
    };

    window.addEventListener("themeChanged", themeChangeListener);

    return () => {
      window.removeEventListener("themeChanged", themeChangeListener);
    };
  }, []);

  const themes = [purpleTheme, redTheme, blueTheme, greenTheme, orangeTheme, yellowTheme];
  const [, setCurrentThemeIndex] = useState(0);
  const togglePageTheme = () => {
    setCurrentThemeIndex((prev) => {
      const newIndex = (prev + 1) % themes.length;
      setActiveTheme(themes[newIndex]);
      return newIndex;
    });
  };
  useEffect(() => {
    if (currentTheme === DARK_THEME_KEY) {
      setCurrentEditVideo('https://images.codefoli.com/darkedit.mp4');
      setCurrentDownloadableVideo('https://images.codefoli.com/downloadabledark.mp4');
      setCurrentDeploymentVideo('https://images.codefoli.com/deploymentdark.mp4');
    } else {
      setCurrentEditVideo('https://images.codefoli.com/edit.mp4');
      setCurrentDownloadableVideo('https://images.codefoli.com/downloadable.mp4');
        setCurrentDeploymentVideo('https://images.codefoli.com/deployment.mp4');
    }
  }, [currentTheme]);

  return (
      <>
        <div className="h-screen">
          <div className={`bg-gradient-to-b ${activeTheme.headerGradient} dark:from-gray-900 to-transparent transition-all`}>
            <header>
              <div className={'pt-10 mx-5 md:mx-20 justify-between items-center flex flex-row'}>
                <div className={'cursor-pointer flex flex-row gap-4'}>
                  {theme === LIGHT_THEME_KEY ? (
                      <svg onClick={handleToggleTheme} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                  ) : (
                      <svg onClick={handleToggleTheme} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
                    )}
                  <div onClick={togglePageTheme} className={'cursor-pointer'}>
                    <Shuffle />
                  </div>
                </div>
                  <div className="flex flex-col items-center justify-center ">

                    <div className="mt-1 flex flex-col gap-3 px-4 text-center sm:px-0">
                      <Link
                          className="mx-auto rounded-full bg-gradient-to-r from-gray-400 to-gray-600 p-[1px] brightness-90 contrast-150 focus:outline-none focus-visible:ring-2 dark:brightness-125 dark:contrast-100 dark:text-gray-200 sm:block"
                          to={'/login'}
                      >
                        <div className="group relative overflow-hidden rounded-full bg-white/80 px-3 py-1 duration-300 hover:pr-9 dark:bg-black/80 dark:text-gray-300">
                          <span className="bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent block sm:inline dark:text-gray-300">
                            <svg
                                className="mr-1 inline-block h-4 w-4 fill-gray-600 dark:fill-gray-300"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 2C8.13 2 5 5.13 5 9v2H3v10h18V11h-2V9c0-3.87-3.13-7-7-7zm1 14h-2v-2h2v2zm3-4H8V9c0-2.21 1.79-4 4-4s4 1.79 4 4v3z"/>
                            </svg>
                            Log in
                           <img
                               className="absolute -bottom-1 right-1 duration-300 sm:translate-y-7 group-hover:translate-y-0"
                               alt="Among Us character"
                               height="30"
                               width="30"
                               src={whiteamogus}
                           />
                          </span>
                        </div>
                      </Link>
                    </div>


                  </div>
              </div>
            </header>
          </div>
          <div className={': mt-28'}>
              {/*start*/}
            <section className="xl:pt-[56px] mb-20 md:mb-40">
              <div className="mb-10 flex flex-col xl:flex-row justify-between container items-center">
                <div className="flex flex-col mb-10 items-center justify-center gap-10 xl:items-start">
                  <div className="relative flex w-full items-center justify-center gap-4 xl:justify-start">
                    <h1 className="bg-gradient-to-r from-gray-400 to-black bg-clip-text text-6xl sm:text-8xl font-extrabold text-transparent dark:to-white leading-[5.5rem]">
                      Codefoli
                    </h1>
                    </div>
                  <p className="max-w-[55ch] bg-transparent px-8 text-center font-medium leading-8 text-black/60 dark:text-white/50 xl:px-0 xl:text-left">
                    <span ref={el}></span>
                  </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                          asChild
                          className={`hero-join-button rounded-xl p-[2px] transition-all duration-300 hover:bg-transparent hover:shadow-[0_0_2rem_-0.5rem_#333333] dark:hidden`}
                      >
                        <Link to="/register">
                      <span className="opacity-90 inline-flex h-full w-fit items-center gap-1 rounded-[10px] bg-white px-12 md:px-4 py-2 text-gray-800 transition-all duration-300">
                        Get started →
                      </span>
                        </Link>
                      </Button>
                      <Button
                          asChild
                          className="  hero-join-button hidden rounded-xl p-[2px] transition-all duration-300 dark:block dark:hover:shadow-[0_0_2rem_-0.5rem_#fff8]"
                      >
                        <Link to="/register">
                        <span className="opacity-90 inline-flex h-full w-fit items-center gap-1 rounded-[10px] px-12 md:px-4 py-2 transition-all duration-300 dark:bg-neutral-900 dark:text-white">
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
                <div>
                  <img src={currentImage} className={'xl:w-[700px] hover:-translate-y-1 cursor-pointer transition-all'} alt={'Transitioning Image'}
                  onClick={() => {
                    setImageIndex((prev) => (prev + 1) % images.length);
                  }}
                  />
                </div>
              </div>
            </section>
              <section className="relative overflow-hidden" id="features">
                <div className="container mb-[64px] grid items-center justify-center">
                  <div className="flex flex-col items-center justify-center gap-16">

                    <div className="mt-1 flex flex-col gap-3 px-4 text-center sm:px-0">
                      <h1 className="text-4xl font-bold">
                        <Balancer>What&apos;s in Codefoli?</Balancer>
                      </h1>
                      <p className="text-black/50 dark:text-white/50">
                        <Balancer>All u need to create, deploy, and manage your sites. At scale.</Balancer>
                      </p>
                      <div
                          className={`mx-auto ${activeTheme.buttonGradient} rounded-full bg-gradient-to-r  p-[1px] brightness-90 contrast-150 focus:outline-none focus:${activeTheme.ring} focus-visible:ring-2 dark:brightness-125 dark:contrast-100 sm:block`}
                      >
                        <div className="group relative overflow-hidden rounded-full bg-white/80 px-3 py-1 duration-300 hover:pr-9 dark:bg-black/80">
                        <span className={`bg-gradient-to-r ${activeTheme.buttonGradient} bg-clip-text text-transparent`}>
                          <svg
                              className={`mr-1 inline-block h-4 w-4 ${activeTheme.buttonFill}`}
                              viewBox="4 4 48 48"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m19.2 36.4-4.75-10.45L4 21.2l10.45-4.75L19.2 6l4.75 10.45L34.4 21.2l-10.45 4.75ZM36.4 42l-2.35-5.25-5.25-2.35 5.25-2.4 2.35-5.2 2.4 5.2 5.2 2.4-5.2 2.35Z" />
                          </svg>
                          So many features!{" "}
                          <img
                              className="absolute -bottom-1 right-1 translate-y-7 duration-300 group-hover:translate-y-0"
                              alt="doge smile"
                              height="30"
                              width="30"
                              src={amogus}
                          />
                        </span>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 grid w-full gap-8 lg:grid-cols-2">
                      <VideoCard
                          description="Customize your website, your way. Edit the sections, ordering, text, images, and more!"
                          bgClass="lg:bg-gradient-to-br"
                          title="Edit with ease"
                          video={currentEditVideo}
                          className={''}
                      />
                      <VideoCard
                          description="Download your code and host it anywhere. No strings attached."
                          bgClass="lg:bg-gradient-to-br"
                          title="Download your code."
                          video={currentDownloadableVideo}
                          className={''}
                      />
                      <VideoCard
                          description="Deploy and Re-Deploy your site with one click. No need to worry about hosting, domains, or SSL."
                          bgClass="lg:bg-gradient-to-br"
                          title="One click deployments"
                          video={currentDeploymentVideo}
                          className={''}
                      />
                    </div>
                  </div>
                </div>
              </section>
              {/*end*/}
              <div className={'pt-20'}>
              </div>

            </div>
          </div>
      </>
  );
};

export default Home;
