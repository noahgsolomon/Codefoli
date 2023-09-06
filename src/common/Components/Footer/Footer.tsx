import {useState} from "react";
import {addEmail} from "../../../pages/Newsletter/newsletterapi.tsx";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [emailAdded, setEmailAdded] = useState(false);
  const [emailChange, setEmailChange] = useState(false);
  const handleSubscribe = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.match(emailRegex)) {
      const addEmailFetch = await addEmail(email);
      console.log(addEmailFetch);
      if (addEmailFetch.status === "OK") {
        setEmail("");
        setEmailAdded(true);
        setTimeout(() => {
          localStorage.setItem('newsletter', 'true');
        }, 1000);
      }
    }
  };

  return (
    <footer className="bg-[#0d0d0d] relative mt-20">
      <div className={`p-6 absolute -top-20 left-1/2 transform -translate-x-1/2`}>
          <div className="mx-auto w-[300px] md:w-[400px] p-6 rounded-lg border-2 border-black shadow-custom bg-white dark:bg-[#1a1a1a] flex flex-col justify-between items-center">
              <div className="font-bold text-xl">Subscribe to our newsletter</div>
              <p className="mb-4 opacity-60 text-base">Win prizes, and get access to free hosting</p>
              <div className="flex flex-col w-full">
                {localStorage.getItem('newsletter') === 'true' && !emailChange ? (
                    <>
                      <p className={'text-green-500 text-center'}>subscribed!</p>
                      <div className={'text-base text-blue-500 underline hover:opacity-80 transition-all text-center cursor-pointer'} onClick={() => setEmailChange(true)}>add new email</div>
                    </>
                ) :(
                <>
                    <div className="md:relative flex flex-col justify-center items-center">
                      <input
                          type="email"
                          className="dark:bg-[#1a1a1a] mb-4 shadow-custom transition-all hover:shadow-customHover w-full h-12 border-2 border-black rounded-lg py-8"
                          placeholder="Enter your email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                      />
                      <button
                          className="text-base md:absolute md:right-0 md:top-8 md:transform md:-translate-y-1/2 h-12 px-4 bg-blue-500 hover:opacity-80 transition-all text-white rounded-lg mr-2"
                          onClick={async () => await handleSubscribe()}
                      >
                        Subscribe 🎉
                      </button>
                    </div>
                    {emailAdded ? (
                      <p className={'text-green-500 opacity-60 text-xs'}>Email added! Welcome to the family! 🎉 - Noah</p>
                      ) : (
                      <p className={'text-red-500 opacity-60 text-xs'}>P.S. your support means the world to me ❤ - Noah</p>
                      )
                      }
                </>
                )}
              </div>
          </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-4  pb-2 pt-2 lg:px-8 lg:pt-6">
        <div className="mt-72 md:mt-32 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center  sm:justify-start">
              <h2 className="bg-red-500 px-2 text-4xl font-bold text-white">
                Codefoli
              </h2>
            </div>

            <p className="mt-6 text-center leading-relaxed text-white  sm:text-left">
              Here for you to showcase your projects and skills to the world.
            </p>
            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              <li>
                <a
                    href="https://github.com/noahgsolomon/codefoli"
                    rel="noreferrer"
                    target="_blank"
                    className="text-white transition hover:text-blue-500"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                      className="h-6 w-6 text-white transition-all hover:fill-blue-500"
                      fill="white"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                  >
                    <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-4  pb-2 pt-2 lg:px-8 lg:pt-6">
        {/* copyright */}
        <div className="mb-2 mt-2 border-t-2 border-gray-500 pt-6">
          <p className="text-center text-sm text-white sm:order-first">
            &copy; 2023 Codefoli All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
