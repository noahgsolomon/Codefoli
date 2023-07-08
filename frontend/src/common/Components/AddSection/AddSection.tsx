import React, { SetStateAction, useState } from "react";
import { SectionType } from "Type/Section.tsx";
import PageType from "Type/Pages.tsx";
import { addSection } from "Components/AddSection/addsectionapi.tsx";
import AnyPageData from "Type/AnyPageData.tsx";

const AddSection: React.FC<{
  sections: SectionType[];
  page: PageType;
  setPageData: React.Dispatch<SetStateAction<AnyPageData>>;
}> = ({ sections, page, setPageData }) => {
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
        <div className="absolute top-full z-10 w-48 rounded border-2 border-black bg-white py-2 shadow-custom transition-all">
          {sections.map((section, index) => (
            <button
              key={index}
              className="text-normal block w-full rounded px-4 py-2 text-gray-900 transition-all hover:underline"
              onClick={async () => {
                const addSectionFetch = await addSection(page, section);
                if (addSectionFetch) {
                  setPageData((prev) => ({
                    ...prev,
                    sections: [
                      ...prev.sections,
                      { type: section, details: addSectionFetch.data },
                    ],
                  }));
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
