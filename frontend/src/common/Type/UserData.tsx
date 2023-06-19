import Project from "Type/Project.tsx";
import { Skills } from "Type/Skills.tsx";
import Work from "Type/Work.tsx";

type UserData = {
  name: string;
  email: string;
  company: string;
  location: string;
  profession: string;
  projects: Project[];
  skills: Skills[];
  work: Work[];
  role: "NEWBIE" | "USER" | "ADMIN";
  about: string;
};

export default UserData;
