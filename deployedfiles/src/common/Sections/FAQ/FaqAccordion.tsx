import { useState, useRef, FC } from "react";

const FaqAccordion: FC<{
  title: string;
  content: string;
}> = ({ title, content }) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("0px");
  const contentElement = useRef(null);

  const HandleOpening = () => {
    setOpened(!isOpened);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px");
  };

  return (
    <div
      onClick={HandleOpening}
      className="relative mb-5 rounded-lg border-2 border-black transition ease-in hover:-translate-y-1 hover:shadow-customHover"
    >
      <div className={" flex cursor-pointer justify-between p-4"}>
        <h4 className=" select-none p-1 font-semibold transition-all">
          {title}
        </h4>
        {isOpened ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            stroke="black"
            strokeWidth="2"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            stroke="black"
            strokeWidth="2"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        )}
      </div>
      <div
        ref={contentElement}
        style={{ height: height }}
        className=" overflow-hidden transition-all duration-200"
      >
        <p className=" p-4 transition-all hover:rounded-full ">{content}</p>
      </div>
    </div>
  );
};

export default FaqAccordion;
