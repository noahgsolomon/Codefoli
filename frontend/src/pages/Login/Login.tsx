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
    } else {
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
    <div className="absolute left-1/2 top-1/2 w-[700px] max-w-[80%] -translate-x-1/2 -translate-y-1/2 transform rounded-xl border-2 border-black bg-gray-100 p-10 text-center shadow-md transition-all hover:shadow-lg">
      <h2 className="mb-12 text-3xl">
        <span className="bg-blue-500 px-1 text-white">Codefolio</span>
      </h2>
      <p className="my-5 text-gray-500">Log in to your account</p>

      {showFields ? (
        <>
          <button
            className="cursor-pointer rounded-2xl border-2 border-blue-600 bg-transparent px-5 py-3 text-xl font-bold text-blue-600 no-underline transition-all hover:underline"
            onClick={() => setShowFields(false)}
          >
            Back
          </button>

          <input
            type="email"
            className="my-3 w-full rounded-md border border-gray-300 bg-white p-3 transition-shadow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="my-3 w-full rounded-md border border-gray-300 bg-white p-3 transition-shadow"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl px-9 py-6 text-lg transition-all hover:opacity-90 ${
              email.length > 3 && password.length > 3
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
            onClick={handleLogin}
          >
            Log In
          </button>
        </>
      ) : (
        <>
          <div className="mt-5 flex flex-col items-center">
            <button
              className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl bg-black px-9 py-6 text-lg text-white transition-all hover:-translate-y-1 hover:opacity-90"
              onClick={() => {
                window.location.href = `http://localhost:8080/oauth/authorize/github?redirect_uri=${redirectUri}`;
              }}
            >
              Continue with GitHub
              <img
                className="ml-2 h-auto w-8 rounded-2xl bg-white p-1"
                src={"src/assets/github-logo.png"}
                alt={"github icon"}
              />
            </button>
            <button
              className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-black px-9 py-6 text-lg text-black transition-all hover:-translate-y-1 hover:opacity-90"
              onClick={() => setShowFields(true)}
            >
              Continue with Email and Password
            </button>
          </div>
          <Link to={"/register"}>
            <p className="mt-5 cursor-pointer text-sm text-blue-600 hover:underline">
              Create your account
            </p>
          </Link>
        </>
      )}
    </div>
  );
};
export default Login;
