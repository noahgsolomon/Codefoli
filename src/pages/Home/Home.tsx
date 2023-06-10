import React, {useEffect} from 'react';
import { useSpring, animated } from 'react-spring';
import './style.css';
import {useNavigate} from "react-router-dom";
import { FiCode, FiRefreshCw, FiLayout } from 'react-icons/fi';

const Home: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === 'true') {
            navigate('/dashboard');
        }
    }, [navigate]);

    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 50
    });

    return (
        <animated.div style={fadeIn} className="home-container">
            <main>
                <section className="intro-section">
                    <h1>Welcome to <span className='highlight-codefolio'>Codefolio</span>!</h1>
                    <img className="intro-image" src="src/assets/profiledisplay.png" alt="Introductory visual"/>
                    <p>Codefolio is a platform dedicated to helping programmers create stunning portfolio websites...</p>
                    <h2>What you can do:</h2>
                    <div className="ide-list">
                        <ul>
                            <li>Create a professional and personalized portfolio website</li>
                            <li>Showcase your projects, skills, and accomplishments</li>
                            <li>Easily update and maintain your portfolio over time</li>
                        </ul>
                    </div>
                    <h3>Ready to build your portfolio website with Codefolio? Sign Up and get started!</h3>
                </section>
                <section className="testimonial-section">
                    <h2>What Our <span className='highlight-users'>Users</span> Say</h2>
                    <div className="testimonial-grid">
                        <blockquote>"Codefolio made building my portfolio a breeze. It truly represents my skills and work." - Jane Doe</blockquote>
                        <img className={'profile-img'} src="src/assets/user2-pfp.png" alt="User testimonial"/>
                        <img className={'profile-img'} src="src/assets/user-pfp.png" alt="User testimonial"/>
                        <blockquote>"With Codefolio, I was able to create a professional portfolio in no time." - John Smith</blockquote>
                    </div>
                </section>
                <section className="feature-section">
                    <h2>Codefolio <span className='highlight-features'>Features</span></h2>
                    <div className="features-grid">
                        <div>
                            <FiLayout size={40} />
                            <h3>Customizable Templates</h3>
                            <p>Choose from a variety of templates that suit your style and personalize them according to your needs.</p>
                        </div>
                        <div>
                            <FiCode size={40} />
                            <h3>Project Showcasing</h3>
                            <p>Highlight your projects effectively with detailed descriptions, code snippets, and live demo links.</p>
                        </div>
                        <div>
                            <FiRefreshCw size={40} />
                            <h3>Easy Updates</h3>
                            <p>Keep your portfolio up-to-date with our easy-to-use interface.</p>
                        </div>
                    </div>
                </section>
            </main>
        </animated.div>
    );
};

export default Home;