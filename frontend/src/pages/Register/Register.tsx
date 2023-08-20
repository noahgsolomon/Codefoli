import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "api/authenticateapi.tsx";
import StatusBar from "Components/StatusBar/StatusBar.tsx";
import { useSpring, animated } from "react-spring";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [registerClicked, setRegisterClicked] = useState(false);

  const handleRegister = async () => {
    setRegisterClicked(true);
    const registerRequest = await register(fullName, email, password);
    console.log(registerRequest);
    if (registerRequest.status === "OK") {
      window.location.href = "/setup";
    } else {
      setEmailError(true);
      setPasswordError(true);
    }
    setRegisterClicked(false);
  };

  const registerAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    delay: 0,
  });

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <animated.div
      style={registerAnimation}
      className="flex items-center justify-center bg-gray-50 p-4"
    >
      <div className="mt-10 w-[700px] max-w-[80%] rounded-xl border-2 border-black bg-gray-100 p-10 text-center shadow-custom transition-all">
        <h2 className="mb-12 text-3xl">
          <p>
            <span className="bg-blue-500 px-1 text-white">Register</span> for
            free!
          </p>
        </h2>
        <form noValidate={true} onSubmit={(e) => e.preventDefault()}>
          <div className="relative text-left">
            <label htmlFor="name" className="text-base font-bold">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder="// John Doe"
                value={fullName}
                className={`mb-4 mt-2 w-full rounded-xl border-2 border-black bg-white p-3 pl-10 placeholder-black shadow-custom ring-transparent transition-shadow hover:shadow-customHover focus:border-black focus:ring-0 
                      ${fullNameError ? "border-red-500" : ""}`}
                onChange={(e) => {
                  setFullNameError(false);
                  setFullName(e.target.value);
                }}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/48/person-male--v2.png"
                alt="name"
                className="absolute left-2 top-9 -translate-y-1/2 transform"
              />
            </div>
          </div>
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
                  setPasswordError(false);
                  setEmail(e.target.value);
                }}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/48/shield--v1.png"
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
                  setEmailError(false);
                  setPassword(e.target.value);
                }}
              />
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/cotton/48/new-post.png"
                alt="email"
                className="absolute left-2 top-9 -translate-y-1/2 transform"
              />
            </div>
          </div>
        </form>
        <button
          className={`mt-3 flex w-full cursor-pointer items-center justify-center rounded-2xl px-9 py-6 text-lg transition-all hover:opacity-90 ${
            fullName.length > 0 && email.length > 4 && password.length > 5
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={async () => {
            if (
              fullName.length < 1 ||
              email.length < 5 ||
              password.length < 6
            ) {
              return;
            }
            if (!isValidEmail(email)) {
              setEmailError(true);
              return;
            }
            if (registerClicked || emailError || passwordError) return;

            await handleRegister();
          }}
        >
          {registerClicked ? (
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
            "Register"
          )}
        </button>
        <p className="my-1 text-gray-500">or</p>
        <button
          className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl border-2  border-white bg-[#4285F4] px-9 py-6 text-lg text-white transition-all hover:-translate-y-1 hover:opacity-90"
          onClick={() => {
            window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=80810281685-eqf05nodee3q27j6p0ki7bgvm7qlq1jn.apps.googleusercontent.com&redirect_uri=https://codefoli.com/processing&scope=openid%20email%20profile&response_type=code`;
          }}
        >
          Continue with Google
          <img
              width={'48'}
              height={'48'}
            className="ml-2 h-auto w-8 rounded-2xl bg-white p-1"
            src={'https://img.icons8.com/stickers/100/google-logo.png'}
            alt={"google icon"}
          />
        </button>
        <Link to={"/login"}>
          <p className="mt-5 cursor-pointer text-sm text-blue-600 hover:underline">
            Already have an account? Log in
          </p>
        </Link>
      </div>
      {emailError && (
        <StatusBar
          message={"Error. Credentials invalid or email taken."}
          color={"bg-red-500"}
        />
      )}
    </animated.div>
  );
};

export default Register;
