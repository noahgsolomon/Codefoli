import React, { useState } from "react";
import './style.css';
import { Link } from "react-router-dom";

const Register: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                className={`login-button ${fullName.length > 4 && email.length > 4 && password.length > 4 ? 'active' : ''}`}
                disabled={!(fullName.length > 4 && email.length > 4 && password.length > 4)}
            >
                Register
            </button>
            <p className="login-text">or</p>
            <button className="login-button github">Continue with GitHub</button>
            <Link to={'/login'}><p className="login-link">Already have an account? Log in</p></Link>
        </div>
    )
}

export default Register;