import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { toggleTheme } from "./util/toggleTheme.ts";
import {
  DARK_THEME_KEY,
  LIGHT_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "./util/constants.ts";
import Footer from "Components/Footer/Footer.tsx";

const Architecture: FC = () => {
  const [theme, setTheme] = useState<
    typeof LIGHT_THEME_KEY | typeof DARK_THEME_KEY
  >(
    (localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
      | typeof LIGHT_THEME_KEY
      | typeof DARK_THEME_KEY) || LIGHT_THEME_KEY
  );

  return (
    <>
      <header className="relative z-40 mx-5 mb-20 flex items-center py-5 font-bold transition-all">
        <div className="mx-auto flex w-full max-w-[50rem] flex-row flex-wrap items-center justify-center rounded-xl border-2 border-black px-4 py-3 shadow-custom transition-all dark:bg-[#1a1a1a] sm:justify-between">
          <Link
            to="/"
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
        <h1 className="mb-20 text-center text-6xl font-bold">Architecture</h1>
        <div className="mx-10 mb-10 flex flex-col items-center justify-center transition-all md:mx-20 lg:mx-32 lg:flex-row lg:gap-[100px] xl:gap-[200px]">
          <div className="mb-10 lg:mb-0 lg:max-w-[40%]">
            <h2 className="text-4xl">AWS</h2>
            <p>
              From the website, to the domain, to the backend, to the database,
              everything here utilizes amazon web services. The following is the
              AWS service stack: Route 53, Cloudfront, S3 Buckets, API Gateway,
              Lambda, RDS with RDS Proxy, Cognito User Pools, SQS, EC2,
              DynamoDB, SES Emails, Certificate Manager, Identity and Access
              Management. In addition, the website is built with React and
              Typescript w/ tailwind.css, and the backend is built with Node.js.
            </p>
          </div>
          <div className="h-[600px] w-[600px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px]">
            <img
              className="h-full w-full rounded-xl border-2 border-black object-cover"
              src="https://images.codefoli.com/awsimg.jpeg"
              alt="idea genesis image"
            />
          </div>
        </div>
        <div className="mx-10 mt-10 flex flex-col items-center justify-center transition-all md:mx-20 lg:mx-32 lg:flex-row lg:gap-[100px] xl:gap-[200px]">
          <div className="mb-10 lg:mb-0 lg:max-w-[40%]">
            <h2 className="text-4xl">Frontend</h2>
            <p>
              The frontend of Codefoli is engineered for both performance and
              flexibility, clocking in at around 15,000 lines of code. We
              utilize React as our primary library for building the user
              interface, offering a highly dynamic and interactive experience.
              TypeScript is employed for static type checking, which
              significantly improves code reliability and maintainability. For
              styling, we use Tailwind CSS, a utility-first CSS framework that
              enables us to create responsive and highly customizable designs
              efficiently. The entire frontend build process is streamlined with
              Vite, a next-generation frontend tooling platform that offers
              features like fast development cycles and optimized production
              builds. This combination of technologies ensures that users have a
              smooth, engaging experience while navigating through their
              portfolios.
            </p>
          </div>
          <div className="h-[600px] w-[600px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px]">
            <img
              className="h-full w-full rounded-xl border-2 border-black object-cover"
              src="https://images.codefoli.com/react.png"
              alt="idea genesis image"
            />
          </div>
        </div>

        <div className="mx-10 mt-10 flex flex-col items-center justify-center transition-all md:mx-20 lg:mx-32 lg:flex-row lg:gap-[100px] xl:gap-[200px]">
          <div className="mb-10 lg:mb-0 lg:max-w-[40%]">
            <h2 className="text-4xl">Backend</h2>
            <p>
              The frontend of Codefoli is engineered for both performance and
              flexibility, clocking in at around 15,000 lines of code. We
              utilize React as our primary library for building the user
              interface, offering a highly dynamic and interactive experience.
              TypeScript is employed for static type checking, which
              significantly improves code reliability and maintainability. For
              styling, we use Tailwind CSS, a utility-first CSS framework that
              enables us to create responsive and highly customizable designs
              efficiently. The entire frontend build process is streamlined with
              Vite, a next-generation frontend tooling platform that offers
              features like fast development cycles and optimized production
              builds. This combination of technologies ensures that users have a
              smooth, engaging experience while navigating through their
              portfolios.
            </p>
          </div>
          <div className="h-[600px] w-[600px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px]">
            <img
              className="h-full w-full rounded-xl border-2 border-black object-cover"
              src="https://images.codefoli.com/lambda.png"
              alt="idea genesis image"
            />
          </div>
        </div>
        <div className="mx-10 mt-10 flex flex-col items-center justify-center transition-all md:mx-20 lg:mx-32 lg:flex-row lg:gap-[100px] xl:gap-[200px]">
          <div className="mb-10 lg:mb-0 lg:max-w-[40%]">
            <h2 className="text-4xl">Architecture</h2>
            <p>
              The frontend of Codefoli is engineered for both performance and
              flexibility, clocking in at around 15,000 lines of code. We
              utilize React as our primary library for building the user
              interface, offering a highly dynamic and interactive experience.
              TypeScript is employed for static type checking, which
              significantly improves code reliability and maintainability. For
              styling, we use Tailwind CSS, a utility-first CSS framework that
              enables us to create responsive and highly customizable designs
              efficiently. The entire frontend build process is streamlined with
              Vite, a next-generation frontend tooling platform that offers
              features like fast development cycles and optimized production
              builds. This combination of technologies ensures that users have a
              smooth, engaging experience while navigating through their
              portfolios.
            </p>
          </div>
          <div
            className={
              "h-[600px] w-[600px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px]"
            }
          >
            <img
              className={
                "h-full w-full rounded-xl border-2 border-black object-cover"
              }
              src={"https://images.codefoli.com/react.png"}
              alt={"idea genesis image"}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Architecture;
