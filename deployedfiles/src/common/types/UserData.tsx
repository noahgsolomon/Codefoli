interface Project {
  name: string;
  description: string;
  languages: string[];
  updatedAt: string;
  image: string;
  id: string;
  slug: string;
}

interface Work {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  orderId: number;
  image: string;
}

interface Slug {
  slug: string;
  header: string;
  description: string;
  about: string;
  image: string;
  overview: string;
  platforms: string;
  link: string;
}

interface UserData {
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  about: string;
  skills: string[];
  projects: Project[];
  work: Work[];
  role: string;
  profession: string;
  services: string[];
  slugs: Slug[];
}

export type { UserData };
