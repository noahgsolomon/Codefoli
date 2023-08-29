import LinkIcon from "assets/icons/arrow-up-right.svg";
import { FC, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserData from "Type/UserData.tsx";
import { useSpring, animated } from "react-spring";
import { COLORS } from "../../../util/colors.ts";
import ModeButtonsP from "../../common/Components/ModeButtons/ModeButtonsP.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import DeploymentBar from "Components/DeploymentBar/DeploymentBar.tsx";

const ProjectP: FC<{
  setDownloaded: (downloaded: { bool: boolean; message: string }) => void;
  downloaded: { bool: boolean; message: string };
  userData: UserData;
  setUserData: (userData: UserData) => void;
  deploying: boolean;
  deployed: { url: string; bool: boolean };
  setDeploying: (deploying: boolean) => void;
  setDeployed: (deployed: { url: string; bool: boolean }) => void;
}> = ({
  userData,
  setUserData,
  setDeployed,
  deployed,
  deploying,
  setDeploying,
  downloaded,
  setDownloaded,
}) => {
  const { slug } = useParams<{ slug: string }>();

  const navigate = useNavigate();

  const projectDetails = userData.slugs.find((s) => s.slug === slug);
  const projectData = userData.projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const date = useMemo(() => Date.now(), []);

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

  if (!slug || !projectDetails || !projectData) {
    navigate("/404");
    return null;
  }

  return (
    <>
      <main>
        <div className="container mx-auto my-20 max-w-screen-lg px-5">
          <section className="hero mb-8">
            <animated.div style={headerAnimation}>
              <h1 className="mb-5   text-center text-4xl font-bold leading-snug transition-all ">
                {projectDetails.header}
              </h1>
              <p className="mb-5 text-center font-semibold transition-all ">
                {projectDetails.about}
              </p>
            </animated.div>
            <animated.div style={imageAnimation}>
              <div
                className={`relative overflow-hidden rounded-lg dark:bg-[#0d0d0d] border-2 border-black bg-white p-2 shadow-custom transition-all lg:h-[600px]`}
              >
                <img
                  src={projectDetails.image}
                  alt=""
                  className={`block h-full w-full rounded-lg object-cover transition-all`}
                />
              </div>
            </animated.div>
          </section>
          <animated.section
            style={bottomProjectAnimation}
            className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-6"
          >
            <div className="content-wrapper lg:col-span-4">
              <h2 className="  text-3xl font-bold transition-all ">
                {projectDetails.overview}
              </h2>
              <p className="mb-2 font-semibold transition-all ">
                {projectDetails.description}
              </p>
            </div>
            <div className="card grid gap-2 rounded-lg border-2 border-black dark:bg-[#1a1a1a] bg-white p-2 shadow-custom lg:col-span-2">
              <h2 className="text-2xl font-bold">Information</h2>
              <ul className="list-disc pl-5">
                <div className="li-wrapper">
                  <li className="font-bold">Platform</li>
                  <p className="font-normal transition-all">
                    {projectDetails.platforms}
                  </p>
                </div>
                <div className="li-wrapper">
                  <li className="font-bold">Tech Stack</li>
                  {projectData &&
                    projectData.languages.map((language, index) => (
                      <span
                        className={`mb-2 mr-2 inline-block  rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${COLORS[index]} py-2 text-sm`}
                        key={index}
                      >
                        {language}
                      </span>
                    ))}
                </div>
              </ul>
              <a
                href={projectDetails.link}
                target="_blank"
                className="inline-block w-full self-end justify-self-end rounded-lg bg-black px-5 py-2 text-center text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500"
              >
                View Online{" "}
                <img
                  src={LinkIcon + "?date=" + date}
                  alt=""
                  className="inline-block -translate-y-1"
                />
              </a>
            </div>
          </animated.section>
        </div>
      </main>
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
      {downloaded.bool && (
        <StatusBar message={downloaded.message} color={"bg-green-500"} />
      )}
    </>
  );
};

export default ProjectP;
