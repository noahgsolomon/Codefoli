import { FC, useMemo } from "react";
import { LIGHT_THEME_KEY, DARK_THEME_KEY, LOCALSTORAGE_THEME_KEY } from "../../util/constants";


const Register2:FC = () => {

    const theme = useMemo(() => {
        const storedTheme = localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
          | typeof LIGHT_THEME_KEY
          | typeof DARK_THEME_KEY;
        return storedTheme || LIGHT_THEME_KEY;
      }, []);


    return (
        <div className="flex flex-row justify-center items-center h-screen w-screen">
            <div className="hidden lg:flex bg-blue-100 bg-opacity-30 dark:bg-purple-900 dark:bg-opacity-10 hover:-translate-y-0.5 transition-all w-[50%] h-screen items-center">
                <img className="" src={`https://images.codefoli.com/${theme === 'dark' ? 'walterwhiteprofiledark.png' : 'walterwhiteprofile.png'}`} alt="profile photo"/>
            </div>
            <div className="flex flex-col lg:w-[50%] lg:mx-auto max-w-[500px]"> {/* This line has been modified */}
            <h1 className={`bg-gradient-to-r bg-clip-text text-3xl text-transparent font-bold text-2xl mb-3 from-purple-500 to-purple-900`}>Sign up</h1>
                <div>
                    <button className="w-full hover:opacity-80 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all border-[3px] border-gray-300 dark:border-gray-500 gap-2 justify-center rounded-lg px-2 py-2 flex flex-row">
                        <div className="w-10"><img src="https://images.codefoli.com/googlelogo.png" alt="Google Logo" className="inline"/></div>
                    <span> Sign up with Google</span>
                    </button>
                </div>
                <div className="flex items-center mt-4">
                    <hr className="flex-grow border-gray-300" />
                    <div className="mx-4 text-gray-500">or</div>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col">
                            <label className="text-left">First Name</label>
                            <input placeholder="Johny" className="shadow-sm pl-5 dark:bg-[#1a1a1a] dark:border-gray-500 focus:ring-0 outline-none hover:focus:border-opacity-50 focus:border-opacity-50 transition-all font-bold py-1 rounded-lg border-[3px] border-gray-300" type="text" required={false} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-left">Last Name</label>
                            <input placeholder="Appleseed" className="shadow-sm pl-5 focus:ring-0 dark:border-gray-500 dark:bg-[#1a1a1a] outline-none dark:focus:border-opacity-50 focus:border-opacity-50 transition-all font-bold py-1 rounded-lg border-[3px] border-gray-300" type="text" required={false} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-left">Email</label>
                        <input placeholder="example@email.com" className="shadow-sm pl-5 focus:ring-0 dark:border-gray-500 dark:bg-[#1a1a1a] outline-none dark:focus:border-opacity-50 focus:border-opacity-50 transition-all font-bold py-1 rounded-lg border-[3px] border-gray-300" type="email" required={false} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-left">Password</label>
                        <input placeholder="••••••••" className="shadow-sm pl-5 focus:ring-0 outline-none dark:border-gray-500 dark:bg-[#1a1a1a] dark:focus:border-opacity-50 focus:border-opacity-50 transition-all font-bold py-1 rounded-lg border-[3px] border-gray-300" type="password" required={false} />
                    </div>
                </div>
                <div className="flex justify-center mt-5 ">
                <button 
                    className="py-2 hover:-translate-y-0.5 transition-all bg-gradient-to-r from-purple-700 to-purple-400 text-center w-full bg-purple-500 text-white rounded-lg" 
                    style={{
                        boxShadow: theme === 'dark' ? 
                        '0 4px 6px rgba(156, 39, 176, 0.25)' : 
                        '0 4px 6px rgba(128, 0, 128, 0.1)'
                    }}
                    >
                    Sign up
                </button>
                </div>
            <div className="text-center mt-4 opacity-80">Already have an account? <a className="hover:opacity-80 text-purple-500 transition-all font-bold" href="/login">Log in</a></div>
        </div>
</div>

        
    );

}

export default Register2;