import React from 'react'

type Props = {
    imageUrl?: string,
    description?: string,
    userName?: string,
    reverse?: boolean
}

const TestimonialCard = ({imageUrl, description, userName = 'Anonymous', reverse}: Props) => {
  return (
    <div className={`testimonial-card mb-5 md:border-b-0 border-b-4 border-gray-600 bg-gray-100 px-5 py-4 text-gray-800 flex items-center md:space-x-10 flex-col justify-center md:justify-normal ${reverse? 'md:flex-row-reverse  md:border-r-4': 'md:flex-row  md:border-l-4'}`}>
    <img
      className="shadow-box mx-auto md:mx-0 self-start flex-shrink-0 bg-blue-500 w-28 h-28 object-contain transform rounded-full border-4 border-black transition-all duration-300 hover:translate-y-1 hover:shadow-lg"
      src={imageUrl}
      alt="User testimonial"
    />
    <div className="content flex-1">
      <p className="md:text-left text-center"> "{description}" </p>
      <p className={`text-center font-bold ${reverse? 'md:text-left': 'md:text-right'}`}> - {userName}</p>
    </div>
  </div>
  )
}

export default TestimonialCard