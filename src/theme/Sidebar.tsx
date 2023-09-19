import {FC, useState} from "react";
import {useSpring, animated} from "react-spring";

const Sidebar: FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Define a spring animation for the sidebar's width
    const sidebarProps = useSpring({
        width: isOpen ? 200 : 0, // Width when open and closed
        from: { width: isOpen ? 100 : 0 }, // Initial width
    });

    const contentProps = useSpring({
        opacity: isOpen ? 1 : 0, // Opacity when open and closed
        from: { opacity: isOpen ? 1 : 0 }, // Initial opacity
        delay: isOpen ? 100 : 0, // Add a delay when opening
    });

    return (
        <>
            <animated.div
                    className={`${isOpen ? '' : 'invisible'} ml-2 z-40 bg-gray-50 dark:bg-[#1a1a1a] h-[95%] rounded-lg fixed mt-4 px-4 border-black border-2 shadow-custom`}
                    style={{
                        width: sidebarProps.width.interpolate((width) => `${width}px`),
                    }}
                >
                    <div className="flex justify-end">
                        <button className="text-2xl" onClick={toggleSidebar}>
                            {"☰"}
                        </button>
                    </div>
                    <animated.div
                        className="mt-10 flex flex-col justify-between h-[50%] items-center text-2xl font-bold"
                        style={contentProps}
                    >
                        <div className="cursor-pointer hover:text-blue-500 transition-all">
                            Home
                        </div>
                        <div className="cursor-pointer hover:text-blue-500 transition-all">
                            Deployment
                        </div>
                        <div className="cursor-pointer hover:text-blue-500 transition-all">
                            Analytics
                        </div>
                        <div className="cursor-pointer hover:text-blue-500 transition-all">
                            Feedback
                        </div>
                        <div className="cursor-pointer hover:text-blue-500 transition-all">
                            Settings
                        </div>
                    </animated.div>
                </animated.div>
            <button
                    className={`${!isOpen ? '' : 'opacity-0'} transition-all text-2xl absolute top-4 md:left-36 left-8 z-40`}
                    onClick={toggleSidebar}
                >
                    {"☰"}
                </button>
        </>
    );
};
export default Sidebar;