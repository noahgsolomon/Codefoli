import React, { useEffect, useMemo, useState } from "react";
import { setupAccount } from "api/userapi.tsx";
import { Skills } from "Type/Skills.tsx";
import { useNavigate } from "react-router-dom";
import Work from "Type/Work.tsx";
import Project from "Type/Project.tsx";
import { Services } from "Type/Services.tsx";
import UserData from "Type/UserData.tsx";

const Setup: React.FC<{ userData: UserData }> = ({ userData }) => {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [positionError, setPositionError] = useState(false);
  const [noJobError, setNoJobError] = useState(false);
  const [noProjectNameError, setNoProjectNameError] = useState(false);
  const [noProjectLanguageError, setNoProjectLanguageError] = useState(false);
  const [noProjectDateError, setNoProjectDateError] = useState(false);
  const [noProjectDescriptionError, setNoProjectDescriptionError] =
    useState(false);
  const [loading, setLoading] = useState(true);
  const [noProjectError, setNoProjectError] = useState(false);

  const [profession, setProfession] = useState("");
  const [projects, setProjects] = useState<
    { project: Project; color: string }[]
  >([]);
  const [work, setWork] = useState<{ work: Work; color: string }[]>([]);
  const [addWork, setAddWork] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
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
    language: "",
    updatedAt: "",
    id: "",
    image: "",
  });
  const allSkills = Skills;
  const allServices = Services;
  const [matchingSkills, setMatchingSkills] = useState<string[]>([
    ...allSkills,
  ]);
  const [matchingServices, setMatchingServices] = useState<string[]>([
    ...allServices,
  ]);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [professionError, setProfessionError] = useState(false);
  const [companyError, setCompanyError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [aboutError, setAboutError] = useState(false);
  const [skillsError, setSkillsError] = useState(false);
  const [serviceError, setServiceError] = useState(false);

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
      setName(userData.name);
      setCompany(userData.company || "");
      setEmail(userData.email || "");
      setLocation(userData.location || "");
      userData.projects
        ? setProjects(
            userData.projects.map((project: Project) => ({
              project: {
                id: project.id,
                name: project.name,
                description: project.description || "",
                language: project.language,
                updatedAt: project.updatedAt,
                image: project.image || "",
              },
              color: colors[Math.floor(Math.random() * colors.length)],
            }))
          )
        : setProjects([]);
      setLoading(false);
    }
  }, [navigate, userData, colors]);

  const submitSetup = async () => {
    const postData = await setupAccount(
      name,
      email,
      profession,
      company,
      location,
      about,
      selectedSkills.map((skill) =>
        skill.skill
          .replaceAll(" ", "_")
          .replaceAll(".", "_")
          .replaceAll("-", "_")
          .replaceAll("/", "_")
          .replaceAll("+", "_PLUS")
          .replaceAll("#", "_SHARP")
          .toUpperCase()
      ),
      work.map((item) => item.work),
      projects.map((item) => item.project),
      selectedServices.map((service) =>
        service.service
          .replaceAll(" ", "_")
          .replaceAll("-", "_")
          .replaceAll(".", "_")
          .replaceAll("/", "_")
          .replaceAll("+", "_PLUS")
          .replaceAll("#", "_SHARP")
          .toUpperCase()
      )
    );

    if (postData === "OK") {
      window.location.href = "/dashboard";
    } else {
      alert("Error");
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
      setSkillsError(false);
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
      setServiceError(false);
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

  function isDate(date: string) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(20)?\d{2}$/;
    return regex.test(date);
  }

  function formatDate(date: string) {
    const [month, day, year] = date.split("/");

    const dateObj = new Date(
      parseInt("20" + year),
      parseInt(month) - 1,
      parseInt(day)
    );

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[dateObj.getMonth()] + " " + dateObj.getFullYear();
  }

  if (loading) {
    return <></>;
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
          className="md:8/12 mb-4 mt-5 w-full max-w-2xl rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all sm:w-11/12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative">
            <label htmlFor="name" className="text-base font-bold">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                placeholder="// John Doe"
                className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 ${
                  nameError ? "border-red-500" : ""
                }`}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value) {
                    setNameError(false);
                  }
                }}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/24/person-male--v2.png"
                alt="user-male-circle"
                className="absolute left-2 top-9 -translate-y-1/2 transform"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="email" className="text-base font-bold">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                value={email}
                placeholder="// example@gmail.com"
                className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 ${
                  emailError ? "border-red-500" : ""
                }`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value) {
                    setEmailError(false);
                  }
                }}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/24/new-post.png"
                alt="email"
                className="absolute left-2 top-9 -translate-y-1/2 transform"
              />
            </div>
          </div>
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
                className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 ${
                  professionError ? "border-red-500" : ""
                }`}
                onChange={(e) => {
                  setProfession(e.target.value);
                  if (e.target.value) {
                    setProfessionError(false);
                  }
                }}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/24/certificate--v1.png"
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
                className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 ${
                  companyError ? "border-red-500" : ""
                }`}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (e.target.value) {
                    setCompanyError(false);
                  }
                }}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/24/box--v2.png"
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
                className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 ${
                  locationError ? "border-red-500" : ""
                }`}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (e.target.value) {
                    setLocationError(false);
                  }
                }}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/24/airplane-take-off--v1.png"
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
                className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 ${
                  aboutError ? "border-red-500" : ""
                }`}
                onChange={(e) => {
                  setAbout(e.target.value);
                  if (e.target.value) {
                    setAboutError(false);
                  }
                }}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/24/quill-pen.png"
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
                  className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 ${
                    skillsError ? "border-red-500" : ""
                  } ${
                    selectedSkills.length >= 12 ? "bg-green-200 opacity-80" : ""
                  }`}
                  onChange={(e) => setSkillsSkillSearch(e.target.value)}
                  disabled={selectedSkills.length >= 12}
                />
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/cotton/24/trophy--v1.png"
                  alt="skills"
                  className="absolute left-2 top-9 -translate-y-1/2 transform"
                />
              </div>
              {skillSearch && matchingSkills.length > 0 && (
                <div className="absolute left-0 z-10 mt-2 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded border border-gray-200 bg-white pb-72 pt-5">
                  {matchingSkills.map((skill) => (
                    <div
                      key={skill}
                      className="m-1 inline-block cursor-pointer rounded-full border-b border-gray-300 bg-black p-2 transition-all hover:-translate-y-0.5 hover:opacity-90"
                      onClick={() => {
                        if (Skills.includes(skill as Skills)) {
                          addSkill(skill as Skills);
                          setSkillsSkillSearch("");
                        }
                      }}
                    >
                      <span className="px-2 text-white">{skill}</span>
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
                  className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 ${
                    serviceError ? "border-red-500" : ""
                  } ${
                    selectedServices.length >= 4
                      ? "bg-green-200 opacity-80"
                      : ""
                  }`}
                  onChange={(e) => setServicesSearch(e.target.value)}
                  disabled={selectedServices.length >= 4}
                />
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/cotton/24/trophy--v1.png"
                  alt="services"
                  className="absolute left-2 top-9 -translate-y-1/2 transform"
                />
              </div>
              {serviceSearch && matchingServices.length > 0 && (
                <div className="absolute left-0 z-10 mt-2 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded border border-gray-200 bg-white pb-72 pt-5">
                  {matchingServices.map((service) => (
                    <div
                      key={service}
                      className="m-1 inline-block cursor-pointer rounded-full border-b border-gray-300 bg-black p-2 transition-all hover:-translate-y-0.5 hover:opacity-90"
                      onClick={() => {
                        if (Services.includes(service)) {
                          addService(service);
                          setServicesSearch("");
                        }
                      }}
                    >
                      <span className="px-2 text-white">{service}</span>
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
              onClick={() => {
                if (
                  !name ||
                  !email ||
                  !profession ||
                  !company ||
                  !location ||
                  !about ||
                  selectedSkills.length === 0 ||
                  selectedServices.length === 0
                ) {
                  setNameError(!name);
                  setEmailError(!email);
                  setCompanyError(!company);
                  setLocationError(!location);
                  setSkillsError(selectedSkills.length === 0);
                  setProfessionError(!profession);
                  setAboutError(!about);
                  setServiceError(selectedServices.length === 0);

                  return;
                }

                incrementPage();
              }}
              className={
                "mt-3 flex cursor-pointer items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all " +
                (name &&
                email &&
                profession &&
                company &&
                location &&
                about &&
                selectedSkills.length !== 0 &&
                selectedServices.length !== 0
                  ? "cursor-pointer bg-black text-white hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0.5"
                  : "cursor-default bg-gray-200 text-gray-500")
              }
            >
              Next
            </button>
          </div>
        </form>
      )}
      {page === 1 && (
        <form
          noValidate={true}
          className="md:8/12 mb-4 mt-5 w-full max-w-2xl rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all sm:w-11/12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            {work.map((job, index) => (
              <div
                key={index}
                className="mb-4 rounded border-2 border-black bg-white px-4 pb-8 pt-6 shadow-custom transition-all hover:-translate-y-0.5"
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
                  {formatDate(job.work.startDate)}-
                  {job.work.endDate.toLowerCase() !== "current"
                    ? formatDate(job.work.endDate)
                    : "Current"}
                </p>
                <p className="font mt-5 italic">{job.work.description}</p>
              </div>
            ))}
          </div>
          {addingJob && (
            <div className="mb-4 rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all hover:shadow-customHover">
              <div className="relative">
                <label htmlFor="company" className="text-base font-bold">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  placeholder="// Facebook"
                  value={addWork.company}
                  className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0
                  ${companyError ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    setAddWork({ ...addWork, company: e.target.value });
                    if (e.target.value) {
                      setCompanyError(false);
                    }
                  }}
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
                  className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0
                  ${positionError ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    setAddWork({ ...addWork, position: e.target.value });
                    if (e.target.value) {
                      setPositionError(false);
                    }
                  }}
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
                  value={addWork.startDate}
                  className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0
                  ${startDateError ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    setAddWork({ ...addWork, startDate: e.target.value });
                    if (e.target.value) {
                      setStartDateError(false);
                    }
                  }}
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
                  value={addWork.endDate}
                  className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0
                  ${endDateError ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    setAddWork({ ...addWork, endDate: e.target.value });
                    if (e.target.value) {
                      setEndDateError(false);
                    }
                  }}
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
                  className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0
                  ${descriptionError ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    setAddWork({ ...addWork, description: e.target.value });
                    if (e.target.value) {
                      setDescriptionError(false);
                    }
                  }}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="underline transition-all hover:text-red-500"
                  onClick={() => {
                    setCompanyError(false);
                    setPositionError(false);
                    setStartDateError(false);
                    setEndDateError(false);
                    setDescriptionError(false);

                    setAddingJob(false);
                    setAddWork({
                      company: "",
                      position: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  className={
                    "mt-3 flex cursor-pointer items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all " +
                    (addWork.company &&
                    addWork.position &&
                    addWork.startDate &&
                    addWork.endDate &&
                    addWork.description
                      ? "cursor-pointer bg-black text-white hover:-translate-y-0.5 hover:bg-green-500 active:translate-y-0.5"
                      : "cursor-default bg-gray-200 text-gray-500")
                  }
                  onClick={() => {
                    if (
                      !addWork.company ||
                      !addWork.position ||
                      !addWork.startDate ||
                      !addWork.endDate ||
                      !addWork.description
                    ) {
                      setCompanyError(!addWork.company);
                      setPositionError(!addWork.position);
                      setStartDateError(!addWork.startDate);
                      setEndDateError(!addWork.endDate);
                      setDescriptionError(!addWork.description);

                      return;
                    }
                    if (
                      !isDate(addWork.startDate) ||
                      (!isDate(addWork.endDate) &&
                        addWork.endDate.toLowerCase() !== "current")
                    ) {
                      setStartDateError(!isDate(addWork.startDate));
                      setEndDateError(!isDate(addWork.endDate));
                      return;
                    }
                    setWork([
                      ...work,
                      {
                        work: { ...addWork, orderId: 1, id: "", image: "" },
                        color:
                          colors[Math.floor(Math.random() * colors.length)],
                      },
                    ]);
                    setAddingJob(false);
                    setCompanyError(false);
                    setPositionError(false);
                    setStartDateError(false);
                    setEndDateError(false);
                    setDescriptionError(false);

                    setAddWork({
                      company: "",
                      position: "",
                      startDate: "",
                      endDate: "",
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
              className={`mb-4 rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all hover:-translate-y-0.5 
                           ${noJobError ? "border-red-500" : ""} `}
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
                "flex rounded-full bg-black px-5 text-white transition-all hover:-translate-y-0.5 hover:bg-green-500 " +
                `${addingJob ? "hidden" : ""}`
              }
              onClick={() => {
                setNoJobError(false);
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
              onClick={() => {
                if (work.length < 1) {
                  setNoJobError(true);
                  return;
                }
                incrementPage();
              }}
              className={
                "mt-3 flex cursor-pointer items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all " +
                (work.length > 0
                  ? "cursor-pointer bg-black text-white hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0.5"
                  : "cursor-default bg-gray-200 text-gray-500")
              }
            >
              Next
            </button>
          </div>
        </form>
      )}
      {page === 2 && (
        <form
          noValidate={true}
          className="md:8/12 mb-4 mt-5 w-full max-w-2xl rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all sm:w-11/12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            {projects.map((project, index) => (
              <div
                key={index}
                className="mb-4 rounded border-2 border-black bg-white px-4 pb-8 pt-6 shadow-custom transition-all hover:-translate-y-0.5"
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
                  Language: {project.project.language}
                </p>
                <p>
                  {project.project.updatedAt.toLowerCase() !== "current"
                    ? new Date(project.project.updatedAt).toLocaleString(
                        "en-US",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "Current"}
                </p>
                <p className="font mt-5 italic">
                  {project.project.description}
                </p>
              </div>
            ))}
            {addingProject && (
              <div className="mb-4 rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all hover:shadow-customHover">
                <div className="relative">
                  <label htmlFor="name" className="text-base font-bold">
                    Project name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="// Mojo Compiler"
                    value={addProject.name}
                    className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 
                    ${noProjectNameError ? "border-red-500" : ""}`}
                    onChange={(e) => {
                      if (e.target.value) {
                        setNoProjectNameError(false);
                      }
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
                    value={addProject.language}
                    className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 
                    ${noProjectLanguageError ? "border-red-500" : ""}`}
                    onChange={(e) => {
                      if (e.target.value) {
                        setNoProjectLanguageError(false);
                      }
                      setAddProject({
                        ...addProject,
                        language: e.target.value,
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
                    className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 
                    ${noProjectDateError ? "border-red-500" : ""}`}
                    onChange={(e) => {
                      if (e.target.value) {
                        setNoProjectDateError(false);
                      }
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
                    className={`mb-4 mt-2 max-h-52 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0
                     ${noProjectDescriptionError ? "border-red-500" : ""}`}
                    onChange={(e) => {
                      if (e.target.value) {
                        setNoProjectDescriptionError(false);
                      }
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
                      setNoProjectNameError(false);
                      setNoProjectLanguageError(false);
                      setNoProjectDateError(false);
                      setNoProjectDescriptionError(false);

                      setAddingProject(false);
                      setAddProject({
                        name: "",
                        language: "",
                        updatedAt: "",
                        description: "",
                        id: "",
                        image: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={
                      "mt-3 flex cursor-pointer items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all " +
                      (addProject.name &&
                      addProject.language &&
                      addProject.updatedAt &&
                      addProject.description
                        ? "cursor-pointer bg-black text-white hover:-translate-y-0.5 hover:bg-green-500 active:translate-y-0.5"
                        : "cursor-default bg-gray-200 text-gray-500")
                    }
                    onClick={() => {
                      if (
                        !addProject.name ||
                        !addProject.language ||
                        !addProject.updatedAt ||
                        !addProject.description
                      ) {
                        setNoProjectNameError(!addProject.name);
                        setNoProjectLanguageError(!addProject.language);
                        setNoProjectDateError(!addProject.updatedAt);
                        setNoProjectDescriptionError(!addProject.description);
                        return;
                      }
                      if (
                        !isDate(addProject.updatedAt) &&
                        addProject.updatedAt.toLowerCase() !== "current"
                      ) {
                        setNoProjectDateError(true);
                        return;
                      }
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
                        language: "",
                        updatedAt: "",
                        description: "",
                        id: "",
                        image: "",
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
                className={`mb-4 rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all hover:-translate-y-0.5
                ${noProjectError ? "border-red-500" : ""}`}
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
                  "flex rounded-full bg-black px-5 text-white transition-all hover:-translate-y-0.5 hover:bg-green-500 " +
                  `${addingProject ? "hidden" : ""}`
                }
                onClick={() => {
                  setNoProjectError(false);
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
                onClick={() => {
                  if (projects.length < 1) {
                    setNoProjectError(true);
                    return;
                  }
                  submitSetup();
                }}
                className={
                  "mt-3 flex cursor-pointer items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all " +
                  (projects.length > 0
                    ? "cursor-pointer bg-black text-white hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0.5"
                    : "cursor-default bg-gray-200 text-gray-500")
                }
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Setup;
