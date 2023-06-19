import { useState } from "react";

type formData = {
  name: string;
  email: string;
  message: string;
  subject: string;
  phoneNumber: string;
};

const Form = () => {
  const [formData, setFormData] = useState<formData>({
    name: "",
    email: "",
    subject: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (event: React.FormEvent<EventTarget>) => {
    const { name, value } = event.target as HTMLInputElement;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = () => {
    console.log(`sending Message using data: ${JSON.stringify(formData)}`);
  };

  return (
    <form className="contact-form rounded-lg border-2 border-black p-5 shadow-custom">
      <div className="mb-5 justify-between gap-5 md:flex">
        <div className="form-control relative w-full">
          <label htmlFor="name" className="mb-4 block font-bold">
            Name
          </label>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            className="w-full rounded-lg border-2 border-black px-5 py-2 font-bold transition ease-in hover:shadow-custom focus:border-current focus:ring-0 active:shadow-custom"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-control relative w-full">
          <label htmlFor="email" className="mb-4 block font-bold">
            Email
          </label>
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            className="w-full rounded-lg border-2 border-black px-5 py-2 font-bold transition ease-in hover:shadow-custom focus:border-current focus:ring-0 active:shadow-custom"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-5 justify-between gap-5 md:flex">
        <div className="form-control relative w-full">
          <label htmlFor="phone" className="mb-4 block font-bold">
            Phone
          </label>
          <input
            type="text"
            placeholder="Your Phone"
            name="phoneNumber"
            className="w-full rounded-lg border-2 border-black px-5 py-2 font-bold transition ease-in hover:shadow-custom focus:border-current focus:ring-0 active:shadow-custom"
            onChange={handleChange}
          />
        </div>
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
      <button
        type="submit"
        className="w-full rounded-lg bg-black px-5 py-2 font-bold text-white transition ease-in hover:-translate-y-1 hover:bg-blue-500 focus:border-current focus:ring-0 md:w-auto"
        onClick={handleSubmit}
      >
        Send Message
      </button>
    </form>
  );
};

export default Form;
