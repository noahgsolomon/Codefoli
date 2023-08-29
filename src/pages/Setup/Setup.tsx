import React, { useEffect, useMemo, useState } from "react";
import { setupAccount } from "api/userapi.tsx";
import { Skills } from "Type/Skills.tsx";
import { useNavigate } from "react-router-dom";
import Work from "Type/Work.tsx";
import Project from "Type/Project.tsx";
import { Services } from "Type/Services.tsx";
import UserData from "Type/UserData.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";

const Setup: React.FC<{ userData: UserData }> = ({ userData }) => {
  const [page, setPage] = useState(0);
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");

  const [profession, setProfession] = useState("");
  const [projects, setProjects] = useState<
    { project: Project; color: string }[]
  >([]);
  const [work, setWork] = useState<{ work: Work; color: string }[]>([]);
  const [addWork, setAddWork] = useState({
    company: "",
    position: "",
    start_date: "",
    end_date: "",
    description: "",
  });
  const [skillSearch, setSkillsSkillSearch] = useState("");
  const [serviceSearch, setServicesSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<
    { skill: string; color: string }[]
  >([]);
  const [selectedServices, setSelectedServices] = useState<
    { service: string; color: string }[]
  >([]);
  const [addingJob, setAddingJob] = useState(false);
  const [addingProject, setAddingProject] = useState(false);
  const [addProject, setAddProject] = useState({
    name: "",
    description: "",
    languages: [""],
    updatedAt: "",
    id: "",
    image: "",
    slug: "",
  });
  const allSkills = Skills;
  const allServices = Services;
  const [matchingSkills, setMatchingSkills] = useState<string[]>([
    ...allSkills,
  ]);
  const [matchingServices, setMatchingServices] = useState<string[]>([
    ...allServices,
  ]);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const colors = useMemo(
    () => [
      "bg-yellow-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-teal-500",
      "bg-red-500",
      "bg-orange-500",
      "bg-lime-500",
      "bg-cyan-500",
      "bg-sky-500",
      "bg-rose-500",
      "bg-fuchsia-500",
      "bg-violet-500",
      "bg-amber-500",
      "bg-emerald-500",
    ],
    []
  );

  useEffect(() => {
    const searchUpper = skillSearch.toUpperCase();
    const newMatchingSkills = allSkills.filter((skill: string) =>
      skill.toUpperCase().includes(searchUpper)
    );
    setMatchingSkills(newMatchingSkills);
  }, [skillSearch, allSkills]);

  useEffect(() => {
    const searchUpper = serviceSearch.toUpperCase();
    const newMatchingServices = allServices.filter((service: string) =>
      service.toUpperCase().includes(searchUpper)
    );
    setMatchingServices(newMatchingServices);
  }, [serviceSearch, allServices]);

  useEffect(() => {
    if (
      localStorage.getItem("role") &&
      localStorage.getItem("role") === "NEWBIE"
    ) {
      setCompany(userData.company || "");
      setLocation(userData.location || "");
      userData.projects
        ? setProjects(
            userData.projects.map((project: Project) => ({
              project: {
                id: project.id,
                name: project.name,
                description: project.description || "",
                languages: project.languages || [],
                updatedAt: project.updatedAt,
                image: project.image || "",
                slug: project.slug || "",
              },
              color: colors[Math.floor(Math.random() * colors.length)],
            }))
          )
        : setProjects([]);
    }
  }, [navigate, userData, colors]);

  const submitSetup = async () => {
    setSubmitted(true);
    const postData = await setupAccount(
      userData.name,
      company,
      location,
      selectedSkills.map((skill) => skill.skill),
      work.map((item) => item.work),
      projects.map((item) => item.project),
      profession,
      about,
      selectedServices.map((service) =>
        service.service
          .toUpperCase()
          .replaceAll(" ", "_")
          .replaceAll("/", "_")
          .replaceAll(".", "_")
          .replaceAll("-", "_")
      )
    );

    if (postData.status === "OK") {
      window.location.href = "/dashboard";
    } else {
      alert("Error");
      window.location.reload();
    }
  };

  const incrementPage = () => {
    if (page < 2) {
      setPage(page + 1);
    }
  };
  const decrementPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const addSkill = (skill: Skills) => {
    const skillExists = selectedSkills.some((selectedSkill) =>
      Object.is(selectedSkill.skill, skill)
    );
    if (!skillExists) {
      setSelectedSkills([
        ...selectedSkills,
        {
          skill: skill,
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ]);
    }
  };

  const addService = (service: Services) => {
    const serviceExists = selectedServices.some((selectedService) =>
      Object.is(selectedService.service, service)
    );
    if (!serviceExists) {
      setSelectedServices([
        ...selectedServices,
        {
          service: service,
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill.skill !== skillToRemove)
    );
  };

  const removeService = (serviceToRemove: string) => {
    setSelectedServices(
      selectedServices.filter((service) => service.service !== serviceToRemove)
    );
  };

  function removeJob(indexToRemove: number) {
    setWork((prevWork) =>
      prevWork.filter((_, index) => index !== indexToRemove)
    );
  }

  function removeProject(indexToRemove: number) {
    setProjects((prevProjects) =>
      prevProjects.filter((_, index) => index !== indexToRemove)
    );
  }

  return (
    <div className="my-5 flex flex-col items-center justify-center">
      <div className="mb-10 text-4xl font-bold">
        Let's set up your{" "}
        <span className="bg-red-500 px-1 py-1 text-white">Page</span>!
      </div>
      {page === 0 && (
        <form
          noValidate={true}
          className="md:8/12 mb-4 mt-5 w-full max-w-2xl rounded border-2 border-black px-8 pb-8 pt-6 shadow-custom transition-all sm:w-11/12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative">
            <label htmlFor="profession" className="text-base font-bold">
              Profession
            </label>
            <div className="relative">
              <input
                type="text"
                id="profession"
                value={profession}
                placeholder="// Graphic Designer"
                className={`mb-4 mt-2 w-full dark:bg-[#1a1a1a] placeholder:dark:text-gray-200 placeholder:text-gray-800 rounded-xl border-2 border-black p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                onChange={(e) => setProfession(e.target.value)}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/48/certificate--v1.png"
                alt="profession"
                className="absolute left-2 top-9 -translate-y-1/2 transform"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="company" className="text-base font-bold">
              Company
            </label>
            <div className="relative">
              <input
                type="text"
                id="company"
                value={company}
                placeholder="// Monsters Inc."
                className={`mb-4 mt-2 w-full rounded-xl placeholder:dark:text-gray-200 placeholder:text-gray-800 border-2 border-black p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow dark:bg-[#1a1a1a] hover:shadow-customHover focus:ring-0`}
                onChange={(e) => setCompany(e.target.value)}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/48/box--v2.png"
                alt="company"
                className="absolute left-2 top-9 -translate-y-1/2 transform"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="location" className="text-base font-bold">
              Location
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                value={location}
                placeholder="// Hong Kong, China"
                className={`mb-4 mt-2 w-full dark:bg-[#1a1a1a] rounded-xl border-2 placeholder:dark:text-gray-200 placeholder:text-gray-800 border-black p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                onChange={(e) => setLocation(e.target.value)}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/48/airplane-take-off--v1.png"
                alt="location"
                className="absolute left-2 top-9 -translate-y-1/2 transform"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="about" className="text-base font-bold">
              About
            </label>
            <div className="relative">
              <textarea
                id="about"
                placeholder="// Please write a short description about yourself"
                value={about}
                className={`mb-4 mt-2 dark:bg-[#1a1a1a] w-full placeholder:dark:text-gray-200 placeholder:text-gray-800 rounded-xl border-2 border-black p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                onChange={(e) => setAbout(e.target.value)}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/48/quill-pen.png"
                alt="about"
                className="absolute left-2 top-9 -translate-y-1/2 transform"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="skills" className="text-base font-bold">
              Skills
            </label>
            <p className="text-sm text-gray-300">Pick up to 12</p>
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  id="skills"
                  value={skillSearch}
                  className={`mb-4 mt-2 w-full dark:bg-[#1a1a1a] rounded-xl border-2 placeholder:dark:text-gray-200 placeholder:text-gray-800 border-black p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                  onChange={(e) => setSkillsSkillSearch(e.target.value)}
                  disabled={selectedSkills.length >= 12}
                />
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/cotton/48/filled-star.png"
                  alt="services"
                  className="absolute left-2 top-9 -translate-y-1/2 transform"
                />
              </div>
              {skillSearch && matchingSkills.length > 0 && (
                <div className="absolute left-0 z-10 mt-2 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded border border-gray-200 bg-white dark:bg-[#1a1a1a] pb-72 pt-5">
                  {matchingSkills.map((skill) => (
                    <div
                      key={skill}
                      className="m-1 inline-block cursor-pointer rounded-full border-black  bg-black dark:bg-gray-50 p-2 transition-all hover:-translate-y-0.5 hover:opacity-90"
                      onClick={() => {
                        if (Skills.includes(skill as Skills)) {
                          addSkill(skill as Skills);
                          setSkillsSkillSearch("");
                        }
                      }}
                    >
                      <span className="px-2 text-white dark:text-gray-800">{skill}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selectedSkills.map((skill) => (
              <div
                key={skill.skill}
                className={
                  "m-1 inline-block cursor-pointer rounded-full p-2 transition-all hover:-translate-y-0.5 hover:opacity-90 " +
                  skill.color
                }
                onClick={() => removeSkill(skill.skill)}
              >
                <span className="px-2 text-white">{skill.skill}</span>
              </div>
            ))}
          </div>
          <div className="relative">
            <label htmlFor="services" className="text-base font-bold">
              Services
            </label>
            <p className="text-sm text-gray-300">Pick up to 4</p>
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  id="services"
                  value={serviceSearch}
                  className={`mb-4 mt-2 w-full rounded-xl border-2 placeholder:dark:text-gray-200 placeholder:text-gray-800 border-black bg-white dark:bg-[#1a1a1a] p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                  onChange={(e) => setServicesSearch(e.target.value)}
                  disabled={selectedServices.length >= 4}
                />
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/cotton/48/trophy--v1.png"
                  alt="services"
                  className="absolute left-2 top-9 -translate-y-1/2 transform"
                />
              </div>
              {serviceSearch && matchingServices.length > 0 && (
                <div className="absolute left-0 z-10 mt-2 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded border border-gray-200 bg-white dark:bg-[#1a1a1a] pb-72 pt-5">
                  {matchingServices.map((service) => (
                    <div
                      key={service}
                      className="m-1 inline-block cursor-pointer rounded-full border-black  bg-black  dark:bg-gray-50 p-2 transition-all hover:-translate-y-0.5 hover:opacity-90"
                      onClick={() => {
                        if (Services.includes(service)) {
                          addService(service);
                          setServicesSearch("");
                        }
                      }}
                    >
                      <span className="px-2 text-white dark:text-gray-800">{service}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selectedServices.map((service) => (
              <div
                key={service.service}
                className={
                  "m-1 inline-block cursor-pointer rounded-full p-2 transition-all hover:-translate-y-0.5 hover:opacity-90 " +
                  service.color
                }
                onClick={() => removeService(service.service)}
              >
                <span className="px-2 text-white">{service.service}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => incrementPage()}
              className={
                "bg- mt-3 flex cursor-pointer text-white bg-black hover:opacity-80 dark:text-gray-800 dark:bg-gray-200 dark:hover:opacity-80 items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all "}
            >
              Next
            </button>
          </div>
        </form>
      )}
      {page === 1 && (
        <form
          noValidate={true}
          className="md:8/12 mb-4 mt-5 w-full max-w-2xl rounded border-2 border-black bg-white dark:bg-[#1a1a1a] px-8 pb-8 pt-6 shadow-custom transition-all sm:w-11/12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            {work.map((job, index) => (
              <div
                key={index}
                className="mb-4 rounded border-2 border-black bg-white dark:bg-[#1a1a1a] px-4 pb-8 pt-6 shadow-custom transition-all hover:-translate-y-0.5"
              >
                <div className="flex flex-row justify-between">
                  <h3
                    className={`mb-2 px-2 py-1 font-bold text-white ${job.color}`}
                  >
                    {job.work.company}
                  </h3>
                  <div className="flex items-center">
                    <button
                      className="mr-2 rounded-full border-2 border-black px-4 py-2 text-sm transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white hover:opacity-90"
                      onClick={() => {
                        setAddWork(job.work);
                        setAddingJob(true);
                        removeJob(index);
                        window.scrollTo(0, document.body.scrollHeight);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded-full bg-red-500 px-4 py-2 text-sm text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                      onClick={() => removeJob(index)}
                    >
                      &times;
                    </button>
                  </div>
                </div>

                <p className="font-bold underline">{job.work.position}</p>
                <p>
                  {job.work.start_date}-
                  {job.work.end_date}
                </p>
                <p className="font mt-5 italic">{job.work.description}</p>
              </div>
            ))}
          </div>
          {addingJob && (
            <div className="mb-4 rounded border-2 border-black  bg-white dark:bg-[#1a1a1a] px-8 pb-8 pt-6 shadow-custom   transition-all hover:shadow-customHover">
              <div className="relative">
                <label htmlFor="company" className="text-base font-bold">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  placeholder="// Facebook"
                  value={addWork.company}
                  className={`mb-4 mt-2 w-full rounded-xl placeholder:dark:text-gray-200 placeholder:text-gray-800 border-2 border-black dark:bg-[#1a1a1a] p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:ring-0`}
                  onChange={(e) => setAddWork({ ...addWork, company: e.target.value })}
                />
              </div>

              <div className="relative">
                <label htmlFor="position" className="text-base font-bold">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  placeholder="// the CEO"
                  value={addWork.position}
                  className={`mb-4 mt-2 w-full rounded-xl border-2 dark:bg-[#1a1a1a] placeholder:dark:text-gray-200 placeholder:text-gray-800 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                  onChange={(e) => setAddWork({ ...addWork, position: e.target.value })}
                />
              </div>
              <div className="relative">
                <label htmlFor="start-date" className="text-base font-bold">
                  Start Date
                </label>
                <input
                  type="text"
                  id="start-date"
                  placeholder="// 12/30/12"
                  value={addWork.start_date}
                  className={`mb-4 mt-2 w-full rounded-xl placeholder:dark:text-gray-200 dark:bg-[#1a1a1a] placeholder:text-gray-800 border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                  onChange={(e) => setAddWork({ ...addWork, start_date: e.target.value })}
                />
              </div>

              <div className="relative">
                <label htmlFor="end-date" className="text-base font-bold">
                  End Date
                </label>
                <input
                  type="text"
                  id="end-date"
                  placeholder="// 6/09/23 or current"
                  value={addWork.end_date}
                  className={`mb-4 mt-2 w-full rounded-xl placeholder:dark:text-gray-200 placeholder:text-gray-800 border-2 border-black bg-white dark:bg-[#1a1a1a] p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                  onChange={(e) => setAddWork({ ...addWork, end_date: e.target.value })}
                />
              </div>

              <div className="relative">
                <label htmlFor="description" className="text-base font-bold">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Please write a short description of your job."
                  value={addWork.description}
                  className={`mb-4 mt-2 w-full rounded-xl placeholder:dark:text-gray-200 placeholder:text-gray-800 border-2 border-black bg-white dark:bg-[#1a1a1a] p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                  onChange={(e) => setAddWork({ ...addWork, description: e.target.value })}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="underline transition-all hover:text-red-500"
                  onClick={() => {

                    setAddingJob(false);
                    setAddWork({
                      company: "",
                      position: "",
                      start_date: "",
                      end_date: "",
                      description: "",
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  className={
                    "mt-3 flex cursor-pointer items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all bg-black dark:bg-gray-50 dark:text-gray-800 dark:hover:bg-green-500 text-white hover:-translate-y-0.5 hover:bg-green-500 active:translate-y-0.5"}
                  onClick={() => {
                    if (addWork.company === "") {
                      return;
                    }
                    setWork([
                      ...work,
                      {
                        work: { ...addWork, order_id: 1, id: "", image: "" },
                        color:
                          colors[Math.floor(Math.random() * colors.length)],
                      },
                    ]);
                    setAddingJob(false);

                    setAddWork({
                      company: "",
                      position: "",
                      start_date: "",
                      end_date: "",
                      description: "",
                    });
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          )}
          {work.length < 1 && (
            <div
              className={`mb-4 rounded border-2 border-black bg-white dark:bg-[#1a1a1a] px-8 pb-8 pt-6 shadow-custom transition-all hover:-translate-y-0.5`}
            >
              <div className="flex flex-row justify-between">
                <h3 className="mb-2 bg-blue-500 px-2 py-1 font-bold text-white">
                  No jobs listed
                </h3>
              </div>

              <p className="font mt-5 italic">Add jobs below</p>
            </div>
          )}
          <div className="mb-32"></div>
          <div className="mb-4 flex justify-center">
            <button
              className={
                "flex rounded-full bg-black px-5 text-white dark:text-gray-800 dark:bg-gray-50 dark:hover:bg-green-500 transition-all hover:-translate-y-0.5 hover:bg-green-500 " +
                `${addingJob ? "hidden" : ""}`
              }
              onClick={() => {
                setAddingJob(true);
              }}
            >
              +
            </button>
          </div>
          <div className="flex justify-between">
            <button
              onClick={decrementPage}
              className="underline transition-all hover:text-blue-500"
            >
              Back
            </button>
            <button
              onClick={() => incrementPage()}
              className={
                "mt-3 flex cursor-pointer dark:bg-gray-200 bg-black hover:opacity-80 dark:hover:opacity-80 items-center justify-center rounded-2xl px-8 py-3 text-base text-white dark:text-gray-800 font-bold transition-all "}
            >
              Next
            </button>
          </div>
        </form>
      )}
      {page === 2 && (
        <form
          noValidate={true}
          className="md:8/12 mb-4 mt-5 w-full max-w-2xl rounded border-2 border-black bg-white dark:bg-[#1a1a1a] px-8 pb-8 pt-6 shadow-custom transition-all sm:w-11/12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            {projects.map((project, index) => (
              <div
                key={index}
                className="mb-4 rounded border-2 border-black bg-white dark:bg-[#1a1a1a] px-4 pb-8 pt-6 shadow-custom transition-all hover:-translate-y-0.5"
              >
                <div className="flex flex-row justify-between">
                  <h3
                    className={`mb-2 px-2 py-1 font-bold text-white ${project.color}`}
                  >
                    {project.project.name}
                  </h3>
                  <div className="flex items-center">
                    <button
                      className="mr-2 rounded-full border-2 border-black px-4 py-2 text-sm transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white hover:opacity-90"
                      onClick={() => {
                        setAddProject(project.project);
                        setAddingProject(true);
                        removeProject(index);
                        window.scrollTo(0, document.body.scrollHeight);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded-full bg-red-500 px-4 py-2 text-sm text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                      onClick={() => removeProject(index)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
                <p className="font-bold underline">
                  Language: {project.project.languages[0]}
                </p>
                <p>
                  {project.project.updatedAt}
                </p>
                <p className="font mt-5 italic">
                  {project.project.description}
                </p>
              </div>
            ))}
            {addingProject && (
              <div className="mb-4 rounded border-2 border-black bg-white dark:bg-[#1a1a1a] px-8 pb-8 pt-6 shadow-custom transition-all hover:shadow-customHover">
                <div className="relative">
                  <label htmlFor="name" className="text-base font-bold">
                    Project name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="// Mojo Compiler"
                    value={addProject.name}
                    className={`mb-4 mt-2 w-full rounded-xl border-2 dark:bg-[#1a1a1a] placeholder:dark:text-gray-200 placeholder:text-gray-800 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                    onChange={(e) => {
                      setAddProject({
                        ...addProject,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="language" className="text-base font-bold">
                    Language
                  </label>
                  <input
                    type="text"
                    id="language"
                    placeholder="// Mojo"
                    value={addProject.languages[0]}
                    className={`mb-4 mt-2 w-full rounded-xl dark:bg-[#1a1a1a] border-2 placeholder:dark:text-gray-200 placeholder:text-gray-800 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                    onChange={(e) => {
                      setAddProject({
                        ...addProject,
                        languages: [e.target.value],
                      });
                    }}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="date" className="text-base font-bold">
                    Date
                  </label>
                  <input
                    type="text"
                    id="date"
                    placeholder="// 01/06/21 or current"
                    value={addProject.updatedAt}
                    className={`mb-4 mt-2 w-full rounded-xl dark:bg-[#1a1a1a] border-2 placeholder:dark:text-gray-200 placeholder:text-gray-800 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                    onChange={(e) => {
                      setAddProject({
                        ...addProject,
                        updatedAt: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="description" className="text-base font-bold">
                    Description
                  </label>
                  <textarea
                    id="description"
                    placeholder="Please write a short description of your project."
                    value={addProject.description}
                    className={`mb-4 mt-2 max-h-52 w-full dark:bg-[#1a1a1a] rounded-xl placeholder:dark:text-gray-200 placeholder:text-gray-800 border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0`}
                    onChange={(e) => {
                      setAddProject({
                        ...addProject,
                        description: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    className="underline transition-all hover:text-red-500"
                    onClick={() => {

                      setAddingProject(false);
                      setAddProject({
                        name: "",
                        languages: [""],
                        updatedAt: "",
                        description: "",
                        id: "",
                        image: "",
                        slug: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={
                      "mt-3 flex cursor-pointer items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all bg-black dark:bg-gray-50 dark:text-gray-800 dark:hover:bg-green-500 text-white hover:bg-green-500 active:translate-y-0.5"}
                    onClick={() => {
                      if (addProject.name === "") return;
                      setProjects([
                        ...projects,
                        {
                          project: addProject,
                          color:
                            colors[Math.floor(Math.random() * colors.length)],
                        },
                      ]);
                      setAddingProject(false);
                      setAddProject({
                        name: "",
                        languages: [""],
                        updatedAt: "",
                        description: "",
                        id: "",
                        image: "",
                        slug: "",
                      });
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            {projects.length < 1 && (
              <div
                className={`mb-4 rounded border-2 border-black bg-white dark:bg-[#1a1a1a] px-8 pb-8 pt-6 shadow-custom transition-all hover:-translate-y-0.5`}
              >
                <div className="flex flex-row justify-between">
                  <h3 className="mb-2 bg-red-500 px-2 py-1 font-bold text-white">
                    No projects listed
                  </h3>
                </div>

                <p className="font mt-5 italic">Add projects below</p>
              </div>
            )}
            <div className="mb-32"></div>
            <div className="mb-4 flex justify-center">
              <button
                className={
                  "flex rounded-full bg-black px-5 text-white dark:bg-gray-50 dark:hover:bg-green-500 dark:hover:-translate-y-0.5 hover:-translate-y-0.5 dark:text-gray-800 transition-all hover:bg-green-500" +
                  `${addingProject ? "hidden" : ""}`
                }
                onClick={() => {
                  setAddingProject(true);
                }}
              >
                +
              </button>
            </div>
            <div className="flex justify-between">
              <button
                onClick={decrementPage}
                className="underline transition-all hover:text-blue-500"
              >
                Back
              </button>
              <button
                onClick={async () => await submitSetup()}
                className={
                  "mt-3 flex cursor-pointer items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all dark:bg-gray-50 dark:hover:-translate-y-0.5 dark:hover:bg-blue-500 dark:text-gray-800 bg-black text-white hover:-translate-y-0.5 hover:bg-blue-500"}
              >
                {submitted ? (
                  <svg
                    className="mr-2 h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="white"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
      {submitted && (
        <StatusBar
          message={"Submitted! We are getting your profile ready!"}
          color={"bg-green-500"}
        />
      )}
    </div>
  );
};

export default Setup;
