import { FC } from "react";
const Marquee: FC<{
  items: string[];
}> = ({ items }) => {
  return (
    <div className="mt-32 overflow-x-hidden bg-black">
      <div className="animate-marquee whitespace-nowrap py-8 ">
        {items.map((item) => (
          <span className="mx-4 text-2xl font-bold text-white" key={item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
