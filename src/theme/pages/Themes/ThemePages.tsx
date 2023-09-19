import {FC} from "react";
import profileDisplayDark from "assets/profiledisplay-dark.png";
import profileDisplayLight from "assets/profiledisplay.png";
import ThemeCard from "./ThemeCard.tsx";
const ThemePages: FC<{
    currentTheme: string | null;
}> = ({currentTheme}) => {

    return (
        <div className={'w-full mt-10'}>
            <h1 className={'text-center text-3xl font-bold'}>Themes</h1>
            <div className={'w-full flex justify-center flex-wrap gap-4'}>
                <ThemeCard themeTitle={'Paper'} currentTheme={currentTheme} imgDark={profileDisplayDark} imgLight={profileDisplayLight}/>
            </div>
        </div>
    );
};

export default ThemePages;