import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import gmail from "../assets/company/gmail.png";
import whatsapp from "../assets/company/whatsapp.png";
import call from "../assets/company/call.png";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const { name, email, message } = form;
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(name);
    if (!name || !email || !message) {
      toast.error("Please provide value in each input field");
      setLoading(false);
    } else {
      emailjs
        .send(
          "service_6shhp7q",
          "template_0796vqq",
          // import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          // import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            to_name: "Wafi Electrical Services",
            from_email: form.email,
            to_email: "abdallayusufahmed@gmail.com",
            message: form.message,
          },
          "user_C2jkXqp3jcS1Yp6MSc9fe"
        )
        .then(
          () => {
            setLoading(false);

            toast.success(
              "Thank you. I will get back to you as soon as possible."
            );
            setForm({
              name: "",
              email: "",
              message: "",
            });
          },
          (error) => {
            setLoading(false);
            console.error(error);

            alert("Ahh, something went wrong. Please try again.");
          }
        );
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
      

      <div
        className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
      >
        <ToastContainer className="z-20 mt-20 w-[400px]" />
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-white p-8 rounded-2xl"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <div className="flex flex-row gap-10 mt-7">
            <a
              href="mailto:abdallayusufahmed@gmail.com"
              target="blank"
              className="mt-6"
            >
              <img
                src={gmail}
                alt="Superior Service"
                className="w-8 h-8 object-contain"
              />
            </a>

            <a
              href="https://wa.me/252615742667
"
              target="blank"
              className="mt-6"
            >
              <img
                src={whatsapp}
                alt="Superior Service"
                className="w-8 h-8 object-contain"
              />
            </a>

            <a href="tel:+252615742667" target="blank" className="mt-6">
              <img
                src={call}
                alt="Superior Service"
                className="w-8 h-8 object-contain"
              />
            </a>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="bg-white py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-blue-500 font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="bg-white py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-blue-500 font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className="bg-white py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-blue-500 font-medium"
              />
            </label>

            <button
              type="submit"
              className="bg-white py-3 px-8 rounded-xl outline-none w-fit text-black font-bold shadow-md shadow-secondary border border-blue-500"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
