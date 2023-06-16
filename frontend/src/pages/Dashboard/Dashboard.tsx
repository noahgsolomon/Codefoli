import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "api/userapi.tsx";
import Loader from "Components/Loader/Loader.tsx";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userDetails();
      setLoading(false);
      if (user) {
        if (user.role === "NEWBIE") {
          navigate("/setup");
        }
        localStorage.setItem("role", "USER");
        console.log(user);
      } else {
        localStorage.removeItem("role");
        navigate("/login");
      }
    };
    fetchUser();
  });

  return <>{loading && <Loader />}</>;
};

export default Dashboard;
