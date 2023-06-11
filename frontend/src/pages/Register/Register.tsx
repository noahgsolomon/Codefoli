import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {register} from "api/authenticateapi.tsx";
import Loader from "Components/Loader/Loader.tsx";

const Register: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'true') {
            navigate('/dashboard');
        }
        else {
            setLoading(false);
        }
    }, [navigate]);

    const redirectUri = "http://localhost:5173/dashboard";

    const handleRegister = async () => {
        const registerRequest = await register(fullName, email, password);
        if (registerRequest) {
            localStorage.setItem('loggedIn', 'true');
            navigate('/dashboard');
        }
    }

    if (loading){
        return (
            <Loader />
        )
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all w-[700px] max-w-[80%] p-10 rounded-xl border-2 border-black shadow-md hover:shadow-lg text-center bg-gray-100">
            <h2 className="text-3xl mb-12">
                <span className="px-1 bg-blue-500 text-white">Register for free!</span>
            </h2>
            <form>
                <input
                    type="text"
                    className="w-full p-3 my-3 border border-gray-300 rounded-md bg-white transition-shadow"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
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
            </form>
            <button
                className={`flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl px-9 py-6 text-lg transition-all hover:opacity-90 ${fullName.length > 4 && email.length > 4 && password.length > 5 ? 'text-white bg-blue-600' : 'text-gray-500 bg-gray-200'}`}
                disabled={!(fullName.length > 4 && email.length > 4 && password.length > 5)}
                onClick={handleRegister}
            >
                Register
            </button>
            <p className="text-gray-500 my-5">or</p>
            <button className="flex items-center justify-center cursor-pointer w-full mb-3 rounded-2xl px-9 py-6 text-lg transition-all hover:opacity-90 text-white bg-black hover:-translate-y-1" onClick={() => {
                window.location.href = `http://localhost:8080/oauth/authorize/github?redirect_uri=${redirectUri}`;
            }}>
                Continue with GitHub
            </button>
            <Link to={'/login'}><p className="text-blue-600 cursor-pointer mt-5 text-sm hover:underline">Already have an account? Log in</p></Link>
        </div>
    )
}

export default Register;