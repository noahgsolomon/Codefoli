import { FC } from "react";
import gapFilledDark from "assets/gap-filled-dark.png";
import gapFilledLight from "assets/gap-filled-light.png";
import PageCard from "./PageCard.tsx";
const CurrentPages: FC<{
  currentTheme: string | null;
  themes: string[];
}> = ({ currentTheme, themes }) => {
  return (
    <div className={"w-full"}>
      <h1 className={"text-center text-3xl font-bold"}>Current Pages</h1>
      <div className={"flex w-full flex-wrap justify-center gap-4"}>
        {themes.map((theme, index) => (
            theme === 'PAPER' ? (<PageCard
                key={index}
                currentTheme={currentTheme}
                imgDark={gapFilledDark}
                imgLight={gapFilledLight}
            />) : null
            ))}
      </div>
    </div>
  );
};

export default CurrentPages;
