import { FC } from "react";
import PageCard from "./PageCard.tsx";
import {
  LOCALSTORAGE_ID_KEY,
  LOCALSTORAGE_REFRESH_KEY,
} from "../../../util/constants.ts";
import { PAPER_URL } from "../../../config.ts";
const CurrentPages: FC<{
  themes: {
    theme: string;
    header: string;
    about: string;
    image: string;
  }[];
}> = ({ themes }) => {
  return (
    <div className={"w-full"}>
      <h1 className={"text-center text-3xl font-bold"}>Current Pages</h1>
      <div className={"flex w-full flex-wrap justify-center gap-4"}>
        {themes.map((theme, index) =>
          theme.theme === "PAPER" ? (
            <PageCard
              key={index}
              themes={theme}
              link={`${PAPER_URL}?id=${localStorage.getItem(
                LOCALSTORAGE_ID_KEY
              )}&refresh=${localStorage.getItem(LOCALSTORAGE_REFRESH_KEY)}`}
            />
          ) : null
        )}
        {themes.length === 0 && (
          <div className={"mt-5 w-full text-center"}>
            <h1 className={"text-2xl font-bold"}>No themes found!</h1>
            <p className={"text-lg"}>
              Create page with a theme below to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentPages;
