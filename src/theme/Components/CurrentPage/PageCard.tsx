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
  const [removeHover, setRemoveHover] = useState(false);

  return (
    <div
      className="shadow-custom hover:shadow-customHover m-5 flex max-h-[400px] max-w-[400px] cursor-pointer flex-col rounded-xl border-2 border-black transition-all hover:-translate-y-0.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => (window.location.href = link)}
    >
      <button
        className={`${
          hovered ? "opacity-100" : "opacity-0"
        } absolute -right-4 -top-8 z-20 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveHover(true)}
        onMouseLeave={() => setRemoveHover(false)}
      >
        -
      </button>

      <div
        className={`transition-visible absolute inset-0 z-10 flex items-center justify-center rounded-lg border-8 border-dashed border-black border-opacity-30 bg-blue-500 opacity-0 transition-opacity ${
          hovered && !removeHover ? "visible opacity-80" : "invisible"
        }`}
      >
        <h3 className={"text-3xl font-bold text-white"}>
          Click to Enter Editor
        </h3>
        <FiArrowUpRight className={"ml-4 text-3xl text-white"} />
      </div>

      <div
        className={`transition-visible absolute inset-0 z-10 flex items-center justify-center rounded-lg border-8 border-dashed border-black border-opacity-30 bg-red-500 opacity-0 transition-opacity ${
          removeHover ? "visible opacity-80" : "invisible"
        }`}
      >
        <h3 className={"text-3xl font-bold text-white"}>Remove Page</h3>
        <FiArrowUpRight className={"ml-4 text-3xl text-white"} />
      </div>
      <div className=" relative h-[400px] overflow-hidden rounded-t-lg transition-all">
        <div
          className={"flex h-full flex-row items-center justify-between gap-10"}
        >
          <div className={"ml-2 mt-10 flex flex-col"}>
            <h2 className={"font-extra-bold max-w-[15ch] text-lg"}>
              {" "}
              {themes.header.length > 50
                ? themes.header.substr(0, 50) + "..."
                : themes.header}
            </h2>
            <p className={"max-w-[30ch] text-xs"}>
              {themes.about.length > 100
                ? themes.about.substr(0, 100) + "..."
                : themes.about}
            </p>

            <div className={"mt-1 flex flex-row gap-2"}>
              <div
                className={
                  "rounded-md bg-black px-[4px] py-[5px] text-xs font-bold text-white"
                }
              >
                Get in touch
              </div>
              <div
                className={
                  "rounded-md border-2 border-black px-[4px] py-[5px] text-xs font-bold"
                }
              >
                View Projects
              </div>
            </div>
          </div>
          <div
            className={
              "shadow-custom mr-2 h-[150px] w-[150px] overflow-hidden rounded-lg border-2 border-black"
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
        <div className={"mt-2 flex flex-wrap gap-1"}>
          <div
            className={
              "rounded-xl border-2 border-black border-opacity-30 bg-green-300 p-1 text-sm text-gray-50 dark:bg-green-900"
            }
          >
            {themes.deployed ? "deployed" : "not deployed"}
          </div>
          <div
            className={
              "rounded-xl border-2 border-black border-opacity-30 bg-red-300 p-1 text-sm text-gray-50 dark:bg-red-900"
            }
          >
            last accessed: {themes.last_accessed || "before v1.6"}
          </div>
          <div
            className={
              "rounded-xl border-2 border-black border-opacity-30 bg-blue-300 p-1 text-sm text-gray-50 dark:bg-blue-900"
            }
          >
            domain: {themes.domain || "none since v1.6"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCard;
