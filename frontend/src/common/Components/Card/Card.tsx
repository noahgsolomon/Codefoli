import React from 'react'
import { IconType } from 'react-icons'

type Props = {
    ImageUrl?: string | IconType,
    title?: string,
    description?: string,
}

const Card = ({ ImageUrl, title, description }: Props) => {
    return (
        <div className='bg-white rounded-2xl flex flex-col items-center p-5 w-72 shadow shadow-sm space-y-5 mb-5  transition-all duration-300 hover:translate-y-1 hover:shadow-lg'>
            {ImageUrl && (
                typeof ImageUrl === 'string'?
                <img
                    className={`inline-block h-40 w-40 transform object-cover transition-all ease-in-out rounded-full border border-8 shadow-sm border-gray-50 shadow`}
                    src={ImageUrl}
                    alt=""
                />:<ImageUrl size={40}/>
            )}
            <div className="content">
                <h2 className="title text-2xl font-bold text-center mb-2">{title}</h2>
                <p className="description text-base text-center">{description}</p>
            </div>
        </div>
    )
}

export default Card