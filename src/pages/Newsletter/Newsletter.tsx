import { FC, useState } from "react";
import { addEmail } from "./newsletterapi.tsx";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";
import { toggleTheme } from "../../util/toggleTheme.ts";
import Confetti from "react-confetti";
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "../../util/constants.ts";

const Newsletter: FC = () => {
  const [email, setEmail] = useState("");
  const [emailAdded, setEmailAdded] = useState(false);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [theme, setTheme] = useState<
    typeof LIGHT_THEME_KEY | typeof DARK_THEME_KEY
  >(
    (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
      | typeof LIGHT_THEME_KEY
      | typeof DARK_THEME_KEY) || LIGHT_THEME_KEY
  );
  const handleSubscribe = async () => {
    setSubscribeLoading(true);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.match(emailRegex)) {
      const addEmailFetch = await addEmail(email);
      console.log(addEmailFetch);
      if (addEmailFetch.status === "OK") {
        setEmail("");
        setEmailAdded(true);
        localStorage.setItem("newsletter", "true");
        window.location.href = "/";
      }
    }
    setSubscribeLoading(false);
  };

  const animation = useSpring({
    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 50,
  });

  return (
    <>
      <header className="relative z-40 mx-5 mb-20 flex items-center py-5 font-bold transition-all">
        <div className="mx-auto flex w-full max-w-[50rem] flex-row flex-wrap items-center justify-center rounded-xl border-2 border-black bg-gray-50 px-4 py-3 shadow-custom transition-all dark:bg-[#1a1a1a] sm:justify-between">
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
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform">
        <animated.div
          style={animation}
          className="z-50 flex w-[300px] flex-col items-center justify-between rounded-lg border-2 border-black bg-white p-6 shadow-custom dark:bg-[#1a1a1a] md:w-[500px]"
        >
          <div className="text-xl font-bold">Subscribe to our newsletter</div>
          <p className="mb-4 text-base opacity-60">
            Win prizes, and get access to free hosting
          </p>
          <div className="flex w-full flex-col">
            <div className="flex flex-col items-center justify-center md:relative">
              <input
                type="email"
                className="mb-4 h-12 w-full rounded-lg border-2 border-black py-8 shadow-custom transition-all hover:shadow-customHover dark:bg-[#1a1a1a]"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubscribe();
                  }
                }}
                value={email}
              />
              <button
                className="mr-2 h-12 rounded-lg bg-blue-500 px-4 text-base text-white transition-all hover:opacity-80 md:absolute md:right-0 md:top-8 md:-translate-y-1/2 md:transform"
                onClick={handleSubscribe}
                disabled={subscribeLoading}
              >
                {subscribeLoading ? (
                  <svg
                    className="mr-2 h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Subscribe 🎉"
                )}
              </button>
            </div>
          </div>
          {emailAdded ? (
            <p className={"text-xs text-green-500 opacity-60"}>
              Email added! Welcome to the family! 🎉
            </p>
          ) : (
            <p className={"text-xs text-red-500 opacity-60"}>
              Your support helps us keep going!
            </p>
          )}
          <div
            className={
              "mt-2 cursor-pointer text-base text-blue-500 underline transition-all hover:opacity-80"
            }
            onClick={() => (window.location.href = "/")}
          >
            not interested
          </div>
        </animated.div>
      </div>
      <Confetti />
    </>
  );
};

export default Newsletter;
