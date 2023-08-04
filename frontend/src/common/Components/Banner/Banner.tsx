import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    title: {
        text: string,
        align?: 'center' | 'left' | 'right',
        color?: string
    },
    imageUrl?: string,
    linkControls?: {
        to: string,
        text: string
    },
    backgroundColor: string
}

const Banner = ({ title: { text, align = 'center', color = 'black' }, linkControls, backgroundColor, imageUrl }: Props) => {
    return (
        <section className={`mb-10 bg-${backgroundColor}-500`}>
            <div className={`mx-auto my-10 max-w-screen-lg py-10 px-5 flex items-center md:flex-row flex-col-reverse`}>
                <div className={`content ${imageUrl && 'max-w-[800px]'} md:text-${align} text-center`}>
                    <h3 className={`mb-5 text-${color} md:text-3xl text-2xl font-bold`}>
                        {text}
                    </h3>
                    {linkControls && <Link
                        to={linkControls.to}
                        className="mb-4 inline-block rounded-xl border-2 border-transparent bg-black px-4 py-2 font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-500 text-right"
                    >
                        {linkControls.text}
                    </Link>}
                </div>

                {
                imageUrl && 
                <div>
                    <img src={imageUrl} alt="" className="inline-block h-80 object-contain md:h-full" />
                </div>
                }
            </div>
        </section>
    )
}

export default Banner