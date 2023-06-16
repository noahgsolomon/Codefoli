import React, { useEffect, useState } from "react";
import { setupAccount, userDetails } from "api/userapi.tsx";
import { Skills } from "Type/Skills.tsx";
import { useNavigate } from "react-router-dom";
import Loader from "Components/Loader/Loader.tsx";
import Work from "Type/Work.tsx";
import Project from "Type/Project.tsx";

const Setup: React.FC = () => {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [work, setWork] = useState<{ work: Work; color: string }[]>([]);
  const [addWork, setAddWork] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<
    { skill: string; color: string }[]
  >([]);
  const [addingJob, setAddingJob] = useState(false);
  const [addingProject, setAddingProject] = useState(false);
  const [addProject, setAddProject] = useState({
    name: "",
    description: "",
    language: "",
    updatedAt: "",
  });
  const allSkills = Skills;
  const [matchingSkills, setMatchingSkills] = useState<string[]>([
    ...allSkills,
  ]);
  const navigate = useNavigate();

  const skillColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-fuchsia-500",
    "bg-lime-500",
    "bg-sky-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-lime-500",
    "bg-sky-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-lime-500",
    "bg-sky-500",
  ];
  const jobColors = [
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-red-500",
  ];

  if (!localStorage.getItem("NEWBIE")) {
    localStorage.setItem("role", "NEWBIE");
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await userDetails();
      if (response) {
        if (response.role !== "NEWBIE") {
          // navigate('/dashboard');
        }
        setName(response.name);
        setCompany(response.company || "");
        setEmail(response.email || "");
        setLocation(response.location || "");
        response.projects
          ? setProjects(
              response.projects.map((project: Project) => ({
                name: project.name,
                description: project.description || "",
                language: project.language,
                updatedAt: project.updatedAt,
              }))
            )
          : setProjects([]);
        setLoading(false);
      } else {
        navigate("/register");
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const searchUpper = search.toUpperCase();
    const newMatchingSkills = allSkills.filter((skill: string) =>
      skill.toUpperCase().includes(searchUpper)
    );
    setMatchingSkills(newMatchingSkills);
  }, [search, allSkills]);

  useEffect(() => {
    console.log(selectedSkills);
  }, [selectedSkills]);

  const submitSetup = async () => {
    const postData = await setupAccount(
      name,
      email,
      company,
      location,
      selectedSkills.map((skill) => skill.skill),
      work.map((item) => item.work),
      projects
    );
    if (postData) {
      localStorage.setItem("role", "USER");
      navigate("/dashboard");
    } else {
      alert("Error");
    }
  };

  if (loading) {
    return <Loader />;
  }

  const incrementPage = () => {
    if (page < 2) {
      setPage(page + 1);
    }
  };

  //TODO install prettier and prettier tailwind

  const decrementPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const addSkill = (skill: Skills) => {
    console.log(skill);
    const skillExists = selectedSkills.some((selectedSkill) =>
      Object.is(selectedSkill.skill, skill)
    );
    if (!skillExists) {
      console.log("hi");
      setSelectedSkills([
        ...selectedSkills,
        {
          skill: skill,
          color: skillColors[Math.floor(Math.random() * skillColors.length)],
        },
      ]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill.skill !== skillToRemove)
    );
  };

  function removeJob(indexToRemove: number) {
    setWork((prevWork) =>
      prevWork.filter((_, index) => index !== indexToRemove)
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
          className="mb-4 mt-5 w-8/12 max-w-2xl rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative">
            <label htmlFor="name" className="text-base font-bold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="..."
              className="mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="email" className="text-base font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="..."
              className="mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="company" className="text-base font-bold">
              Company
            </label>
            <input
              type="text"
              id="company"
              value={company}
              placeholder="..."
              className="mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="location" className="text-base font-bold">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              placeholder="..."
              className="mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="relative">
            <label htmlFor="skills" className="text-base font-bold">
              Skills
            </label>
            <div className="relative">
              <input
                type="text"
                id="skills"
                value={search}
                className="mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0"
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && matchingSkills.length > 0 && (
                <div className="absolute left-0 z-10 mt-2 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded border border-gray-200 bg-white pb-72 pt-5">
                  {matchingSkills.map((skill) => (
                    <div
                      key={skill}
                      className="m-1 inline-block cursor-pointer rounded-full border-b border-gray-300 bg-black p-2 transition-all hover:-translate-y-0.5 hover:opacity-90"
                      onClick={() => {
                        if (Skills.includes(skill as Skills)) {
                          addSkill(skill as Skills);
                          setSearch("");
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
                  "m-1 inline-block cursor-pointer rounded-full bg-gray-200 p-2 transition-all hover:-translate-y-0.5 hover:opacity-90 " +
                  skill.color
                }
                onClick={() => removeSkill(skill.skill)}
              >
                <span className="px-2 text-white">{skill.skill}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={incrementPage}
              className={
                "mt-3 flex cursor-pointer items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all " +
                (name &&
                email &&
                company &&
                location &&
                selectedSkills.length !== 0
                  ? "cursor-pointer bg-black text-black text-white hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0.5"
                  : "cursor-default bg-gray-200 text-gray-500")
              }
              disabled={
                !name ||
                !email ||
                !company ||
                !location ||
                selectedSkills.length === 0
              }
            >
              Next
            </button>
          </div>
        </form>
      )}
      {page === 1 && (
        <form
          className="mb-4 mt-5 w-8/12 max-w-2xl rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all"
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
                      className="rounded-full bg-red-500 px-4 py-2 text-sm text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                      onClick={() => removeJob(index)}
                    >
                      &times;
                    </button>
                  </div>
                </div>

                <p className="font-bold underline">{job.work.position}</p>
                <p>
                  {job.work.startDate}-{job.work.endDate}
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
                  className="mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0"
                  onChange={(e) =>
                    setAddWork({ ...addWork, company: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <label htmlFor="position" className="text-base font-bold">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  placeholder="// the mf CEO"
                  className="mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0"
                  onChange={(e) =>
                    setAddWork({ ...addWork, position: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <label htmlFor="start-date" className="text-base font-bold">
                  Start Date
                </label>
                <input
                  type="text"
                  id="start-date"
                  placeholder="// 106 B.C."
                  className="mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0"
                  onChange={(e) =>
                    setAddWork({ ...addWork, startDate: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <label htmlFor="end-date" className="text-base font-bold">
                  End Date
                </label>
                <input
                  type="text"
                  id="start-date"
                  placeholder="// 44 B.C."
                  className="mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0"
                  onChange={(e) =>
                    setAddWork({ ...addWork, endDate: e.target.value })
                  }
                />
              </div>

              <div className="relative">
                <label htmlFor="description" className="text-base font-bold">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Please write a short description of your job."
                  className="mb-4 mt-2 max-h-52 w-full rounded-xl border-2 border-black bg-white p-3 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0"
                  onChange={(e) =>
                    setAddWork({ ...addWork, description: e.target.value })
                  }
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
                      ? "cursor-pointer bg-black text-black text-white hover:-translate-y-0.5 hover:bg-green-500 active:translate-y-0.5"
                      : "cursor-default bg-gray-200 text-gray-500")
                  }
                  onClick={() => {
                    setWork([
                      ...work,
                      {
                        work: addWork,
                        color:
                          jobColors[
                            Math.floor(Math.random() * jobColors.length)
                          ],
                      },
                    ]);
                    setAddingJob(false);
                    setAddWork({
                      company: "",
                      position: "",
                      startDate: "",
                      endDate: "",
                      description: "",
                    });
                  }}
                  disabled={
                    !addWork.company ||
                    !addWork.position ||
                    !addWork.startDate ||
                    !addWork.endDate ||
                    !addWork.description
                  }
                >
                  Add
                </button>
              </div>
            </div>
          )}
          {work.length < 1 && (
            <div className="mb-4 rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all hover:-translate-y-0.5">
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
              onClick={() => setAddingJob(true)}
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
              onClick={incrementPage}
              className={
                "mt-3 flex cursor-pointer items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all " +
                (work.length > 0
                  ? "cursor-pointer bg-black text-black text-white hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0.5"
                  : "cursor-default bg-gray-200 text-gray-500")
              }
              disabled={work.length < 1}
            >
              Next
            </button>
          </div>
        </form>
      )}
      {page === 2 && (
        <form
          className="mb-4 mt-5 w-8/12 max-w-2xl rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            {projects.map((project, index) => (
              <div
                key={index}
                className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
              >
                <h3 className="mb-2 font-bold">{project.name}</h3>
                <p>{project.description}</p>
                <p>Language: {project.language}</p>
                <p>Last updated: {project.updatedAt}</p>
              </div>
            ))}
            {addingProject && (
              <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
                <input
                  type="text"
                  placeholder="Project name"
                  className="mb-4 w-full rounded-md border border-gray-300 bg-white p-3 transition-shadow"
                  onChange={(e) =>
                    setAddProject({ ...addProject, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="mb-4 w-full rounded-md border border-gray-300 bg-white p-3 transition-shadow"
                  onChange={(e) =>
                    setAddProject({
                      ...addProject,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="language"
                  className="mb-4 w-full rounded-md border border-gray-300 bg-white p-3 transition-shadow"
                  onChange={(e) =>
                    setAddProject({ ...addProject, language: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="year of project"
                  className="mb-4 w-full rounded-md border border-gray-300 bg-white p-3 transition-shadow"
                  onChange={(e) =>
                    setAddProject({ ...addProject, updatedAt: e.target.value })
                  }
                />
                <div className="flex justify-between">
                  <button
                    className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-black py-1 text-lg text-black transition-all hover:-translate-y-1 hover:opacity-90"
                    onClick={() => {
                      setAddingProject(false);
                      setAddProject({
                        name: "",
                        description: "",
                        language: "",
                        updatedAt: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-black py-1 text-lg text-black transition-all hover:-translate-y-1 hover:opacity-90"
                    onClick={() => {
                      if (
                        addProject.name == "" ||
                        addProject.description == "" ||
                        addProject.language == "" ||
                        addProject.updatedAt == ""
                      ) {
                        return;
                      }
                      setProjects([...projects, addProject]);
                      setAddingProject(false);
                      setAddProject({
                        name: "",
                        description: "",
                        language: "",
                        updatedAt: "",
                      });
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
            {projects.length < 1 && (
              <div className="mb-4 rounded border-2 border-black bg-white px-8 pb-8 pt-6 shadow-custom transition-all hover:-translate-y-0.5">
                <div className="flex flex-row justify-between">
                  <h3 className="mb-2 bg-blue-500 px-2 py-1 font-bold text-white">
                    No jobs listed
                  </h3>
                </div>

                <p className="font mt-5 italic">Add jobs below</p>
              </div>
            )}
            <div className="mb-4 flex justify-center">
              <button
                className={
                  "flex rounded-full bg-black px-5 text-white transition-all hover:-translate-y-0.5 hover:bg-green-500 " +
                  `${addingProject ? "hidden" : ""}`
                }
                onClick={() => setAddingProject(true)}
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
                onClick={submitSetup}
                className={
                  "mt-3 flex cursor-pointer items-center justify-center rounded-2xl px-8 py-3 text-base font-bold transition-all " +
                  (projects.length > 0
                    ? "cursor-pointer bg-black text-black text-white hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0.5"
                    : "cursor-default bg-gray-200 text-gray-500")
                }
                disabled={projects.length < 1}
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
