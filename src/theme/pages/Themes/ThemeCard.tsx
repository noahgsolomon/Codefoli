import { DARK_THEME_KEY } from "../../../util/constants.ts";
import { FC, useState } from "react";
import {FiArrowUpRight, FiLock} from "react-icons/fi";

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
      className={`${used ? 'opacity-70' : ''} relative m-5 flex max-h-[400px] max-w-[400px] cursor-pointer flex-col rounded-xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
          className={`absolute inset-0 z-10 flex items-center justify-center rounded-lg border-8 border-dashed border-black border-opacity-30 bg-black ${
              used ? "visible opacity-60" : "hidden"
          }`}
      >
        <FiLock className="text-4xl text-white" />
        <h3 className={"text-4xl font-bold text-white"}>Theme used</h3>
      </div>
      <div
          className={`transition-visible absolute inset-0 z-10 flex items-center justify-center rounded-lg border-8 border-dashed border-black border-opacity-30 bg-green-500 opacity-0 transition-opacity ${
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
        <p className={"text-sm"}>
          Our first ever theme, this one is held dear to us, and because of
          this, we would like to offer it for free for everyone!
        </p>
      </div>
    </div>
  );
};

export default ThemeCard;
