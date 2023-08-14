import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { register } from "api/authenticateapi.tsx";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);


  const handleRegister = async () => {
    const registerRequest = await register(fullName, email, password);
    console.log(registerRequest)
    // if (registerRequest) {
    //   window.location.href = "/setup";
    // }
  };

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
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
                src="https://img.icons8.com/cotton/24/person-male--v2.png"
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
        </form>
        <button
          className={`mt-3 flex w-full cursor-pointer items-center justify-center rounded-2xl px-9 py-6 text-lg transition-all hover:opacity-90 ${
            fullName.length > 4 && email.length > 4 && password.length > 5
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
          onClick={async () => {
            if (
              fullName.length < 5 ||
              email.length < 5 ||
              password.length < 6
            ) {
              setEmailError(email.length < 4);
              setPasswordError(password.length < 5);
              setFullNameError(fullName.length < 4);
              return;
            }
            if (!isValidEmail(email)) {
              setEmailError(true);
              return;
            }

            await handleRegister();
          }}
        >
          Register
        </button>
        <p className="my-1 text-gray-500">or</p>
        <button
            className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl bg-[#4285F4]  border-2 border-white px-9 py-6 text-lg text-white transition-all hover:-translate-y-1 hover:opacity-90"
            onClick={() => {
              // window.location.href = `http://localhost:8080/oauth/authorize/github?redirect_uri=${redirectUri}`;
              console.log('something');
            }}
        >
          Continue with Google
          <img
              className="ml-2 h-auto w-8 rounded-2xl bg-white p-1"
              src={"src/assets/google-logo.png"}
              alt={"google icon"}
          />
        </button>
        <Link to={"/login"}>
          <p className="mt-5 cursor-pointer text-sm text-blue-600 hover:underline">
            Already have an account? Log in
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Register;
