import React from 'react';
import './style.css';
import {Link} from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className={'header-wrapper'}>
            <div className={'header-container'}>
                <h1 className={'logo'}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>Codefolio</Link>
                </h1>
                <Link to="/login" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <button className={'join-button'}>
                        Hop In!
                    </button>
                </Link>
            </div>
        </header>
    );
}

export default Header;