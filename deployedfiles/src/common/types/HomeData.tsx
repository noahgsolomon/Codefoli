interface SectionDetails {
  headerOne: string;
  order: number;
}

interface Section {
  details: SectionDetails;
  type: string;
}

interface HomeData {
  headerOne: string;
  descriptionOne: string;
  headerTwo: string;
  profileImage: string;
  sections: Section[];
}

export type { HomeData };
