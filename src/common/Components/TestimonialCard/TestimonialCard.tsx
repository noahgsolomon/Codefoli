type Props = {
  imageUrl?: string;
  description?: string;
  userName?: string;
  reverse?: boolean;
};

const TestimonialCard = ({
  imageUrl,
  description,
  userName = "Anonymous",
  reverse,
}: Props) => {
  return (
    <div
      className={`testimonial-card mb-5 flex flex-col items-center justify-center border-b-4 border-gray-600 bg-gray-100 px-5 py-4 text-gray-800 md:justify-normal md:space-x-10 md:border-b-0 ${
        reverse
          ? "md:flex-row-reverse  md:border-r-4"
          : "md:flex-row  md:border-l-4"
      }`}
    >
      <img
        className="mx-auto h-28 w-28 flex-shrink-0 transform self-start rounded-full border-2 border-black bg-blue-500 object-contain transition-all hover:-translate-y-0.5 hover:shadow-custom md:mx-0"
        src={imageUrl}
        alt="User testimonial"
      />
      <div className="content flex-1">
        <p className="text-center md:text-left"> "{description}" </p>
        <p
          className={`text-center font-bold ${
            reverse ? "md:text-left" : "md:text-right"
          }`}
        >
          {" "}
          - {userName}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
