import Marquee from "Components/Marquee/Marquee";
import JobCard from "./JobCard/JobCard";
import Footer from "Components/Footer/Footer";
import Card from "Components/Card/Card";
import React from "react";
import { Link } from "react-router-dom";
import { ValuesData } from "Type/Values.tsx";
import UserData from "Type/UserData.tsx";
import AboutData from "Type/AboutData.tsx";

const About: React.FC<{ userData: UserData; pageData: AboutData }> = ({
  userData,
  pageData,
}) => {
  console.log(userData);

  return (
    <>
      <main>
        <div className="container mx-auto my-20 max-w-screen-lg px-5">
          {/* about */}
          <section className="about mb-20 grid grid-cols-2 justify-center gap-10 md:h-[400px] md:grid-cols-5">
            <div className="content-wrapper col-span-2  md:order-2 md:col-span-3">
              <h2 className="mb-5 text-center text-5xl font-bold md:text-7xl">
                {pageData.headerOne}
              </h2>
            </div>
            <div className="image-wrapper order-2 w-full text-center md:order-1 md:self-end">
              <img
                className="inline-block max-w-[150px]"
                src={pageData.iconOne}
                alt="portfolio"
              />
            </div>
            <div className="image-wrapper w-full text-center md:order-last md:self-start">
              <img
                className="inline-block max-w-[150px]"
                src={pageData.iconTwo}
                alt="portfolio"
              />
            </div>
          </section>
        </div>
        {/* Story */}
        <section className="story mb-20">
          <div className="container mx-auto my-20 max-w-screen-lg gap-5 px-5 md:grid md:grid-cols-2 md:items-start md:justify-between">
            <div className="content-left">
              <h2 className="mb-8 text-center text-4xl font-bold md:text-left md:text-6xl md:leading-tight">
                {pageData.headerTwo}
              </h2>
              <div className="image-wrapper mb-5 md:max-w-[375px]">
                <img src={pageData.iconThree} alt="" />
              </div>
            </div>
            <div className="content-right">
              <p className="description mb-5 text-lg font-semibold">
                {pageData.descriptionOne}
              </p>
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
        <section className="story mb-20 bg-black">
          <div className="container mx-auto my-20 max-w-screen-lg gap-5 px-5 py-20 md:grid md:grid-cols-2 md:items-center md:justify-between">
            <div className="content-left">
              <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl md:leading-tight">
                {pageData.headerThree}
              </h2>
              <p className="description text-lg font-semibold text-white">
                {pageData.descriptionTwo}
              </p>
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
              <div className="image-wrapper">
                <img src={pageData.imageOne} alt="" />
              </div>
            </div>
          </div>
        </section>
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
