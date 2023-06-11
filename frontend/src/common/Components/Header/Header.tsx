import React, {useEffect, useState} from 'react';
import './style.css';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const showButtons = !['/login', '/register', '/'].includes(location.pathname);
    const [loading, setLoading] = useState(true);
    const logoLink = showButtons ? '/dashboard' : '/';

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <header className={`header-wrapper ${loading ? '' : 'show'}`}>
            <div className="header-container">
                <h1 className="logo">
                    <Link to={logoLink} style={{ color: 'inherit', textDecoration: 'inherit' }}>Codefolio</Link>
                </h1>
                {showButtons && (
                    <>
                    <div className="nav-buttons">
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/about">About</Link>
                        <Link to="/portfolio" >Portfolio</Link>
                    </div>
                    <a href="mailto:email@example.com" className="email-button">
                    <img className={'email-icon'} src={'src/assets/email.svg'} alt={'email icon'}/>
                    </a>
                    </>
                )}
                {!showButtons && (
                    <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        <button className="join-button">Hop In!</button>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;