import {FC} from "react";
import gapFilledDark from "assets/gap-filled-dark.png";
import gapFilledLight from "assets/gap-filled-light.png";
import PageCard from "./PageCard.tsx";
const CurrentPages: FC<{
    currentTheme: string | null;
}> = ({currentTheme}) => {

    return (
        <div className={'w-full'}>
        <h1 className={'text-center text-3xl font-bold'}>Current Pages</h1>
            <div className={'w-full flex justify-center flex-wrap gap-4'}>
                <PageCard currentTheme={currentTheme} imgDark={gapFilledDark} imgLight={gapFilledLight}/>
            </div>
        </div>
    );
};

export default CurrentPages;