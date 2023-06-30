import Marquee from "Components/Marquee/Marquee";
import JobCard from "./JobCard/JobCard";
import Footer from "Components/Footer/Footer";
import Card from "Components/Card/Card";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ValuesData } from "Type/Values.tsx";
import UserData from "Type/UserData.tsx";
import AboutData from "Type/AboutData.tsx";
import {
  changeSectionTwoActive,
  updateDescriptionOneAbout,
  updateDescriptionTwoAbout,
  updateHeaderOneAbout,
  updateHeaderThreeAbout,
  updateHeaderTwoAbout,
} from "./aboutapi.tsx";
import AddSection from "Components/AddSection/AddSection.tsx";

const About: React.FC<{
  userData: UserData;
  pageData: AboutData;
  setPageData: React.Dispatch<React.SetStateAction<AboutData>>;
}> = ({ userData, pageData, setPageData }) => {
  const [iconOneEdit, setIconOneEdit] = useState<boolean>(false);
  const iconOneFileInput = useRef<HTMLInputElement | null>(null);
  const [iconTwoEdit, setIconTwoEdit] = useState<boolean>(false);
  const iconTwoFileInput = useRef<HTMLInputElement | null>(null);
  const [iconThreeEdit, setIconThreeEdit] = useState<boolean>(false);
  const iconThreeFileInput = useRef<HTMLInputElement | null>(null);

  const [imageOneEdit, setImageOneEdit] = useState<boolean>(false);
  const imageOneFileInput = useRef<HTMLInputElement | null>(null);

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
  const [descriptionTwoEdit, setDescriptionTwoEdit] = useState(false);
  const [descriptionTwoEditValue, setDescriptionTwoEditValue] = useState(
    pageData.descriptionTwo
  );
  const [headerThreeEdit, setHeaderThreeEdit] = useState(false);
  const [headerThreeEditValue, setHeaderThreeEditValue] = useState(
    pageData.headerThree
  );
  const descriptionOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const headerOneTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const headerTwoTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const headerThreeTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const descriptionTwoTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [sectionTwoHover, setSectionTwoHover] = useState<boolean>(false);
  const [removeSectionTwoHover, setRemoveSectionTwoHover] =
    useState<boolean>(false);

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

  const handleDescriptionTwoSubmit = async () => {
    const updateHeader = await updateDescriptionTwoAbout(
      descriptionTwoEditValue
    );
    if (updateHeader) {
      setPageData((prev) => ({
        ...prev,
        descriptionTwo: descriptionTwoEditValue,
      }));
      setDescriptionTwoEditValue(updateHeader);
    }
    setDescriptionTwoEdit(false);
  };

  const handleHeaderThreeSubmit = async () => {
    const updateHeader = await updateHeaderThreeAbout(headerThreeEditValue);
    if (updateHeader) {
      setPageData((prev) => ({
        ...prev,
        headerThree: headerThreeEditValue,
      }));
      setHeaderThreeEditValue(updateHeader);
    }
    setHeaderThreeEdit(false);
  };

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
              onClick={() =>
                iconOneFileInput.current && iconOneFileInput.current.click()
              }
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
                className="image-wrapper relative mb-5 md:max-w-[375px]"
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
        {pageData.sectionTwoActive ? (
          <section
            className="story relative mb-20 bg-black transition-all"
            onMouseEnter={() => setSectionTwoHover(true)}
            onMouseLeave={() => setSectionTwoHover(false)}
          >
            {removeSectionTwoHover && (
              <div
                className={` absolute right-0 top-0 h-full w-full bg-red-300 opacity-25 transition-all`}
              ></div>
            )}
            <button
              className={`${
                sectionTwoHover ? "opacity-100" : "opacity-0"
              } absolute right-10 top-0 mt-5 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
              onMouseEnter={() => setRemoveSectionTwoHover(true)}
              onMouseLeave={() => setRemoveSectionTwoHover(false)}
              onClick={async () => {
                const changeSectionTwo = await changeSectionTwoActive("true");
                if (changeSectionTwo) {
                  setPageData((prev) => ({
                    ...prev,
                    sectionTwoActive: false,
                  }));
                }
                setRemoveSectionTwoHover(false);
              }}
            >
              -
            </button>
            <div className="container mx-auto my-20 max-w-screen-lg gap-5 px-5 py-20 md:grid md:grid-cols-2 md:items-center md:justify-between">
              <div className="content-left">
                {headerThreeEdit ? (
                  <textarea
                    ref={headerThreeTextareaRef}
                    value={headerThreeEditValue}
                    onChange={(e) => setHeaderThreeEditValue(e.target.value)}
                    onBlur={() => {
                      setHeaderThreeEditValue(pageData.headerThree);
                      setHeaderThreeEdit(false);
                    }}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        await handleHeaderThreeSubmit();
                      }
                    }}
                    className="mb-8 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-4xl font-bold text-white outline-none focus:outline-none focus:ring-0 md:text-5xl md:leading-tight"
                    autoFocus
                    maxLength={50}
                  />
                ) : (
                  <h2
                    className="mb-8 cursor-pointer select-none text-4xl font-bold text-white transition-all hover:opacity-50 md:text-5xl md:leading-tight"
                    onClick={() => setHeaderThreeEdit(true)}
                  >
                    {pageData.headerThree}
                  </h2>
                )}
                {descriptionTwoEdit ? (
                  <textarea
                    ref={descriptionTwoTextareaRef}
                    value={descriptionTwoEditValue}
                    onChange={(e) => setDescriptionTwoEditValue(e.target.value)}
                    onBlur={() => {
                      setDescriptionTwoEditValue(pageData.descriptionTwo);
                      setDescriptionTwoEdit(false);
                    }}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        await handleDescriptionTwoSubmit();
                      }
                    }}
                    className="mb-5 w-full resize-none appearance-none overflow-hidden border-none bg-transparent text-lg font-semibold leading-snug text-white outline-none focus:outline-none focus:ring-0"
                    style={{ minHeight: "7.5em" }}
                    autoFocus
                    maxLength={250}
                  />
                ) : (
                  <p
                    className="description cursor-pointer select-none text-lg font-semibold text-white transition-all hover:opacity-50"
                    onClick={() => setDescriptionTwoEdit(true)}
                  >
                    {pageData.descriptionTwo}
                  </p>
                )}

                <div className="events-wrapper my-5">
                  <div className="event flex items-start justify-between gap-4">
                    <div className="mt-1 h-4 w-4 rounded border-2 bg-indigo-600"></div>
                    <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white">
                      {pageData.bulletOne}
                    </p>
                  </div>
                  <div className="event flex items-start justify-between gap-4">
                    <div className="mt-1 h-4 w-4 rounded border-2 bg-sky-600"></div>
                    <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white">
                      {pageData.bulletTwo}
                    </p>
                  </div>
                  <div className="event flex items-start justify-between gap-4">
                    <div className="mt-1 h-4 w-4 rounded border-2 bg-yellow-500"></div>
                    <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white">
                      {pageData.bulletThree}
                    </p>
                  </div>
                </div>
              </div>
              <div className="content-right">
                <div
                  className={`image-wrapper relative mb-5 transition-all md:max-w-[375px] ${
                    removeSectionTwoHover
                      ? "rounded-3xl bg-red-300 opacity-25"
                      : ""
                  }`}
                  onMouseEnter={() => setImageOneEdit(true)}
                  onMouseLeave={() => setImageOneEdit(false)}
                  onClick={() =>
                    imageOneFileInput.current &&
                    imageOneFileInput.current.click()
                  }
                >
                  <input
                    type="file"
                    ref={imageOneFileInput}
                    className="hidden"
                    accept=".jpg,.png"
                    onChange={async (e) => {
                      await handleFileUpload(
                        "about-image-one-upload",
                        setImageOneEdit,
                        "imageOne",
                        e
                      );
                    }}
                  />
                  <img src={pageData.imageOne} alt="" className="rounded-3xl" />
                  <div
                    className={`absolute right-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-3xl border-8 border-dashed border-black bg-white text-3xl font-bold text-black transition-all ${
                      imageOneEdit ? "opacity-50" : "opacity-0"
                    }`}
                  >
                    click to upload image
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <AddSection setPageData={setPageData} />
        )}
        {/* resume */}
        <section className="resume">
          <div className="container mx-auto my-20 max-w-screen-lg px-5 py-20">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {pageData.headerFour}
            </h2>
            <div className="resume-events">
              {userData.work.map((job, index) => (
                <JobCard
                  key={index}
                  companyTitle={job.company}
                  role={job.position}
                  description={job.description}
                  duration={job.startDate + " - " + job.endDate}
                  active={index === 0}
                />
              ))}
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
        {/* services */}
        <section className="services">
          <div className="container mx-auto my-20 max-w-screen-lg px-5 py-20">
            <h2 className="mb-8 text-center text-3xl font-bold">
              {pageData.headerFive}
            </h2>
            <p className="desciption mb-8 text-center text-lg font-semibold">
              {pageData.descriptionThree}
            </p>
            <div className="cards-wrapper flex flex-wrap justify-center gap-5 lg:justify-between">
              {pageData.values.map((value, index) => (
                <Card
                  key={index}
                  title={value.value.replaceAll("_", " ")}
                  description={ValuesData[value.value].description}
                  imageUrl={ValuesData[value.value].image}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
