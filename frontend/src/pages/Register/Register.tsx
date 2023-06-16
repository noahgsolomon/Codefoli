import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "api/authenticateapi.tsx";
import Loader from "Components/Loader/Loader.tsx";

const Register: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
      if (localStorage.getItem('role') === 'NEWBIE') {
          navigate('/setup');
      }
      else if (localStorage.getItem('role') === 'USER') {
          navigate('/dashboard');
      } else {
      setLoading(false);
    }
  }, [navigate]);

  const redirectUri = "http://localhost:5173/dashboard";

  const handleRegister = async () => {
    const registerRequest = await register(fullName, email, password);
    if (registerRequest) {
      localStorage.setItem("role", "NEWBIE");
      navigate("/setup");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="absolute left-1/2 top-1/2 w-[700px] max-w-[80%] -translate-x-1/2 -translate-y-1/2 transform rounded-xl border-2 border-black bg-gray-100 p-10 text-center shadow-md transition-all hover:shadow-lg">
      <h2 className="mb-12 text-3xl">
        <span className="bg-blue-500 px-1 text-white">Register for free!</span>
      </h2>
      <form>
        <input
          type="text"
          className="my-3 w-full rounded-md border border-gray-300 bg-white p-3 transition-shadow"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
      </form>
      <button
        className={`mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl px-9 py-6 text-lg transition-all hover:opacity-90 ${
          fullName.length > 4 && email.length > 4 && password.length > 5
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-500"
        }`}
        disabled={
          !(fullName.length > 4 && email.length > 4 && password.length > 5)
        }
        onClick={handleRegister}
      >
        Register
      </button>
      <p className="my-5 text-gray-500">or</p>
      <button
        className="mb-3 flex w-full cursor-pointer items-center justify-center rounded-2xl bg-black px-9 py-6 text-lg text-white transition-all hover:-translate-y-1 hover:opacity-90"
        onClick={() => {
          window.location.href = `http://localhost:8080/oauth/authorize/github?redirect_uri=${redirectUri}`;
        }}
      >
        Continue with GitHub
      </button>
      <Link to={"/login"}>
        <p className="mt-5 cursor-pointer text-sm text-blue-600 hover:underline">
          Already have an account? Log in
        </p>
      </Link>
    </div>
  );
};

export default Register;
