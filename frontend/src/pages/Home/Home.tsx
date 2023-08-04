import React, { useEffect, useState } from "react";
import { useSpring, animated, useInView, to } from "react-spring";
import { useNavigate } from "react-router-dom";
import { FiCode, FiLayout } from "react-icons/fi";
import profileDisplayImg from "assets/profiledisplay.png";
import user2PfpImg from "assets/user2-pfp.png";
import userPfpImg from "assets/user-pfp.png";
import Footer from "Components/Footer/Footer";
import Loader from "Components/Loader/Loader.tsx";
import Card from "Components/Card/Card";
import TestimonialCard from "Components/TestimonialCard/TestimonialCard";
import Banner from "Components/Banner/Banner";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [refIntro, inViewIntro] = useInView({});
  const fadeInIntro = useSpring({
    opacity: inViewIntro ? 1 : 0,
    transform: inViewIntro ? "translateY(0)" : "translateY(20px)",
  });
  const [refTestimonial, inViewTestimonial] = useInView({});
  const fadeInTestimonial = useSpring({
    opacity: inViewTestimonial ? 1 : 0,
    transform: inViewTestimonial ? "translateY(0)" : "translateY(20px)",
  });
  const [refFeature, inViewFeature] = useInView({});
  const fadeInFeature = useSpring({
    opacity: inViewFeature ? 1 : 0,
    transform: inViewFeature ? "translateY(0)" : "translateY(20px)",
  });
  const [refOffer, inViewOffer] = useInView({});
  const fadeInOffer = useSpring({
    opacity: inViewOffer ? 1 : 0,
    transform: inViewOffer ? "translateY(0)" : "translateY(20px)",
  });
  const [refBanner, inViewBanner] = useInView({});
  const fadeInBanner = useSpring({
    opacity: inViewBanner ? 1 : 0,
    transform: inViewBanner ? "translateY(0)" : "translateY(20px)",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <main>
        <animated.section
          ref={refIntro}
          style={fadeInIntro}
          className="intro-section mb-10 px-5"
        >
          <div className="home-container mx-auto my-10 max-w-screen-lg  px-5 text-gray-800">
            <h1 className="mb-5 md:text-5xl text-4xl font-bold text-center">
              Welcome to{" "}
              <span className="highlight-codefolio bg-red-500 px-1 text-white">
                Codefolio
              </span>
              !
            </h1>
            <p className="mb-2 text-lg text-center">
              A platform dedicated to helping programmers create
              stunning portfolio websites...
            </p>
            <img
              className="shadow-box mb-5 h-auto w-full transform rounded-lg border-2 border-black transition-all duration-300 hover:translate-y-1 hover:shadow-lg md:max-w-screen-lg"
              src={profileDisplayImg}
              alt="Introductory visual"
            />
          </div>
        </animated.section>
        {/* our services */}
        <animated.section ref={refOffer} style={fadeInOffer} className="mb-10">
          <div className="mx-auto my-10 max-w-screen-lg  px-5">

            <h2 className="mb-5 md:text-4xl text-2xl font-bold">What you can do:</h2>
            <div className="flex flex-wrap items-center justify-evenly">
              <Card title="Professional Design" description="Create a professional and personalized portfolio website" ImageUrl="/assets/images/professional-website.jpg" />
              <Card title="Add Your Skills" description="Showcase your projects, skills, and accomplishments" ImageUrl="/assets/images/skills.jpeg" />
              <Card title="Easy To Edit" description="Easily update and maintain your portfolio over time" ImageUrl="/assets/images/easy-to-edit.jpg" />
            </div>
          </div>
        </animated.section>
        {/* get started banner */}
        <animated.section ref={refBanner} style={fadeInBanner}>
          <Banner title={
            {
              text: "Ready to build your portfolio website with Codefolio? Sign Up and get started!",
              align: 'left',
              color: 'white'
            }}
            linkControls={{
              to: '/register',
              text: 'Sign Up'
            }}
            imageUrl="/assets/images/website.png"
            backgroundColor="red"
          />
        </animated.section>

        <animated.section
          ref={refTestimonial}
          style={fadeInTestimonial}
          className="testimonial-section mb-10 px-5"
        >
          <div className="mx-auto my-10 max-w-screen-lg  px-5">
            <h2 className="mb-5 md:text-4xl text-2xl text-center font-bold">
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
        </animated.section>

        <animated.section
          ref={refFeature}
          style={fadeInFeature}
          className="mb-10 px-5"
        >
          <div className="mx-auto my-10 max-w-screen-lg  px-5">

            <h2 className="mb-5 md:text-4xl text-center text-3xl font-bold">
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
        </animated.section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
