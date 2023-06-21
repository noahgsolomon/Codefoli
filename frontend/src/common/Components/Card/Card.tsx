import React from "react";

type Props = {
  imageUrl?: string;
  title: string;
  description: string;
};

const Card: React.FC<Props> = ({ imageUrl, title, description }) => {
  return (
    <div className="card mb-5 max-w-[400px] rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover md:flex md:max-w-[450px] md:items-center">
      {imageUrl && (
        <div className="img-wrapper h-[250px] w-full md:h-full">
          <img
            className="inline-block h-full w-full rounded-t-lg object-contain p-5 md:rounded-l-2xl md:rounded-tr-none"
            src={imageUrl}
            alt=""
          />
        </div>
      )}
      <div className="content rounded-b-2xl bg-white p-5">
        <h2 className="title text-2xl font-bold">{title}</h2>
        <p className="description text-base">{description}</p>
      </div>
    </div>
  );
};

export default Card;
