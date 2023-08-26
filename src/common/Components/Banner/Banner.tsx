import { Link } from "react-router-dom";

type Props = {
  title: {
    text: string;
    align?: "center" | "left" | "right";
    color?: string;
  };
  imageUrl?: string;
  linkControls?: {
    to: string;
    text: string;
  };
  backgroundColor: string;
};

const Banner = ({
  title: { text, align = "center", color = "black" },
  linkControls,
  backgroundColor,
}: Props) => {
  return (
    <section
      className={` border-b-2 border-t-2 border-black bg-${backgroundColor}-500`}
    >
      <div
        className={`mx-auto my-10 flex max-w-screen-lg flex-col-reverse items-center px-5  md:flex-row`}
      >
        <div className={`content md:text-${align} text-center`}>
          <h3 className={`mb-5 text-${color} text-2xl font-bold md:text-3xl`}>
            {text}
          </h3>
          {linkControls && (
            <Link
              to={linkControls.to}
              className="mb-4 inline-block rounded-xl border-2 border-transparent bg-black px-4 py-2 text-right font-bold text-white transition-all hover:-translate-y-1 hover:bg-blue-500"
            >
              {linkControls.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
