import React, { useState } from 'react';
import './style.css';
import {Link} from "react-router-dom";

const Login: React.FC = () => {
    const [showFields, setShowFields] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const clientId = "5d729095e6b70e4508e7";
    const redirectUri = "http://localhost:8080/login/oauth2/code/github";
    const scope = "read:user%20user:email";

    function generateRandomString() {
        return crypto.randomUUID()
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const state = generateRandomString();

    return (
        <div className="login-card">
            <h2 className="login-header">Codefolio</h2>
            <p className="login-text">Log in to your account</p>
            {showFields ? (
                <>
                    <button
                        className="back-button"
                        onClick={() => setShowFields(false)}
                    >
                        Back
                    </button>
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
                    <button className={`login-button ${email.length > 3 && password.length > 3 ? 'active' : ''}`}>Log In</button>
                </>
            ) : (
                <>
                    <button className="login-button github" onClick={() => {
                        window.location.href = `https://github.com/login/oauth/authorize?response_type=code&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUri}`;
                    }}>Continue with GitHub</button>
                    <button
                        className="login-button email"
                        onClick={() => setShowFields(true)}
                    >
                        Continue with Email and Password
                    </button>
                    <Link to={'/register'}>
                        <p className="login-link">Create your account</p>
                    </Link>
                </>
            )}
        </div>
    )
}

export default Login;