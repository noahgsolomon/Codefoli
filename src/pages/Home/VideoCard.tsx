import { FC } from "react";
import FeatureCard from "./FeatureCard.tsx";

const VideoCard: FC<{
  description: string;
  bgClass: string;
  title: string;
  video: string;
  className: string;
}> = ({ description, bgClass, title, video, className }) => {
  return (
    <div className={className}>
      <FeatureCard title={title} bgClass={bgClass} description={description}>
        <video
          key={video}
          className="w-[80%] rounded-md opacity-80 shadow-lg md:w-[90%]"
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          data-video="0"
        >
          <source key={video} src={video} type="video/mp4"></source>
        </video>
      </FeatureCard>
    </div>
  );
};

export default VideoCard;
