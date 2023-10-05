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
    domain: string;
    last_accessed: string;
    deployed: boolean;
  }[];
}> = ({ themes }) => {
  if (themes.length === 0) {
    return null;
  }

  return (
    <div className={"mt-40 flex flex-wrap items-center justify-center gap-4"}>
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
    </div>
  );
};

export default CurrentPages;
