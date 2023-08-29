import { FC, useState } from "react";

const ValueCardP: FC<{
  imageUrl: string;
  title: string;
  description: string;
}> = ({ imageUrl, title, description }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card group relative mb-5 flex max-w-[400px] cursor-pointer flex-col rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {imageUrl && (
        <div className="img-wrapper relative h-[250px] overflow-hidden rounded-t-lg">
          <img
            className={`inline-block h-full w-full transform object-contain transition-all ease-in-out ${
              hovered ? "scale-105" : ""
            }`}
            src={imageUrl}
            alt=""
          />
        </div>
      )}
      <div className="rounded-b-2xl bg-white dark:bg-[#0d0d0d] p-5">
        <h2 className="title text-2xl font-bold">{title}</h2>
        <p className="description text-base">{description}</p>
      </div>
    </div>
  );
};

export default ValueCardP;
