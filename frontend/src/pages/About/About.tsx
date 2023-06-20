import Marquee from "Components/Marquee/Marquee";
import JobCard from "./JobCard/JobCard";
import Footer from "Components/Footer/Footer";
import Card from "Components/Card/Card";

const About = () => {
  const skills = [
    "Web Design",
    "Product Design",
    "Design Thinking",
    "UI/UX Designer",
    "Branding",
  ];

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
                  John Carter
                </span>
              </h2>
              <p className="description mb-8 text-center text-lg font-semibold">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id
                odio blanditiis mollitia quas, repellat illo.
              </p>
              <div className="about-controls text-center">
                <a
                  href="#"
                  className="mb-4 mr-2 inline-block w-full rounded-xl border-2 border-transparent bg-black px-4 py-2 font-bold text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500 md:w-auto"
                >
                  Get in touch
                </a>
                <a
                  href="#"
                  className="inline-block w-full rounded-xl border-2 border-black px-4 py-2 font-bold transition ease-in hover:-translate-y-1 hover:bg-black hover:text-white md:w-auto"
                >
                  My story
                </a>
              </div>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                mod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad inim veniam, quis nostrud exercitation ullamco laboris nisi
                ut aliquip ex ea commodo consequat.
              </p>
              <p className="description mb-5 text-lg font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, deserunt fugiat rem porro, dolores ducimus explicabo
                voluptas assumenda beatae eaque sequi at cumque eveniet illo?
                Voluptatum beatae voluptate voluptates doloribus.
              </p>
              <div className="story-control text-center md:text-left">
                <a
                  href="#"
                  className="mb-4 mr-2 inline-block w-full rounded-xl border-2 border-transparent bg-black px-4 py-2 font-bold text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500 md:w-auto"
                >
                  Get in touch
                </a>
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
                  16 years old
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
              <div className="story-control mb-5 text-center md:text-left">
                <a
                  href="#"
                  className="mb-4 mr-2 inline-block w-full rounded-xl border-2 border-transparent bg-white px-4 py-2 font-bold text-black transition ease-in hover:-translate-y-1 hover:bg-blue-500 md:w-auto"
                >
                  Get in touch
                </a>
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
              <JobCard
                companyTitle="Facebook"
                role="Mobile Product Designer"
                description="Vel facilisis volutpat est velit egestas dui. Urna nec cidu praesent semper feugiat. Vulputate ut"
                duration="Jan 2023 - Present"
                active
              />
              <JobCard
                companyTitle="Twitter"
                role="UI / UX Designer"
                description="Vel facilisis volutpat est velit egestas dui. Urna nec cidu praesent semper feugiat. Vulputate ut"
                duration="Jan 2021 - Dec 2022"
              />
              <JobCard
                companyTitle="Youtube"
                role="VP of Design"
                description="Vel facilisis volutpat est velit egestas dui. Urna nec cidu praesent semper feugiat. Vulputate ut"
                duration="Mar 2020 - Dec 2020"
              />
            </div>
            <div className="resume-control text-center">
              <a
                href="#"
                className="mb-4 mr-2 inline-block w-full rounded-xl border-2 border-transparent bg-black px-4 py-2 font-bold text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>
        <Marquee items={skills} />
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
                imageUrl="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b6863165495ea4480a18a_hard-work-image-paperfolio-webflow-template.png"
              />
              <Card
                title="Transparency"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam, sequi corporis quaerat voluptatibus deserunt"
                imageUrl="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633c47da68ca183fc8091e34_transparency-image-paperfolio-webflow-template.png"
              />
              <Card
                title="Innovation"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam, sequi corporis quaerat voluptatibus deserunt"
                imageUrl="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633c47da6cc8718f2fb6d9ac_innovation-image-paperfolio-webflow-template.png"
              />
              <Card
                title="Growth"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam, sequi corporis quaerat voluptatibus deserunt"
                imageUrl="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633c47da606f910b55d8f1f4_growth-image-paperfolio-webflow-template.png"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
