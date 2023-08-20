const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-screen-xl px-4  pb-2 pt-2 lg:px-8 lg:pt-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center  sm:justify-start">
              <h2 className="bg-red-500 text-4xl font-bold text-white">
                Codefoli
              </h2>
            </div>

            <p className="mt-6 text-center leading-relaxed text-white  sm:text-left">
              Here for you to showcase your projects and skills to the world.
            </p>
            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              <li>
                <a
                  href="https://github.com/noahgsolomon/codefolio"
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
