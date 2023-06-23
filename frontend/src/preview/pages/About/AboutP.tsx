import React from "react";
import AuthProps from "Type/AuthProps.tsx";
import Loader from "Components/Loader/Loader.tsx";
import JobCard from "../../../pages/About/JobCard/JobCard.tsx";
import Marquee from "Components/Marquee/Marquee.tsx";
import Card from "Components/Card/Card.tsx";
import {Link} from "react-router-dom";


const AboutP: React.FC<AuthProps> = ({ userData, loading }) => {

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <main>
                <div className="container mx-auto my-20 max-w-screen-lg px-5">
                    {/* about */}
                    <section className="about mb-20 grid grid-cols-2 justify-center gap-10 md:h-[400px] md:grid-cols-5">
                        <div className="content-wrapper col-span-2  md:order-2 md:col-span-3">
                            <h2 className="mb-5 text-center text-5xl font-bold md:text-7xl">
                                Hello, I'm <br />{" "}
                                <span className="mt-1 inline-block bg-blue-500 text-white">
                  {userData?.name}
                </span>
                            </h2>
                        </div>
                        <div className="image-wrapper order-2 w-full text-center md:order-1 md:self-end">
                            <img
                                className="inline-block max-w-[150px]"
                                src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b440128f648585c383865_about-hero-left-image-paperfolio-webflow-template.png"
                                alt="portfolio"
                            />
                        </div>
                        <div className="image-wrapper w-full text-center md:order-last md:self-start">
                            <img
                                className="inline-block max-w-[150px]"
                                src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b443e2bb8e12b5faf51a7_about-hero-rigth-image-paperfolio-webflow-template.png"
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
                                My <span className="bg-indigo-600 text-white">story</span> as a
                                designer
                            </h2>
                            <div className="image-wrapper mb-5 md:max-w-[375px]">
                                <img
                                    src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b52d3639fb5250039e574_my-story-image-paperfolio-webflow-template.png"
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="content-right">
                            <p className="description mb-5 text-lg font-semibold">
                                {userData.about}
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
                                Designing since I was{" "}
                                <span className="mt-2 inline-block bg-red-500 text-white">
                  ? years old
                </span>
                            </h2>
                            <p className="description text-lg font-semibold text-white">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi,
                                ipsam illo. Quas, maiores perspiciatis aperiam eum excepturi
                                laudantium hic nisi assumenda adipisci quo quis similique.
                            </p>
                            <div className="events-wrapper my-5">
                                <div className="event flex items-start justify-between gap-4">
                                    <div className="mt-1 h-4 w-4 rounded border-2 bg-indigo-600"></div>
                                    <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Soluta, placeat!
                                    </p>
                                </div>
                                <div className="event flex items-start justify-between gap-4">
                                    <div className="mt-1 h-4 w-4 rounded border-2 bg-sky-600"></div>
                                    <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Soluta, placeat!
                                    </p>
                                </div>
                                <div className="event flex items-start justify-between gap-4">
                                    <div className="mt-1 h-4 w-4 rounded border-2 bg-yellow-500"></div>
                                    <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Soluta, placeat!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="content-right">
                            <div className="image-wrapper">
                                <img
                                    src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b55bcb4baec57b75b66fd_desigining-experience-paperfolio-webflow-template.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* resume */}
                <section className="resume">
                    <div className="container mx-auto my-20 max-w-screen-lg px-5 py-20">
                        <h2 className="mb-8 text-center text-3xl font-bold">
                            Take a look at my <span className="bg-yellow-500">resume</span>
                        </h2>
                        <div className="resume-events">
                            {userData.work.map((job, index) => (
                                <JobCard
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
                            The core values that drive my work
                        </h2>
                        <p className="desciption mb-8 text-center text-lg font-semibold">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                            saepe in iure alias tenetur sapiente voluptatum assumenda placeat?
                            Veniam, laboriosam.
                        </p>
                        <div className="cards-wrapper flex flex-wrap justify-center gap-5 lg:justify-between">
                            <Card
                                title="Hard Work"
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam, sequi corporis quaerat voluptatibus deserunt"
                                imageUrl="https://img.icons8.com/cotton/400/fast-delivery--v1.png"
                            />
                            <Card
                                title="Transparency"
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam, sequi corporis quaerat voluptatibus deserunt"
                                imageUrl="https://img.icons8.com/cotton/400/search-property.png"
                            />
                            <Card
                                title="Innovation"
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam, sequi corporis quaerat voluptatibus deserunt"
                                imageUrl="https://img.icons8.com/cotton/400/gas-industry.png"
                            />
                            <Card
                                title="Growth"
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam, sequi corporis quaerat voluptatibus deserunt"
                                imageUrl="https://img.icons8.com/cotton/400/hand-planting--v1.png"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};
export default AboutP;