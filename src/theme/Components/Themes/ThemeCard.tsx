import { DARK_THEME_KEY } from "../../../util/constants.ts";
import { FC, useState } from "react";
import { FiArrowUpRight, FiLock } from "react-icons/fi";
import {
  LOCALSTORAGE_ID_KEY,
  LOCALSTORAGE_REFRESH_KEY,
} from "../../constants.ts";
import { PAPER_URL } from "../../../config.ts";

const ThemeCard: FC<{
  themeTitle: string;
  imgLight: string;
  imgDark: string;
  currentTheme: string | null;
  used: boolean;
}> = ({ themeTitle, imgLight, imgDark, currentTheme, used }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`hover:shadow-3xl m-5 flex max-h-[600px] max-w-[600px] cursor-pointer flex-col rounded-xl border-2 border-blue-100 border-opacity-50 shadow-2xl shadow-blue-100 transition-all hover:-translate-y-0.5 dark:border-gray-800 dark:shadow-gray-900`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() =>
        !used
          ? (window.location.href =
              themeTitle === "PAPER"
                ? `${PAPER_URL}?id=${localStorage.getItem(
                    LOCALSTORAGE_ID_KEY
                  )}&refresh=${localStorage.getItem(LOCALSTORAGE_REFRESH_KEY)}`
                : "#")
          : null
      }
    >
      {/* <div
        className={`absolute inset-0 z-10 flex items-center justify-center rounded-lg border-8 border-dashed border-black border-opacity-30 bg-black ${
          used ? "visible opacity-60" : "hidden"
        }`}
      >
        <FiLock className="text-4xl text-white" />
        <h3 className={"text-4xl font-bold text-white"}>Theme used</h3>
      </div> */}
      <div
        className={`transition-visible absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-green-400 opacity-0 transition-opacity dark:from-green-700 dark:to-green-500 ${
          !used && hovered ? "visible opacity-80" : "invisible"
        }`}
      >
        <h3 className={"text-4xl font-bold text-white"}>Click to Build Page</h3>
        <FiArrowUpRight className={"ml-4 text-4xl text-white"} />
      </div>
      <div className="image-wrapper relative h-[400px] overflow-hidden rounded-t-lg transition-all">
        <img
          src={currentTheme === DARK_THEME_KEY ? imgDark : imgLight}
          alt="some"
          className={`inline-block h-full w-full transform object-contain transition-all ease-in-out`}
        />
      </div>
      <div className="rounded-b-lg bg-white p-5 dark:bg-[#0d0d0d]">
        <h2 className="text-2xl font-bold leading-snug transition-all">
          {themeTitle}
        </h2>
        <h2 className="text-lg font-bold text-green-500 transition-all">
          FREE
        </h2>
        <p className={"text-md leading-snug"}>
          Our first ever theme, this one is held dear to us, and because of
          this, we would like to offer it for free for everyone!
        </p>
      </div>
    </div>
  );
};

export default ThemeCard;
