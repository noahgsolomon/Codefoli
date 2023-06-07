import React from "react";
import './style.css';
import {Link} from "react-router-dom";

const Register: React.FC = () => {
    return (
        <div className="login-card">
            <h2 className="login-header">Register for free!</h2>
            <form>
                <input type="text" className="form-field" placeholder="Full Name" />
                <input type="email" className="form-field" placeholder="Email" />
                <input type="password" className="form-field" placeholder="Password" />
            </form>
            <p className="login-text">or</p>
            <button className="login-button github">Continue with GitHub</button>
            <Link to={'/login'}><p className="login-link">Already have an account? Log in</p></Link>
        </div>
    )
}

export default Register;
