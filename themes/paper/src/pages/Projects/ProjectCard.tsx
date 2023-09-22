import { Dispatch, FC, SetStateAction, useMemo, useRef, useState } from "react";
import UserData from "Type/UserData.tsx";
import { changeProjects } from "./projectspageapi.tsx";
import { Link } from "react-router-dom";
import { COLORS } from "../../util/colors.ts";
import { handleFileUpload } from "api/uploadimage.tsx";

const ProjectCard: FC<{
  title: string;
  description: string;
  image: string;
  setUserData: Dispatch<SetStateAction<UserData>>;
  id: string;
  languages: string[];
  slug: string;
  setProjectError: Dispatch<
    SetStateAction<{ visible: boolean; message: string }>
  >;
}> = ({
  title,
  description,
  image,
  setUserData,
  languages,
  id,
  slug,
  setProjectError,
}) => {
  const [hovered, setHovered] = useState(false);
  const [removeHover, setRemoveHover] = useState(false);
  const imageFileInput = useRef<HTMLInputElement | null>(null);
  const [imageEdit, setImageEdit] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [titleEditValue, setTitleEditValue] = useState(title);
  const [titleEdit, setTitleEdit] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [descriptionEditValue, setDescriptionEditValue] = useState(description);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const descriptionTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const titleTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const date = useMemo(() => Date.now(), []);
  const [languageHover, setLanguageHover] = useState(-1);
  const [addProjectLanguageState, setAddProjectLanguageState] = useState(false);
  const [languageAddValue, setLanguageAddValue] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [cacheBuster, setCacheBuster] = useState("");
  const handleRemoveProject = async () => {
    const removeProjectFetch = await changeProjects({
      id: id,
      operation: "remove",
      type: "project",
    });
    if (removeProjectFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        projects: prev.projects.filter((project) => project.id !== id),
        slugs: prev.slugs.filter((slugs) => slugs.slug !== slug),
      }));
    }
  };

  const handleTitleSubmit = async () => {
    if (titleEditValue.length < 1) {
      setTitleEdit(false);
      setTitleEditValue(titleValue);
      return;
    }
    const updateTitleFetch = await changeProjects({
      text: titleEditValue,
      id: id,
      type: "title",
    });
    console.log(updateTitleFetch);
    if (updateTitleFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        slugs: prev.slugs.map((slugObj) =>
          slugObj.slug === slug
            ? { ...slugObj, slug: updateTitleFetch.data }
            : slugObj
        ),
        projects: prev.projects.map((project) =>
          project.id === id
            ? { ...project, name: titleEditValue, slug: updateTitleFetch.data }
            : project
        ),
      }));
      setTitleValue(titleEditValue);
      setTitleEdit(false);
    } else if (updateTitleFetch.status === "ERROR") {
      setTitleEdit(false);
      setTitleEditValue(titleValue);
      setProjectError({ message: updateTitleFetch.message, visible: true });
      setTimeout(() => setProjectError({ visible: false, message: "" }), 3000);
    }
  };

  const handleDescriptionSubmit = async () => {
    if (descriptionEditValue.length < 1) {
      setDescriptionEdit(false);
      setDescriptionEditValue(descriptionValue);
      return;
    }
    const updateDescriptionFetch = await changeProjects({
      text: descriptionEditValue,
      id: id,
      type: "description",
    });
    if (updateDescriptionFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        projects: prev.projects.map((project) =>
          project.id === id
            ? { ...project, description: descriptionEditValue }
            : project
        ),
      }));
      setDescriptionValue(descriptionEditValue);
      setDescriptionEdit(false);
    }
  };

  const handleRemoveLanguage = async (language: string) => {
    const updateLanguageFetch = await changeProjects({
      operation: "remove",
      language: language,
      type: "language",
      id: id,
    });
    if (updateLanguageFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        projects: prev.projects.map((project) =>
          project.id === id
            ? {
                ...project,
                languages: project.languages.filter(
                  (lang) => lang !== language
                ),
              }
            : project
        ),
      }));
    }
  };

  const handleAddLanguage = async (language: string) => {
    if (
      languages.some((lang) => language.toLowerCase() === lang.toLowerCase())
    ) {
      setLanguageAddValue("");
      setAddProjectLanguageState(false);
      return;
    }
    const updateLanguageFetch = await changeProjects({
      operation: "add",
      language: language,
      type: "language",
      id: id,
    });
    if (updateLanguageFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        projects: prev.projects.map((project) =>
          project.id === id
            ? { ...project, languages: [...project.languages, language] }
            : project
        ),
      }));
      setLanguageAddValue("");
      setAddProjectLanguageState(false);
    }
  };

  return (
    <div
      className="relative mb-5 flex max-w-[400px] cursor-pointer flex-col rounded-xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
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
        onClick={async () => {
          await handleRemoveProject();
        }}
      >
        -
      </button>
      <div
        className={`image-wrapper relative h-[400px] overflow-hidden rounded-t-lg transition-all
        ${imageLoading ? "opacity-0" : "opacity-100"}`}
        onMouseEnter={() => setImageEdit(true)}
        onMouseLeave={() => setImageEdit(false)}
        onClick={() => {
          imageFileInput.current && imageFileInput.current.click();
        }}
      >
        <input
          type="file"
          ref={imageFileInput}
          className="hidden"
          accept=".jpg,.png"
          onChange={(e) => {
            handleFileUpload(
              e,
              setImageLoading,
              setUserData,
              "image",
              setProjectError,
              setCacheBuster,
              "projects",
              "projects-image-" + id,
              (prev: any) => {
                const projectToUpdate = prev.projects.find(
                  (project: any) => project.id === id
                );
                if (projectToUpdate) {
                  projectToUpdate.image = (prev as any).image;
                }
                return prev;
              },
              id
            );
          }}
        />
        <img
          src={image + "?date=" + date + "&cache=" + cacheBuster}
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
      <div className="bg-white p-5 dark:bg-[#0d0d0d]">
        {titleEdit ? (
          <textarea
            ref={titleTextareaRef}
            value={titleEditValue}
            onChange={(e) => setTitleEditValue(e.target.value)}
            onBlur={() => {
              setTitleEditValue(titleValue);
              setTitleEdit(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleTitleSubmit();
              }
            }}
            className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-2xl font-bold leading-snug outline-none focus:outline-none focus:ring-0"
            autoFocus
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "";
              target.style.height = `${target.scrollHeight}px`;
            }}
            onFocus={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "";
              target.style.height = `${target.scrollHeight}px`;
              e.currentTarget.select();
            }}
            maxLength={25}
          />
        ) : (
          <h2
            className="mb-5 cursor-pointer select-none text-2xl font-bold leading-snug transition-all hover:opacity-50"
            onClick={() => {
              setTitleEdit(true);
            }}
          >
            {titleValue}
          </h2>
        )}
        {descriptionEdit ? (
          <textarea
            ref={descriptionTextareaRef}
            value={descriptionEditValue}
            onChange={(e) => setDescriptionEditValue(e.target.value)}
            onBlur={() => {
              setDescriptionEditValue(descriptionValue);
              setDescriptionEdit(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleDescriptionSubmit();
              }
            }}
            className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-base leading-snug outline-none focus:outline-none focus:ring-0"
            autoFocus
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "";
              target.style.height = `${target.scrollHeight}px`;
            }}
            onFocus={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "";
              target.style.height = `${target.scrollHeight}px`;
              e.currentTarget.select();
            }}
            maxLength={100}
          />
        ) : (
          <p
            className="cursor-pointer select-none text-base transition-all hover:opacity-50"
            onClick={() => {
              setDescriptionEdit(true);
            }}
          >
            {descriptionValue}
          </p>
        )}
      </div>
      <Link
        to={`/${slug}`}
        className="inline-block bg-white px-5 py-2 text-sm font-bold dark:bg-[#0d0d0d]"
      >
        Learn more{" "}
        <div
          className={`${
            hovered ? "translate-x-1" : ""
          } inline-block transition-all`}
        >
          →
        </div>
      </Link>
      <div className="rounded-b-lg bg-white px-5 py-2 dark:bg-[#0d0d0d]">
        {languages.map((language, index) => (
          <span
            className={`mb-2 mr-2 inline-block cursor-pointer rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${
              languageHover === index
                ? "bg-red-500 line-through"
                : COLORS[index]
            } py-2 text-sm`}
            onMouseEnter={() => setLanguageHover(index)}
            onMouseLeave={() => setLanguageHover(-1)}
            onClick={async () => handleRemoveLanguage(language)}
            key={index}
          >
            {language}
          </span>
        ))}
        {hovered && languages.length < 8 && !addProjectLanguageState && (
          <div
            className={`mb-2 mr-2 inline-block cursor-pointer rounded-lg bg-gray-300 px-3 py-2 text-sm text-white transition-all hover:-translate-y-0.5 hover:bg-green-500`}
            onClick={() => setAddProjectLanguageState(true)}
          >
            +
          </div>
        )}
        {addProjectLanguageState && (
          <input
            type="text"
            className="mb-2 mr-2 inline-block cursor-pointer rounded-lg px-3 py-2 text-sm shadow-custom transition-all hover:-translate-y-0.5 focus:outline-none dark:bg-[#1a1a1a]"
            value={languageAddValue}
            onChange={(e) => setLanguageAddValue(e.target.value)}
            onBlur={() => {
              setAddProjectLanguageState(false);
              setLanguageAddValue("");
            }}
            autoFocus
            onFocus={(e) => e.currentTarget.select()}
            maxLength={25}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                await handleAddLanguage(languageAddValue);
                setLanguageAddValue("");
              }
            }}
          />
        )}
      </div>
      <div className=" flex-grow rounded-b-lg bg-white dark:bg-[#0d0d0d]"></div>
    </div>
  );
};

export default ProjectCard;
