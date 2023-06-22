import React from "react";

type Props = {
  imageUrl?: string;
  title: string;
  description: string;
};

const Card: React.FC<Props> = ({ imageUrl, title, description }) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div className="card cursor-pointer mb-5 flex flex-col max-w-[400px] rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
        >
            {imageUrl && (
                <div className="img-wrapper h-[250px] relative">
                    <img
                        className={`inline-block h-full w-full object-contain p-5 transition-transform duration-300 ease-in-out transform ${hovered ? 'scale-110' : ''}`}
                        src={imageUrl}
                        alt=""
                    />
                </div>
            )}
            <div className="content bg-white p-5 rounded-b-2xl">
                <h2 className="title text-2xl font-bold">{title}</h2>
                <p className="description text-base">{description}</p>
            </div>
            <div className="flex-grow bg-white rounded-b-2xl"></div>
        </div>
    );
};

export default Card;
