import { Dispatch, FC, SetStateAction } from "react";
import { addJob } from "api/userapi.tsx";
import UserData from "Type/UserData.tsx";

const AddJobCard: FC<{
  setUserData: Dispatch<SetStateAction<UserData>>;
  orderId: number;
}> = ({ setUserData, orderId }) => {
  const handleAddJob = async () => {
    const company = "Company...";
    const description = "Description...";
    const position = "Position...";
    const startDate = "June 2021";
    const endDate = "Present";
    const addJobFetch = await addJob(
      company,
      position,
      description,
      startDate,
      endDate,
      orderId
    );
    if (addJobFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        work: [...prev.work, addJobFetch.data],
      }));
    }
  };

  return (
    <div
      className={`relative mb-8 h-64 rounded-lg border-8 border-dashed border-black opacity-50 transition-all hover:-translate-y-0.5`}
    >
      <div
        className={
          "flex h-full w-full flex-col items-center justify-center hover:cursor-pointer"
        }
        onClick={() => handleAddJob()}
      >
        <h2 className={"text-2xl"}>Add job</h2>
        <p className={"text-5xl"}>+</p>
      </div>
    </div>
  );
};

export default AddJobCard;
