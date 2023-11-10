"use client";

import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContractLeft from "./ContractLeft";

export const Contract: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bj1ysip",
        "template_w513arl",
        form.current!,
        "KCg1e2j7iGFx6oud5"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Your message was successfully sent");
        },
        (error) => {
          console.log(error.text);
          toast.error("An error occurred");
        }
      );
  };

  return (
    <div className="flex items-center justify-center bg-main-100" id="contact">
      <div className="my-20 mx-1 grid h-full w-full grid-cols-1 gap-10 rounded-lg md:rounded-3xl bg-slate-800 p-2 md:p-6 md:h-[84%]  md:grid-cols-2 md:gap-0 lg:w-[65%]">
        <ContractLeft />
        <form
          ref={form}
          onSubmit={sendEmail}
          className="col-span-1 flex flex-col gap-4"
        >
          <div className="text-3xl font-bold md:text-4xl">Contact Me</div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <input
              type="text"
              className="h-10 w-full rounded-full bg-slate-900 pl-4 outline-none lg:w-52"
              placeholder="First Name"
              name="user_firstname"
              required={true}
            />
            <input
              type="text"
              className="h-10 w-full rounded-full bg-slate-900 pl-4 outline-none lg:w-52"
              placeholder="Last Name"
              name="user_lastname"
            />
          </div>
          <div className="flex flex-col gap-4 lg:flex-row">
            <input
              type="text"
              className="h-10 w-full rounded-full bg-slate-900 pl-4 outline-none lg:w-52"
              placeholder="Phone"
              name="number"
            />
            <input
              type="text"
              className="h-10 w-full rounded-full bg-slate-900 pl-4 outline-none lg:w-52"
              placeholder="Email"
              name="user_email"
              required={true}
            />
          </div>
          <div>
            <textarea
              className="h-40 w-full rounded-2xl bg-slate-900 p-4 outline-none"
              placeholder="Message"
              name="massage"
              required={true}
            ></textarea>
          </div>
          <div>
            <button className="text-primary-200 bg-gray-950 hover:bg-gray-900 px-6 py-2 rounded-lg border font-bold flex w-full items-center justify-center border-primary-200">
              SEND
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
