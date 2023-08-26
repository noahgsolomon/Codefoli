import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import FaqAccordion from "Components/Sections/FAQ/FaqAccordion.tsx";
import { FAQType } from "Type/Section.tsx";
import PageType from "Type/Pages.tsx";
import { addRemoveSection } from "Components/Sections/api/sectionapi.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import AddFaq from "Components/Sections/FAQ/AddFaq.tsx";
import { updateText } from "api/updatetext.tsx";

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
    details.header_one
  );
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [descriptionOneEdit, setDescriptionEdit] = useState(false);
  const [descriptionOneEditValue, setDescriptionOneEditValue] = useState(
    details.description_one
  );
  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleHeaderOneSubmit = async () => {
    const updateHeader = await updateText(
      "header_one",
      headerOneEditValue,
      "faq_section"
    );
    if (updateHeader.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "FAQ"
            ? {
                ...section,
                details: { ...section.details, header_one: headerOneEditValue },
              }
            : section
        ),
      }));
    }
    setHeaderOneEdit(false);
  };

  const handleDescriptionOneSubmit = async () => {
    const updateDescription = await updateText(
      "description_one",
      descriptionOneEditValue,
      "faq_section"
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
                  description_one: descriptionOneEditValue,
                },
              }
            : section
        ),
      }));
    }
    setDescriptionEdit(false);
  };

  const handleRemoveSection = async () => {
    const remove = await addRemoveSection(page, "FAQ", order, "remove");
    if (remove.status === "OK") {
      setPageData((prev) => {
        const removedSection = prev.sections.find(
          (section) => section.type === "FAQ"
        );
        if (!removedSection) {
          return prev;
        }
        const removedOrder = removedSection.details.page_order;
        const updatedSections = prev.sections
          .filter((section) => section.type !== "FAQ")
          .map((section) => {
            if (section.details.page_order > removedOrder) {
              return {
                ...section,
                details: {
                  ...section.details,
                  page_order: section.details.page_order - 1,
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
                setHeaderOneEditValue(details.header_one);
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
              {details.header_one}
            </h2>
          )}
          {descriptionOneEdit ? (
            <textarea
              ref={descriptionOneTextareaRef}
              value={descriptionOneEditValue}
              onChange={(e) => setDescriptionOneEditValue(e.target.value)}
              onBlur={() => {
                setDescriptionOneEditValue(details.description_one);
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
              {details.description_one}
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
