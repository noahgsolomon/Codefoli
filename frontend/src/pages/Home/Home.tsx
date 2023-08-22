import { FC } from "react";
import { useSpring, animated } from "react-spring";
import { FiCode, FiLayout } from "react-icons/fi";
import profileDisplayImg from "assets/profiledisplay.png";

import Footer from "Components/Footer/Footer";
import Card from "Components/Card/Card";
import Banner from "Components/Banner/Banner";

const Home: FC = () => {
  const headerAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 100,
  });

  const imageAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 200,
  });

  const offerAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 300,
  });

  return (
    <>
      <main>
        <animated.section
          style={headerAnimation}
          className="intro-section mb-10 px-5"
        >
          <div className="home-container mx-auto my-10 max-w-screen-lg  px-5 text-gray-800">
            <animated.div style={headerAnimation}>
              <h1 className="mb-5 text-center text-4xl font-bold md:text-5xl">
                Welcome to{" "}
                <span className=" bg-red-500 px-1 text-white">
                  Codefoli
                </span>
                !
              </h1>
              <p className="text-bold mb-2 text-center text-2xl">
                A platform dedicated to helping programmers create stunning
                portfolio websites...
              </p>
            </animated.div>
            <animated.div style={imageAnimation}>
              <div className="relative">
                <a href="https://walter.codefoli.com" target="_blank" rel="noopener noreferrer"
                   className="text-blue-700 fixed top-1 left-1 md:top-10 text-xs md:text-sm md:left-10 p-3 z-50 bg-white shadow-custom rounded-full border-black border-2 cursor-pointer hover:text-blue-400 hover:shadow-customHover hover:-translate-y-0.5 transition-all">
                  walter.codefoli.com
                </a>
                <a href="https://walter.codefoli.com" target="_blank" rel="noopener noreferrer">
                  <img
                      className="mb-5 cursor-pointer h-auto w-full transform rounded-lg border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover md:max-w-screen-lg"
                      src={profileDisplayImg}
                      alt="Introductory visual"
                  />
                </a>
              </div>

            </animated.div>
          </div>
        </animated.section>
        <animated.section style={offerAnimation} className="mb-10">
          <div className="mx-auto my-10 max-w-screen-lg  px-5">
            <h2 className="mb-5 text-2xl font-bold md:text-4xl">
              What you can do:
            </h2>
            <div className="flex flex-wrap items-center justify-evenly">
              <Card
                title="Professional Design"
                description="Create a professional and personalized portfolio website"
                ImageUrl="/assets/images/professional-website.png"
              />
              <Card
                title="Add Your Skills"
                description="Showcase your projects, skills, and accomplishments"
                ImageUrl="/assets/images/skills.png"
              />
              <Card
                title="Easy To Edit"
                description="Easily update and maintain your portfolio over time"
                ImageUrl="/assets/images/easy-to-edit.png"
              />
            </div>
          </div>
        </animated.section>
        <section>
          <Banner
            title={{
              text: "Ready to build your portfolio website with Codefoli? Sign Up and get started!",
              align: "left",
              color: "white",
            }}
            linkControls={{
              to: "/register",
              text: "Sign Up",
            }}
            backgroundColor="blue"
          />
        </section>

        {/*<section className="testimonial-section mb-10 px-5">*/}
        {/*  <div className="mx-auto my-10 max-w-screen-lg  px-5">*/}
        {/*    <h2 className="mb-5 text-center text-2xl font-bold md:text-4xl">*/}
        {/*      What Our{" "}*/}
        {/*      <span className="highlight-users bg-blue-500 px-1 text-white">*/}
        {/*        Users*/}
        {/*      </span>{" "}*/}
        {/*      Say*/}
        {/*    </h2>*/}

        {/*    <TestimonialCard*/}
        {/*      imageUrl={user2PfpImg}*/}
        {/*      description="Codefoli made building my portfolio a breeze. It truly*/}
        {/*          represents my skills and work."*/}
        {/*      userName="Michael Tikhonovsky"*/}
        {/*    />*/}
        {/*    <TestimonialCard*/}
        {/*      imageUrl={userPfpImg}*/}
        {/*      description="With Codefoli, I was able to create a professional portfolio in*/}
        {/*          no time."*/}
        {/*      userName="David Mann"*/}
        {/*      reverse*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</section>*/}

        <section className="mb-10 px-5">
          <div className="mx-auto my-10 max-w-screen-lg  px-5">
            <h2 className="mb-5 text-center text-3xl font-bold md:text-4xl">
              Codefoli{" "}
              <span className="bg-indigo-500 px-1 text-white">Features</span>
            </h2>
            <div className="flex flex-wrap items-stretch justify-evenly md:space-x-10">
              <Card
                ImageUrl={FiLayout}
                title="Customizable Templates"
                description="Choose from a variety of templates that suit your style and
                personalize them according to your needs."
              />

              <Card
                ImageUrl={FiCode}
                title="Project Showcasing"
                description="Highlight your projects effectively with detailed descriptions, code snippets, and live demo links."
              />
              <Card
                ImageUrl={FiCode}
                title="Easy Updates"
                description=" Keep your portfolio up-to-date with our easy-to-use interface."
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
