import React, {FC, useEffect, useState} from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    type MotionStyle,
    type MotionValue,
} from 'framer-motion';
import {useIsMobile} from "../../util/useIsMobile.tsx";
import {clsx} from "clsx";

type WrapperStyle = MotionStyle & {
    '--x': MotionValue<string>;
    '--y': MotionValue<string>;
};
const  FeatureCard:FC<{
    title: string;
    description: string;
    bgClass: string;
    children: React.ReactNode;
}> = ({title, description, bgClass, children}) =>  {

    const [mounted, setMounted] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const isMobile = useIsMobile();

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        if (!currentTarget || isMobile) return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <motion.div
            className="animated-feature-cards relative w-full drop-shadow-[0_0_15px_rgba(49,49,49,0.2)] dark:drop-shadow-[0_0_15px_rgba(49,49,49,0.2)]"
            onMouseMove={handleMouseMove}
            style={
                {
                    '--x': useMotionTemplate`${mouseX}px`,
                    '--y': useMotionTemplate`${mouseY}px`,
                } as WrapperStyle
            }
        >
            <div
                className={clsx(
                    'group relative h-full w-full overflow-hidden rounded-3xl border bg-gradient-to-b from-neutral-50/90 to-neutral-100/90 transition duration-300 dark:from-neutral-950/90 dark:to-neutral-800/90',
                    'md:hover:border-transparent',
                    bgClass,
                )}
            >
                <div className="mx-10 my-10 min-h-[450px] w-full">
                    <div className="flex w-4/6 mb-5 flex-col gap-3">
                        <h2 className="text-xl font-bold tracking-tight md:text-xl">{title}</h2>
                        <p className="text-sm leading-5 text-zinc-600 dark:text-zinc-400 sm:text-base sm:leading-7">
                            {description}
                        </p>
                    </div>
                        {mounted ? children : null}
                </div>
            </div>
        </motion.div>
    );
}

export default FeatureCard;