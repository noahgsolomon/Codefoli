import {ChangeEvent, useState} from 'react';
import {DARK_THEME_KEY, LIGHT_THEME_KEY, LOCALSTORAGE_THEME_KEY} from "../../util/constants.ts";
import {toggleTheme} from "../../util/toggleTheme.ts";
import styles from './waitlist.module.css';
import {animated, useSpring} from "react-spring";
import {Twitter} from "../../util/ui/icons.ts";
import {BsDiscord} from "react-icons/bs";
import addEmail from "api/newsletterapi.tsx";
import {Button} from "../../@/components/ui/button.tsx";
const Waitlist = () => {

    const [theme, setTheme] = useState<
        typeof LIGHT_THEME_KEY | typeof DARK_THEME_KEY
    >(
        (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
            | typeof LIGHT_THEME_KEY
            | typeof DARK_THEME_KEY) || LIGHT_THEME_KEY
    );

    const [email, setEmail] = useState('');
    const [shake, setShake] = useState(false);
    const [emailAdded, setEmailAdded] = useState(false);
    const [subscribeLoading, setSubscribeLoading] = useState(false);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const newsletterSuccessAnimation = useSpring({
        opacity: emailAdded ? 1 : 0,
        transform: emailAdded ? 'translateY(0px)' : 'translateY(-50px)',
        delay: 100
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
            console.log('not email')
            setShake(true);
            setTimeout(() => setShake(false), 300);
            return;
        }
        setSubscribeLoading(false);
    };


    return (
        <div className={'h-screen'}>
            <header>
                <div className={'pt-10 mx-5 md:mx-20 justify-between items-center flex flex-row'}>
                    <div className={'cursor-pointer flex flex-row gap-4'}>
                        {theme === LIGHT_THEME_KEY ? (
                            <svg onClick={handleToggleTheme} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                        ) : (
                            <svg onClick={handleToggleTheme} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
                        )}
                    </div>
                </div>
            </header>
            <main className="relative sm:px-16 md:px-0 flex mt-40 justify-center items-start">
                <div className={'flex justify-center items-center h-full w-full'}>
                    <div className={`${styles.waitlistBackground} fixed left-0 top-0 -z-10 h-full w-full`} />
                    <div className=" place-items-center">
                        <div className="mx-auto flex max-w-[700px] flex-col items-center justify-center text-center">
                            <section className={'relative overflow-hidden'}>
                                {emailAdded ? (
                                    <animated.div style={newsletterSuccessAnimation} className="lg:ml-20 lg:my-10 p-4">
                                        <h2 className={'font-bold text-3xl lg:text-5xl text-center '}>
                                            Thank you!
                                            <span className="bg-gradient-to-r from-[#3178c6] to-black bg-clip-text font-black text-transparent dark:from-blue-400 dark:to-emerald-400">{" "}You're in!</span>                                        </h2>
                                        <p className={'opacity-60 text-center mt-4'}>You can be involved by following us on Twitter and joining our Discord server.</p>
                                        <div className="flex justify-center gap-2 mt-4">

                                            <Button
                                                asChild
                                                className="flex items-center transition-all hover:opacity-80 hover:text-white bg-gradient-to-r from-black to-gray-900 gap-2 rounded-xl border-2 px-12 py-5 text-white"
                                                variant="outline"
                                            >
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="gap-1 md:inline-flex"
                                                    href="https://twitter.com/noahgsolomon"
                                                >
                                                    <i className="w-4 h-4 fa-brands fa-x-twitter"></i>
                                                    Twitter
                                                </a>
                                            </Button>
                                            <Button
                                                asChild
                                                className="text-white flex items-center transition-all hover:opacity-80 hover:text-white gap-2 rounded-xl border-2 px-12 py-5 bg-gradient-to-r from-[#5865F2] to-[#747bff]"
                                                variant="outline"
                                            >
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="gap-1 md:inline-flex text-white"
                                                    href="https://codefoli.com/discord"
                                                >
                                                    <BsDiscord className="h-4 w-4" />
                                                    Discord
                                                </a>
                                            </Button>

                                        </div>
                                    </animated.div>
                                ) :(
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
                                            className={`w-full text-center  border-none bg-transparent p-3 hover:opacity-80 transition-all text-4xl lg:text-5xl py-10 outline-none focus:outline-none focus:ring-0 ${shake ? 'animate-shake' : ''}`}
                                        />
                                        <Button
                                            className="w-full wl-form-button group relative w-[250px] mt-6 overflow-hidden rounded-xl px-[2px] py-[2px] font-bold transition-shadow duration-300 hover:shadow-[0_0.5rem_2rem_-0.75rem_#3178c6] dark:hover:shadow-[0_0.5rem_2rem_-0.75rem_#5198f6]"
                                            disabled={subscribeLoading}
                                            type="submit"
                                            onClick={handleEmailSubmit}
                                        >
                                            <span className="h-full opacity-80 w-full rounded-[10px] bg-white px-4 py-2 text-center font-bold text-black transition-colors duration-300 group-hover:bg-blue-100 dark:bg-black dark:text-white group-hover:dark:bg-cyan-950">
                                                {subscribeLoading ? 'Submitting...' : 'Join the waitlist'}
                                            </span>
                                        </Button>
                                    </div>
                                )
                                }
                            </section>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

export default Waitlist;