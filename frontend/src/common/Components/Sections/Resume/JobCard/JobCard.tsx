import React, { useState } from "react";
import UserData from "Type/UserData.tsx";
import { removeJob } from "api/userapi.tsx";

const JobCard: React.FC<{
  companyTitle: string;
  role: string;
  description: string;
  duration: string;
  active?: boolean;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  id: string;
}> = ({
  id,
  companyTitle,
  role,
  description,
  duration,
  active,
  setUserData,
}) => {
  const [hover, setHover] = useState<boolean>(false);
  const [removeJobHover, setRemoveJobHover] = useState<boolean>(false);

  return (
    <div
      className={`relative transition-all hover:-translate-y-0.5 ${
        active
          ? "card mb-8 rounded-lg border-2 border-black shadow-custom"
          : "card mb-8 rounded-lg border-2 border-black"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {removeJobHover && (
        <div
          className={`absolute inset-0 z-10 bg-red-300 opacity-25 transition-all`}
        ></div>
      )}
      <button
        className={`${
          hover ? "opacity-100" : "hidden"
        } absolute -right-3 -top-3 z-20 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveJobHover(true)}
        onMouseLeave={() => setRemoveJobHover(false)}
        onClick={async () => {
          const removeJobFetch = await removeJob(id);
          if (removeJobFetch.status === "OK") {
            setUserData((prev) => ({
              ...prev,
              work: prev.work.filter((prevWork) => prevWork.id !== id),
            }));
          }
        }}
      >
        -
      </button>
      <h2 className="px-5 pt-5 text-3xl font-bold">{companyTitle}</h2>
      <div className="about p-5">
        <h2 className="font-bold">{role}</h2>
        <p>{description}</p>
      </div>
      <div
        className={`${
          active
            ? "duration active rounded-b-lg border-t-2 border-black bg-yellow-500 p-5 font-bold"
            : "duration rounded-b-lg border-t-2 border-black p-5 font-bold"
        }`}
      >
        {duration}
      </div>
    </div>
  );
};

export default JobCard;
