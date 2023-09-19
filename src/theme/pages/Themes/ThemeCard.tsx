import {DARK_THEME_KEY} from "../../../util/constants.ts";
import {FC, useState} from "react";
import {FiArrowUpRight} from "react-icons/fi";


const ThemeCard: FC<{
    themeTitle: string;
    imgLight: string;
    imgDark: string;
    currentTheme: string | null;
}> = ({themeTitle, imgLight, imgDark, currentTheme}) => {

    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="m-5 cursor-pointer max-h-[400px] max-w-[400px] flex flex-col rounded-xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className={`items-center justify-center flex absolute inset-0 opacity-0 z-10 rounded-lg bg-green-500 border-8 border-black border-opacity-30 border-dashed transition-opacity transition-visible ${
                    hovered ? "opacity-80 visible" : "invisible"
                }`}
            ><h3 className={'text-white text-4xl font-bold'}>Click to Build Page</h3><FiArrowUpRight className={'text-white text-4xl ml-4'}/>
            </div>
            <div
                className="image-wrapper relative h-[400px] overflow-hidden rounded-t-lg transition-all"
            >
                <img
                    src={
                        currentTheme === DARK_THEME_KEY ? imgDark : imgLight
                    }
                    alt="some"
                    className={`inline-block h-full w-full transform object-contain transition-all ease-in-out`}
                />
            </div>
            <div className="bg-white p-5 rounded-b-lg dark:bg-[#0d0d0d]">
                <h2 className="text-2xl font-bold leading-snug transition-all">
                    {themeTitle}
                </h2>
                <h2 className="text-green-500 text-lg font-bold transition-all">
                    FREE
                </h2>
                <p className={'text-sm'}>Our first ever theme, this one is held dear to us, and because of this, we would like to offer it for free for everyone!</p>
            </div>
        </div>
    );
};

export default ThemeCard;