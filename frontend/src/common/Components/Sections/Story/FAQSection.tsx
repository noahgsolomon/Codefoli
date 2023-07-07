import React from "react";
import Accordion from "Components/Accordion/Accordion.tsx";
import {FAQType} from "Type/Section.tsx";
import PageType from "Type/Pages.tsx";

const FAQSection: React.FC<{
    page: PageType
    details: FAQType
}>= ({page, details}) => {
    console.log(page);
    return (
        <section className="px-5">
            <div className="header mx-auto mb-5 max-w-[647px]">
                <h2 className="text-center text-2xl font-bold md:text-5xl">
                    {details.headerOne}
                </h2>
                <p className="text-center">{details.descriptionOne}</p>
            </div>
            <div className="accordion-wrapper mx-auto max-w-[800px]">
                {details.faq.map((faq, index) => (
                    <Accordion
                        key={index}
                        title={faq.question}
                        content={faq.answer}
                    />
                ))}
            </div>
        </section>
    )
}

export default FAQSection;