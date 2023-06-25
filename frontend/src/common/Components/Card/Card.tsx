import React from "react";

const Card:
    React.FC<{
      imageUrl?: string;
      title: string;
      description: string;
      children?: React.ReactNode;
      imageSize?: 'cover' | 'contain';
      preview?: boolean;
    }> =
    ({ imageUrl,
       title,
       description,
       children,
       imageSize = 'contain',
       preview=true
     }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="group relative card mb-5 flex max-w-[400px] cursor-pointer flex-col rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button className={`${(hovered && !preview) ? 'opacity-100' : 'opacity-0'} absolute -top-4 -right-4 bg-white border-2 border-red-500 rounded-lg px-3 py-1 text-red-500 transition-all hover:-translate-y-0.5`}>x</button>
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
