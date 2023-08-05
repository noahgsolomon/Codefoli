import { FC } from "react";
import { UserData } from "../../common/types/UserData.tsx";
import { useSpring, animated } from "react-spring";
import ProjectCard from "./ProjectCard.tsx";

const Projects: FC<{
  pageData: {
    headerOne: string;
    descriptionOne: string;
  };
  userData: UserData;
}> = ({ userData, pageData }) => {
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

  return (
    <>
      <main>
        <div className="container mx-auto my-20 max-w-screen-lg px-5">
          <section>
            <animated.div style={headerAnimation}>
              <h1 className="mb-5 text-center text-3xl font-bold leading-snug transition-all md:text-5xl lg:text-6xl">
                {pageData.headerOne}
              </h1>
              <p className=" text-center font-semibold transition-all">
                {pageData.descriptionOne}
              </p>
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
                    image={image}
                    key={id}
                    languages={languages}
                    slug={slug}
                  />
                );
              }
            )}
          </div>
        </animated.div>
      </section>
    </>
  );
};

export default Projects;
