import LinkIcon from "assets/icons/arrow-up-right.svg";
import Footer from "Components/Footer/Footer";
import { COLORS } from "../../util/colors.ts";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserData from "Type/UserData.tsx";
import {
  updateProjectAbout,
  updateProjectDescription,
  updateProjectHeader,
} from "./projectapi.tsx";
import {
  addProjectLanguage,
  removeProjectLanguage,
} from "../Projects/projectspageapi.tsx";

const Project: FC<{
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}> = ({ userData, setUserData }) => {
  const { slug } = useParams<{ slug: string }>();

  const navigate = useNavigate();

  const [projectDetails, setProjectDetails] = useState(
    userData.slugs.find((s) => s.slug === slug)
  );
  const [projectData, setProjectData] = useState(
    userData.projects.find((p) => p.slug === slug)
  );
  const [headerEdit, setHeaderEdit] = useState(false);
  const [headerEditValue, setHeaderEditValue] = useState(
    projectDetails?.header || ""
  );
  const headerTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [languageHover, setLanguageHover] = useState(-1);
  const [addProjectLanguageState, setAddProjectLanguageState] = useState(false);
  const [languageAddValue, setLanguageAddValue] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [descriptionEditValue, setDescriptionEditValue] = useState(
    projectDetails?.description || ""
  );
  const descriptionTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [aboutEdit, setAboutEdit] = useState(false);
  const [aboutEditValue, setAboutEditValue] = useState(
    projectDetails?.about || ""
  );
  const aboutTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  if (!projectDetails || !slug || !projectData) {
    navigate("/404");
    return null;
  }

  const handleHeaderSubmit = async () => {
    const updateHeader = await updateProjectHeader(slug, headerEditValue);
    if (updateHeader) {
      const updatedSlugs = userData.slugs.map((s) =>
        s.slug === slug ? { ...s, header: headerEditValue } : s
      );

      setUserData((prev) => ({
        ...prev,
        slugs: updatedSlugs,
      }));

      setProjectDetails(updatedSlugs.find((s) => s.slug === slug));
    }
    setHeaderEdit(false);
  };

  const handleAddLanguage = async (language: string) => {
    if (
      projectData.languages.some(
        (lang) => language.toLowerCase() === lang.toLowerCase()
      )
    ) {
      setLanguageAddValue("");
      setAddProjectLanguageState(false);
      return;
    }
    const updateLanguages = await addProjectLanguage(projectData.id, language);
    if (updateLanguages) {
      const updatedProjects = userData.projects.map((p) =>
        p.slug === slug
          ? { ...p, languages: [...p.languages, updateLanguages.data] }
          : p
      );

      setUserData((prev) => ({
        ...prev,
        projects: updatedProjects,
      }));

      setProjectData(updatedProjects.find((p) => p.slug === slug));
      setLanguageAddValue("");
      setAddProjectLanguageState(false);
    }
  };

  const handleRemoveLanguage = async (language: string) => {
    const updateLanguages = await removeProjectLanguage(
      projectData.id,
      language
    );
    if (updateLanguages.status === "OK") {
      const updatedProjects = userData.projects.map((p) =>
        p.slug === slug
          ? { ...p, languages: p.languages.filter((l) => l !== language) }
          : p
      );

      setUserData((prev) => ({
        ...prev,
        projects: updatedProjects,
      }));
      setProjectData(updatedProjects.find((p) => p.slug === slug));
    }
  };

  const handleDescriptionSubmit = async () => {
    const updateDescription = await updateProjectDescription(
      slug,
      descriptionEditValue
    );
    if (updateDescription) {
      const updatedSlugs = userData.slugs.map((s) =>
        s.slug === slug ? { ...s, description: descriptionEditValue } : s
      );

      setUserData((prev) => ({
        ...prev,
        slugs: updatedSlugs,
      }));

      setProjectDetails(updatedSlugs.find((s) => s.slug === slug));
    }
    setDescriptionEdit(false);
  };

  const handleAboutSubmit = async () => {
    const updateAbout = await updateProjectAbout(slug, aboutEditValue);
    if (updateAbout) {
      const updatedSlugs = userData.slugs.map((s) =>
        s.slug === slug ? { ...s, about: aboutEditValue } : s
      );

      setUserData((prev) => ({
        ...prev,
        slugs: updatedSlugs,
      }));

      setProjectDetails(updatedSlugs.find((s) => s.slug === slug));
    }
    setAboutEdit(false);
  };

  return (
    <>
      <main>
        <div className="container mx-auto my-20 max-w-screen-lg px-5">
          <section className="hero mb-8">
            {headerEdit ? (
              <textarea
                ref={headerTextareaRef}
                value={headerEditValue}
                onChange={(e) => setHeaderEditValue(e.target.value)}
                onBlur={() => {
                  setHeaderEditValue(projectDetails.header);
                  setHeaderEdit(false);
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    await handleHeaderSubmit();
                  }
                }}
                className="m-0 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-center text-4xl font-bold leading-snug outline-none focus:outline-none focus:ring-0"
                autoFocus
                onFocus={(e) => {
                  e.target.select();
                }}
                maxLength={25}
              />
            ) : (
              <h1
                className="mb-5 cursor-pointer select-none text-center text-4xl font-bold leading-snug transition-all hover:opacity-50"
                onClick={() => {
                  setHeaderEdit(true);
                }}
              >
                {projectDetails.header}
              </h1>
            )}
            {aboutEdit ? (
              <textarea
                ref={aboutTextareaRef}
                value={aboutEditValue}
                onChange={(e) => setAboutEditValue(e.target.value)}
                onBlur={() => {
                  setAboutEditValue(projectDetails.about);
                  setAboutEdit(false);
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    await handleAboutSubmit();
                  }
                }}
                className="m-0 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-center text-lg font-semibold leading-loose outline-none focus:outline-none focus:ring-0"
                autoFocus
                onFocus={(e) => e.currentTarget.select()}
                maxLength={500}
                rows={4}
              />
            ) : (
              <p
                className="mb-5 cursor-pointer select-none text-center font-semibold transition-all hover:opacity-50"
                onClick={() => setAboutEdit(true)}
              >
                {projectDetails.about}
              </p>
            )}
            <div className="image-wrapper overflow-hidden rounded-lg border-2 border-black bg-white p-2 shadow-custom lg:h-[600px]">
              <img
                src={projectDetails.image}
                alt=""
                className="block h-full w-full rounded-lg object-cover"
              />
            </div>
          </section>
          <section className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-6">
            <div className="content-wrapper lg:col-span-4">
              <h2 className="text-3xl font-bold">{projectDetails.overview}</h2>
              {descriptionEdit ? (
                <textarea
                  ref={descriptionTextareaRef}
                  value={descriptionEditValue}
                  onChange={(e) => setDescriptionEditValue(e.target.value)}
                  onBlur={() => {
                    setDescriptionEditValue(projectDetails.description);
                    setDescriptionEdit(false);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleDescriptionSubmit();
                    }
                  }}
                  className="m-0 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-lg font-semibold leading-loose outline-none focus:outline-none focus:ring-0"
                  autoFocus
                  onFocus={(e) => e.currentTarget.select()}
                  maxLength={2000}
                  rows={15}
                />
              ) : (
                <p
                  className="mb-2 cursor-pointer select-none font-semibold transition-all hover:opacity-50"
                  onClick={() => setDescriptionEdit(true)}
                >
                  {projectDetails.description}
                </p>
              )}
            </div>
            <div className="card grid gap-2 rounded-lg border-2 border-black bg-white p-2 shadow-custom lg:col-span-2">
              <h2 className="text-2xl font-bold">Information</h2>
              <ul className="list-disc pl-5">
                <div className="li-wrapper">
                  <li className="font-bold">Platform</li>
                  <p className="font-normal">{projectDetails.platforms}</p>
                </div>
                <div className="li-wrapper">
                  <li className="font-bold">Tech Stack</li>
                  {projectData &&
                    projectData.languages.map((language, index) => (
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
                  {projectData &&
                    projectData.languages.length < 8 &&
                    !addProjectLanguageState && (
                      <div
                        className={`mb-2 mr-2 inline-block cursor-pointer rounded-lg bg-gray-300 px-3 py-2 text-sm text-white transition-all hover:-translate-y-0.5`}
                        onClick={() => setAddProjectLanguageState(true)}
                      >
                        +
                      </div>
                    )}
                  {addProjectLanguageState && (
                    <input
                      type="text"
                      className="mb-2 mr-2 inline-block cursor-pointer rounded-lg px-3 py-2 text-sm shadow-custom transition-all hover:-translate-y-0.5 focus:outline-none"
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
              </ul>
              <a
                href="#"
                className="inline-block w-full self-end justify-self-end rounded-lg bg-black px-5 py-2 text-center text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500"
              >
                View Online{" "}
                <img
                  src={LinkIcon}
                  alt=""
                  className="inline-block -translate-y-1"
                />
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Project;
