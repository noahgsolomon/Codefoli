import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "api/authenticateapi.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import { useSpring, animated } from "react-spring";
import { STAGE } from "../../config.ts";

const Login: React.FC = () => {
  const [showFields, setShowFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);

  const handleLogin = async () => {
    setLoginClicked(true);
    const loginRequest = await login(email, password);
    console.log(loginRequest);
    if (loginRequest.status === "OK") {
      window.location.href = "/dashboard";
    } else {
      setEmailError(true);
      setPasswordError(true);
    }
    setLoginClicked(false);
  };

  const loginAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 0,
  });

  return (
      <>
    <animated.div
      style={loginAnimation}
      className="flex items-center justify-center p-4"
    >
      <div className="mt-20 w-[700px] max-w-[100%] rounded-xl border-2 border-black  p-10 text-center shadow-custom  transition-all">
        <h2 className="mb-10 text-4xl">
          <span className="bg-blue-500 px-2 font-bold text-white">Codefolio</span>
        </h2>
        <p className="opacity-80">Log in to your account</p>

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
                  className={`mb-4 mt-2 w-full placeholder:dark:text-gray-200  placeholder:text-gray-800 rounded-xl border-2 border-black bg-white dark:bg-[#1a1a1a] p-3 pl-10 placeholder-black shadow-custom  ring-transparent hover:shadow-customHover  focus:border-black focus:ring-0
                       ${emailError ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    setEmailError(false);
                    setPasswordError(false);
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
                  className={`mb-4 mt-2 w-full rounded-xl  border-2 border-black placeholder:dark:text-gray-200 placeholder:text-gray-800 bg-white dark:bg-[#1a1a1a] p-3 pl-10 placeholder-black shadow-custom  ring-transparent hover:shadow-customHover  focus:border-black focus:ring-0 
                      ${passwordError ? "border-red-500" : ""}`}
                  onChange={(e) => {
                    setPasswordError(false);
                    setEmailError(false);
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
              className={`mb-3 flex w-full bg-blue-500 cursor-pointer text-white items-center justify-center rounded-2xl px-9 py-6 text-lg transition-all hover:-translate-y-0.5 ${
                email.length > 4 && password.length > 5
                  ? "opacity-100"
                  : "opacity-10"
              }`}
              onClick={async () => {
                if (email.length < 5 || password.length < 6) {
                  return;
                }
                if (loginClicked || emailError || passwordError) return;
                await handleLogin();
              }}
            >
              {loginClicked ? (
                <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
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
                "Log in"
              )}
            </button>
          </>
        ) : (
          <>
            <div className="mt-5 flex flex-col items-center">
              <button
                className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl bg-[#4285F4] px-4 py-6 text-lg text-white transition-all hover:-translate-y-1 hover:opacity-90 md:px-9"
                onClick={() => {
                  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=80810281685-eqf05nodee3q27j6p0ki7bgvm7qlq1jn.apps.googleusercontent.com&redirect_uri=${
                    STAGE === "prod"
                      ? "https://codefoli.com/processing"
                      : "http://localhost:5173/processing"
                  }&scope=openid%20email%20profile&response_type=code`;
                }}
              >
                Continue with Google
                <img
                  width={"48"}
                  height={"48"}
                  className="ml-2 h-auto w-8 rounded-2xl bg-white p-1"
                  src={"https://img.icons8.com/stickers/100/google-logo.png"}
                  alt={"google icon"}
                />
              </button>
              <button
                className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-black  px-4 py-4 text-lg transition-all hover:-translate-y-1 hover:opacity-90 md:px-9 md:py-6"
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
    </animated.div>
        {emailError || passwordError ? (
            <StatusBar message={"Invalid credentials"} color={"bg-red-500"} />
        ) : (
            <></>
        )}
        </>
  );
};
export default Login;
