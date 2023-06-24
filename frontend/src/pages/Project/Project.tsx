import LinkIcon from 'assets/icons/arrow-up-right.svg'
import Footer from 'Components/Footer/Footer'
import { COLORS } from '../../util/constants'

const Project = () => {
    return (
        <>
            <main>
                <div className="container mx-auto my-20 max-w-screen-lg px-5">
                    <section className="hero mb-8">
                        <h1 className='text-4xl text-center font-bold mb-5'>Lorem ipsum dolor sit amet</h1>
                        <p className='text-center font-semibold mb-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere ex similique fuga beatae officia nam unde, velit accusantium et inventore.</p>
                        <div className="image-wrapper rounded-lg overflow-hidden shadow-custom bg-white p-2 border-black border-2 lg:h-[600px]">
                            {/* <div className="bg-red-500  w-full h-[80%]"></div> */}
                            <img src="https://picsum.photos/2000" alt="" className='rounded-lg object-cover h-full w-full block' />
                        </div>
                    </section>
                    <section className='mb-5 grid lg:grid-cols-6 grid-cols-1 gap-5'>
                        <div className="content-wrapper lg:col-span-4">
                            <h2 className='text-3xl font-bold'>Project Overview</h2>
                            <p className='mb-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum dolore unde saepe qui sint. Neque aliquid quam corrupti voluptas nam magni sed, temporibus delectus suscipit illum repellendus modi! Fuga, nemo.</p>
                            <p className='mb-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae cupiditate vitae vel tempore, nobis odit quos ipsum accusantium doloremque atque nihil molestias deleniti obcaecati expedita earum commodi doloribus ex delectus culpa magni id. Ab culpa nam, optio fugiat libero quia illum nihil vitae, placeat, eligendi est a blanditiis nemo iusto.</p>
                        </div>
                        <div className="card grid gap-2 shadow-custom rounded-lg border-2 lg:col-span-2 border-black bg-white p-2">
                            <h2 className='font-bold text-2xl'>Information</h2>
                            <ul className='list-disc pl-5'>
                                <div className="li-wrapper">
                                    <li className='font-bold'>Platform</li>
                                    <p className='font-normal'>Web, Android, iOS</p>
                                </div>
                                <div className="li-wrapper">
                                    <li className='font-bold'>Tech Stack</li>
                                    {['java', 'javascript', 'redis', 'gcp'].map((tech, index) => {
                                        return (
                                            <span
                                                key={index}
                                                className={`inline-block cursor-pointer mr-2 mb-2 rounded-lg px-3 text-white transition-all hover:-translate-y-0.5 ${COLORS[Math.floor(Math.random() * COLORS.length)]} py-2 text-sm`}>
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>
                            </ul>
                            <a href="#" className='inline-block w-full px-5 py-2 justify-self-end self-end bg-black text-white text-center rounded-lg hover:bg-blue-500 hover:-translate-y-1 transition ease-in'>View Online <img src={LinkIcon} alt="" className='inline-block -translate-y-1' /></a>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Project