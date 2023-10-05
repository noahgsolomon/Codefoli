import { FC, useMemo, useState } from "react";
import {
  LIGHT_THEME_KEY,
  DARK_THEME_KEY,
  LOCALSTORAGE_THEME_KEY,
} from "../../util/constants";
import { useSpring, animated } from "react-spring";
import { login } from "api/authenticateapi";
import { STAGE } from "../../config";
import StatusBar from "Components/StatusBar/StatusBar";

const Login2: FC = () => {
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
      window.location.href = "/home";
    } else {
      setEmailError(true);
      setPasswordError(true);
    }
    setLoginClicked(false);
  };

  const theme = useMemo(() => {
    const storedTheme = localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
      | typeof LIGHT_THEME_KEY
      | typeof DARK_THEME_KEY;
    return storedTheme || LIGHT_THEME_KEY;
  }, []);

  const formAnimate = useSpring({
    to: { opacity: 1, transform: "translateY(0)" },
    from: { opacity: 0, transform: "translateY(-20px)" },
  });

  const imageAnimate = useSpring({
    from: { opacity: 0, transform: "translateX(-20px)" },
    to: { opacity: 1, transform: "translateX(0)" },
  });

  return (
    <>
      <div className="flex h-screen w-screen flex-row items-center justify-center">
        <div className="hidden h-screen w-[50%] items-center bg-blue-100 bg-opacity-30 transition-all hover:-translate-y-0.5 dark:bg-[#0d0d0d] lg:flex">
          <animated.img
            style={imageAnimate}
            className=""
            src={`https://images.codefoli.com/${
              theme === "dark"
                ? "walterwhiteprofiledark.png"
                : "walterwhiteprofile.png"
            }`}
            alt="profile photo"
          />
        </div>
        <animated.div
          style={formAnimate}
          className="flex w-[75%] max-w-[500px] flex-col md:w-full lg:mx-auto lg:w-[50%]"
        >
          {" "}
          {/* This line has been modified */}
          <h1
            className={`mb-3 bg-gradient-to-r from-purple-500 to-purple-900 bg-clip-text text-2xl text-3xl font-bold text-transparent`}
          >
            Log in
          </h1>
          <div>
            <button
              onClick={() => {
                window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=80810281685-eqf05nodee3q27j6p0ki7bgvm7qlq1jn.apps.googleusercontent.com&redirect_uri=${
                  STAGE === "prod"
                    ? "https://codefoli.com/processing"
                    : "http://localhost:5173/processing"
                }&scope=openid%20email%20profile&response_type=code`;
              }}
              className="flex w-full flex-row justify-center gap-2 rounded-lg border-[3px] border-gray-300 px-2 py-2 shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-md dark:border-gray-500"
            >
              <div className="w-10">
                <img
                  src="https://images.codefoli.com/googlelogo.png"
                  alt="Google Logo"
                  className="inline"
                />
              </div>
              <span> Log in with Google</span>
            </button>
          </div>
          <div className="mt-4 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <div className="mx-4 text-gray-500">or</div>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-left">Email</label>
              <input
                placeholder="example@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(false);
                  setPasswordError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (email.length < 5 || password.length < 6) {
                      return;
                    }
                    if (loginClicked || emailError || passwordError) return;
                    handleLogin();
                  }
                }}
                className={`${
                  passwordError
                    ? "border-red-500 border-opacity-50 dark:border-red-500 dark:border-opacity-50"
                    : "border-gray-300 dark:border-gray-500"
                } rounded-lg border-[3px] py-1 pl-5 font-bold shadow-sm outline-none transition-all focus:border-opacity-50 focus:ring-0 dark:bg-[#1a1a1a] dark:focus:border-opacity-50`}
                type="email"
                required={false}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-left">Password</label>
              <input
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(false);
                  setEmailError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (email.length < 5 || password.length < 6) {
                      return;
                    }
                    if (loginClicked || emailError || passwordError) return;
                    handleLogin();
                  }
                }}
                className={`${
                  passwordError
                    ? "border-red-500 border-opacity-50 dark:border-red-500 dark:border-opacity-50"
                    : "border-gray-300 dark:border-gray-500"
                } rounded-lg border-[3px] py-1 pl-5 font-bold shadow-sm outline-none transition-all focus:border-opacity-50 focus:ring-0 dark:bg-[#1a1a1a] dark:focus:border-opacity-50 `}
                type="password"
                required={false}
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center ">
            <button
              onClick={() => {
                if (email.length < 5 || password.length < 6) {
                  return;
                }
                if (loginClicked || emailError || passwordError) return;
                handleLogin();
              }}
              className={`w-full rounded-lg bg-purple-500 bg-gradient-to-r from-purple-700 to-purple-400 py-2 text-center text-white transition-all hover:-translate-y-0.5
                    ${
                      email.length > 4 && password.length > 5
                        ? "opacity-100"
                        : "opacity-10"
                    }`}
              style={{
                boxShadow:
                  theme === "dark"
                    ? "0 4px 6px rgba(156, 39, 176, 0.25)"
                    : "0 4px 6px rgba(128, 0, 128, 0.1)",
              }}
            >
              {loginClicked ? (
                <svg
                  className="mx-auto h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                >
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
          </div>
          <div className="mt-4 text-center opacity-80">
            Don't have an account?{" "}
            <a
              className="font-bold text-purple-500 transition-all hover:opacity-80"
              href="/register"
            >
              Sign up
            </a>
          </div>
        </animated.div>
      </div>
      {emailError || passwordError ? (
        <StatusBar
          message={"Invalid credentials"}
          color={
            "bg-gradient-to-r text-red-100 dark:text-red-600 from-red-400 to-red-300 text-red-900 dark:from-red-900 dark:to-red-800"
          }
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Login2;
