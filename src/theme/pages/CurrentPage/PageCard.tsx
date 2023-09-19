import {DARK_THEME_KEY} from "../../../util/constants.ts";
import {FC, useState} from "react";
import {FiArrowUpRight} from "react-icons/fi";


const PageCard: FC<{
    imgLight: string;
    imgDark: string;
    currentTheme: string | null;
}> = ({imgLight, imgDark, currentTheme}) => {

    const [hovered, setHovered] = useState(false);
    const [removeHover, setRemoveHover] = useState(false);

    return (
        <div
            className="m-5 cursor-pointer max-h-[400px] max-w-[400px] flex flex-col rounded-xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
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
                className={`items-center justify-center flex absolute inset-0 opacity-0 z-10 rounded-lg bg-blue-500 border-8 border-black border-opacity-30 border-dashed transition-opacity transition-visible ${
                    hovered && !removeHover ? "opacity-80 visible" : "invisible"
                }`}
            ><h3 className={'text-white text-3xl font-bold'}>Click to Enter Editor</h3><FiArrowUpRight className={'text-white text-3xl ml-4'}/>
            </div>

            <div
                className={`items-center justify-center flex absolute inset-0 opacity-0 z-10 rounded-lg bg-red-500 border-8 border-black border-opacity-30 border-dashed transition-opacity transition-visible ${
                    removeHover ? "opacity-80 visible" : "invisible"
                }`}
            ><h3 className={'text-white text-3xl font-bold'}>Remove Page</h3><FiArrowUpRight className={'text-white text-3xl ml-4'}/>
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
                <div className={'flex-wrap flex mt-2 gap-1'}>
                    <div className={'border-2 border-black border-opacity-30 text-sm bg-green-300 dark:bg-green-900 rounded-xl p-1 text-gray-50'}>deployed</div>
                    <div className={'border-2 border-black border-opacity-30 text-sm bg-red-300 dark:bg-red-900 rounded-xl p-1 text-gray-50'}>last edit: 03/04/2023</div>
                    <div className={'border-2 border-black border-opacity-30 text-sm bg-blue-300 dark:bg-blue-900 rounded-xl p-1 text-gray-50'}>www.noahgsolomon.com</div>
                </div>
            </div>
        </div>
    );
};

export default PageCard;