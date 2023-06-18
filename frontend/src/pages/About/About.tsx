import Marquee from "Components/Marquee/Marquee"
import JobCard from "./JobCard/JobCard"
import Footer from "Components/Footer/Footer"

const About = () => {

    const skills = ['Web Design', 'Product Design', 'Design Thinking', 'UI/UX Designer', 'Branding']

    return (
        <>
        <main>
            <div className="container mx-auto my-20 max-w-screen-lg px-5">
                {/* about */}
                <section className="about grid grid-cols-2 gap-10 justify-center mb-20">
                    <div className="content-wrapper col-span-2">
                        <h2 className="text-center text-4xl font-bold mb-5">Hello, I'm <br /> <span className="bg-blue-500 mt-1 inline-block text-white">John Carter</span></h2>
                        <p className="description text-center mb-8 text-lg font-semibold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id odio blanditiis mollitia quas, repellat illo.</p>
                        <div className="about-controls text-center">
                            <a href="#" className="text-white bg-black rounded-xl border-2 border-transparent px-4 py-2 mr-2 mb-4 font-bold transition ease-in hover:-translate-y-1 inline-block hover:bg-blue-500 w-full">Get in touch</a>
                            <a href="#" className="border-2 border-black rounded-xl px-4 py-2 font-bold transition ease-in hover:-translate-y-1 inline-block hover:bg-black hover:text-white w-full">My story</a>
                        </div>
                    </div>
                    <div className="image-wrapper w-full text-center">
                        <img className="max-w-[150px] inline-block" src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b440128f648585c383865_about-hero-left-image-paperfolio-webflow-template.png" alt="portfolio" />
                    </div>
                    <div className="image-wrapper w-full text-center">
                        <img className="max-w-[150px] inline-block" src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b443e2bb8e12b5faf51a7_about-hero-rigth-image-paperfolio-webflow-template.png" alt="portfolio" />
                    </div>
                </section>
            </div>
            {/* Story */}
            <section className="story mb-20">
                <div className="container mx-auto my-20 max-w-screen-lg px-5">

                    <h2 className="text-3xl font-bold text-center mb-8">My <span className="bg-indigo-600 text-white">story</span> as a designer</h2>
                    <div className="image-wrapper mb-5">
                        <img src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b52d3639fb5250039e574_my-story-image-paperfolio-webflow-template.png" alt="" />
                    </div>
                    <p className="description mb-5 font-semibold text-lg">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat ad quo est officiis facilis commodi esse amet porro, reprehenderit ullam nulla fuga consequatur reiciendis nam.
                    </p>
                    <p className="description mb-5 font-semibold text-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, deserunt fugiat rem porro, dolores ducimus explicabo voluptas assumenda beatae eaque sequi at cumque eveniet illo? Voluptatum beatae voluptate voluptates doloribus.
                    </p>
                    <div className="story-control text-center">
                        <a href="#" className="text-white bg-black rounded-xl border-2 border-transparent px-4 py-2 mr-2 mb-4 font-bold transition ease-in hover:-translate-y-1 inline-block hover:bg-blue-500 w-full">Get in touch</a>
                    </div>
                </div>
            </section>
            <section className="story mb-20 bg-black">
                <div className="container mx-auto my-20 max-w-screen-lg px-5 py-20">
                    <h2 className="text-3xl font-bold mb-8 text-white">Designing since I was <span className="bg-red-500 text-white mt-2 inline-block">16 years old</span></h2>
                    <p className="description text-white font-semibold text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi, ipsam illo. Quas, maiores perspiciatis aperiam eum excepturi laudantium hic nisi assumenda adipisci quo quis similique.</p>
                    <div className="events-wrapper my-5">
                        <div className="event flex items-start gap-4 justify-between">
                            <div className="bg-indigo-600 h-4 w-4 rounded border-2 mt-1"></div>
                            <p className="event-descripition text-lg font-semibold text-white flex-1 pt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, placeat!</p>
                        </div>
                        <div className="event flex items-start gap-4 justify-between">
                            <div className="bg-sky-600 h-4 w-4 rounded border-2 mt-1"></div>
                            <p className="event-descripition text-lg font-semibold text-white flex-1 pt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, placeat!</p>
                        </div>
                        <div className="event flex items-start gap-4 justify-between">
                            <div className="bg-yellow-500 h-4 w-4 rounded border-2 mt-1"></div>
                            <p className="event-descripition text-lg font-semibold text-white flex-1 pt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, placeat!</p>
                        </div>
                    </div>
                    <div className="story-control text-center mb-5">
                        <a href="#" className="text-black bg-white rounded-xl border-2 border-transparent px-4 py-2 mr-2 mb-4 font-bold transition ease-in hover:-translate-y-1 inline-block hover:bg-blue-500 w-full">Get in touch</a>
                    </div>
                    <div className="image-wrapper">
                        <img src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633b55bcb4baec57b75b66fd_desigining-experience-paperfolio-webflow-template.png" alt="" />
                    </div>
                </div>
            </section>
            {/* resume */}
            <section className="resume">
                <div className="container mx-auto my-20 max-w-screen-lg px-5 py-20">
                    <h2 className="font-bold text-3xl text-center mb-8">Take a look at my <span className="bg-yellow-500">resume</span></h2>
                    <div className="resume-events">
                        <JobCard companyTitle="Facebook" role="Mobile Product Designer" description="Vel facilisis volutpat est velit egestas dui. Urna nec cidu praesent semper feugiat. Vulputate ut" duration="Jan 2023 - Present" active />
                        <JobCard companyTitle="Twitter" role="UI / UX Designer" description="Vel facilisis volutpat est velit egestas dui. Urna nec cidu praesent semper feugiat. Vulputate ut" duration="Jan 2021 - Dec 2022" />
                        <JobCard companyTitle="Youtube" role="VP of Design" description="Vel facilisis volutpat est velit egestas dui. Urna nec cidu praesent semper feugiat. Vulputate ut" duration="Mar 2020 - Dec 2020" />
                    </div>
                    <div className="resume-control text-center">
                        <a href="#" className="text-white bg-black rounded-xl border-2 border-transparent px-4 py-2 mr-2 mb-4 font-bold transition ease-in hover:-translate-y-1 inline-block hover:bg-blue-500 w-full">Get in touch</a>
                    </div>
                </div>
            </section>
            <Marquee items={skills} />

            {/* services */}
            <section className="services">
                <div className="container mx-auto my-20 max-w-screen-lg px-5 py-20">
                    <h2 className="font-bold text-3xl text-center mb-8">The core values that drive my work</h2>
                    <p className="desciption text-center font-semibold text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi saepe in iure alias tenetur sapiente voluptatum assumenda placeat? Veniam, laboriosam.</p>
                    <div className="cards-wrapper">
                        
                    </div>
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}

export default About