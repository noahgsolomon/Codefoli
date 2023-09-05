import LinkIcon from "assets/icons/arrow-up-right.svg";
import Footer from "Components/Footer/Footer";
import { COLORS } from "../../util/colors.ts";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserData from "Type/UserData.tsx";
import { changeProject } from "./projectapi.tsx";
import { useSpring, animated } from "react-spring";
import ModeButtons from "Components/ModeButtons/ModeButtons.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import DeploymentBar from "Components/DeploymentBar/DeploymentBar.tsx";
import { changeProjects } from "../Projects/projectspageapi.tsx";
import { handleFileUpload } from "api/uploadimage.tsx";

const Project: FC<{
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  deploying: boolean;
  deployed: { url: string; bool: boolean };
  setDeploying: (deploying: boolean) => void;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
  downloaded: { bool: boolean; message: string };
  setDownloaded: (downloaded: { bool: boolean; message: string }) => void;
}> = ({
  userData,
  setUserData,
  deploying,
  deployed,
  setDeploying,
  setDeployed,
  downloaded,
  setDownloaded,
}) => {
  const { slug } = useParams<{ slug: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  const [cacheBuster, setCacheBuster] = useState("");
  const descriptionTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [aboutEdit, setAboutEdit] = useState(false);
  const [aboutEditValue, setAboutEditValue] = useState(
    projectDetails?.about || ""
  );
  const aboutTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [overviewEdit, setOverviewEdit] = useState(false);
  const [overviewEditValue, setOverviewEditValue] = useState(
    projectDetails?.overview || ""
  );
  const overviewTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [platformsEdit, setPlatformsEdit] = useState(false);
  const [platformsEditValue, setPlatformsEditValue] = useState(
    projectDetails?.platforms || ""
  );
  const platformsTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [imageEdit, setImageEdit] = useState(false);
  const imageFileInput = useRef<HTMLInputElement | null>(null);
  const date = useMemo(() => Date.now(), []);
  const [imageHover, setImageHover] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [showError, setShowError] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: "" });

  const [imageLoading, setImageLoading] = useState(false);

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0, -20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 100,
  });

  const imageAnimation = useSpring({
    from: { transform: "translate3d(-20px, 0, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 300,
  });

  const bottomProjectAnimation = useSpring({
    from: { transform: "translate3d(0, 0, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 400,
  });

  if (!projectDetails || !slug || !projectData) {
    navigate("/404");
    return null;
  }

  const handleHeaderSubmit = async () => {
    const updateHeader = await changeProject({
      text: headerEditValue,
      id: projectData.id,
      type: "header",
    });
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
    const updateLanguages = await changeProjects({
      operation: "add",
      language: language,
      type: "language",
      id: projectData.id,
    });
    if (updateLanguages) {
      const updatedProjects = userData.projects.map((p) =>
        p.slug === slug ? { ...p, languages: [...p.languages, language] } : p
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
    const updateLanguages = await changeProjects({
      operation: "remove",
      language: language,
      type: "language",
      id: projectData.id,
    });
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
    const updateDescription = await changeProject({
      text: descriptionEditValue,
      id: projectData.id,
      type: "description",
    });
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
    const updateAbout = await changeProject({
      text: aboutEditValue,
      id: projectData.id,
      type: "about",
    });
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

  const handleOverviewSubmit = async () => {
    const updateOverview = await changeProject({
      text: overviewEditValue,
      id: projectData.id,
      type: "overview",
    });
    if (updateOverview) {
      const updatedSlugs = userData.slugs.map((s) =>
        s.slug === slug ? { ...s, overview: overviewEditValue } : s
      );

      setUserData((prev) => ({
        ...prev,
        slugs: updatedSlugs,
      }));

      setProjectDetails(updatedSlugs.find((s) => s.slug === slug));
    }
    setOverviewEdit(false);
  };

  const handlePlatformsSubmit = async () => {
    const updatePlatforms = await changeProject({
      text: platformsEditValue,
      id: projectData.id,
      type: "platforms",
    });
    if (updatePlatforms.status === "OK") {
      const updatedSlugs = userData.slugs.map((s) =>
        s.slug === slug ? { ...s, platforms: platformsEditValue } : s
      );

      setUserData((prev) => ({
        ...prev,
        slugs: updatedSlugs,
      }));

      setProjectDetails(updatedSlugs.find((s) => s.slug === slug));
    }
    setPlatformsEdit(false);
  };

  const handleLinkSubmit = async () => {
    const updateLink = await changeProject({
      text: linkValue,
      id: projectData.id,
      type: "link",
    });
    if (updateLink.status === "OK") {
      const updatedSlugs = userData.slugs.map((s) =>
        s.slug === slug ? { ...s, link: linkValue } : s
      );

      setUserData((prev) => ({
        ...prev,
        slugs: prev.slugs.map((s) =>
          s.slug === slug ? { ...s, link: linkValue } : s
        ),
      }));

      setProjectDetails(updatedSlugs.find((s) => s.slug === slug));
    }
  };

  return (
    <>
      <main>
        {showError.visible && (
          <StatusBar message={showError.message} color={"bg-red-400"} />
        )}
        <div className="container mx-auto my-20 max-w-screen-lg px-5">
          <section className="hero mb-8">
            <animated.div style={headerAnimation}>
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
                  maxLength={500}
                />
              ) : (
                <p
                  className="mb-5 cursor-pointer select-none text-center font-semibold transition-all hover:opacity-50"
                  onClick={() => setAboutEdit(true)}
                >
                  {projectDetails.about}
                </p>
              )}
            </animated.div>
            <animated.div style={imageAnimation}>
              <div
                className={`relative overflow-hidden rounded-lg border-2 border-black bg-white p-2 shadow-custom transition-all dark:bg-[#0d0d0d] lg:h-[600px]
                ${imageLoading ? "opacity-0" : "opacity-100"}`}
                onMouseEnter={() => {
                  setImageEdit(true);
                  setImageHover(true);
                }}
                onMouseLeave={() => {
                  setImageEdit(false);
                  setImageHover(false);
                }}
                onClick={() => {
                  imageFileInput.current && imageFileInput.current.click();
                }}
              >
                <input
                  type="file"
                  ref={imageFileInput}
                  className="hidden"
                  accept=".jpg,.png"
                  onChange={async (e) => {
                    await handleFileUpload(
                      e,
                      setImageLoading,
                      setUserData,
                      "image",
                      setShowError,
                      setCacheBuster,
                      "project_content",
                      "project-content-" + projectData.id,
                      (prev: any) => {
                        const slugToUpdate = prev.slugs.find(
                          (slugItem: any) => slugItem.slug === projectData.slug
                        );
                        if (slugToUpdate) {
                          slugToUpdate.image = (prev as any).image;
                        }
                        return prev;
                      },
                      projectData.id
                    );
                  }}
                />
                <img
                  src={
                    projectDetails.image +
                    "?date=" +
                    date +
                    "&cache=" +
                    cacheBuster
                  }
                  alt=""
                  className={`block h-full w-full rounded-lg object-cover transition-all ${
                    imageHover ? "scale-105" : ""
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
            </animated.div>
          </section>
          <animated.section
            style={bottomProjectAnimation}
            className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-6"
          >
            <div className="content-wrapper lg:col-span-4">
              {overviewEdit ? (
                <textarea
                  ref={overviewTextareaRef}
                  value={overviewEditValue}
                  onChange={(e) => setOverviewEditValue(e.target.value)}
                  onBlur={() => {
                    setOverviewEditValue(projectDetails.overview);
                    setOverviewEdit(false);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleOverviewSubmit();
                    }
                  }}
                  className="m-0 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-3xl font-bold leading-loose outline-none focus:outline-none focus:ring-0"
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
                  maxLength={50}
                />
              ) : (
                <h2
                  className="cursor-pointer select-none text-3xl font-bold transition-all hover:opacity-50"
                  onClick={() => setOverviewEdit(true)}
                >
                  {projectDetails.overview}
                </h2>
              )}
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
                  maxLength={2000}
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
            <div className="card grid gap-2 rounded-lg border-2 border-black bg-white p-2 shadow-custom dark:bg-[#1a1a1a] lg:col-span-2">
              <h2 className="text-2xl font-bold">Information</h2>
              <ul className="list-disc pl-5">
                <div className="li-wrapper">
                  <li className="font-bold">Platform</li>
                  {platformsEdit ? (
                    <textarea
                      ref={platformsTextareaRef}
                      value={platformsEditValue}
                      onChange={(e) => setPlatformsEditValue(e.target.value)}
                      onBlur={() => {
                        setPlatformsEditValue(projectDetails.platforms);
                        setPlatformsEdit(false);
                      }}
                      onKeyDown={async (e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          await handlePlatformsSubmit();
                        }
                      }}
                      className="m-0 w-full resize-none appearance-none overflow-hidden border-none bg-transparent p-0 text-lg font-normal leading-loose outline-none focus:outline-none focus:ring-0"
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
                      maxLength={50}
                    />
                  ) : (
                    <p
                      className="cursor-pointer select-none font-normal transition-all hover:opacity-50"
                      onClick={() => setPlatformsEdit(true)}
                    >
                      {projectDetails.platforms}
                    </p>
                  )}
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
              </ul>
              <p className={"break-all text-sm text-gray-500"}>
                /*link: {projectDetails.link}*/ ↓
              </p>
              <a
                href={projectDetails.link}
                target="_blank"
                className="inline-block w-full self-end justify-self-end rounded-lg bg-black px-5 py-2 text-center text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500"
              >
                View Online{" "}
                <img
                  src={LinkIcon}
                  alt=""
                  className="inline-block -translate-y-1"
                />
              </a>
              <input
                type="text"
                className="mb-2 mr-2 inline-block rounded-lg px-3 py-2 text-sm shadow-custom transition-all hover:-translate-y-0.5 focus:outline-none dark:bg-[#1a1a1a]"
                value={linkValue}
                placeholder={"change link"}
                onChange={(e) => setLinkValue(e.target.value)}
                onFocus={(e) => e.currentTarget.select()}
                maxLength={100}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    await handleLinkSubmit();
                    setLinkValue("");
                  }
                }}
              />
            </div>
          </animated.section>
        </div>
      </main>
      <ModeButtons
        setDownloaded={setDownloaded}
        deploying={deploying}
        setDeploying={setDeploying}
        setDeployed={setDeployed}
        userData={userData}
        setUserData={setUserData}
      />
      {deploying && (
        <StatusBar
          message="Deploying! plz wait a few minutes..."
          color="bg-green-500"
        />
      )}
      {deployed.bool && (
        <DeploymentBar url={deployed.url} setDeployed={setDeployed} />
      )}
      {imageLoading && (
        <StatusBar message={"uploading image!"} color={"bg-green-500"} />
      )}
      {downloaded.bool && (
        <StatusBar message={downloaded.message} color={"bg-green-500"} />
      )}
      <Footer />
    </>
  );
};

export default Project;
