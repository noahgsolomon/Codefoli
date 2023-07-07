import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "api/authenticateapi.tsx";

const Login: React.FC = () => {
  const [showFields, setShowFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogin = async () => {
    const loginRequest = await login(email, password);
    if (loginRequest) {
      window.location.href = "/dashboard";
    } else {
      setEmailError(true);
      setPasswordError(true);
    }
  };

  const redirectUri = "http://localhost:5173/dashboard";

  useEffect(() => {
    if (!localStorage.getItem("role")) {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="mt-20 w-[700px] max-w-[80%] rounded-xl border-2 border-black bg-gray-100 p-10 text-center shadow-custom transition-all">
        <h2 className="mb-10 text-3xl">
          <span className="bg-blue-500 px-1 text-white">Codefolio</span>
        </h2>
        <p className="text-gray-500">Log in to your account</p>

        {showFields ? (
          <>
            <button
              className="text-base underline transition-all hover:text-blue-500"
              onClick={() => {
                setEmailError(false);
                setPasswordError(false);
                setEmail("");
                setPassword("");
                setShowFields(false);
              }}
            >
              Back
            </button>

            <div className="relative text-left">
              <label htmlFor="email" className="text-base font-bold">
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  placeholder="// example@gmail.com"
                  value={email}
                  className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0
                       ${emailError ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    setEmailError(false);
                    setEmail(e.target.value);
                  }}
                />
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/cotton/24/shield--v1.png"
                  alt="email"
                  className="absolute left-2 top-9 -translate-y-1/2 transform"
                />
              </div>
            </div>

            <div className="relative text-left">
              <label htmlFor="password" className="text-base font-bold">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="// jeffbezos123"
                  value={password}
                  className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 
                      ${passwordError ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    setPasswordError(false);
                    setPassword(e.target.value);
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

            <button
              className={`mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl px-9 py-6 text-lg transition-all hover:opacity-90 ${
                email.length > 4 && password.length > 5
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
              onClick={async () => {
                if (email.length < 5 || password.length < 6) {
                  setEmailError(email.length < 5);
                  setPasswordError(password.length < 6);

                  return;
                }
                await handleLogin();
              }}
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
    </div>
  );
};
export default Login;
