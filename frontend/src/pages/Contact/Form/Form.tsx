import { useState } from "react";

type formData = {
    name: string,
    email: string,
    message: string,
    subject: string,
    phoneNumber: string,
}

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
        console.log(`sending Message using data: ${JSON.stringify(formData)}`)

    }

    return (
        <form className="contact-form rounded-lg border-2 border-black p-5 shadow-custom">
            <div className="mb-5 md:flex justify-between gap-5">
                <div className="form-control w-full relative">
                    <label htmlFor="name" className="mb-4 block font-bold">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        className="w-full focus:border-current focus:ring-0 active:shadow-custom hover:shadow-custom rounded-lg border-2 border-black px-5 py-2 font-bold transition ease-in"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-control w-full relative">
                    <label htmlFor="email" className="mb-4 block font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Your Email"
                        name="email"
                        className="w-full focus:border-current focus:ring-0 active:shadow-custom hover:shadow-custom rounded-lg border-2 border-black px-5 py-2 font-bold transition ease-in"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="mb-5 md:flex justify-between gap-5">
                <div className="form-control w-full relative">
                    <label htmlFor="phone" className="mb-4 block font-bold">
                        Phone
                    </label>
                    <input
                        type="text"
                        placeholder="Your Phone"
                        name="phoneNumber"
                        className="w-full focus:border-current focus:ring-0 active:shadow-custom hover:shadow-custom rounded-lg border-2 border-black px-5 py-2 font-bold transition ease-in"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control w-full relative">
                    <label htmlFor="subject" className="mb-4 block font-bold">
                        Subject
                    </label>
                    <input
                        type="text"
                        placeholder="Subject"
                        name="subject"
                        className="w-full focus:border-current focus:ring-0 active:shadow-custom hover:shadow-custom  rounded-lg border-2 border-black px-5 py-2 font-bold transition ease-in"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="md:flex justify-between mb-5">
                <div className="form-control relative">
                    <label htmlFor="message" className="mb-4 block font-bold">
                        Message
                    </label>
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        className="w-full focus:border-current focus:ring-0 font-bold rounded-lg border-2 border-black px-5 py-2 active:shadow-custom hover:shadow-custom transition ease-in"
                        rows={4}
                        cols={100}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
            </div>
            <button
                type="submit"
                className="bg-black focus:border-current focus:ring-0 text-white font-bold rounded-lg px-5 py-2 hover:bg-blue-500 hover:-translate-y-1 transition ease-in md:w-auto w-full"
                onClick={handleSubmit}
            >
                Send Message
            </button>
        </form>
    )
}

export default Form