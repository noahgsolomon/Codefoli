import {FC} from "react";
import gapFilledDark from "assets/gap-filled-dark.png";
import gapFilledLight from "assets/gap-filled-light.png";
import ThemeCard from "./ThemeCard.tsx";
const ThemePages: FC<{
    currentTheme: string | null;
}> = ({currentTheme}) => {

    return (
        <div className={'w-full mt-10'}>
            <h1 className={'text-center text-3xl font-bold'}>Themes</h1>
            <div className={'w-full flex justify-center flex-wrap gap-4'}>
                <ThemeCard themeTitle={'Paper'} currentTheme={currentTheme} imgDark={gapFilledDark} imgLight={gapFilledLight}/>
                <ThemeCard themeTitle={'Paper'} currentTheme={currentTheme} imgDark={gapFilledDark} imgLight={gapFilledLight}/>
            </div>
        </div>
    );
};

export default ThemePages;