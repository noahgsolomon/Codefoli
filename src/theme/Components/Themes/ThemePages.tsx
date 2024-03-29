import { FC } from "react";
import profileDisplayDark from "assets/profiledisplay-dark.png";
import profileDisplayLight from "assets/profiledisplay.png";
import ThemeCard from "./ThemeCard.tsx";
const ThemePages: FC<{
  currentTheme: string | null;
  themes: {
    theme: string;
    header: string;
    about: string;
    image: string;
    domain: string;
    last_accessed: string;
    deployed: boolean;
  }[];
}> = ({ currentTheme, themes }) => {
  const themeList = ["PAPER"];

  return (
    <div>
      <div className="mt-40 flex flex-wrap items-center justify-center gap-4">
        {themeList.map((theme) =>
          themes.some((item) => item.theme === theme) ? null : (
            <ThemeCard
              key={theme}
              themeTitle={theme}
              currentTheme={currentTheme}
              imgDark={profileDisplayDark}
              imgLight={profileDisplayLight}
              used={themes.some((item) => item.theme === theme)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ThemePages;
