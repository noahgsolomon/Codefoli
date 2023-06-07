import React from 'react';
import './style.css';

const Header: React.FC = () => {
    return (
        <header className={'header-wrapper'}>
            <div className={'header-container'}>
                <h1 className={'logo'}>Codefolio</h1>
                <button className={'join-button'}>Hop In!</button> //should link to '/login'
            </div>
        </header>
    );
}

export default Header;