export const Services = [
  "Web Development",
  "Mobile Development",
  "Desktop Development",
  "Game Development",
  "Machine Learning",
  "Data Science",
  "Artificial Intelligence",
  "Cloud Computing",
  "Cyber Security",
  "DevOps",
  "Quality Assurance",
  "Project Management",
  "Business Analysis",
  "UI/UX Design",
  "Product Management",
  "Technical Support",
  "Technical Writing",
  "SEO Optimization",
  "E-commerce Development",
  "Content Management",
  "Database Administration",
  "Digital Marketing",
  "Graphic Design",
  "AR/VR Development",
  "Network Administration",
  "IT Consultation",
  "Systems Integration",
  "IT Strategy",
  "Hardware Development",
  "Software Training",
  "Blockchain Development",
];
type ServiceDataType = {
  [key: string]: {
    description: string;
    image: string;
  };
};
export const ServiceData: ServiceDataType = {
  WEB_DEVELOPMENT: {
    description: "I offer web development services to create interactive and dynamic websites.",
    image: "https://img.icons8.com/cotton/400/code.png",
  },
  MOBILE_DEVELOPMENT: {
    description: "My mobile development services ensure intuitive and feature-rich mobile applications for iOS and Android platforms.",
    image: "https://img.icons8.com/cotton/400/uber-mobile-app.png",
  },
  DESKTOP_DEVELOPMENT: {
    description: "I specialize in desktop development to build powerful and efficient software applications for various operating systems.",
    image: "https://img.icons8.com/cotton/400/monitor--v1.png",
  },
  GAME_DEVELOPMENT: {
    description: "Get captivating and immersive gaming experiences with my game development services.",
    image: "https://img.icons8.com/cotton/400/visual-game-boy--v1.png",
  },
  E_COMMERCE_DEVELOPMENT: {
    description: "I provide e-commerce development solutions to establish and optimize your online store.",
    image: "https://img.icons8.com/cotton/400/card-security.png",
  },
  AR_VR_DEVELOPMENT: {
    description: "Experience virtual reality (VR) and augmented reality (AR) at its best with my AR/VR development expertise.",
    image: "https://img.icons8.com/cotton/400/augmented-reality-1-1.png",
  },
  BLOCKCHAIN_DEVELOPMENT: {
    description: "Unlock the potential of blockchain technology with my blockchain development services for secure and decentralized applications.",
    image: "https://img.icons8.com/cotton/400/nft-collection.png",
  },
  MACHINE_LEARNING: {
    description: "Harness the power of machine learning to extract insights and patterns from your data.",
    image: "https://img.icons8.com/cotton/400/brain-3.png",
  },
  DATA_SCIENCE: {
    description: "My data science services leverage advanced analytics techniques to unlock the value hidden in your data.",
    image: "https://img.icons8.com/cotton/400/filter--v2.png",
  },
  ARTIFICIAL_INTELLIGENCE: {
    description: "I offer artificial intelligence solutions to create intelligent systems and automate processes.",
    image: "https://img.icons8.com/cotton/400/artificial-intelligence.png",
  },
  CLOUD_COMPUTING: {
    description: "I provide cloud computing services to host and manage your applications and data in the cloud.",
    image: "https://img.icons8.com/cotton/400/cloud-computing.png",
  },
  DEVOPS: {
    description: "Streamline your software development and deployment with my DevOps practices and tools.",
    image: "https://img.icons8.com/cotton/400/developer.png",
  },
  SYSTEMS_INTEGRATION: {
    description: "Integrate multiple systems and applications seamlessly to ensure smooth data flow and interoperability.",
    image: "https://img.icons8.com/cotton/400/virtual-machine2.png",
  },
  CYBER_SECURITY: {
    description: "Protect your digital assets and data from cyber threats with my comprehensive cybersecurity services.",
    image: "https://img.icons8.com/cotton/400/hacking.png",
  },
  NETWORK_ADMINISTRATION: {
    description: "Ensure smooth and secure network operations with my network administration services.",
    image: "https://img.icons8.com/cotton/400/wifi--v3.png",
  },
  PROJECT_MANAGEMENT: {
    description: "Efficiently plan, execute, and manage your projects with my project management expertise.",
    image: "https://img.icons8.com/cotton/400/task-planning.png",
  },
  BUSINESS_ANALYSIS: {
    description: "Gain valuable insights into your business processes and optimize them with my business analysis services.",
    image: "https://img.icons8.com/cotton/400/financial-growth-analysis--v1.png",
  },
  PRODUCT_MANAGEMENT: {
    description: "Optimize your product development lifecycle and strategy with my product management services.",
    image: "https://img.icons8.com/cotton/400/packing.png",
  },
  IT_STRATEGY: {
    description: "Align your IT initiatives with your business goals and drive innovation with my IT strategy services.",
    image: "https://img.icons8.com/cotton/400/settings--v1.png",
  },
  UI_UX_DESIGN: {
    description: "I create intuitive and visually appealing user interfaces (UI) and user experiences (UX) to enhance user engagement.",
    image: "https://img.icons8.com/cotton/400/browser-themes.png",
  },
  GRAPHIC_DESIGN: {
    description: "My graphic design services provide visually striking and professional designs for various purposes.",
    image: "https://img.icons8.com/cotton/400/paint-palette--v1.png",
  },
  TECHNICAL_WRITING: {
    description: "Communicate complex technical concepts effectively with my technical writing services.",
    image: "https://img.icons8.com/cotton/400/memo--v1.png",
  },
  SEO_OPTIMIZATION: {
    description: "Improve your website's visibility and rankings on search engines with my SEO optimization services.",
    image: "https://img.icons8.com/cotton/400/laptop-search.png",
  },
  CONTENT_MANAGEMENT: {
    description: "Efficiently organize, manage, and publish your content with my content management services.",
    image: "https://img.icons8.com/cotton/400/camcorder-pro.png",
  },
  DIGITAL_MARKETING: {
    description: "Boost your online presence and reach your target audience through my comprehensive digital marketing strategies.",
    image: "https://img.icons8.com/cotton/400/rebalance-portfolio.png",
  },
  TECHNICAL_SUPPORT: {
    description: "I provide technical support services to assist you with any IT-related issues and ensure smooth operations.",
    image: "https://img.icons8.com/cotton/400/robot-2.png",
  },
  DATABASE_ADMINISTRATION: {
    description: "Ensure the optimal performance and security of your databases with my database administration services.",
    image: "https://img.icons8.com/cotton/400/database-error.png",
  },
  IT_CONSULTATION: {
    description: "Get expert IT consultation and guidance to align your technology strategy with your business objectives.",
    image: "https://img.icons8.com/cotton/400/survey.png",
  },
  HARDWARE_DEVELOPMENT: {
    description: "I specialize in hardware development to design and build custom hardware solutions tailored to your needs.",
    image: "https://img.icons8.com/cotton/400/computer.png",
  },
  SOFTWARE_TRAINING: {
    description: "Enhance your team's skills and knowledge with my comprehensive software training programs.",
    image: "https://img.icons8.com/cotton/400/outline.png",
  },
  QUALITY_ASSURANCE: {
    description: "Ensure the quality and reliability of your software products through my rigorous quality assurance processes.",
    image: "https://img.icons8.com/cotton/400/000000/apple--v1.png",
  },
};

export type Services = (typeof Services)[number];
