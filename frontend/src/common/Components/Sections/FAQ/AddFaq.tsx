import { Dispatch, FC, SetStateAction } from "react";
import AnyPageData from "Type/AnyPageData.tsx";
import { changeFaq } from "./faqapi.tsx";
import { FAQType } from "Type/Section.tsx";

const addFaq: FC<{
  setPageData: Dispatch<SetStateAction<AnyPageData>>;
}> = ({ setPageData }) => {
  const handleAddFaq = async () => {
    const addFaqFetch = await changeFaq({
      title: "Question",
      content: "Answer",
      operation: "add",
      type: "faq",
    });
    if (addFaqFetch.status === "OK") {
      setPageData((prev) => {
        const updatedSections = prev.sections.map((section) => {
          if (section.type === "FAQ") {
            return {
              ...section,
              details: {
                ...(section.details as FAQType),
                faq: [...(section.details as FAQType).faq, addFaqFetch.data],
              },
            };
          } else {
            return section;
          }
        });

        return { ...prev, sections: updatedSections };
      });
    }
  };

  return (
    <div
      className="relative mb-5 cursor-pointer rounded-lg border-4 border-dashed border-black opacity-60 transition-all hover:-translate-y-1"
      onClick={async () => await handleAddFaq()}
    >
      <div className={"flex flex-col items-center justify-center"}>
        <h2 className={"text-2xl"}>Add FAQ card</h2>
        <p className={"text-4xl"}>+</p>
      </div>
    </div>
  );
};

export default addFaq;
