import React, { SetStateAction, useState } from "react";
import { SectionType } from "Type/Section.tsx";
import PageType from "Type/Pages.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import { addRemoveSection } from "Components/Sections/api/sectionapi.tsx";

const AddSection: React.FC<{
  sections: SectionType[];
  page: PageType;
  setPageData: React.Dispatch<SetStateAction<AnyPageData>>;
  order: number;
}> = ({ sections, page, setPageData, order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`${sections.length == 0 ? "hidden" : ""} ${
        hover || isOpen ? "opacity-100" : "opacity-10"
      } relative flex w-full items-center justify-center py-10 transition-all`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="w-full bg-black py-0.5"></div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-green-500 transition-all hover:-translate-y-0.5 hover:shadow-custom"
      >
        <span className="text-lg font-bold text-white">+</span>
      </button>
      {isOpen && (
        <div className="absolute top-full z-10 w-48 rounded border-2 border-black bg-white dark:bg-[#1a1a1a] py-2 shadow-custom transition-all">
          {sections.map((section, index) => (
            <button
              key={index}
              className="text-normal block w-full rounded px-4 py-2 transition-all hover:underline"
              onClick={async () => {
                const addSectionFetch = await addRemoveSection(
                  page,
                  section,
                  order,
                  "add"
                );
                if (addSectionFetch.status === "OK") {
                  setPageData((prev) => {
                    let updatedSections = [...prev.sections];

                    updatedSections = updatedSections.map((sec) => {
                      if (sec.details.page_order >= order) {
                        return {
                          ...sec,
                          details: {
                            ...sec.details,
                            page_order: sec.details.page_order + 1,
                          },
                        };
                      } else {
                        return sec;
                      }
                    });
                    updatedSections.push({
                      type: section,
                      details: addSectionFetch.data,
                    });

                    return {
                      ...prev,
                      sections: updatedSections,
                    };
                  });
                }

                setIsOpen(false);
              }}
            >
              {section}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddSection;
