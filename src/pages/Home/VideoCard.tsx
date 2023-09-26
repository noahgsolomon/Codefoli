import {FC} from "react";
import FeatureCard from "./FeatureCard.tsx";

const VideoCard:FC<{
    description: string;
    bgClass: string;
    title: string;
    video: string;
    className: string;
}> = ({description, bgClass, title, video, className}) =>  {



    return (
        <div className={className}>
            <FeatureCard title={title} bgClass={bgClass} description={description}>
                <video
                    key={video}
                    className="shadow-lg rounded-md w-[80%] md:w-[90%] opacity-80"
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
}

export default VideoCard;