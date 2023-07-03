type StoryType = {
    headerOne: string,
    descriptionOne: string,
    bracketOne: string,
    bracketTwo: string,
    bracketThree: string,
    imageOne: string
}

type ValueType = {
    headerOne: string,
    descriptionOne: string,
}

type ResumeType = {
    headerOne: string,
}

type SkillType = {
    headerOne: string,
}

type FAQType = {
    headerOne: string,
    descriptionOne: string,
}

type SectionDetails = StoryType | ResumeType | SkillType | FAQType | ValueType;
type SectionType = 'STORY' | 'RESUME' | 'SKILL' | 'FAQ' | 'VALUE';

type Section = {
    type: SectionType,
    details: SectionDetails
};

export type {
    Section,
    StoryType,
    ResumeType,
    SkillType,
    FAQType,
    ValueType
}