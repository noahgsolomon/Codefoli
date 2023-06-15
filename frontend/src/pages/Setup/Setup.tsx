import React, {useEffect, useState} from "react";
import {setupAccount, userDetails} from "api/userapi.tsx";
import {Skills} from "Type/Skills.tsx";
import {useNavigate} from "react-router-dom";
import Loader from "Components/Loader/Loader.tsx";
import Work from "Type/Work.tsx";
import Project from "Type/Project.tsx";

const Setup: React.FC = () => {

    const [page, setPage] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [work, setWork] = useState<Work[]>([]);
    const [addWork, setAddWork] = useState({company: '', position: '', startDate: '', endDate: '', description: ''});
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedSkills, setSelectedSkills] = useState<{skill: string, color: string}[]>([]);
    const [addingJob, setAddingJob] = useState(false);
    const [addingProject, setAddingProject] = useState(false);
    const [addProject, setAddProject] = useState({name: '', description: '', language: '', updatedAt: ''});
    const allSkills = Skills;
    const [matchingSkills, setMatchingSkills] = useState<string[]>([...allSkills]);
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

    if (!localStorage.getItem('NEWBIE')){
        localStorage.setItem('role', 'NEWBIE');
    }

    useEffect(() => {
        const fetchData = async ()=> {
            const response = await userDetails();
            if (response){
                if (response.role !== 'NEWBIE'){
                    // navigate('/dashboard');
                }
                setName(response.name);
                setCompany(response.company || '');
                setEmail(response.email || '');
                setLocation(response.location || '');
                response.projects
                    ? setProjects(
                        response.projects.map((project: Project) => ({
                            name: project.name,
                            description: project.description || '',
                            language: project.language,
                            updatedAt: project.updatedAt
                        }))
                    )
                    : setProjects([]);                setLoading(false);
            }
            else{
                navigate('/register');
            }
        }

        fetchData();
    }, [navigate]);

    useEffect(() => {
        const searchUpper = search.toUpperCase();
        const newMatchingSkills = allSkills.filter((skill: string) =>
            skill.toUpperCase().includes(searchUpper)
        );
        setMatchingSkills(newMatchingSkills);
    }, [search, allSkills]);

    const submitSetup = async () => {
        const postData = await setupAccount(name, email, company, location, selectedSkills.map(skill => skill.skill), work, projects);
        if (postData){
            localStorage.setItem('role', 'USER');
            navigate('/dashboard');
        }
        else {
            alert('Error');
        }
    }

    if (loading) {
        return (
            <Loader/>
        )
    }

    const incrementPage = () => {
        if (page < 2) {
            setPage(page + 1);
        }
    }

    const decrementPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }

    const addSkill = (skill: Skills) => {
        const skillExists = selectedSkills.some((selectedSkill) => Object.is(selectedSkill.skill, skill));
        if (!skillExists) {
            setSelectedSkills([...selectedSkills, {
                skill: skill,
                color: skillColors[Math.floor(Math.random() * skillColors.length)]
            }]);
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setSelectedSkills(selectedSkills.filter(skill => skill.skill !== skillToRemove));
    };

    return (
        <div className="flex justify-center items-center flex-col my-5">
            <div className="mb-10 text-4xl font-bold">Let's set up your <span className="text-white bg-red-500 px-1 py-1">Page</span>!</div>
            {page === 0 && (
                <form className="bg-white shadow-custom hover:shadow-customHover hover:-translate-y-0.5 transition-all rounded px-8 pt-6 pb-8 border-2 border-black mb-4 w-8/12" onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="w-full p-3 my-3 border border-gray-300 rounded-md bg-white transition-shadow"
                            id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full p-3 my-3 border border-gray-300 rounded-md bg-white transition-shadow"
                            id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                            Company
                        </label>
                        <input
                            className="w-full p-3 my-3 border border-gray-300 rounded-md bg-white transition-shadow"
                            id="company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                            Location
                        </label>
                        <input
                            className="w-full p-3 my-3 border border-gray-300 rounded-md bg-white transition-shadow"
                            id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">
                            Skills
                        </label>
                        <div className="relative">
                            <input
                                className="w-full p-3 my-3 border border-gray-300 rounded-md bg-white transition-shadow"
                                id="skills" type="text" value={search} onChange={(e) => setSearch(e.target.value)} onBlur={() => setMatchingSkills([])}/>
                            {(search && matchingSkills.length > 0) && <div className="overflow-x-hidden absolute w-full left-0 mt-2 bg-white border border-gray-200 z-10 max-h-60 overflow-y-auto rounded pb-72 pt-5">
                                {matchingSkills.map(skill => (
                                    <div
                                        key={skill}
                                        className="m-1 bg-black p-2 inline-block rounded-full cursor-pointer transition-all hover:opacity-90 hover:-translate-y-0.5 border-b border-gray-300"
                                        onClick={() => {
                                            if (Skills.includes(skill as Skills)) {
                                                addSkill(skill as Skills);
                                                setSearch('');
                                            }
                                        }}
                                    >
                                        <span className="px-2 text-white">{skill}</span>
                                    </div>
                                ))}
                            </div>}
                        </div>
                        {selectedSkills.map(skill => (
                            <div key={skill.skill} className={"m-1 bg-gray-200 p-2 inline-block rounded-full cursor-pointer transition-all hover:opacity-90 hover:-translate-y-0.5 " + skill.color} onClick={() => removeSkill(skill.skill)}>
                                <span className="px-2 text-white">{skill.skill}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <button onClick={incrementPage}
                                className=
                                    {"flex items-center justify-center text-base cursor-pointer rounded-2xl px-8 py-3 mt-3 transition-all font-bold " +
                                    (name && email && company && location && selectedSkills.length !== 0 ? "cursor-pointer text-black " +
                                        " hover:-translate-y-0.5 hover:bg-blue-500 active:translate-y-0.5 text-white bg-black" : "cursor-default text-gray-500 bg-gray-200")}
                                disabled={!name || !email || !company || !location || selectedSkills.length === 0}
                        >
                            Next
                        </button>
                    </div>
                </form>
            )}
            {page === 1 && (
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-8/12" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        {work.map((job, index) => (
                            <div key={index} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <h3 className="font-bold mb-2">{job.company}</h3>
                                <p>{job.position}</p>
                                <p>{job.startDate} - {job.endDate}</p>
                                <p>{job.description}</p>
                            </div>
                        ))}
                    </div>
                    {addingJob && (
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <input
                                type="text"
                                placeholder="Company"
                                className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white transition-shadow"
                                onChange={(e) => setAddWork({ ...addWork, company: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Position"
                                className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white transition-shadow"
                                onChange={(e) => setAddWork({ ...addWork, position: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Start Date"
                                className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white transition-shadow"
                                onChange={(e) => setAddWork({ ...addWork, startDate: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="End Date"
                                className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white transition-shadow"
                                onChange={(e) => setAddWork({ ...addWork, endDate: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white transition-shadow"
                                onChange={(e) => setAddWork({ ...addWork, description: e.target.value })}
                            />
                            <div className="flex justify-between">
                                <button
                                    className="flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl py-1 text-lg transition-all hover:opacity-90 border-2 border-black text-black hover:-translate-y-1"
                                    onClick={() => {
                                        setAddingJob(false);
                                        setAddWork({company: '', position: '', startDate: '', endDate: '', description: ''});
                                    }
                                }>
                                    Cancel
                                </button>
                                <button
                                    className="flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl py-1 text-lg transition-all hover:opacity-90 border-2 border-black text-black hover:-translate-y-1"
                                    onClick={() => {
                                        if (addWork.company == '' || addWork.position == '' || addWork.startDate == '' || addWork.endDate == '' || addWork.description == '') {
                                            return;
                                        }
                                        setWork([...work, addWork]);
                                        setAddingJob(false);
                                        setAddWork({company: '', position: '', startDate: '', endDate: '', description: ''});

                                    }}>
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                    {work.length < 1 && (
                        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <h3 className="font-bold mb-2">No jobs listed</h3>
                            <p>add jobs below</p>
                            <p></p>
                            <p></p>
                        </div>
                    )}
                    <div className="mb-32"></div>
                    <div className="flex justify-center mb-4">
                        <button
                            className={"flex items-center justify-center cursor-pointer px-6 mb-3 rounded-2xl py-1 text-lg transition-all hover:opacity-90 border-2 border-black text-black hover:-translate-y-1" + `${addingJob ? 'hidden' : ''}`}
                            onClick={() => setAddingJob(true)}
                        >
                            Add job
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={decrementPage}
                            className="flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl py-1 text-lg transition-all hover:opacity-90 border-2 border-black text-black hover:-translate-y-1"
                        >
                            Back
                        </button>
                        <button
                            onClick={incrementPage}
                            className="flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl py-1 text-lg transition-all hover:opacity-90 border-2 border-black text-black hover:-translate-y-1"
                            disabled={work.length < 1}
                        >
                            Next
                        </button>
                    </div>
                </form>
            )}
            {page === 2 && (
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-8/12" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        {projects.map((project, index) => (
                            <div key={index} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <h3 className="font-bold mb-2">{project.name}</h3>
                                <p>{project.description}</p>
                                <p>Language: {project.language}</p>
                                <p>Last updated: {project.updatedAt}</p>
                            </div>
                        ))}
                        {addingProject && (
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <input
                                    type="text"
                                    placeholder="Project name"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white transition-shadow"
                                    onChange={(e) => setAddProject({ ...addProject, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white transition-shadow"
                                    onChange={(e) => setAddProject({ ...addProject, description: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="language"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white transition-shadow"
                                    onChange={(e) => setAddProject({ ...addProject, language: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="year of project"
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-md bg-white transition-shadow"
                                    onChange={(e) => setAddProject({ ...addProject, updatedAt: e.target.value })}
                                />
                                <div className="flex justify-between">
                                    <button
                                        className="flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl py-1 text-lg transition-all hover:opacity-90 border-2 border-black text-black hover:-translate-y-1"
                                        onClick={() => {
                                            setAddingProject(false);
                                            setAddProject({name: '', description: '', language: '', updatedAt: ''});
                                        }
                                        }>
                                        Cancel
                                    </button>
                                    <button
                                        className="flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl py-1 text-lg transition-all hover:opacity-90 border-2 border-black text-black hover:-translate-y-1"
                                        onClick={() => {
                                            if (addProject.name == '' || addProject.description == '' || addProject.language == '' || addProject.updatedAt == '') {
                                                return;
                                            }
                                            setProjects([...projects, addProject]);
                                            setAddingProject(false);
                                            setAddProject({name: '', description: '', language: '', updatedAt: ''});
                                        }}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        )}
                        <button
                            className={`${addingProject ? 'hidden' : ''} flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl py-1 text-lg transition-all hover:opacity-90 border-2 border-black text-black hover:-translate-y-1`}
                            onClick={() => setAddingProject(true)}
                        >
                            Add project
                        </button>
                        <div className="flex justify-between">
                            <button
                                onClick={decrementPage}
                                className="flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl py-1 text-lg transition-all hover:opacity-90 border-2 border-black text-black hover:-translate-y-1"
                            >
                                Back
                            </button>
                            <button
                                onClick={submitSetup}
                                className="flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl py-1 text-lg transition-all hover:opacity-90 border-2 border-black text-black hover:-translate-y-1"
                                disabled={projects.length < 1}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Setup;