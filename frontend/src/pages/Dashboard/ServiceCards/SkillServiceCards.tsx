import React, {useMemo} from "react";
import Card from "Components/Card/Card.tsx";
import UserData from "Type/UserData.tsx";
import { ServiceData } from "Type/Services.tsx";
import {Link} from "react-router-dom";

const SkillServiceCards: React.FC<{
    services: string[];
    userData: UserData;
}> = ({ services, userData }) => {

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

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10">
            <div className="card bg-white mb-5 flex flex-col max-w-[400px] rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover">
                <div className="mt-5 rounded-tl-2xl rounded-tr-2xl bg-white px-2 py-2 flex flex-wrap gap-2 mb-5">
                    {userData?.skills.map((skill, index) => {
                        return (
                            <span key={index} className={`inline-flex items-center hover:-translate-y-0.5 cursor-pointer transition-all justify-center rounded-lg px-3 text-white ${colors[Math.floor(Math.random()*colors.length)]} py-2 text-sm`}>
        {skill.replaceAll("_", " ")}
      </span>
                        );
                    })}
                </div>
                <div className="flex-grow rounded-b-2xl content bg-blue p-5">
                    <h2 className="text-white text-2xl font-bold">{"</>"} Languages</h2>
                </div>

            </div>
            <>
                {services.map((service) => {
                    return (
                        <Card
                            imageUrl={ServiceData[service]?.image}
                            title={service.replaceAll("_", " ")}
                            description={ServiceData[service]?.description}
                        />
                    );
                })}
            </>
            <div className="card bg-yellow-400 mb-5 flex flex-col max-w-[400px] rounded-2xl shadow-customHover transition-all">
                <img className="w-32 mx-auto mt-20" src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/633759c572fde20672b6748b_get-in-touch-image-paperfolio-webflow-template.svg" alt="email"/>
                <Link to="/contact" className="text-center mt-20 mx-5 py-4 rounded-xl bg-black hover:-translate-y-0.5 transition-all text-white hover:bg-blue-500">Get in touch</Link>
            </div>
        </div>
    );
};
export default SkillServiceCards;
