import { FC } from "react";
import { FAQType } from "../../types/Section.tsx";
import FaqAccordion from "./FaqAccordion.tsx";

const FAQSection: FC<{
  details: FAQType;
}> = ({ details }) => {
  return (
    <div className="relative mb-20 mt-20">
      <section className="px-5">
        <div className="header mx-auto mb-5 max-w-[647px]">
          <h2 className=" text-center text-2xl font-bold transition-all md:text-5xl">
            {details.headerOne}
          </h2>
          <p className=" text-center transition-all">
            {details.descriptionOne}
          </p>
        </div>
        <div className=" mx-auto max-w-[800px]">
          {details.faq.map((faq, index) => (
            <FaqAccordion
              key={index}
              title={faq.question}
              content={faq.answer}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQSection;
