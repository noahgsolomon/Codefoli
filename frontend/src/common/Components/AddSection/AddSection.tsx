import React, {useState} from "react";
import AboutData from "Type/AboutData.tsx";
import {changeSectionTwoActive} from "../../../pages/About/aboutapi.tsx";

const AddSection: React.FC<{
    setPageData: React.Dispatch<React.SetStateAction<AboutData>>;
}> = ({setPageData}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative py-0.5 w-full bg-black flex justify-center items-center">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover:shadow-custom hover:-translate-y-0.5 bg-green-500 transition-all border-2 border-black absolute rounded-full w-10 h-10 flex items-center justify-center"
            >
                <span className="text-white text-lg font-bold">+</span>
            </button>
            {isOpen && (
                <div className="border-2 border-black transition-all absolute top-full mt-10 w-48 py-2 bg-white rounded shadow-custom">
                    <button className="w-full transition-all block px-4 py-2 text-normal text-gray-900 rounded hover:underline"
                    onClick={async () => {
                        const changeSectionTwo = await changeSectionTwoActive("false");
                        if (changeSectionTwo) {
                            setPageData((prev) => {
                                return {
                                    ...prev,
                                    sectionTwoActive: true,
                                };
                            });
                        }
                    }}
                    >Story</button>
                </div>
            )}
        </div>
    );
};

export default AddSection;