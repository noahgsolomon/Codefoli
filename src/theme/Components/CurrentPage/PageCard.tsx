import { FC, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const PageCard: FC<{
  themes: {
    theme: string;
    header: string;
    about: string;
    image: string;
    domain: string;
    last_accessed: string;
    deployed: boolean;
  };
  link: string;
}> = ({ link, themes }) => {
  const [hovered, setHovered] = useState(false);
  // const [removeHover, setRemoveHover] = useState(false);

  return (
    <div
      className="hover:shadow-3xl m-5 flex max-h-[600px] max-w-[600px] cursor-pointer flex-col rounded-xl border-2 border-blue-100 border-opacity-50 shadow-2xl shadow-blue-100 transition-all hover:-translate-y-0.5 dark:border-gray-800 dark:shadow-gray-900"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => (window.location.href = link)}
    >
      {/* <button
        className={`${
          hovered ? "opacity-100" : "opacity-0"
        } absolute -right-4 -top-8 z-20 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveHover(true)}
        onMouseLeave={() => setRemoveHover(false)}
      >
        -
      </button> */}

      <div
        className={`transition-visible absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 opacity-0 transition-opacity dark:from-blue-700 dark:to-blue-500 ${
          hovered ? "visible opacity-80" : "invisible"
        }`}
      >
        <h3 className={"text-3xl font-bold text-white"}>
          Click to Enter Editor
        </h3>
        <FiArrowUpRight className={"ml-4 text-3xl text-white"} />
      </div>
      <div className=" relative h-[400px] overflow-hidden rounded-t-lg transition-all">
        <div
          className={
            "mx-4 flex h-full flex-row items-center justify-between sm:mx-10 sm:gap-10"
          }
        >
          <div className={"ml-2 mt-10 flex flex-col"}>
            <h2 className={"font-extra-bold max-w-[15ch] text-lg sm:text-2xl"}>
              {" "}
              {themes.header.length > 50
                ? themes.header.substr(0, 50) + "..."
                : themes.header}
            </h2>
            <p className={"max-w-[30ch] text-xs md:text-base"}>
              {themes.about.length > 100
                ? themes.about.substr(0, 100) + "..."
                : themes.about}
            </p>

            <div className={"mt-1 flex flex-row gap-2"}>
              <div
                className={
                  "rounded-md bg-black px-[4px] py-[5px] text-xs font-bold text-white sm:text-base"
                }
              >
                Get in touch
              </div>
              <div
                className={
                  "rounded-md border-2 border-black px-[4px] py-[5px] text-xs font-bold sm:text-base"
                }
              >
                View Projects
              </div>
            </div>
          </div>
          <div
            className={
              "shadow-custom mr-2 h-[150px] w-[150px] overflow-hidden rounded-lg border-2 border-black sm:h-[200px] sm:w-[200px]"
            }
          >
            <img
              className={"h-full w-full object-cover"}
              src={themes.image}
              alt={"profile image"}
            />
          </div>
        </div>
      </div>
      <div className="rounded-b-lg bg-white p-5 dark:bg-[#0d0d0d]">
        <div className="mt-2 flex flex-wrap gap-1">
          <div
            className={`${
              themes.deployed
                ? "from-green-400 to-green-300 text-green-900  dark:from-green-900 dark:to-green-800 dark:text-green-600"
                : "from-red-400 to-red-300 text-red-900 dark:from-red-900 dark:to-red-800 dark:text-red-600"
            } flex items-center gap-2 rounded-2xl border-2 border-black border-opacity-30 bg-gradient-to-r px-3 py-1 text-sm font-bold text-opacity-60`}
          >
            <i
              className={`${
                themes.deployed
                  ? "text-green-900 dark:text-green-600"
                  : "text-red-900 dark:text-red-600"
              } fa-solid fa-power-off opacity-60 dark:opacity-100`}
            ></i>
            {themes.deployed ? "Published" : "Not Published"}
          </div>
          <div className="flex items-center gap-2 rounded-2xl border-2 border-black border-opacity-30 bg-gradient-to-r from-cyan-300 to-cyan-200 px-3 py-1 text-sm font-bold text-cyan-800 text-opacity-60 dark:from-cyan-900 dark:to-cyan-800 dark:text-cyan-600 dark:text-opacity-100 dark:text-opacity-100">
            <i className="fa-solid fa-clock-rotate-left text-cyan-800 opacity-60 dark:text-cyan-600 dark:opacity-100"></i>
            Latest: {themes.last_accessed || "before v1.6"}
          </div>
          <div className="flex items-center gap-2 rounded-2xl border-2 border-black border-opacity-30 bg-gradient-to-r from-blue-200 to-blue-100 px-3 py-1 text-sm font-bold text-blue-800 text-opacity-60 dark:from-blue-900 dark:to-blue-800 dark:text-blue-600">
            <i className="fa-solid fa-globe text-blue-800 opacity-60 dark:text-blue-600 dark:opacity-100"></i>
            {themes.domain || `No domain`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCard;
