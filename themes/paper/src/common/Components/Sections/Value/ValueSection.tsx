import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import PageType from "Type/Pages.tsx";
import { ValueType } from "Type/Section.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import { ValuesData } from "Type/Values.tsx";
import { addRemoveSection } from "Components/Sections/api/sectionapi.tsx";
import ValueCard from "Components/Sections/Value/ValueCard.tsx";
import AddValueCard from "Components/Sections/Value/AddValueCard.tsx";
import { updateText } from "api/updatetext.tsx";

const ValueSection: React.FC<{
  page: PageType;
  details: ValueType;
  setPageData: Dispatch<SetStateAction<AnyPageData>>;
  order: number;
}> = ({ page, details, setPageData, order }) => {
  const [valueSectionHover, setValueSectionHover] = useState<boolean>(false);
  const [removeValueSection, setRemoveValueSection] = useState<boolean>(false);
  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    details.header_one
  );

  const [descriptionOneEdit, setDescriptionEdit] = useState(false);
  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [descriptionOneEditValue, setDescriptionOneEditValue] = useState(
    details.description_one
  );

  const handleSectionRemove = async () => {
    const remove = await addRemoveSection(page, "VALUE", order, "remove");
    if (remove.status === "OK") {
      setPageData((prev) => {
        const removedSection = prev.sections.find(
          (section) => section.type === "VALUE"
        );
        if (!removedSection) {
          return prev;
        }
        const removedOrder = removedSection.details.page_order;
        const updatedSections = prev.sections
          .filter((section) => section.type !== "VALUE")
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

  const handleHeaderOneSubmit = async () => {
    const updateHeader = await updateText(
      "header_one",
      headerOneEditValue,
      "value_section"
    );
    if (updateHeader.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "VALUE"
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
      "value_section"
    );
    if (updateDescription.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "VALUE"
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

  return (
    <section
      className="relative mb-20 mt-20"
      onMouseEnter={() => setValueSectionHover(true)}
      onMouseLeave={() => setValueSectionHover(false)}
    >
      {removeValueSection && (
        <div
          className={`absolute inset-0 z-10 bg-red-300 opacity-25 transition-all`}
        ></div>
      )}
      <button
        className={`${
          valueSectionHover ? "opacity-100" : "opacity-0"
        } absolute right-10 top-0 z-20 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveValueSection(true)}
        onMouseLeave={() => setRemoveValueSection(false)}
        onClick={handleSectionRemove}
      >
        -
      </button>
      <div className="container mx-auto max-w-screen-lg px-5">
        {headerOneEdit ? (
          <textarea
            ref={headerOneTextareaRef}
            value={headerOneEditValue}
            onChange={(e) => setHeaderOneEditValue(e.target.value)}
            onBlur={() => {
              setHeaderOneEditValue(details.header_one);
              setHeaderOneEdit(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleHeaderOneSubmit();
              }
            }}
            className="mb-8 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-center text-3xl font-bold leading-relaxed outline-none focus:outline-none focus:ring-0"
            autoFocus
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "";
              target.style.height = `${target.scrollHeight}px`;
            }}
            onFocus={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "";
              target.style.height = `${target.scrollHeight}px`;
              e.currentTarget.select();
            }}
            maxLength={50}
          />
        ) : (
          <h2
            className="mb-8 cursor-pointer select-none text-center text-3xl font-bold transition-all hover:opacity-50"
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleDescriptionOneSubmit();
              }
            }}
            className="mb-8 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-center text-lg font-semibold leading-relaxed outline-none focus:outline-none focus:ring-0"
            autoFocus
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "";
              target.style.height = `${target.scrollHeight}px`;
            }}
            onFocus={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "";
              target.style.height = `${target.scrollHeight}px`;
              e.currentTarget.select();
            }}
            maxLength={250}
          />
        ) : (
          <p
            className="mb-8 cursor-pointer text-center text-lg font-semibold transition-all hover:opacity-50"
            onClick={() => setDescriptionEdit(true)}
          >
            {details.description_one}
          </p>
        )}

        <div className="cards-wrapper flex flex-wrap justify-center gap-5 lg:justify-between">
          {details.values.map((value, index) => (
            <ValueCard
              key={index}
              title={value.value.replaceAll("_", " ")}
              description={ValuesData[value.value].description}
              imageUrl={ValuesData[value.value].image}
              setPageData={setPageData}
              details={details}
            />
          ))}
          {details.values.length < 4 &&
            (() => {
              const cardCount = 4 - details.values.length;
              return (
                <>
                  {Array.from({ length: cardCount }).map((_, i) => (
                    <AddValueCard
                      key={i}
                      setPageData={setPageData}
                      details={details}
                    />
                  ))}
                </>
              );
            })()}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
