import {DARK_THEME_KEY} from "../../../util/constants.ts";
import {FC} from "react";


const PageCard: FC<{
    themeTitle: string;
    imgLight: string;
    imgDark: string;
    currentTheme: string | null;
}> = ({themeTitle, imgLight, imgDark, currentTheme}) => {

    return (
        <div
            className="m-5 mx-auto max-w-[400px] flex flex-col rounded-xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
        >
            <div
                className="image-wrapper relative h-[400px] overflow-hidden rounded-t-lg transition-all"
            >
                <img
                    src={
                        currentTheme === DARK_THEME_KEY ? imgDark : imgLight
                    }
                    alt="some"
                    className={`inline-block h-full w-full transform object-cover transition-all ease-in-out`}
                />
            </div>
            <div className="bg-white p-5 rounded-b-lg dark:bg-[#0d0d0d]">
                <h2 className="mb-5  text-2xl font-bold leading-snug transition-all">
                    {themeTitle}
                </h2>
            </div>
        </div>
    );
};

export default PageCard;