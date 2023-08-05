type StoryType = {
  headerOne: string;
  descriptionOne: string;
  bulletOne: string;
  bulletTwo: string;
  bulletThree: string;
  imageOne: string;
  order: number;
};

type ValueType = {
  headerOne: string;
  descriptionOne: string;
  values: {
    value: string;
  }[];
  order: number;
};

type ResumeType = {
  headerOne: string;
  order: number;
};

type SkillType = {
  headerOne: string;
  order: number;
};

type FAQType = {
  headerOne: string;
  descriptionOne: string;
  faq: [
    {
      question: string;
      answer: string;
      id: string;
    }
  ];
  order: number;
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
