import React from "react";

type Props = {
  imageUrl?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  imageSize?: 'cover' | 'contain';
};

const Card: React.FC<Props> = ({ imageUrl, title, description, children, imageSize = 'contain' }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="group card mb-5 flex max-w-[400px] cursor-pointer flex-col rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {imageUrl && (
        <div className="img-wrapper relative h-[250px] overflow-hidden rounded-t-lg">
          <img
            className={`inline-block h-full w-full transform object-${imageSize} transition-transform duration-300 ease-in-out ${hovered ? "scale-110" : ""
              }`}
            src={imageUrl}
            alt=""
          />
        </div>
      )}
      <div className="content rounded-2xl bg-white p-5">
        <h2 className="title text-2xl font-bold">{title}</h2>
        <p className="description text-base">{description}</p>
      </div>
      {children}
      <div className="flex-grow rounded-2xl bg-white"></div>
    </div>
  );
};

export default Card;
