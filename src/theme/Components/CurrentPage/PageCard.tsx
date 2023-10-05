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
      className="cursor-pointer shadow-blue-100 shadow-2xl hover:shadow-3xl dark:shadow-gray-900 dark:border-gray-800 m-5 flex max-h-[600px] border-2 border-blue-100 border-opacity-50 max-w-[600px] flex-col rounded-xl transition-all hover:-translate-y-0.5"
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
        className={`bg-gradient-to-r transition-visible absolute inset-0 z-10 flex items-center justify-center rounded-lg from-blue-500 to-blue-400 dark:from-blue-700 dark:to-blue-500 opacity-0 transition-opacity ${
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
          className={"flex h-full mx-4 sm:mx-10 flex-row items-center justify-between sm:gap-10"}
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
                  "rounded-md bg-black px-[4px] py-[5px] text-xs sm:text-base font-bold text-white"
                }
              >
                Get in touch
              </div>
              <div
                className={
                  "rounded-md border-2 border-black px-[4px] py-[5px] text-xs sm:text-base font-bold"
                }
              >
                View Projects
              </div>
            </div>
          </div>
          <div
            className={
              "shadow-custom mr-2 w-[150px] h-[150px] sm:h-[200px] sm:w-[200px] overflow-hidden rounded-lg border-2 border-black"
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
          <div className={`${themes.deployed ? 'dark:text-green-600 from-green-400 to-green-300  text-green-900 dark:from-green-900 dark:to-green-800' : 'dark:text-red-600 from-red-400 to-red-300 text-red-900 dark:from-red-900 dark:to-red-800'} rounded-2xl bg-gradient-to-r border-2 border-black flex gap-2 items-center border-opacity-30 px-3 py-1 text-sm font-bold text-opacity-60`}>
            <i className={`${themes.deployed ? 'dark:text-green-600 text-green-900' : 'dark:text-red-600 text-red-900'} opacity-60 dark:opacity-100 fa-solid fa-power-off`}></i>
            {themes.deployed ? "Published" : "Not Published"}
          </div>
          <div className="bg-gradient-to-r text-cyan-800 text-opacity-60 dark:text-opacity-100 font-bold rounded-2xl flex items-center gap-2 border-2 border-black border-opacity-30 from-cyan-300 to-cyan-200 px-3 py-1 text-sm dark:text-opacity-100 dark:text-cyan-600 dark:from-cyan-900 dark:to-cyan-800">
            <i className="text-cyan-800 dark:opacity-100 dark:text-cyan-600 opacity-60 fa-solid fa-clock-rotate-left"></i>
            Latest: {themes.last_accessed || "before v1.6"}
          </div>
          <div className="bg-gradient-to-r text-blue-800 font-bold text-opacity-60 flex items-center gap-2 rounded-2xl border-2 border-black border-opacity-30 from-blue-200 to-blue-100 px-3 py-1 text-sm dark:text-blue-600 dark:from-blue-900 dark:to-blue-800">
            <i className="text-blue-800 dark:text-blue-600 opacity-60 dark:opacity-100 fa-solid fa-globe"></i>
            {themes.domain || `No domain`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCard;
