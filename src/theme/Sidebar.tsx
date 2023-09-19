import {FC, useState} from "react";

const Sidebar: FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {isOpen && (
                <div
                    className={`ml-2 z-40 bg-gray-50 dark:bg-[#1a1a1a] h-[95%] rounded-lg fixed mt-4 px-4 border-black border-2 shadow-custom`}
                >
                    <div className="flex justify-end">
                        <button className="text-2xl" onClick={toggleSidebar}>
                            {"☰"}
                        </button>
                    </div>
                    <div
                        className="mt-10 flex flex-col justify-between h-[50%] items-center text-2xl font-bold"
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
                    </div>
                </div>
            )}

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