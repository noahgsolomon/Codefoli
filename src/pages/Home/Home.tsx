import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FiArrowUpRight, FiUsers, FiCode, FiRefreshCw } from 'react-icons/fi';
import './style.css';

const Home: React.FC = () => {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 500
    });

    return (
        <animated.div style={fadeIn} className="home-container">
            <main>
                <section className="intro-section">
                    <h2 className={'icon'}>Welcome to <span>Codefolio</span>! <FiArrowUpRight/></h2>
                    <p data-tip="About Codefolio"><span>Codefolio</span> is a platform dedicated to helping programmers create stunning portfolio websites. We believe in the power of showcasing your work effectively, and our mission is to make this process as simple as possible for you. With <span>Codefolio</span>, you can:</p>
                    <div className="ide-list">
                        <div className="bracket">{`{`}</div>
                        <ul style={{listStyleType: 'none'}}>
                            <li><FiUsers/> Create a professional and personalized portfolio website</li>
                            <li><FiCode/> Showcase your projects, skills, and accomplishments</li>
                            <li><FiRefreshCw/> Easily update and maintain your portfolio over time</li>
                        </ul>
                        <div className="bracket">{`}`}</div>
                    </div>
                    <p data-tip="Get Started">Are you ready to build your portfolio website with <span>Codefolio</span>? Click the "Sign Up" button above to create your account and get started!</p>
                </section>
                <section className="testimonial-section">
                    <h2 className={'icon'}>What Our <span>Users</span> Say <FiUsers/></h2>
                    <blockquote>
                        "Codefolio made building my portfolio a breeze. The user-friendly interface and the customizable templates helped me create a portfolio that truly represents my skills and work."
                        <cite>- Jane Doe</cite>
                    </blockquote>
                    <blockquote>
                        "With Codefolio, I was able to create a professional portfolio in no time. The project showcasing feature is excellent, and it helped me highlight my work effectively."
                        <cite>- John Smith</cite>
                    </blockquote>
                </section>
                <section className="feature-section">
                    <h2 className={'icon'}><span>Codefolio</span> Features <FiCode/></h2>
                    <div>
                        <h3>Customizable Templates <FiRefreshCw/></h3>
                        <p data-tip="Customize your portfolio">Choose from a variety of templates that suit your style and personalize them according to your needs.</p>
                    </div>
                    <div>
                        <h3>Project Showcasing <FiCode/></h3>
                        <p data-tip="Showcase your projects">Highlight your projects effectively with detailed descriptions, code snippets, and live demo links.</p>
                    </div>
                    <div>
                        <h3>Easy Updates <FiRefreshCw/></h3>
                        <p data-tip="Keep your portfolio updated">Keep your portfolio up-to-date with our easy-to-use interface. Add new projects, update your skills, and edit your details whenever you want.</p>
                    </div>
                </section>
            </main>
        </animated.div>
    );
};

export default Home;