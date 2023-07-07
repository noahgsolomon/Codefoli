import { ValuesFormatted } from "Type/Values.tsx";

type StoryType = {
  headerOne: string;
  descriptionOne: string;
  bulletOne: string;
  bulletTwo: string;
  bulletThree: string;
  imageOne: string;
};

type ValueType = {
  headerOne: string;
  descriptionOne: string;
  values: [
    {
      value: ValuesFormatted;
    }
  ];
};

type ResumeType = {
  headerOne: string;
};

type SkillType = {
  headerOne: string;
};

type FAQType = {
  headerOne: string;
  descriptionOne: string;
  faq: [
    {
      question: string;
      answer: string;
    }
  ];
};

type SectionDetails = StoryType | ResumeType | SkillType | FAQType | ValueType;
type SectionType = "STORY" | "RESUME" | "SKILL" | "FAQ" | "VALUE";

type Section = {
  type: SectionType;
  details: SectionDetails;
};

export type {
  Section,
  StoryType,
  ResumeType,
  SkillType,
  FAQType,
  ValueType,
  SectionType,
};
