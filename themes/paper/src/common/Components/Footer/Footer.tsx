import {HOME_URL} from "../../../config.ts";

const Footer = () => {

  return (
    <footer className="relative z-20 mt-20 bg-[#0d0d0d] ">
      <div className={"pt-72 md:pt-32"}></div>
      <div className="mx-auto max-w-screen-xl px-4  pb-2 pt-2 lg:px-8 lg:pt-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className={"md:mr-10"}>
            <div className="flex justify-center md:justify-start">
              <h2 className="bg-red-500 px-2 text-4xl font-bold text-white">
                Codefoli
              </h2>
            </div>
            <p className="mt-6 text-center leading-relaxed text-white md:text-left">
              Here for you to showcase your projects and skills to the world.
            </p>
            <div className="z-50 cursor-pointer text-center text-blue-500 transition-all hover:opacity-80 md:text-left">
              support@codefoli.com
            </div>
            <ul className="mb-8 flex justify-center gap-6 md:mb-0 md:mt-8 md:justify-start md:gap-8">
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
              <li>
                <a
                  href="https://discord.gg/JXKx5HwAQK"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:text-blue-500"
                >
                  <span className="sr-only">Discord</span>
                  <svg
                    className="bi bi-discord h-6 w-6 text-white transition-all hover:fill-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/codefoli"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white transition hover:text-blue-500"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6 fill-white transition-all hover:fill-blue-500"
                    viewBox="328 355 335 276"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="
                      M 630, 425
                      A 195, 195 0 0 1 331, 600
                      A 142, 142 0 0 0 428, 570
                      A  70,  70 0 0 1 370, 523
                      A  70,  70 0 0 0 401, 521
                      A  70,  70 0 0 1 344, 455
                      A  70,  70 0 0 0 372, 460
                      A  70,  70 0 0 1 354, 370
                      A 195, 195 0 0 0 495, 442
                      A  67,  67 0 0 1 611, 380
                      A 117, 117 0 0 0 654, 363
                      A  65,  65 0 0 1 623, 401
                      A 117, 117 0 0 0 662, 390
                      A  65,  65 0 0 1 630, 425
                      Z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex justify-center gap-5">
            <div
                onClick={() => window.location.href = HOME_URL + '/newsletter'}
              className="cursor-pointer rounded p-2 font-bold text-blue-500 underline transition-all hover:opacity-80"
            >
              📰 Newsletter
            </div>
            <div
              onClick={() => window.location.href = HOME_URL + '/analytics'}
              className="cursor-pointer rounded p-2 font-bold text-blue-500 underline transition-all hover:opacity-80"
            >
              📊 Analytics
            </div>
            <div
              onClick={() => window.location.href = HOME_URL + '/origin'}
              className="cursor-pointer rounded p-2 font-bold text-blue-500 underline transition-all hover:opacity-80"
            >
              🌍 Origin
            </div>
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
