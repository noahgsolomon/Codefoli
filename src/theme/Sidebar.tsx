import { FC, useState } from "react";

const Sidebar: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed z-40 ml-2 mt-4 h-[95%] rounded-lg border-2 border-black bg-gray-50 px-4 shadow-custom dark:bg-[#1a1a1a]`}
        >
          <div className="flex justify-end">
            <button className="text-2xl" onClick={toggleSidebar}>
              {"☰"}
            </button>
          </div>
          <div className="mt-10 flex h-[50%] flex-col items-center justify-between text-2xl font-bold">
            <div className="cursor-pointer transition-all hover:text-blue-500">
              Home
            </div>
            <div className="cursor-pointer transition-all hover:text-blue-500">
              Deployment
            </div>
            <div className="cursor-pointer transition-all hover:text-blue-500">
              Analytics
            </div>
            <div className="cursor-pointer transition-all hover:text-blue-500">
              Feedback
            </div>
            <div className="cursor-pointer transition-all hover:text-blue-500">
              Settings
            </div>
          </div>
        </div>
      )}

      <button
        className={`${
          !isOpen ? "" : "opacity-0"
        } absolute left-8 top-4 z-40 text-2xl transition-all md:left-36`}
        onClick={toggleSidebar}
      >
        {"☰"}
      </button>
    </>
  );
};
export default Sidebar;
