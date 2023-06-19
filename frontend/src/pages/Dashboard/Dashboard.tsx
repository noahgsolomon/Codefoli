import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userDetails } from "api/userapi.tsx";
import Loader from "Components/Loader/Loader.tsx";
import UserData from "Type/UserData.tsx";
import SkillCard from "./SkillCard/SkillCard.tsx";
import Footer from "Components/Footer/Footer.tsx";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>();
  useEffect(() => {
    const fetchUser = async () => {
      const user = await userDetails();
      if (user) {
        if (user.role === "NEWBIE") {
          navigate("/setup");
        }
        setUserData(user);
        localStorage.setItem("role", "USER");
        console.log(user);
      } else {
        localStorage.removeItem("role");
        navigate("/login");
      }
      setLoading(false);
    };
    fetchUser();
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row xl:mx-auto xl:justify-center">
          <div>
            <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center font-bold xl:mt-32">
              <h1 className="font-extra-bold max-w-[15ch] text-center text-4xl leading-snug text-black md:text-5xl md:leading-relaxed xl:text-left xl:text-6xl xl:leading-normal">
                I'm
                <span className="bg-red px-2 pb-1 pt-2 text-white">
                  {userData?.name}
                </span>
                , a {userData?.profession} from
                <span className="bg-blue px-2 pb-2 pt-1 text-white">
                  {userData?.location}
                </span>
              </h1>
              <p className="max-w-[35ch] text-center opacity-60 xl:max-w-[50ch] xl:text-left xl:text-base">
                {userData?.about}
              </p>
            </div>
            <div className="mx-auto mt-5 flex justify-center xl:justify-start">
              <Link
                to="/contact"
                className="mr-4 rounded-xl border-2 border-black bg-black px-6 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-500"
              >
                Get in touch
              </Link>
              <Link
                to="/portfolio"
                className="rounded-xl border-2 border-black px-6 py-4 font-bold transition-all hover:-translate-y-0.5 hover:bg-black hover:text-white"
              >
                View Portfolio
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-10 lg:mx-0 xl:ml-20 xl:mt-32">
            <img
              className="rounded-br-full border-4 border-black shadow-customHover"
              src="https://assets.website-files.com/63360c0c2b86f80ba8b5421a/63407fbdc2d4ac5270385fd4_home-hero-image-paperfolio-webflow-template.svg"
              alt="pfp"
            ></img>
          </div>
        </div>
        <div className="mt-32 flex flex-col items-center text-2xl font-bold">
          <p className="mb-10">
            My broad set of{" "}
            <span className="bg-purple-500 px-2 pb-1 pt-2 text-white">
              services and skills
            </span>
          </p>
          {userData?.skills.map((skill) => (
            <SkillCard key={skill} skill={skill} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Dashboard;
