import { ChangeEvent, useState } from "react";
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "../../util/constants.ts";
import { toggleTheme } from "../../util/toggleTheme.ts";
import styles from "./waitlist.module.css";
import { animated, useSpring } from "react-spring";
import { BsDiscord } from "react-icons/bs";
import addEmail from "api/newsletterapi.tsx";
import { Button } from "../../@/components/ui/button.tsx";
import { Frame } from "lucide-react";
import { Link } from "react-router-dom";
import Balancer from "react-wrap-balancer";
const Waitlist = () => {
  const [theme, setTheme] = useState<
    typeof LIGHT_THEME_KEY | typeof DARK_THEME_KEY
  >(
    (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
      | typeof LIGHT_THEME_KEY
      | typeof DARK_THEME_KEY) || LIGHT_THEME_KEY
  );

  const [email, setEmail] = useState("");
  const [shake, setShake] = useState(false);
  const [emailAdded, setEmailAdded] = useState(false);
  const [subscribeLoading, setSubscribeLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const newsletterSuccessAnimation = useSpring({
    opacity: emailAdded ? 1 : 0,
    transform: emailAdded ? "translateY(0px)" : "translateY(-50px)",
    delay: 100,
  });

  const handleToggleTheme = () => {
    toggleTheme();
    setTheme(
      (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
        | typeof LIGHT_THEME_KEY
        | typeof DARK_THEME_KEY) || typeof LIGHT_THEME_KEY
    );
  };

  const handleEmailSubmit = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.match(emailRegex)) {
      setSubscribeLoading(true);
      const addEmailFetch = await addEmail(email);
      console.log(addEmailFetch);
      if (addEmailFetch.status === "OK") {
        setEmail("");
        setEmailAdded(true);
      }
    } else {
      console.log("not email");
      setShake(true);
      setTimeout(() => setShake(false), 300);
      return;
    }
    setSubscribeLoading(false);
  };

  return (
    <div className={"h-screen"}>
      <header>
            <div
              className={
                "mx-5 flex flex-row items-center justify-between pt-10 md:mx-20"
              }
            >
              <div className={"flex cursor-pointer items-center flex-row gap-4"}>
                <Link to="/">
                  <Frame className="h-7 w-7 lg:h-10 lg:w-10 opacity-80 hover:opacity-60 transition-all"></Frame>
                </Link>
              </div>
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
                        className="h-7 w-7 hover:opacity-80 transition-all cursor-pointer"
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
                        className="h-7 w-7 hover:opacity-80 transition-all cursor-pointer"
                        aria-hidden="true"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                      </svg>
                    )}
              </div>
            </div>
          </header>
      <main className="relative mt-20 md:mt-40 flex flex-col items-center justify-center sm:px-16 md:px-0">
      <h1 className="text-3xl font-bold text-neutral-950 max-w-[20ch] dark:text-neutral-50 md:text-5xl">
        <Balancer className="leading-snug text-center">
          Join our waitlist to get early access to the{' '}
          <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text font-black text-transparent dark:from-blue-400 dark:to-emerald-400">
            Codefoli
          </span>{' '}
          community
        </Balancer>
      </h1>
          <p className="leading-8 text-black/50 text-center dark:text-white/50 max-w-[60ch]">
            <Balancer>
              By signing up to the waitlist you will be among the first to know when we launch and getting early access
            </Balancer>
          </p>
        <div className={"flex h-full w-full items-center justify-center"}>
          <div
            className={`${styles.waitlistBackground} fixed left-0 top-0 -z-10 h-full w-full`}
          />
          <div className=" place-items-center">
            <div className="mx-auto flex max-w-[700px] flex-col items-center justify-center text-center">
              <section className={"relative overflow-hidden"}>
                {emailAdded ? (
                  <animated.div
                    style={newsletterSuccessAnimation}
                    className="p-4 lg:my-10 lg:ml-20"
                  >
                    <h2
                      className={"text-center text-3xl font-bold lg:text-5xl "}
                    >
                      Thank you!
                      <span className="bg-gradient-to-r from-[#3178c6] to-black bg-clip-text font-black text-transparent dark:from-blue-400 dark:to-emerald-400">
                        {" "}
                        You're in!
                      </span>{" "}
                    </h2>
                    <p className={"mt-4 text-center opacity-60"}>
                      You can be involved by following us on Twitter and joining
                      our Discord server.
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <Button
                        asChild
                        className="flex items-center gap-2 rounded-xl border-2 bg-gradient-to-r from-black to-gray-900 px-12 py-5 text-white transition-all hover:text-white hover:opacity-80"
                        variant="outline"
                      >
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="gap-1 md:inline-flex"
                          href="https://twitter.com/noahgsolomon"
                        >
                          <i className="fa-brands fa-x-twitter h-4 w-4"></i>
                          Twitter
                        </a>
                      </Button>
                      <Button
                        asChild
                        className="flex items-center gap-2 rounded-xl border-2 bg-gradient-to-r from-[#5865F2] to-[#747bff] px-12 py-5 text-white transition-all hover:text-white hover:opacity-80"
                        variant="outline"
                      >
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="gap-1 text-white md:inline-flex"
                          href="https://codefoli.com/discord"
                        >
                          <BsDiscord className="h-4 w-4" />
                          Discord
                        </a>
                      </Button>
                    </div>
                  </animated.div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      onChange={handleEmailChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleEmailSubmit();
                        }
                      }}
                      className={`w-full border-none  bg-transparent p-3 py-10 text-center text-4xl outline-none transition-all hover:opacity-80 focus:outline-none focus:ring-0 lg:text-5xl ${
                        shake ? "animate-shake" : ""
                      }`}
                    />
                    <Button
                      className="wl-form-button group relative mt-6 w-[250px] w-full overflow-hidden rounded-xl max-w-[80%] px-[2px] py-[2px] font-bold transition-shadow duration-300 hover:shadow-[0_0.5rem_2rem_-0.75rem_#3178c6] dark:hover:shadow-[0_0.5rem_2rem_-0.75rem_#5198f6]"
                      disabled={subscribeLoading}
                      type="submit"
                      onClick={handleEmailSubmit}
                    >
                      <span className="h-full w-full rounded-[10px] bg-white px-4 py-2 text-center font-bold text-black opacity-80 transition-colors duration-300 group-hover:bg-blue-100 dark:bg-black dark:text-white group-hover:dark:bg-cyan-950">
                        {subscribeLoading
                          ? "Submitting..."
                          : "Join the waitlist"}
                      </span>
                    </Button>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Waitlist;
