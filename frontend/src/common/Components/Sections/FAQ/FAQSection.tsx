import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import FaqAccordion from "Components/Sections/FAQ/FaqAccordion.tsx";
import { FAQType } from "Type/Section.tsx";
import PageType from "Type/Pages.tsx";
import { removeSection } from "Components/Sections/api/sectionapi.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import {
  updateDescriptionOneFaq,
  updateHeaderOneFaq,
} from "Components/Sections/FAQ/faqapi.tsx";
import AddFaq from "Components/Sections/FAQ/AddFaq.tsx";

const FAQSection: FC<{
  page: PageType;
  details: FAQType;
  setPageData: Dispatch<SetStateAction<AnyPageData>>;
  order: number;
}> = ({ page, details, setPageData, order }) => {
  const [faqHover, setFAQHover] = useState<boolean>(false);
  const [removeFAQ, setRemoveFAQ] = useState<boolean>(false);
  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    details.headerOne
  );
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [descriptionOneEdit, setDescriptionEdit] = useState(false);
  const [descriptionOneEditValue, setDescriptionOneEditValue] = useState(
    details.descriptionOne
  );
  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleHeaderOneSubmit = async () => {
    const updateHeader = await updateHeaderOneFaq(headerOneEditValue);
    if (updateHeader.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "FAQ"
            ? {
                ...section,
                details: { ...section.details, headerOne: headerOneEditValue },
              }
            : section
        ),
      }));
      setHeaderOneEditValue(updateHeader.data);
    }
    setHeaderOneEdit(false);
  };

  const handleDescriptionOneSubmit = async () => {
    const updateDescription = await updateDescriptionOneFaq(
      descriptionOneEditValue
    );
    if (updateDescription.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "FAQ"
            ? {
                ...section,
                details: {
                  ...section.details,
                  descriptionOne: descriptionOneEditValue,
                },
              }
            : section
        ),
      }));
      setDescriptionOneEditValue(updateDescription.data);
    }
    setDescriptionEdit(false);
  };

  const handleRemoveSection = async () => {
    const remove = await removeSection(page, "FAQ", order);
    if (remove) {
      setPageData((prev) => {
        const removedSection = prev.sections.find(
          (section) => section.type === "FAQ"
        );
        if (!removedSection) {
          return prev;
        }
        const removedOrder = removedSection.details.order;
        const updatedSections = prev.sections
          .filter((section) => section.type !== "FAQ")
          .map((section) => {
            if (section.details.order > removedOrder) {
              return {
                ...section,
                details: {
                  ...section.details,
                  order: section.details.order - 1,
                },
              };
            } else {
              return section;
            }
          });

        return {
          ...prev,
          sections: updatedSections,
        };
      });
    }
  };

  return (
    <div className="relative mb-20 mt-20">
      {removeFAQ && (
        <div
          className={` absolute right-0 top-0 h-full w-full bg-red-300 opacity-25 transition-all`}
        ></div>
      )}
      <section
        className="px-5"
        onMouseEnter={() => setFAQHover(true)}
        onMouseLeave={() => setFAQHover(false)}
      >
        <button
          className={`${
            faqHover ? "opacity-100" : "opacity-0"
          } absolute right-10 top-0 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
          onMouseEnter={() => setRemoveFAQ(true)}
          onMouseLeave={() => setRemoveFAQ(false)}
          onClick={async () => handleRemoveSection()}
        >
          -
        </button>
        <div className="header mx-auto mb-5 max-w-[647px]">
          {headerOneEdit ? (
            <textarea
              ref={headerOneTextareaRef}
              value={headerOneEditValue}
              onChange={(e) => setHeaderOneEditValue(e.target.value)}
              onBlur={() => {
                setHeaderOneEditValue(details.headerOne);
                setHeaderOneEdit(false);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  await handleHeaderOneSubmit();
                }
              }}
              className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-center text-2xl font-bold leading-relaxed outline-none focus:outline-none focus:ring-0 md:text-5xl"
              autoFocus
              onFocus={(e) => {
                e.target.select();
              }}
              maxLength={50}
            />
          ) : (
            <h2
              className="cursor-pointer select-none text-center text-2xl font-bold transition-all hover:opacity-50 md:text-5xl"
              onClick={() => setHeaderOneEdit(true)}
            >
              {details.headerOne}
            </h2>
          )}
          {descriptionOneEdit ? (
            <textarea
              ref={descriptionOneTextareaRef}
              value={descriptionOneEditValue}
              onChange={(e) => setDescriptionOneEditValue(e.target.value)}
              onBlur={() => {
                setDescriptionOneEditValue(details.descriptionOne);
                setDescriptionEdit(false);
              }}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  await handleDescriptionOneSubmit();
                }
              }}
              className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-center leading-relaxed outline-none focus:outline-none focus:ring-0"
              autoFocus
              onFocus={(e) => {
                e.target.select();
              }}
              maxLength={250}
              rows={3}
            />
          ) : (
            <p
              className="cursor-pointer text-center transition-all hover:opacity-50"
              onClick={() => setDescriptionEdit(true)}
            >
              {details.descriptionOne}
            </p>
          )}
        </div>
        <div className="accordion-wrapper mx-auto max-w-[800px]">
          {details.faq.map((faq, index) => (
            <FaqAccordion
              key={index}
              title={faq.question}
              content={faq.answer}
              setPageData={setPageData}
              id={faq.id}
            />
          ))}
          {details.faq.length < 8 && <AddFaq setPageData={setPageData} />}
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
