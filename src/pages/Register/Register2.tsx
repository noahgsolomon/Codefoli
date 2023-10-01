import { FC, useMemo, useState } from "react";
import { LIGHT_THEME_KEY, DARK_THEME_KEY, LOCALSTORAGE_THEME_KEY } from "../../util/constants";
import { useSpring, animated } from "react-spring";
import { STAGE } from "../../config";
import { register } from "api/authenticateapi";


const Register2:FC = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [registerClicked, setRegisterClicked] = useState(false);

  const handleRegister = async () => {
    setRegisterClicked(true);
    const registerRequest = await register(firstName + " " + lastName, email, password);
    console.log(registerRequest);
    if (registerRequest.status === "OK") {
      window.location.href = "/home";
    } else {
      setEmailError(true);
    }
    setRegisterClicked(false);
  };

    const theme = useMemo(() => {
        const storedTheme = localStorage.getItem(LOCALSTORAGE_THEME_KEY) as
          | typeof LIGHT_THEME_KEY
          | typeof DARK_THEME_KEY;
        return storedTheme || LIGHT_THEME_KEY;
      }, []);

      const formAnimate = useSpring({
        to: { opacity: 1, transform: 'translateY(0)' },
        from: { opacity: 0, transform: 'translateY(-20px)' },
    });

    const imageAnimate = useSpring({
        from: { opacity: 0, transform: 'translateX(-20px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
    });

    function isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }


    return (
        <div className="flex flex-row justify-center items-center h-screen w-screen">
            <div className="hidden lg:flex bg-blue-100 bg-opacity-30 dark:bg-purple-900 dark:bg-opacity-10 hover:-translate-y-0.5 transition-all w-[50%] h-screen items-center">
                <animated.img style={imageAnimate} className="" src={`https://images.codefoli.com/${theme === 'dark' ? 'walterwhiteprofiledark.png' : 'walterwhiteprofile.png'}`} alt="profile photo"/>
            </div>
            <animated.div style={formAnimate} className="flex flex-col w-[75%] md:w-full lg:w-[50%] lg:mx-auto max-w-[500px]"> {/* This line has been modified */}
                <h1 className={`bg-gradient-to-r bg-clip-text text-3xl text-transparent font-bold text-2xl mb-3 from-purple-500 to-purple-900`}>Sign up</h1>
                <div>
                    <button 
                    onClick={() => {
                        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=80810281685-eqf05nodee3q27j6p0ki7bgvm7qlq1jn.apps.googleusercontent.com&redirect_uri=${
                          STAGE === "prod"
                            ? "https://codefoli.com/processing"
                            : "http://localhost:5173/processing"
                        }&scope=openid%20email%20profile&response_type=code`;
                      }}
                    className="w-full hover:opacity-80 hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all border-[3px] border-gray-300 dark:border-gray-500 gap-2 justify-center rounded-lg px-2 py-2 flex flex-row">
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
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col">
                            <label className="text-left">First Name</label>
                            <input 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Johny" className={`dark:border-gray-500 border-gray-300 shadow-sm pl-5 dark:bg-[#1a1a1a] dark:border-gray-500 focus:ring-0 outline-none hover:focus:border-opacity-50 focus:border-opacity-50 transition-all font-bold py-1 rounded-lg border-[3px]`} type="text" required={false} />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-left">Last Name</label>
                            <input 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Appleseed" className={`dark:border-gray-500 border-gray-300 shadow-sm pl-5 focus:ring-0 dark:bg-[#1a1a1a] outline-none dark:focus:border-opacity-50 focus:border-opacity-50 transition-all font-bold py-1 rounded-lg border-[3px]`} type="text" required={false} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-left">Email</label>
                        <input 
                        value={email}
                        onChange={(e) => {
                            setEmailError(false);
                            setPasswordError(false);
                            setEmail(e.target.value);
                        }} 
                placeholder="example@email.com" className={`${emailError ? 'dark:border-red-700 border-red-500 border-opacity-50 dark:border-opacity-50' : 'dark:border-gray-500 border-gray-300'} shadow-sm pl-5 focus:ring-0 dark:bg-[#1a1a1a] outline-none dark:focus:border-opacity-50 focus:border-opacity-50 transition-all font-bold py-1 rounded-lg border-[3px]`} type="email" required={false} />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-left">Password</label>
                        <input placeholder="••••••••" 
                        value={password}
                        onChange={(e) => {
                            setEmailError(false);
                            setPasswordError(false);
                            setPassword(e.target.value);
                        }} 
                        className={`${passwordError ? 'dark:border-red-700 border-red-500 border-opacity-50 dark:border-opacity-50' : 'dark:border-gray-500 border-gray-300'} shadow-sm pl-5 focus:ring-0 outline-none dark:bg-[#1a1a1a] dark:focus:border-opacity-50 focus:border-opacity-50 transition-all font-bold py-1 rounded-lg border-[3px]`} type="password" required={false} />
                    </div>
                </div>
                <div className="flex justify-center mt-5 ">
                <button 
                    className={`${(firstName.length < 1 ||
                        lastName.length < 1 ||
                        email.length < 5 ||
                        password.length < 6) ? 'opacity-20' : ''} py-2 hover:-translate-y-0.5 transition-all bg-gradient-to-r from-purple-700 to-purple-400 text-center w-full bg-purple-500 text-white rounded-lg`} 
                    style={{
                        boxShadow: theme === 'dark' ? 
                        '0 4px 6px rgba(156, 39, 176, 0.25)' : 
                        '0 4px 6px rgba(128, 0, 128, 0.1)'
                    }}
                    disabled={firstName.length < 1 ||
                        lastName.length < 1 ||
                        email.length < 5 ||
                        password.length < 6}
                    onClick={() => {
                        if (
                          firstName.length < 1 ||
                          lastName.length < 1 ||
                          email.length < 5 ||
                          password.length < 6
                        ) {
                          return;
                        }
                        if (!isValidEmail(email)) {
                          setEmailError(true);
                          return;
                        }
                        if (registerClicked || emailError || passwordError) return;
            
                        setRegisterClicked(true);
                        handleRegister();
                      }}
                    >
                    {registerClicked ? (
                  <svg
                    className="h-5 w-5 mx-auto animate-spin"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="white"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Sign up"
                )}
                </button>
                </div>
             <div className="text-center mt-4 opacity-80">Already have an account? <a className="hover:opacity-80 text-purple-500 transition-all font-bold" href="/login">Log in</a></div>
            </animated.div>
        </div>

        
    );

}

export default Register2;