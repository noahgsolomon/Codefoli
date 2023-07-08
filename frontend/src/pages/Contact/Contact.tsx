import Footer from "Components/Footer/Footer";
import Form from "./Form/Form";
import React from "react";
import { useSpring, animated } from "react-spring";
import ContactData from "Type/ContactData.tsx";
import SkillSection from "Components/Sections/SkillSection.tsx";
import StorySection from "Components/Sections/Story/StorySection.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import ResumeSection from "Components/Sections/Resume/ResumeSection.tsx";
import FAQSection from "Components/Sections/FAQSection.tsx";
import UserData from "Type/UserData.tsx";
import ValueSection from "Components/Sections/ValueSection.tsx";

const Contact: React.FC<{
  pageData: ContactData;
  setPageData: React.Dispatch<React.SetStateAction<ContactData>>;
  userData: UserData;
}> = ({ pageData, setPageData, userData }) => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: "translate3d(-20px, 0, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 100,
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
                {pageData.headerOne}
              </h2>
              <p className="text-center md:text-left">
                {pageData.descriptionOne}
              </p>
              <div className="mb-5">
                <div className="card contact-card rounded-lg border-2 border-black p-5">
                  <a
                    href={`mailto:${pageData.email}`}
                    className="mb-8 inline-block"
                  >
                    <div className="flex items-center justify-center gap-4">
                      <img
                        src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a460fc6857e260d0f2b_envelope-icon-large-paperfolio-webflow-template.svg"
                        loading="eager"
                        alt="envelope icon"
                      />
                      <div className="contact-link">{pageData.email}</div>
                    </div>
                  </a>

                  <a href={`tel:${pageData.phone}`} className="">
                    <div className="flex items-center gap-4">
                      <img
                        src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633d9a5fec957e53ae8857ce_phone-icon-large-paperfolio-webflow-template.svg"
                        loading="eager"
                        alt="phone icon"
                      />
                      <div className="contact-link">{pageData.phone}</div>
                    </div>
                  </a>
                </div>
              </div>
            </animated.div>

            <Form />
          </div>
        </div>
      </main>
      {pageData.sections.map((section, index) => {
        const { type, details } = section;
        switch (type) {
          case "SKILL":
            return (
              <SkillSection
                key={index}
                userData={userData}
                preview={false}
                details={details}
                setPageData={
                  setPageData as React.Dispatch<
                    React.SetStateAction<AnyPageData>
                  >
                }
                page={"HOME"}
              />
            );
          case "STORY":
            return "descriptionOne" in details &&
              "bulletOne" in details &&
              "bulletTwo" in details &&
              "bulletThree" in details &&
              "imageOne" in details ? (
              <StorySection
                page={"CONTACT"}
                key={index}
                details={details}
                setPageData={
                  setPageData as React.Dispatch<
                    React.SetStateAction<AnyPageData>
                  >
                }
              />
            ) : null;
          case "RESUME":
            return (
              <ResumeSection
                key={index}
                page={"CONTACT"}
                details={details}
                setPageData={
                  setPageData as React.Dispatch<
                    React.SetStateAction<AnyPageData>
                  >
                }
                userData={userData}
              />
            );
          case "FAQ":
            return "descriptionOne" in details &&
              "headerOne" in details &&
              "faq" in details ? (
              <FAQSection
                setPageData={
                  setPageData as React.Dispatch<
                    React.SetStateAction<AnyPageData>
                  >
                }
                key={index}
                page={"CONTACT"}
                details={details}
              />
            ) : null;
          case "VALUE":
            return "descriptionOne" in details &&
              "headerOne" in details &&
              "values" in details ? (
              <ValueSection
                setPageData={
                  setPageData as React.Dispatch<
                    React.SetStateAction<AnyPageData>
                  >
                }
                key={index}
                page={"HOME"}
                details={details}
              />
            ) : null;
          default:
            return null;
        }
      })}
      <Footer />
    </>
  );
};

export default Contact;
