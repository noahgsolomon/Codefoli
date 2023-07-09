import Marquee from "Components/Marquee/Marquee";
import Footer from "Components/Footer/Footer";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import UserData from "Type/UserData.tsx";
import AboutData from "Type/AboutData.tsx";
import {
  updateDescriptionOneAbout,
  updateHeaderOneAbout,
  updateHeaderTwoAbout,
} from "./aboutapi.tsx";
import SkillSection from "Components/Sections/SkillSection.tsx";
import StorySection from "Components/Sections/Story/StorySection.tsx";
import ResumeSection from "Components/Sections/Resume/ResumeSection.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import FAQSection from "Components/Sections/FAQSection.tsx";
import ValueSection from "Components/Sections/ValueSection.tsx";
import AddSection from "Components/AddSection/AddSection.tsx";
import { SectionType } from "Type/Section.tsx";

const About: React.FC<{
  userData: UserData;
  pageData: AboutData;
  setPageData: React.Dispatch<React.SetStateAction<AboutData>>;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}> = ({ userData, pageData, setPageData, setUserData }) => {
  const [iconOneEdit, setIconOneEdit] = useState<boolean>(false);
  const iconOneFileInput = useRef<HTMLInputElement | null>(null);
  const [iconTwoEdit, setIconTwoEdit] = useState<boolean>(false);
  const iconTwoFileInput = useRef<HTMLInputElement | null>(null);
  const [iconThreeEdit, setIconThreeEdit] = useState<boolean>(false);
  const iconThreeFileInput = useRef<HTMLInputElement | null>(null);

  const [headerOneEdit, setHeaderOneEdit] = useState(false);
  const [headerOneEditValue, setHeaderOneEditValue] = useState(
    pageData.headerOne
  );
  const [headerTwoEdit, setHeaderTwoEdit] = useState(false);
  const [headerTwoEditValue, setHeaderTwoEditValue] = useState(
    pageData.headerTwo
  );
  const [descriptionOneEdit, setDescriptionOneEdit] = useState(false);
  const [descriptionOneEditValue, setDescriptionOneEditValue] = useState(
    pageData.descriptionOne
  );

  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const headerTwoTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFileUpload = async (
    path: string,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    imageKey: keyof AboutData,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    setEdit(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`http://localhost:8080/${path}`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        setEdit(false);
        return;
      }

      console.log([imageKey]);

      const data = await response.json();
      setPageData({
        ...pageData,
        [imageKey]: `${data.url}?timestamp=${new Date().getTime()}`,
      });
      setTimeout(() => setEdit(false), 500);
    } catch (error) {
      setEdit(false);
      console.error("Error uploading file: ", error);
    }
  };

  const handleHeaderOneSubmit = async () => {
    const updateHeader = await updateHeaderOneAbout(headerOneEditValue);
    if (updateHeader) {
      setPageData((prev) => ({ ...prev, headerOne: headerOneEditValue }));
      setHeaderOneEditValue(updateHeader);
    }
    setHeaderOneEdit(false);
  };
  const handleHeaderTwoSubmit = async () => {
    const updateHeader = await updateHeaderTwoAbout(headerTwoEditValue);
    if (updateHeader) {
      setPageData((prev) => ({ ...prev, headerTwo: headerTwoEditValue }));
      setHeaderTwoEditValue(updateHeader);
    }
    setHeaderTwoEdit(false);
  };

  const handleDescriptionOneSubmit = async () => {
    const updateHeader = await updateDescriptionOneAbout(
      descriptionOneEditValue
    );
    if (updateHeader) {
      setPageData((prev) => ({
        ...prev,
        descriptionOne: descriptionOneEditValue,
      }));
      setDescriptionOneEditValue(updateHeader);
    }
    setDescriptionOneEdit(false);
  };

  const allSectionTypes: SectionType[] = [
    "STORY",
    "RESUME",
    "SKILL",
    "FAQ",
    "VALUE",
  ] as SectionType[];

  const sectionList = pageData.sections.map((section) => section.type);

  const availableSectionTypes = allSectionTypes.filter(
    (t) => !sectionList.includes(t)
  );

  return (
    <>
      <main>
        <div className="container mx-auto my-20 max-w-screen-lg px-5">
          {/* about */}
          <section className="about mb-20 grid grid-cols-2 justify-center gap-10 md:h-[400px] md:grid-cols-5">
            <div className="content-wrapper col-span-2 flex justify-center  md:order-2 md:col-span-3">
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
                  className=" mb-5 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-center text-5xl font-bold leading-snug outline-none focus:outline-none focus:ring-0 md:text-7xl"
                  autoFocus
                  maxLength={50}
                />
              ) : (
                <h2
                  className="mb-5 cursor-pointer select-none text-center text-5xl font-bold transition-all hover:opacity-50 md:text-7xl"
                  onClick={() => setHeaderOneEdit(true)}
                >
                  {pageData.headerOne}
                </h2>
              )}
            </div>
            <div
              className="image-wrapper relative order-2 w-full text-center md:order-1 md:self-end"
              onMouseEnter={() => setIconOneEdit(true)}
              onMouseLeave={() => setIconOneEdit(false)}
              onClick={() => {
                iconOneFileInput.current && iconOneFileInput.current.click();
              }}
            >
              <input
                type="file"
                ref={iconOneFileInput}
                className="hidden"
                accept=".jpg,.png"
                onChange={async (e) => {
                  await handleFileUpload(
                    "about-icon-one-upload",
                    setIconOneEdit,
                    "iconOne",
                    e
                  );
                }}
              />
              <img
                className="inline-block max-h-[150px] max-w-[150px] rounded-full shadow-custom"
                src={pageData.iconOne}
                alt="portfolio"
              />
              <div
                className={`absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-full border-8 border-dashed border-black bg-white text-xl font-bold text-black transition-all ${
                  iconOneEdit ? "opacity-50" : "opacity-0"
                }`}
              >
                click to upload image
              </div>
            </div>
            <div
              className="image-wrapper relative w-full text-center md:order-last md:self-start"
              onMouseEnter={() => setIconTwoEdit(true)}
              onMouseLeave={() => setIconTwoEdit(false)}
              onClick={() =>
                iconTwoFileInput.current && iconTwoFileInput.current.click()
              }
            >
              <input
                type="file"
                ref={iconTwoFileInput}
                className="hidden"
                accept=".jpg,.png"
                onChange={async (e) => {
                  await handleFileUpload(
                    "about-icon-two-upload",
                    setIconTwoEdit,
                    "iconTwo",
                    e
                  );
                }}
              />
              <img
                className="inline-block max-w-[150px] rounded-full shadow-custom"
                src={pageData.iconTwo}
                alt="portfolio"
              />
              <div
                className={`absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-full border-8 border-dashed border-black bg-white text-xl font-bold text-black transition-all ${
                  iconTwoEdit ? "opacity-50" : "opacity-0"
                }`}
              >
                click to upload image
              </div>
            </div>
          </section>
        </div>
        {/* Story */}
        <section className="story mb-20">
          <div className="container mx-auto my-20 max-w-screen-lg gap-5 px-5 md:grid md:grid-cols-2 md:items-start md:justify-between">
            <div className="content-left">
              <div className="flex">
                {headerTwoEdit ? (
                  <textarea
                    ref={headerTwoTextareaRef}
                    value={headerTwoEditValue}
                    onChange={(e) => setHeaderTwoEditValue(e.target.value)}
                    onBlur={() => {
                      setHeaderTwoEditValue(pageData.headerTwo);
                      setHeaderTwoEdit(false);
                    }}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        await handleHeaderTwoSubmit();
                      }
                    }}
                    className="mb-8 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-4xl font-bold leading-snug outline-none focus:outline-none focus:ring-0 md:text-left md:text-6xl md:leading-tight"
                    autoFocus
                    maxLength={25}
                  />
                ) : (
                  <h2
                    className="mb-8 cursor-pointer select-none text-center text-4xl font-bold transition-all hover:opacity-50 md:text-left md:text-6xl md:leading-tight"
                    onClick={() => setHeaderTwoEdit(true)}
                  >
                    {pageData.headerTwo}
                  </h2>
                )}
              </div>
              <div
                className="image-wrapper relative mb-5 max-w-[375px] sm:mx-auto md:mx-0"
                onMouseEnter={() => setIconThreeEdit(true)}
                onMouseLeave={() => setIconThreeEdit(false)}
                onClick={() =>
                  iconThreeFileInput.current &&
                  iconThreeFileInput.current.click()
                }
              >
                <input
                  type="file"
                  ref={iconThreeFileInput}
                  className="hidden"
                  accept=".jpg,.png"
                  onChange={async (e) => {
                    await handleFileUpload(
                      "about-icon-three-upload",
                      setIconThreeEdit,
                      "iconThree",
                      e
                    );
                  }}
                />
                <img
                  src={pageData.iconThree}
                  alt=""
                  className="rounded-3xl shadow-custom"
                />
                <div
                  className={`absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-3xl border-8 border-dashed border-black bg-white text-3xl font-bold text-black transition-all ${
                    iconThreeEdit ? "opacity-50" : "opacity-0"
                  }`}
                >
                  click to upload image
                </div>
              </div>
            </div>
            <div className="content-right">
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
                  className="mb-5 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-lg font-semibold leading-snug outline-none focus:outline-none focus:ring-0"
                  style={{ minHeight: "8em" }}
                  autoFocus
                  maxLength={250}
                />
              ) : (
                <p
                  className="description mb-5 cursor-pointer select-none text-lg font-semibold transition-all hover:opacity-50"
                  onClick={() => setDescriptionOneEdit(true)}
                >
                  {pageData.descriptionOne}
                </p>
              )}
              <div className="story-control text-center md:text-left">
                <Link
                  to="/preview/contact"
                  className="mb-4 mr-2 inline-block w-full rounded-xl border-2 border-transparent bg-black px-4 py-2 font-bold text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500 md:w-auto"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Marquee
          items={userData.services.map((service) => {
            return service
              .split("_")
              .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
              .join(" ");
          })}
        />
        {pageData.sections
          .sort((a, b) => a.details.order - b.details.order)
          .map((section, index) => {
            const { type, details } = section;

            let sectionComponent;
            switch (type) {
              case "SKILL":
                sectionComponent = (
                  <SkillSection
                    key={index}
                    userData={userData}
                    setUserData={setUserData}
                    preview={false}
                    details={details}
                    setPageData={
                      setPageData as React.Dispatch<
                        React.SetStateAction<AnyPageData>
                      >
                    }
                    page={"ABOUT"}
                    order={section.details.order}
                  />
                );
                break;
              case "STORY":
                sectionComponent =
                  "descriptionOne" in details &&
                  "bulletOne" in details &&
                  "bulletTwo" in details &&
                  "bulletThree" in details &&
                  "imageOne" in details ? (
                    <StorySection
                      page={"ABOUT"}
                      key={index}
                      details={details}
                      setPageData={
                        setPageData as React.Dispatch<
                          React.SetStateAction<AnyPageData>
                        >
                      }
                      order={section.details.order}
                    />
                  ) : null;
                break;
              case "RESUME":
                sectionComponent = (
                  <ResumeSection
                    key={index}
                    page={"ABOUT"}
                    details={details}
                    setPageData={
                      setPageData as React.Dispatch<
                        React.SetStateAction<AnyPageData>
                      >
                    }
                    userData={userData}
                    order={section.details.order}
                  />
                );
                break;
              case "FAQ":
                sectionComponent =
                  "descriptionOne" in details &&
                  "headerOne" in details &&
                  "faq" in details ? (
                    <FAQSection
                      setPageData={
                        setPageData as React.Dispatch<
                          React.SetStateAction<AnyPageData>
                        >
                      }
                      key={index}
                      page={"ABOUT"}
                      details={details}
                      order={section.details.order}
                    />
                  ) : null;
                break;
              case "VALUE":
                sectionComponent =
                  "descriptionOne" in details &&
                  "headerOne" in details &&
                  "values" in details ? (
                    <ValueSection
                      setPageData={
                        setPageData as React.Dispatch<
                          React.SetStateAction<AnyPageData>
                        >
                      }
                      key={index}
                      page={"ABOUT"}
                      details={details}
                      order={section.details.order}
                    />
                  ) : null;
                break;
              default:
                sectionComponent = null;
            }

            return [
              <AddSection
                key={`add-${index}`}
                sections={availableSectionTypes}
                page={"ABOUT"}
                setPageData={
                  setPageData as React.Dispatch<
                    React.SetStateAction<AnyPageData>
                  >
                }
                order={section.details.order}
              />,
              sectionComponent,
            ];
          })}
        <AddSection
          setPageData={
            setPageData as React.Dispatch<React.SetStateAction<AnyPageData>>
          }
          sections={availableSectionTypes}
          page={"ABOUT"}
          order={pageData.sections.length + 1}
        />
      </main>
      <Footer />
    </>
  );
};

export default About;
