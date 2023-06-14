import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "api/authenticateapi.tsx";
import Loader from "Components/Loader/Loader.tsx";

const Login: React.FC = () => {
  const [showFields, setShowFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      navigate("/dashboard");
    }
    else {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogin = async () => {
    const loginRequest = await login(email, password);
    if (loginRequest) {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    }
  };

  const redirectUri = "http://localhost:5173/dashboard";

  if (loading) {
    return <Loader />;
  }

  return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all w-[700px] max-w-[80%] p-10 rounded-xl border-2 border-black shadow-md hover:shadow-lg text-center bg-gray-100">
        <h2 className="text-3xl mb-12">
          <span className="px-1 bg-blue-500 text-white">Codefolio</span>
        </h2>
        <p className="text-gray-500 my-5">Log in to your account</p>

        {showFields ? (
            <>
              <button
                  className="text-blue-600 bg-transparent border-2 border-blue-600 rounded-2xl px-5 py-3 text-xl font-bold cursor-pointer transition-all no-underline hover:underline"
                  onClick={() => setShowFields(false)}
              >
                Back
              </button>

              <input
                  type="email"
                  className="w-full p-3 my-3 border border-gray-300 rounded-md bg-white transition-shadow"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />

              <input
                  type="password"
                  className="w-full p-3 my-3 border border-gray-300 rounded-md bg-white transition-shadow"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <button
                  className={`flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl px-9 py-6 text-lg transition-all hover:opacity-90 ${
                      email.length > 3 && password.length > 3
                          ? "text-white bg-blue-600"
                          : "text-gray-500 bg-gray-200"
                  }`}
                  onClick={handleLogin}
              >
                Log In
              </button>
            </>
        ) : (
            <>
              <div className="flex flex-col items-center mt-5">
                <button
                    className="flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl px-9 py-6 text-lg transition-all hover:opacity-90 text-white bg-black hover:-translate-y-1"
                    onClick={() => {
                      window.location.href = `http://localhost:8080/oauth/authorize/github?redirect_uri=${redirectUri}`;
                    }}
                >
                  Continue with GitHub
                  <img
                      className="rounded-2xl p-1 bg-white ml-2 w-8 h-auto"
                      src={"src/assets/github-logo.png"}
                      alt={"github icon"}
                  />
                </button>
                <button
                    className="flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl px-9 py-6 text-lg transition-all hover:opacity-90 border-2 border-black text-black hover:-translate-y-1"
                    onClick={() => setShowFields(true)}
                >
                  Continue with Email and Password
                </button>
              </div>
              <Link to={"/register"}>
                <p className="text-blue-600 cursor-pointer mt-5 text-sm hover:underline">
                  Create your account
                </p>
              </Link>
            </>
        )}
      </div>
  );
};
export default Login;
