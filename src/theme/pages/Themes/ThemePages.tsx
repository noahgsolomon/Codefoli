import { FC } from "react";
import profileDisplayDark from "assets/profiledisplay-dark.png";
import profileDisplayLight from "assets/profiledisplay.png";
import ThemeCard from "./ThemeCard.tsx";
const ThemePages: FC<{
  currentTheme: string | null;
}> = ({ currentTheme }) => {
  return (
    <div className={"mt-10 w-full"}>
      <h1 className={"text-center text-3xl font-bold"}>Themes</h1>
      <div className={"flex w-full flex-wrap justify-center gap-4"}>
        <ThemeCard
          themeTitle={"Paper"}
          currentTheme={currentTheme}
          imgDark={profileDisplayDark}
          imgLight={profileDisplayLight}
        />
      </div>
    </div>
  );
};

export default ThemePages;
