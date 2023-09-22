import { Dispatch, FC, SetStateAction } from "react";
import UserData from "Type/UserData.tsx";
import { changeProjects } from "./projectspageapi.tsx";
const AddProjectCard: FC<{
  setUserData: Dispatch<SetStateAction<UserData>>;
  setProjectError: Dispatch<
    SetStateAction<{ visible: boolean; message: string }>
  >;
}> = ({ setUserData, setProjectError }) => {
  const handleAddProject = async () => {
    const addProjectFetch = await changeProjects({
      title: "Title",
      description: "Description",
      language: "JavaScript",
      operation: "add",
      type: "project",
    });

    console.log(addProjectFetch.status);
    if (addProjectFetch.status === "OK") {
      const projectData = addProjectFetch.data;
      setUserData((prev) => ({
        ...prev,
        projects: [...prev.projects, projectData.project],
        slugs: [...prev.slugs, projectData.slug],
      }));
    } else if (addProjectFetch.status === "ERROR") {
      setProjectError({ visible: true, message: addProjectFetch.message });
      setTimeout(() => setProjectError({ visible: false, message: "" }), 3000);
    }
  };

  return (
    <div
      className="mb-5 flex max-w-[400px] flex-grow cursor-pointer rounded-2xl border-8 border-dashed border-black p-24 opacity-50 transition-all hover:-translate-y-0.5"
      onClick={handleAddProject}
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
