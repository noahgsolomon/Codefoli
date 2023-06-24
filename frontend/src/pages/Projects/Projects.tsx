import React from 'react'
import Card from 'Components/Card/Card'
import Footer from 'Components/Footer/Footer'
import ArrowRight from 'assets/icons/arrow-right.svg'
import { COLORS } from '../../util/constants'
import UserData from "Type/UserData.tsx";
import {Link} from "react-router-dom";

const Projects: React.FC<{ userData: UserData }> = ({ userData }) => {
    return (
        <>
        <main>
            <div className="container mx-auto my-20 max-w-screen-lg px-5">
                <section>
                    <h1 className='text-3xl md:text-5xl lg:text-6xl mb-5 font-bold text-center'>Projects</h1>
                    <p className='font-semibold text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem obcaecati porro officia consequatur? Consectetur dolorem necessitatibus rem? Quis, officia velit?</p>
                </section>
            </div>
        </main>
        {/* projects */}
        <section>
            <div className="container mx-auto px-5 mb-5">
                {/* projects */}
                <div className="projects gap-5 md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 justify-items-center">
                    {userData.projects.map(({ name, description, language, imageUrl = "" }) => {
                        return <Card
                            title={name}
                            description={description}
                            imageUrl={imageUrl}
                            key={Math.random().toString()}
                            imageSize='cover'
                        >
                            <Link
                                to='/project'
                                className='inline-block px-5 py-2 bg-white font-bold text-sm'
                            >Learn more <img src={ArrowRight} alt="" className='inline-block group-hover:translate-x-1 transition ease-in'/></Link>
                            <div className={`px-5 py-2 bg-white rounded-b-lg`}>
                                <span
                                    className={`inline-block cursor-pointer mr-2 mb-2 rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${COLORS[Math.floor(Math.random() * COLORS.length)]} py-2 text-sm`}>
                                    {language}
                                </span>
                            </div>
                        </Card>
                    })}
                </div>
            </div>
        </section>
        <Footer />
</>
    )
}

export default Projects