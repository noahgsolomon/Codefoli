import React from 'react';
import './style.css';

const Login: React.FC = () => {

    return (
            <div className="login-card">
                <h2 className="login-header">Codefolio</h2>
                <p className="login-text">Log in to your account</p>
                <button className="login-button github">Continue with GitHub</button>
                <button className="login-button email">Continue with Email and Password</button>
                <p className="login-link">Create your account</p>
            </div>
    )
}

export default Login;