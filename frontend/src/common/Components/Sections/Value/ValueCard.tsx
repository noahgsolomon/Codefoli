import { Dispatch, FC, SetStateAction, useState } from "react";
import { ValueType } from "Type/Section.tsx";
import {
  removeValue,
  updateValue,
} from "Components/Sections/Value/valueapi.tsx";
import { ValuesData, ValuesFormatted } from "Type/Values.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
const ValueCard: FC<{
  imageUrl?: string;
  title: string;
  description: string;
  details: ValueType;
  setPageData: Dispatch<SetStateAction<AnyPageData>>;
}> = ({ imageUrl, title, description, setPageData, details }) => {
  const [hovered, setHovered] = useState(false);
  const [removeHover, setRemoveHover] = useState(false);

  const handleRandomizeValue = async () => {
    const currentValues = details.values.map(
      (valueObject) => valueObject.value
    );
    const valueKeys = Object.keys(ValuesData);
    let randomKey = valueKeys[Math.floor(Math.random() * valueKeys.length)];
    while (currentValues.includes(randomKey as ValuesFormatted)) {
      randomKey = valueKeys[Math.floor(Math.random() * valueKeys.length)];
    }
    const fetchData = await updateValue(title.replaceAll(" ", "_"), randomKey);
    if (fetchData.status === "OK") {
      setPageData((prev) => {
        const updatedSections = prev.sections.map((section) => {
          if (section.type === "VALUE" && "values" in section.details) {
            const updatedValues = section.details.values.map((valueObject) => {
              if (
                valueObject.value === title.toUpperCase().replaceAll(" ", "_")
              ) {
                return { value: fetchData.data as ValuesFormatted };
              } else {
                return valueObject;
              }
            });
            return {
              ...section,
              details: {
                ...section.details,
                values: updatedValues,
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

  const handleRemoveValue = async () => {
    const removeValueFetch = await removeValue(
      title.replaceAll(" ", "_").toUpperCase()
    );
    if (removeValueFetch.status === "OK") {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.type === "VALUE" && "values" in section.details
            ? {
                ...section,
                details: {
                  ...section.details,
                  values: section.details.values.filter(
                    (value) =>
                      value.value !== title.toUpperCase().replaceAll(" ", "_")
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
      className="card group relative mb-5 flex max-w-[400px] cursor-pointer flex-col rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
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
        onClick={async () => await handleRemoveValue()}
      >
        -
      </button>
      <button
        className={`${
          hovered ? "opacity-100" : "hidden"
        } absolute -right-3 top-12 z-10 rounded-2xl bg-blue-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onClick={async () => await handleRandomizeValue()}
      >
        ↻
      </button>

      {imageUrl && (
        <div className="img-wrapper relative h-[250px] overflow-hidden rounded-t-lg">
          <img
            className={`inline-block h-full w-full transform object-contain transition-all ease-in-out ${
              hovered ? "scale-105" : ""
            }`}
            src={imageUrl}
            alt=""
          />
        </div>
      )}
      <div className="content rounded-2xl bg-white p-5">
        <h2 className="title text-2xl font-bold">{title}</h2>
        <p className="description text-base">{description}</p>
      </div>
      <div className="flex-grow rounded-2xl bg-white"></div>
    </div>
  );
};

export default ValueCard;
