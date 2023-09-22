import { IconType } from "react-icons";

type Props = {
  ImageUrl?: string | IconType;
  title?: string;
  description?: string;
};

const Card = ({ ImageUrl, title, description }: Props) => {
  return (
    <div className="m-5 mb-5 flex w-96 flex-col items-center space-y-5 rounded-2xl border-2 border-black bg-white p-5 shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover dark:bg-[#1a1a1a]">
      {ImageUrl &&
        (typeof ImageUrl === "string" ? (
          <img
            className="h-64 w-96 border-8 border-gray-50 object-cover transition-all dark:border-[#0d0d0d]"
            src={ImageUrl}
            alt=""
          />
        ) : (
          <ImageUrl size={40} />
        ))}
      <div className="content">
        <h2 className="title mb-2 text-center text-2xl font-bold">{title}</h2>
        <p className="description text-center text-base">{description}</p>
      </div>
    </div>
  );
};

export default Card;
