import React, { SetStateAction, useState } from "react";
import PageType from "Type/Pages.tsx";
import { ValueType } from "Type/Section.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import Card from "Components/Card/Card.tsx";
import { ValuesData } from "Type/Values.tsx";
import { removeSection } from "Components/Sections/api/sectionapi.tsx";

const ValueSection: React.FC<{
  page: PageType;
  details: ValueType;
  setPageData: React.Dispatch<SetStateAction<AnyPageData>>;
  order: number;
}> = ({ page, details, setPageData, order }) => {
  const [valueSectionHover, setValueSectionHover] = useState<boolean>(false);
  const [removeValueSection, setRemoveValueSection] = useState<boolean>(false);

  return (
    <section
      className="services relative mb-20 mt-20"
      onMouseEnter={() => setValueSectionHover(true)}
      onMouseLeave={() => setValueSectionHover(false)}
    >
      {removeValueSection && (
        <div
          className={` absolute right-0 top-0 h-full w-full bg-red-300 opacity-25 transition-all`}
        ></div>
      )}
      <button
        className={`${
          valueSectionHover ? "opacity-100" : "opacity-0"
        } absolute right-10 top-0 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveValueSection(true)}
        onMouseLeave={() => setRemoveValueSection(false)}
        onClick={async () => {
          const remove = await removeSection(page, "VALUE", order);
          if (remove) {
            setPageData((prev) => {
              const removedSection = prev.sections.find((section) => section.type === "VALUE");
              if (!removedSection) {
                return prev;
              }
              const removedOrder = removedSection.details.order;
              const updatedSections = prev.sections
                  .filter((section) => section.type !== "VALUE")
                  .map((section) => {
                    if (section.details.order > removedOrder) {
                      return { ...section, details: { ...section.details, order: section.details.order - 1 } };
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
      <div className="container mx-auto max-w-screen-lg px-5">
        <h2 className="mb-8 text-center text-3xl font-bold">
          {details.headerOne}
        </h2>
        <p className="desciption mb-8 text-center text-lg font-semibold">
          {details.descriptionOne}
        </p>
        <div className="cards-wrapper flex flex-wrap justify-center gap-5 lg:justify-between">
          {details.values.map((value, index) => (
            <Card
              key={index}
              title={value.value.replaceAll("_", " ")}
              description={ValuesData[value.value].description}
              imageUrl={ValuesData[value.value].image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
