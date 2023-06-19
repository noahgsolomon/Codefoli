import React from "react";

const SkillCard: React.FC<{ skill: string }> = ({ skill }) => {
  return (
    <div className="skill-card">
      <p>{skill}</p>
    </div>
  );
};

export default SkillCard;
