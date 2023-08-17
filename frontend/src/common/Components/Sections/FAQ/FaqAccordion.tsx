import { useState, useRef, FC, SetStateAction, Dispatch } from "react";
import {
  changeFaq
} from "Components/Sections/FAQ/faqapi.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import { FAQType } from "Type/Section.tsx";

type AccordionProps = {
  title: string;
  content: string;
  id: string;
  setPageData: Dispatch<SetStateAction<AnyPageData>>;
};
const FaqAccordion: FC<AccordionProps> = ({
  title,
  content,
  id,
  setPageData,
}) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("0px");
  const contentElement = useRef(null);
  const [titleEdit, setTitleEdit] = useState<boolean>(false);
  const [titleEditValue, setTitleEditValue] = useState<string>(title);
  const titleTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [contentEdit, setContentEdit] = useState<boolean>(false);
  const [contentEditValue, setContentEditValue] = useState<string>(content);
  const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const [removeHover, setRemoveHover] = useState<boolean>(false);

  const HandleOpening = () => {
    if (titleEdit) return;
    setOpened(!isOpened);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px");
  };

  const handleTitleSubmit = async () => {
    const updateTitle = await changeFaq({id:id, type:'title', text:titleEditValue});
    if (updateTitle.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "FAQ"
            ? {
                ...section,
                details: {
                  ...(section.details as FAQType),
                  faq: (section.details as FAQType).faq.map((faqItem) =>
                    faqItem.id === id
                      ? { ...faqItem, question: titleEditValue }
                      : faqItem
                  ),
                },
              }
            : section
        ),
      }));
    }
    setTitleEdit(false);
  };

  const handleContentSubmit = async () => {
    const updateContent = await changeFaq({id:id, type:'content', text: contentEditValue});
    if (updateContent.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "FAQ"
            ? {
                ...section,
                details: {
                  ...(section.details as FAQType),
                  faq: (section.details as FAQType).faq.map((faqItem) =>
                    faqItem.id === id
                      ? { ...faqItem, answer: contentEditValue }
                      : faqItem
                  ),
                },
              }
            : section
        ),
      }));
    }
    setContentEdit(false);
  };

  const handleRemoveFaq = async () => {
    const removeFaqFetch = await changeFaq({id: id, operation:'remove', type:'faq'});
    if (removeFaqFetch.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "FAQ"
            ? {
                ...section,
                details: {
                  ...(section.details as FAQType),
                  faq: (section.details as FAQType).faq.filter(
                    (faqItem) => faqItem.id !== id
                  ),
                },
              }
            : section
        ),
      }));
    }
  };

  return (
    <div
      onClick={HandleOpening}
      className="relative mb-5 rounded-lg border-2 border-black transition ease-in hover:-translate-y-1 hover:shadow-customHover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute inset-0 z-10 bg-red-500 ${
          removeHover ? "opacity-20" : "hidden"
        }`}
      />

      <button
        className={`${
          hovered ? "opacity-100" : "hidden"
        } absolute -right-3 -top-3 z-20 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveHover(true)}
        onMouseLeave={() => setRemoveHover(false)}
        onClick={async () => await handleRemoveFaq()}
      >
        -
      </button>

      <div className={" flex cursor-pointer justify-between p-4"}>
        {titleEdit ? (
          <textarea
            ref={titleTextareaRef}
            value={titleEditValue}
            onChange={(e) => setTitleEditValue(e.target.value)}
            onBlur={() => {
              setTitleEditValue(title);
              setTitleEdit(false);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                await handleTitleSubmit();
              }
            }}
            className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-1 text-lg font-semibold leading-relaxed outline-none focus:outline-none focus:ring-0"
            autoFocus
            onFocus={(e) => {
              e.target.select();
            }}
            maxLength={50}
          />
        ) : (
          <h4
            className="cursor-pointer select-none p-1 font-semibold transition-all hover:opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              setTitleEdit(true);
            }}
          >
            {title}
          </h4>
        )}
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
        {contentEdit ? (
          <textarea
            ref={contentTextareaRef}
            value={contentEditValue}
            onChange={(e) => setContentEditValue(e.target.value)}
            onBlur={() => {
              setContentEditValue(content);
              setContentEdit(false);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                await handleContentSubmit();
              }
            }}
            className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-4 text-lg leading-relaxed outline-none focus:outline-none focus:ring-0"
            autoFocus
            onFocus={(e) => {
              e.target.select();
            }}
            maxLength={250}
          />
        ) : (
          <p
            className="cursor-pointer p-4 transition-all hover:rounded-full hover:opacity-50"
            onClick={(e) => {
              e.stopPropagation();
              setContentEdit(true);
            }}
          >
            {content}
          </p>
        )}
      </div>
    </div>
  );
};

export default FaqAccordion;
