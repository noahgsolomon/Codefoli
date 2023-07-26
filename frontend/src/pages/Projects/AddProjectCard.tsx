import { Dispatch, FC, SetStateAction } from "react";
import UserData from "Type/UserData.tsx";
import { addProject } from "./projectspageapi.tsx";
import EnumSkillToString from "Type/EnumSkillToString.tsx";

const AddProjectCard: FC<{
  setUserData: Dispatch<SetStateAction<UserData>>;
}> = ({ setUserData }) => {
  const handleAddProject = async () => {
    const addProjectFetch = await addProject(
      "Title",
      "Description",
      "JavaScript"
    );
    if (addProjectFetch.status === "OK") {
      const projectData = addProjectFetch.data;
      projectData.language = EnumSkillToString(projectData.language);
      setUserData((prev) => ({
        ...prev,
        projects: [...prev.projects, projectData],
      }));
    }
  };

  return (
    <div
      className="mb-5 flex max-w-[400px] flex-grow cursor-pointer rounded-2xl border-8 border-dashed border-black p-24 opacity-50 transition-all hover:-translate-y-0.5"
      onClick={async () => await handleAddProject()}
    >
      <div className={"flex w-full flex-col items-center justify-center"}>
        <h2 className={"text-3xl"}>Add Project</h2>
        <p className={"text-5xl"}>+</p>
      </div>
      <div className={` h-[400px] overflow-hidden`}></div>
    </div>
  );
};

export default AddProjectCard;
