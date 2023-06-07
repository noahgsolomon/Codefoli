import React from 'react';
import './style.css';
import {Link} from "react-router-dom";

const Login: React.FC = () => {

    return (
        <div className="login-card">
                <h2 className="login-header">Codefolio</h2>
                <p className="login-text">Log in to your account</p>
                <button className="login-button github">Continue with GitHub</button>
                <button className="login-button email">Continue with Email and Password</button>
            <Link to={'/register'}><p className="login-link">Create your account</p></Link>
        </div>
    )
}

export default Login;