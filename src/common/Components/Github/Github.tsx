import { FC, useState } from "react";
import { LOCALSTORAGE_REMOVE_GITHUB_KEY } from "../../../util/constants";

const Github: FC = () => {
  const [isGithubRemoved, setIsGithubRemoved] = useState(
    localStorage.getItem(LOCALSTORAGE_REMOVE_GITHUB_KEY) === "true"
  );
  const [hover, setHover] = useState(false);
  const handleRemoveGithub = () => {
    localStorage.setItem(LOCALSTORAGE_REMOVE_GITHUB_KEY, "true");
    setIsGithubRemoved(true);
  };

  if (isGithubRemoved) return null;

  return (
    <div className="flex w-full items-center justify-between bg-black px-3">
      <div></div>
      <a
        className="relative mb-1 mt-1 text-base text-white transition-all hover:text-opacity-80"
        href={`https://github.com/noahgsolomon/codefoli`}
        target="_blank"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        ⭐ enjoying codefoli? Leave a star{" "}
        <span
          className={`absolute -right-4 text-white transition-all ${
            hover ? "-right-6 text-opacity-80" : ""
          }`}
        >
          →
        </span>
      </a>
      <button onClick={() => handleRemoveGithub()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="fill-white opacity-80 transition-all hover:opacity-100"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Github;
