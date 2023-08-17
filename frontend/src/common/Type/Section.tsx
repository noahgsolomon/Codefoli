import { ValuesFormatted } from "Type/Values.tsx";

type StoryType = {
  header_one: string;
  description_one: string;
  bullet_one: string;
  bullet_two: string;
  bullet_three: string;
  image_one: string;
  page_order: number;
};

type ValueType = {
  header_one: string;
  description_one: string;
  values: {
    value: ValuesFormatted;
  }[];
  page_order: number;
};

type ResumeType = {
  header_one: string;
  page_order: number;
};

type SkillType = {
  header_one: string;
  page_order: number;
};

type FAQType = {
  header_one: string;
  description_one: string;
  faq: [
    {
      question: string;
      answer: string;
      id: string;
    }
  ];
  page_order: number;
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
