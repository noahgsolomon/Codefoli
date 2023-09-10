import { FC, useState } from "react";
import { addEmail } from "./newsletterapi.tsx";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const Newsletter: FC = () => {
  const [email, setEmail] = useState("");
  const [emailAdded, setEmailAdded] = useState(false);
  const navigate = useNavigate();
  const handleSubscribe = async () => {
    console.log("clicked");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.match(emailRegex)) {
      const addEmailFetch = await addEmail(email);
      console.log(addEmailFetch);
      if (addEmailFetch.status === "OK") {
        setEmail("");
        setEmailAdded(true);
        localStorage.setItem("newsletter", "true");
        setTimeout(() => {
          navigate("/setup");
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
      <animated.div
        style={animation}
        className="z-50 flex w-[300px] flex-col items-center justify-between rounded-lg border-2 border-black bg-white p-6 shadow-custom dark:bg-[#1a1a1a] md:w-[500px]"
      >
        <div className="text-xl font-bold">Subscribe to our newsletter</div>
        <p className="mb-4 text-base opacity-60">
          Win prizes, and get access to free hosting
        </p>
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center justify-center md:relative">
            <input
              type="email"
              className="mb-4 h-12 w-full rounded-lg border-2 border-black py-8 shadow-custom transition-all hover:shadow-customHover dark:bg-[#1a1a1a]"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button
              className="mr-2 h-12 rounded-lg bg-blue-500 px-4 text-base text-white transition-all hover:opacity-80 md:absolute md:right-0 md:top-8 md:-translate-y-1/2 md:transform"
              onClick={async () => await handleSubscribe()}
            >
              Subscribe 🎉
            </button>
          </div>
        </div>
        {emailAdded ? (
          <p className={"text-xs text-green-500 opacity-60"}>
            Email added! Welcome to the family! 🎉
          </p>
        ) : (
          <p className={"text-xs text-red-500 opacity-60"}>
            Your support helps us keep going!
          </p>
        )}
        <div
          className={
            "mt-2 cursor-pointer text-base text-blue-500 underline transition-all hover:opacity-80"
          }
          onClick={() => navigate("/setup")}
        >
          not interested
        </div>
      </animated.div>
    </div>
  );
};

export default Newsletter;
