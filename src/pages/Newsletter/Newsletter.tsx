import {FC, useState} from "react";
import {addEmail} from "./newsletterapi.tsx";
import {useNavigate} from "react-router-dom";
import {useSpring, animated} from "react-spring";

const Newsletter: FC = () => {
    const [email, setEmail] = useState('');
    const [emailAdded, setEmailAdded] = useState(false);
    const navigate = useNavigate();
    const handleSubscribe = async () => {
        console.log('clicked')
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (email.match(emailRegex)) {
            const addEmailFetch = await addEmail(email);
            console.log(addEmailFetch);
            if (addEmailFetch.status === "OK") {
                setEmail("");
                setEmailAdded(true);
                localStorage.setItem('newsletter', 'true');
                setTimeout(() => {
                    navigate('/setup');
                }, 1000);
            }
        }
    };


    const animation = useSpring({
        from: { opacity: 0, transform: "translate3d(0, 20px, 0)" },
        to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
        delay: 50,
    });


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <animated.div style={animation} className="w-[300px] md:w-[500px] p-6 rounded-lg border-2 border-black shadow-custom bg-white dark:bg-[#1a1a1a] flex flex-col justify-between items-center z-50">
                <div className="font-bold text-xl">Subscribe to our newsletter</div>
                <p className="mb-4 opacity-60 text-base">Win prizes, and get access to free hosting</p>
                <div className="flex flex-col w-full">
                    <div className="md:relative flex flex-col justify-center items-center">
                        <input
                            type="email"
                            className="dark:bg-[#1a1a1a] mb-4 shadow-custom transition-all hover:shadow-customHover w-full h-12 border-2 border-black rounded-lg py-8"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <button
                            className="text-base md:absolute md:right-0 md:top-8 md:transform md:-translate-y-1/2 h-12 px-4 bg-blue-500 hover:opacity-80 transition-all text-white rounded-lg mr-2"
                            onClick={async () => await handleSubscribe()}
                        >
                            Subscribe 🎉
                        </button>
                    </div>
                </div>
                {emailAdded ? (
                    <p className={'text-green-500 opacity-60 text-xs'}>Email added! Welcome to the family! 🎉</p>
                ) : (
                    <p className={'text-red-500 opacity-60 text-xs'}>Your support helps us keep going!</p>
                )
                }
                <div className={'mt-2 text-blue-500 text-base underline hover:opacity-80 transition-all cursor-pointer'}
                     onClick={() => navigate('/setup')}>
                    not interested
                </div>
            </animated.div>
        </div>
    );
}

export default Newsletter;