import Accordion from "Components/Accordion/Accordion";
import Footer from "Components/Footer/Footer";
import Form from "./Form/Form";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import UserData from "Type/UserData.tsx";

const Contact: React.FC<{ userData: UserData }> = ({ userData }) => {
  console.log(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      navigate("/");
    } else if (localStorage.getItem("role") === "NEWBIE") {
      navigate("/setup");
    }
  }, [navigate]);

  const animationProps = useSpring({
    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 100,
  });

  const faqAnimationProps = useSpring({
    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 200,
  });

  return (
    <>
      <main>
        <div className="container mx-auto my-20 max-w-screen-lg px-5">
          <div className="wrapper items-center gap-10 md:flex">
            <animated.div
              style={animationProps}
              className="content mx-auto max-w-lg md:mx-0"
            >
              <h2 className="text-center text-5xl font-bold md:text-left md:text-6xl">
                <span className="mr-1 bg-blue-500 text-white">Contact</span>me
              </h2>
              <p className="text-center md:text-left">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate fugiat totam id quo soluta ipsum ducimus incidunt
                repudiandae esse error!
              </p>
              <div className="mb-5">
                <div className="card contact-card rounded-lg border-2 border-black p-5">
                  <a
                    href="mailto:hello@johncarter.com"
                    className="mb-8 inline-block"
                  >
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a460fc6857e260d0f2b_envelope-icon-large-paperfolio-webflow-template.svg"
                        loading="eager"
                        alt="envelope icon"
                      />
                      <div className="contact-link">hello@johncarter.com</div>
                    </div>
                  </a>

                  <a href="tel:(246)234-4643" className="">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a5fec957e53ae8857ce_phone-icon-large-paperfolio-webflow-template.svg"
                        loading="eager"
                        alt="phone icon"
                      />
                      <div className="contact-link">(246) 234 - 4643</div>
                    </div>
                  </a>
                </div>
              </div>
            </animated.div>

            <Form />
          </div>
        </div>

        {/* FAQs */}
        <animated.section style={faqAnimationProps} className="px-5">
          <div className="header mx-auto mb-5 max-w-[647px]">
            <h2 className="text-center text-2xl font-bold md:text-5xl">
              Frequently{" "}
              <span className="bg-red-500 text-white">Asked Questions</span>
            </h2>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              illum aut. Impedit expedita quaerat eum dicta possimus et
              architecto neque?
            </p>
          </div>
          <div className="accordion-wrapper mx-auto max-w-[800px]">
            <Accordion
              title="Are you open for freelance / contract work?"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
            <Accordion
              title="Are you open for design collaborations?"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
            <Accordion
              title="Are you open for guest-posts on your blog?"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
            <Accordion
              title="Are you currently looking for fulltime roles?"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
            <Accordion
              title="What's your past experience on design?"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            />
          </div>
        </animated.section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
