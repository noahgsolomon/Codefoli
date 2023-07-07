export const Values = [
  "Integrity",
  "Quality",
  "Growth",
  "Innovation",
  "Hard Work",
  "Transparency",
  "Teamwork",
  "Respect",
  "Trust",
  "Accountability",
  "Passion",
  "Fun",
  "Customer Satisfaction",
  "Social Responsibility",
  "Diversity",
  "Empowerment",
  "Excellence",
  "Creativity",
  "Efficiency",
  "Flexibility",
  "Honesty",
  "Loyalty",
  "Openness",
  "Reliability",
  "Responsiveness",
  "Sustainability",
  "Trustworthiness",
];

export type ValuesFormatted =
  | "INTEGRITY"
  | "QUALITY"
  | "GROWTH"
  | "INNOVATION"
  | "HARD_WORK"
  | "TRANSPARENCY"
  | "TEAMWORK"
  | "RESPECT"
  | "TRUST"
  | "ACCOUNTABILITY"
  | "PASSION"
  | "FUN"
  | "CUSTOMER_SATISFACTION"
  | "SOCIAL_RESPONSIBILITY"
  | "DIVERSITY"
  | "EMPOWERMENT"
  | "EXCELLENCE"
  | "CREATIVITY"
  | "EFFICIENCY"
  | "FLEXIBILITY"
  | "HONESTY"
  | "LOYALTY"
  | "OPENNESS"
  | "RELIABILITY"
  | "RESPONSIVENESS"
  | "SUSTAINABILITY"
  | "TRUSTWORTHINESS";

export const ValuesData: {
  [key: string]: { description: string; image: string };
} = {
  INTEGRITY: {
    description:
      "I believe in honesty and integrity in all my actions. I keep my promises and take responsibility for my actions.",
    image: "https://img.icons8.com/cotton/400/ethics.png",
  },
  QUALITY: {
    description:
      "I strive for excellence in everything I do. I am committed to delivering high-quality services to my clients.",
    image: "https://img.icons8.com/cotton/400/quality.png",
  },
  GROWTH: {
    description:
      "I believe in continuous learning and growth. I am always looking for ways to improve my skills and knowledge.",
    image: "https://img.icons8.com/cotton/400/hand-planting--v1.png",
  },
  INNOVATION: {
    description:
      "I believe in innovation and creativity. I am always looking for new and better ways to solve problems.",
    image: "https://img.icons8.com/cotton/400/gas-industry.png",
  },
  HARD_WORK: {
    description:
      "I believe in hard work and dedication. I am committed to achieving my goals and delivering results.",
    image: "https://img.icons8.com/cotton/400/fast-delivery--v1.png",
  },
  TRANSPARENCY: {
    description:
      "I believe in transparency and openness. I am always honest and upfront with my clients and colleagues.",
    image: "https://img.icons8.com/cotton/400/search-property.png",
  },
  TEAMWORK: {
    description:
      "I believe in teamwork and collaboration. I work well with others and value the contributions of my team members.",
    image: "https://img.icons8.com/cotton/400/teamwork.png",
  },
  RESPECT: {
    description:
      "I believe in respect for others. I treat everyone with dignity and respect, regardless of their position or background.",
    image: "https://img.icons8.com/cotton/400/respect.png",
  },
  TRUST: {
    description:
      "I believe in trust and loyalty. I am trustworthy and loyal to my clients and colleagues.",
    image: "https://img.icons8.com/cotton/400/trust.png",
  },
  ACCOUNTABILITY: {
    description:
      "I believe in accountability and responsibility. I take ownership of my actions and accept responsibility for my mistakes.",
    image: "https://img.icons8.com/cotton/400/accountability.png",
  },
  PASSION: {
    description:
      "I believe in passion and enthusiasm. I am passionate about my work and enthusiastic about my clients’ success.",
    image: "https://img.icons8.com/cotton/400/passion.png",
  },
  FUN: {
    description:
      "I believe in having fun at work. I enjoy what I do and have fun doing it.",
    image: "https://img.icons8.com/cotton/400/fun.png",
  },
  CUSTOMER_SATISFACTION: {
    description:
      "I believe in customer satisfaction. I am committed to providing excellent service to my clients.",
    image: "https://img.icons8.com/cotton/400/customer-satisfaction.png",
  },
  SOCIAL_RESPONSIBILITY: {
    description:
      "I believe in social responsibility. I am committed to making a positive impact on society and the environment.",
    image: "https://img.icons8.com/cotton/400/social-responsibility.png",
  },
  DIVERSITY: {
    description:
      "I believe in diversity and inclusion. I value the contributions of people from different backgrounds and cultures.",
    image: "https://img.icons8.com/cotton/400/diversity.png",
  },
  EMPOWERMENT: {
    description:
      "I believe in empowerment and autonomy. I trust my team members to make decisions and take action without my approval.",
    image: "https://img.icons8.com/cotton/400/empowerment.png",
  },
  EXCELLENCE: {
    description:
      "I believe in excellence and quality. I strive for excellence in everything I do.",
    image: "https://img.icons8.com/cotton/400/excellence.png",
  },
  CREATIVITY: {
    description:
      "I believe in creativity and innovation. I am always looking for new and better ways to solve problems.",
    image: "https://img.icons8.com/cotton/400/creativity.png",
  },
  EFFICIENCY: {
    description:
      "I believe in efficiency and effectiveness. I am always looking for ways to improve my productivity and efficiency.",
    image: "https://img.icons8.com/cotton/400/efficiency.png",
  },
  FLEXIBILITY: {
    description:
      "I believe in flexibility and adaptability. I am willing to change my plans when necessary.",
    image: "https://img.icons8.com/cotton/400/flexibility.png",
  },
  HONESTY: {
    description:
      "I believe in honesty and integrity. I am always honest and upfront with my clients and colleagues.",
    image: "https://img.icons8.com/cotton/400/honesty.png",
  },
  LOYALTY: {
    description:
      "I believe in loyalty and commitment. I am loyal to my clients and colleagues.",
    image: "https://img.icons8.com/cotton/400/loyalty.png",
  },
  OPENNESS: {
    description:
      "I believe in openness and transparency. I am always honest and upfront with my clients and colleagues.",
    image: "https://img.icons8.com/cotton/400/openness.png",
  },
  RELIABILITY: {
    description:
      "I believe in reliability and dependability. I am always on time and do what I say I will do.",
    image: "https://img.icons8.com/cotton/400/reliability.png",
  },
  RESPONSIVENESS: {
    description:
      "I believe in responsiveness and availability. I am always available to my clients and colleagues.",
    image: "https://img.icons8.com/cotton/400/responsiveness.png",
  },
  SUSTAINABILITY: {
    description:
      "I believe in sustainability and environmental responsibility. I am committed to reducing my environmental impact.",
    image: "https://img.icons8.com/cotton/400/sustainability.png",
  },
  TRUSTWORTHINESS: {
    description:
      "I believe in trustworthiness and reliability. I am always on time and do what I say I will do.",
    image: "https://img.icons8.com/cotton/400/trustworthiness.png",
  },
};

export type Values = (typeof Values)[number];
