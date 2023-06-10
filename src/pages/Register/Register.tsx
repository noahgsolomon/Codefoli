import React, {useEffect, useState} from "react";
import './style.css';
import {Link, useNavigate} from "react-router-dom";
import {register} from "../../util/api/authenticateapi.tsx";
import Loader from "../../common/Components/Loader/Loader.tsx";

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
        <div className="login-card">
            <h2 className="login-header">Register for free!</h2>
            <form>
                <input
                    type="text"
                    className="form-field"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <input
                    type="email"
                    className="form-field"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="form-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>
            <button
                className={`login-button ${fullName.length > 4 && email.length > 4 && password.length > 5 ? 'active' : ''}`}
                disabled={!(fullName.length > 4 && email.length > 4 && password.length > 5)}
                onClick={handleRegister}
            >
                Register
            </button>
            <p className="login-text">or</p>
            <button className="login-button github" onClick={() => {
                window.location.href = `http://localhost:8080/oauth/authorize/github?redirect_uri=${redirectUri}`;
            }}>Continue with GitHub</button>
            <Link to={'/login'}><p className="login-link">Already have an account? Log in</p></Link>
        </div>
    )
}

export default Register;