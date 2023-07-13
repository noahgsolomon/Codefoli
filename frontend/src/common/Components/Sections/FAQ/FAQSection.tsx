import React, { useState } from "react";
import Accordion from "Components/Accordion/Accordion.tsx";
import { FAQType } from "Type/Section.tsx";
import PageType from "Type/Pages.tsx";
import { removeSection } from "Components/Sections/api/sectionapi.tsx";
import AnyPageData from "Type/AnyPageData.tsx";

const FAQSection: React.FC<{
  page: PageType;
  details: FAQType;
  setPageData: React.Dispatch<React.SetStateAction<AnyPageData>>;
  order: number;
}> = ({ page, details, setPageData, order }) => {
  const [faqHover, setFAQHover] = useState<boolean>(false);
  const [removeFAQ, setRemoveFAQ] = useState<boolean>(false);

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
          onClick={async () => {
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
          }}
        >
          -
        </button>
        <div className="header mx-auto mb-5 max-w-[647px]">
          <h2 className="text-center text-2xl font-bold md:text-5xl">
            {details.headerOne}
          </h2>
          <p className="text-center">{details.descriptionOne}</p>
        </div>
        <div className="accordion-wrapper mx-auto max-w-[800px]">
          {details.faq.map((faq, index) => (
            <Accordion key={index} title={faq.question} content={faq.answer} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
