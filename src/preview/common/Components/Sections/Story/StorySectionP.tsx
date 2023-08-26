import { FC, useMemo } from "react";
import { StoryType } from "Type/Section.tsx";

const StorySectionP: FC<{
  details: StoryType;
}> = ({ details }) => {
  const date = useMemo(() => Date.now(), []);

  return (
    <section className=" relative mb-20 mt-20 bg-black transition-all">
      <div className=" mx-auto my-20 max-w-screen-lg gap-5 px-5 py-20 md:grid md:grid-cols-2 md:items-center md:justify-between">
        <div>
          <h2 className="mb-8 text-4xl font-bold text-white transition-all md:text-5xl md:leading-tight">
            {details.header_one}
          </h2>
          <p className=" text-lg font-semibold text-white transition-all">
            {details.description_one}
          </p>
          <div className="my-5">
            <div className=" flex items-start justify-between gap-4">
              <div className="mt-1 h-4 w-4 rounded border-2 bg-indigo-600"></div>
              <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white transition-all">
                {details.bullet_one}
              </p>
            </div>
            <div className=" flex items-start justify-between gap-4">
              <div className="mt-1 h-4 w-4 rounded border-2 bg-sky-600"></div>
              <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white transition-all">
                {details.bullet_two}
              </p>
            </div>
            <div className=" flex items-start justify-between gap-4">
              <div className="mt-1 h-4 w-4 rounded border-2 bg-yellow-500"></div>
              <p className="event-descripition flex-1 pt-0 text-lg font-semibold text-white transition-all">
                {details.bullet_three}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className={` relative mb-5 h-[400px] w-[400px] transition-all`}>
            <div className="h-full w-full overflow-hidden rounded-3xl">
              <img
                src={details.image_one + "?date=" + date}
                alt=""
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySectionP;
