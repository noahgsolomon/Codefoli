import { FC } from "react";
import { useSpring, animated } from "react-spring";
import { FiCode, FiLayout } from "react-icons/fi";
import profileDisplayImg from "assets/profiledisplay.png";
import user2PfpImg from "assets/user2-pfp.png";
import userPfpImg from "assets/user-pfp.png";
import Footer from "Components/Footer/Footer";
import Card from "Components/Card/Card";
import TestimonialCard from "Components/TestimonialCard/TestimonialCard";
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
                <span className="highlight-codefolio bg-red-500 px-1 text-white">
                  Codefolio
                </span>
                !
              </h1>
              <p className="mb-2 text-center text-lg">
                A platform dedicated to helping programmers create stunning
                portfolio websites...
              </p>
            </animated.div>
            <animated.div style={imageAnimation}>
              <img
                className="mb-5 h-auto w-full transform rounded-lg border-2 border-black shadow-custom transition-all duration-300 hover:-translate-y-0.5 hover:shadow-customHover md:max-w-screen-lg"
                src={profileDisplayImg}
                alt="Introductory visual"
              />
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
                ImageUrl="/assets/images/professional-website.jpg"
              />
              <Card
                title="Add Your Skills"
                description="Showcase your projects, skills, and accomplishments"
                ImageUrl="/assets/images/skills.jpeg"
              />
              <Card
                title="Easy To Edit"
                description="Easily update and maintain your portfolio over time"
                ImageUrl="/assets/images/easy-to-edit.jpg"
              />
            </div>
          </div>
        </animated.section>
        <section>
          <Banner
            title={{
              text: "Ready to build your portfolio website with Codefolio? Sign Up and get started!",
              align: "left",
              color: "white",
            }}
            linkControls={{
              to: "/register",
              text: "Sign Up",
            }}
            imageUrl="/assets/images/website.png"
            backgroundColor="red"
          />
        </section>

        <section className="testimonial-section mb-10 px-5">
          <div className="mx-auto my-10 max-w-screen-lg  px-5">
            <h2 className="mb-5 text-center text-2xl font-bold md:text-4xl">
              What Our{" "}
              <span className="highlight-users bg-blue-500 px-1 text-white">
                Users
              </span>{" "}
              Say
            </h2>

            <TestimonialCard
              imageUrl={user2PfpImg}
              description="Codefolio made building my portfolio a breeze. It truly
                  represents my skills and work."
              userName="Jane Doe"
            />
            <TestimonialCard
              imageUrl={userPfpImg}
              description="With Codefolio, I was able to create a professional portfolio in
                  no time."
              userName="John Smith"
              reverse
            />
          </div>
        </section>

        <section className="mb-10 px-5">
          <div className="mx-auto my-10 max-w-screen-lg  px-5">
            <h2 className="mb-5 text-center text-3xl font-bold md:text-4xl">
              Codefolio{" "}
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
