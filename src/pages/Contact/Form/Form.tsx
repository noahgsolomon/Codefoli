import React, { FC, useState } from "react";
import { useSpring, animated } from "react-spring";
import UserData from "Type/UserData.tsx";

type formData = {
  message: string;
  subject: string;
};

const Form: FC<{
  userData: UserData;
}> = ({ userData }) => {
  const [formData, setFormData] = useState<formData>({
    subject: "",
    message: "",
  });

  const animationProps = useSpring({
    from: { opacity: 0, transform: "translate3d(0, -20px, 0)" },
    to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
  });

  const handleChange = (event: React.FormEvent<EventTarget>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <animated.form
      noValidate={true}
      style={animationProps}
      className="contact-form rounded-lg border-2 border-black p-5 shadow-custom"
    >
      <div className="mb-5 justify-between gap-5 md:flex">
        <div className="form-control relative w-full">
          <label htmlFor="subject" className="mb-4 block font-bold">
            Subject
          </label>
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            className="w-full rounded-lg border-2 border-black px-5  py-2 font-bold transition ease-in hover:shadow-custom focus:border-current focus:ring-0 active:shadow-custom"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-5 justify-between md:flex">
        <div className="form-control relative">
          <label htmlFor="message" className="mb-4 block font-bold">
            Message
          </label>
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full rounded-lg border-2 border-black px-5 py-2 font-bold transition ease-in hover:shadow-custom focus:border-current focus:ring-0 active:shadow-custom"
            rows={4}
            cols={100}
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </div>
      <a
        href={`mailto:${userData.email}?subject=${encodeURIComponent(
          formData.subject
        )}&body=${encodeURIComponent(formData.message)}`}
        className="w-full rounded-lg bg-black px-5 py-2 font-bold text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500 focus:border-current focus:ring-0 md:w-auto"
      >
        Send Message
      </a>
    </animated.form>
  );
};

export default Form;
