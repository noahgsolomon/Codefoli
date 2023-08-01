import Project from "Type/Project.tsx";
import { Skills } from "Type/Skills.tsx";
import Work from "Type/Work.tsx";
import { Services } from "Type/Services.tsx";

type UserData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  profession: string;
  projects: Project[];
  services: Services[];
  skills: Skills[];
  work: Work[];
  role: "NEWBIE" | "USER" | "ADMIN";
  about: string;
  slugs: {
    slug: string;
    header: string;
    description: string;
    about: string;
    image: string;
    overview: string;
    platforms: string;
  }[];
};

export default UserData;
