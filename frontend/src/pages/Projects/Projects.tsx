import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import Footer from "Components/Footer/Footer";
import UserData from "Type/UserData.tsx";
import ProjectsPageData from "Type/ProjectsPageData.tsx";
import {
  updateDescriptionOneProjects,
  updateHeaderOneProjects,
} from "./projectspageapi.tsx";
import ProjectCard from "./ProjectCard.tsx";
import AddProjectCard from "./AddProjectCard.tsx";
import { useSpring, animated } from "react-spring";

const Projects: FC<{
  pageData: ProjectsPageData;
  setPageData: Dispatch<SetStateAction<ProjectsPageData>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
}> = ({ userData, setUserData, pageData, setPageData }) => {
  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    pageData.headerOne
  );
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [descriptionOneEdit, setDescriptionOneEdit] = useState(false);
  const [descriptionOneEditValue, setDescriptionOneEditValue] = useState(
    pageData.descriptionOne
  );
  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 200,
  });

  const projectCardsAnimation = useSpring({
    from: { transform: "translate3d(0, 20px, 0)", opacity: 0 },
    to: { transform: "translate3d(0, 0, 0)", opacity: 1 },
    delay: 500,
  });

  const handleHeaderOneSubmit = async () => {
    const updateHeader = await updateHeaderOneProjects(headerOneEditValue);
    if (updateHeader) {
      setPageData((prev) => ({ ...prev, headerOne: headerOneEditValue }));
      setHeaderOneEditValue(updateHeader.data);
    }
    setHeaderOneEdit(false);
  };

  const handleDescriptionOneSubmit = async () => {
    const updateDescription = await updateDescriptionOneProjects(
      descriptionOneEditValue
    );
    if (updateDescription) {
      setPageData((prev) => ({
        ...prev,
        descriptionOne: descriptionOneEditValue,
      }));
      setDescriptionOneEditValue(updateDescription);
    }
    setDescriptionOneEdit(false);
  };

  return (
    <>
      <main>
        <div className="container mx-auto my-20 max-w-screen-lg px-5">
          <section>
            <animated.div style={headerAnimation}>
              {headerOneEdit ? (
                <textarea
                  ref={headerOneTextareaRef}
                  value={headerOneEditValue}
                  onChange={(e) => setHeaderOneEditValue(e.target.value)}
                  onBlur={() => {
                    setHeaderOneEditValue(pageData.headerOne);
                    setHeaderOneEdit(false);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleHeaderOneSubmit();
                    }
                  }}
                  className="mb-5 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-center text-3xl font-bold leading-snug outline-none focus:outline-none focus:ring-0 md:text-5xl lg:text-6xl"
                  autoFocus
                  onFocus={(e) => {
                    e.target.select();
                  }}
                  maxLength={25}
                />
              ) : (
                <h1
                  className="mb-5 cursor-pointer select-none text-center text-3xl font-bold leading-snug transition-all hover:opacity-50 md:text-5xl lg:text-6xl"
                  onClick={() => setHeaderOneEdit(true)}
                >
                  {pageData.headerOne}
                </h1>
              )}
              {descriptionOneEdit ? (
                <textarea
                  ref={descriptionOneTextareaRef}
                  value={descriptionOneEditValue}
                  onChange={(e) => setDescriptionOneEditValue(e.target.value)}
                  onBlur={() => {
                    setDescriptionOneEditValue(pageData.descriptionOne);
                    setDescriptionOneEdit(false);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      await handleDescriptionOneSubmit();
                    }
                  }}
                  className="w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-center text-lg leading-snug outline-none focus:outline-none focus:ring-0"
                  autoFocus
                  onFocus={(e) => e.currentTarget.select()}
                  maxLength={250}
                  rows={3}
                />
              ) : (
                <p
                  className="cursor-pointer select-none text-center font-semibold transition-all hover:opacity-50"
                  onClick={() => setDescriptionOneEdit(true)}
                >
                  {pageData.descriptionOne}
                </p>
              )}
            </animated.div>
          </section>
        </div>
      </main>
      <section>
        <animated.div
          style={projectCardsAnimation}
          className="container mx-auto mb-5 px-5"
        >
          <div className="projects grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3">
            {userData.projects.map(
              ({ name, description, id, languages, image, slug }) => {
                return (
                  <ProjectCard
                    title={name}
                    description={description}
                    setUserData={setUserData}
                    image={image}
                    id={id}
                    key={id}
                    languages={languages}
                    slug={slug}
                  />
                );
              }
            )}
            {userData.projects.length < 8 && (
              <AddProjectCard setUserData={setUserData} />
            )}
          </div>
        </animated.div>
      </section>
      <Footer />
    </>
  );
};

export default Projects;
