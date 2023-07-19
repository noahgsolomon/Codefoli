import React from "react";
import ServiceCard from "Components/Sections/Skill/ServiceCard.tsx";
import Footer from "Components/Footer/Footer";
import ArrowRight from "assets/icons/arrow-right.svg";
import { COLORS } from "../../util/colors.ts";
import UserData from "Type/UserData.tsx";
import { Link } from "react-router-dom";

const Projects: React.FC<{ userData: UserData }> = ({ userData }) => {
  return (
    <>
      <main>
        <div className="container mx-auto my-20 max-w-screen-lg px-5">
          <section>
            <h1 className="mb-5 text-center text-3xl font-bold md:text-5xl lg:text-6xl">
              Projects
            </h1>
            <p className="text-center font-semibold">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem
              obcaecati porro officia consequatur? Consectetur dolorem
              necessitatibus rem? Quis, officia velit?
            </p>
          </section>
        </div>
      </main>
      {/* projects */}
      <section>
        <div className="container mx-auto mb-5 px-5">
          {/* projects */}
          <div className="projects grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 lg:grid-cols-3">
            {userData.projects.map(
              ({ name, description, language, imageUrl = "" }) => {
                return (
                  <ServiceCard
                    title={name}
                    description={description}
                    imageUrl={imageUrl}
                    key={Math.random().toString()}
                  >
                    <Link
                      to="/project"
                      className="inline-block bg-white px-5 py-2 text-sm font-bold"
                    >
                      Learn more{" "}
                      <img
                        src={ArrowRight}
                        alt=""
                        className="inline-block transition ease-in group-hover:translate-x-1"
                      />
                    </Link>
                    <div className={`rounded-b-lg bg-white px-5 py-2`}>
                      <span
                        className={`mb-2 mr-2 inline-block cursor-pointer rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${
                          COLORS[Math.floor(Math.random() * COLORS.length)]
                        } py-2 text-sm`}
                      >
                        {language}
                      </span>
                    </div>
                  </ServiceCard>
                );
              }
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Projects;
