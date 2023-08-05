import { FC } from "react";
const JobCard: FC<{
  companyTitle: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  active?: boolean;
  image: string;
}> = ({
  companyTitle,
  role,
  description,
  startDate,
  endDate,
  active,
  image,
}) => {
  return (
    <div
      className={`relative transition-all hover:-translate-y-0.5 ${
        active
          ? "card mb-8 rounded-lg border-2 border-black shadow-custom"
          : "card mb-8 rounded-lg border-2 border-black"
      }`}
    >
      <div className="flex justify-between">
        <div>
          <h2 className="px-5 pt-5 text-3xl font-bold transition-all">
            {companyTitle}
          </h2>
          <div className=" p-5">
            <h2 className="font-bold transition-all">{role}</h2>
            <p className="transition-all">{description}</p>
          </div>
        </div>
        <div
          className={
            "relative mr-5 mt-5 h-[100px] w-[100px] rounded-full border-2 border-black"
          }
        >
          <img
            className={"h-full w-full rounded-full object-cover"}
            src={image}
            alt={"job photo"}
          />
        </div>
      </div>

      <div
        className={`flew-row flex ${
          active
            ? "duration active rounded-b-lg border-t-2 border-black bg-yellow-500 p-5 font-bold"
            : "duration rounded-b-lg border-t-2 border-black p-5 font-bold"
        }`}
      >
        <p className={"transition-all"}>{startDate}</p>
        &nbsp;-&nbsp;
        <p className={"transition-all"}>{endDate}</p>
      </div>
    </div>
  );
};

export default JobCard;
