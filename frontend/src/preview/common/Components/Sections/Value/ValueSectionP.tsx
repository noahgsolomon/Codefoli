import { FC } from "react";
import { ValueType } from "Type/Section.tsx";
import { ValuesData } from "Type/Values.tsx";
import ValueCardP from "./ValueCardP.tsx";

const ValueSectionP: FC<{
  details: ValueType;
}> = ({ details }) => {
  return (
    <section className="relative mb-20 mt-20">
      <div className="container mx-auto max-w-screen-lg px-5">
        <h2 className="mb-8 text-center text-3xl font-bold transition-all">
          {details.headerOne}
        </h2>
        <p className="mb-8 text-center text-lg font-semibold transition-all">
          {details.descriptionOne}
        </p>
        <div className="cards-wrapper flex flex-wrap justify-center gap-5 lg:justify-between">
          {details.values.map((value, index) => (
            <ValueCardP
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

export default ValueSectionP;
