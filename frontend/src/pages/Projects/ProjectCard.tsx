import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import UserData from "Type/UserData.tsx";
import { removeProject } from "./projectspageapi.tsx";
import Project from "Type/Project.tsx";

const ProjectCard: FC<{
  title: string;
  description: string;
  image: string;
  setUserData: Dispatch<SetStateAction<UserData>>;
  children?: ReactNode;
  id: string;
}> = ({ title, description, image, setUserData, children, id }) => {
  const [hovered, setHovered] = useState(false);
  const [removeHover, setRemoveHover] = useState(false);
  const imageFileInput = useRef<HTMLInputElement | null>(null);
  const [imageEdit, setImageEdit] = useState(false);
  const date = useMemo(() => Date.now(), []);
  const handleRemoveProject = async () => {
    const removeProjectFetch = await removeProject(id);
    if (removeProjectFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        projects: prev.projects.filter((project) => project.id !== id),
      }));
    }
  };

  const handleFileUpload = async (
    path: string,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    imageKey: keyof Project,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    setEdit(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    try {
      const response = await fetch(`http://localhost:8080/${path}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (data.status !== "OK") {
        setEdit(false);
        return;
      }

      setUserData((prev) => ({
        ...prev,
        projects: prev.projects.map((project) =>
          project.id === id
            ? { ...project, [imageKey]: data.data.url + `?date=${new Date()}` }
            : project
        ),
      }));
      setTimeout(() => setEdit(false), 500);
    } catch (error) {
      setEdit(false);
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <div
      className="relative mb-5 flex max-w-[400px] cursor-pointer flex-col rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute inset-0 z-10 bg-red-500 ${
          removeHover ? "opacity-20" : "hidden"
        }`}
      />

      <button
        className={`${
          hovered ? "opacity-100" : "hidden"
        } absolute -right-3 -top-3 z-20 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveHover(true)}
        onMouseLeave={() => setRemoveHover(false)}
        onClick={async () => await handleRemoveProject()}
      >
        -
      </button>
      <div
        className={`image-wrapper relative h-[400px] overflow-hidden rounded-t-lg transition-all`}
        onMouseEnter={() => setImageEdit(true)}
        onMouseLeave={() => setImageEdit(false)}
        onClick={() => imageFileInput.current && imageFileInput.current.click()}
      >
        <input
          type="file"
          ref={imageFileInput}
          className="hidden"
          accept=".jpg,.png"
          onChange={async (e) => {
            await handleFileUpload(
              "project-image-upload?id=" + id,
              setImageEdit,
              "image",
              e
            );
          }}
        />
        <img
          src={image + "?date=" + date}
          alt=""
          className={`inline-block h-full w-full transform object-cover transition-all ease-in-out ${
            hovered ? "scale-105" : ""
          }`}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-t-lg border-8 border-dashed border-black bg-white text-3xl font-bold text-black transition-all ${
            imageEdit ? "opacity-50" : "opacity-0"
          }`}
        >
          click to upload image
        </div>
      </div>
      <div className="content rounded-2xl bg-white p-5">
        <h2 className="title text-2xl font-bold">{title}</h2>
        <p className="description text-base">{description}</p>
      </div>
      {children}
      <div className="flex-grow rounded-2xl bg-white"></div>
    </div>
  );
};

export default ProjectCard;
