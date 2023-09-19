import { DARK_THEME_KEY } from "../../../util/constants.ts";
import { FC, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const PageCard: FC<{
  imgLight: string;
  imgDark: string;
  currentTheme: string | null;
}> = ({ imgLight, imgDark, currentTheme }) => {
  const [hovered, setHovered] = useState(false);
  const [removeHover, setRemoveHover] = useState(false);

  return (
    <div
      className="m-5 flex max-h-[400px] max-w-[400px] cursor-pointer flex-col rounded-xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
      <div className="image-wrapper relative h-[400px] overflow-hidden rounded-t-lg transition-all">
        <img
          src={currentTheme === DARK_THEME_KEY ? imgDark : imgLight}
          alt="some"
          className={`inline-block h-full w-full transform object-contain transition-all ease-in-out`}
        />
      </div>
      <div className="rounded-b-lg bg-white p-5 dark:bg-[#0d0d0d]">
        <div className={"mt-2 flex flex-wrap gap-1"}>
          <div
            className={
              "rounded-xl border-2 border-black border-opacity-30 bg-green-300 p-1 text-sm text-gray-50 dark:bg-green-900"
            }
          >
            deployed
          </div>
          <div
            className={
              "rounded-xl border-2 border-black border-opacity-30 bg-red-300 p-1 text-sm text-gray-50 dark:bg-red-900"
            }
          >
            last edit: 03/04/2023
          </div>
          <div
            className={
              "rounded-xl border-2 border-black border-opacity-30 bg-blue-300 p-1 text-sm text-gray-50 dark:bg-blue-900"
            }
          >
            www.noahgsolomon.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCard;
