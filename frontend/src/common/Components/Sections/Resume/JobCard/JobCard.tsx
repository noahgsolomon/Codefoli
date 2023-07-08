import React from "react";

type Props = {
  companyTitle: string;
  role: string;
  description: string;
  duration: string;
  active?: boolean;
};

const JobCard: React.FC<Props> = ({
  companyTitle,
  role,
  description,
  duration,
  active,
}) => {
  const durationClassName = active
    ? "duration active bg-yellow-500 border-t-2 border-black p-5 rounded-b-lg font-bold"
    : "duration border-t-2 border-black p-5 rounded-b-lg font-bold";
  const cardClass = active
    ? "card border border-2 shadow-custom rounded-lg border-black mb-8"
    : "card border border-2 rounded-lg border-black mb-8";
  return (
    <div className={cardClass}>
      <h2 className="px-5 pt-5 text-3xl font-bold">{companyTitle}</h2>
      <div className="about p-5">
        <h2 className="font-bold">{role}</h2>
        <p>{description}</p>
      </div>
      <div className={durationClassName}>{duration}</div>
    </div>
  );
};

export default JobCard;
