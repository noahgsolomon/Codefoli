import { FC } from "react";
import UserData from "Type/UserData.tsx";
import ProjectsPageData from "Type/ProjectsPageData.tsx";
import { useSpring, animated } from "react-spring";
import ProjectCardP from "./ProjectCardP.tsx";
import ModeButtonsP from "../../common/Components/ModeButtons/ModeButtonsP.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import DeploymentBar from "Components/DeploymentBar/DeploymentBar.tsx";

const ProjectsP: FC<{
  setDownloaded: (downloaded: {bool: boolean, message: string}) => void;
  downloaded: {bool: boolean, message: string};
  pageData: ProjectsPageData;
  userData: UserData;
  setUserData: (userData: UserData) => void;
  deploying: boolean;
  deployed: { url: string; bool: boolean };
  setDeploying: (deploying: boolean) => void;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
}> = ({
  userData,
  pageData,
  setUserData,
  setDeployed,
  deployed,
  setDeploying,
  deploying,
    setDownloaded,
    downloaded
}) => {
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
                {pageData.header_one}
              </h1>
              <p className=" text-center font-semibold transition-all">
                {pageData.description_one}
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
                  <ProjectCardP
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
      <ModeButtonsP
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
      {downloaded.bool && (<StatusBar message={downloaded.message} color={'bg-green-500'}/>)}
    </>
  );
};

export default ProjectsP;
