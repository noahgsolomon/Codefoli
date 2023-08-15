import {FC} from "react";

const Loader: FC = () => {
  return (
    <div className="fixed left-0 top-0 z-30 h-screen w-screen bg-gray-50">
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center">
        <div role="status">
          <svg className="mr-2 h-10 w-10 animate-spin" viewBox="0 0 24 24">
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
        <span className="text-center font-bold">Loading</span>
      </div>
    </div>
  );
};

export default Loader;
