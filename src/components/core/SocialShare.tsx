"use client";
import { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { LiaTelegram } from "react-icons/lia";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function SocialShare({ yourPostUrl }: { yourPostUrl: string }) {
  const [copyButtonText, setCopyButtonText] = useState("Copy Link");

  const handleCopyLink = () => {
    const textArea = document.createElement("textarea");
    textArea.value = yourPostUrl;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      setCopyButtonText("Copied");
      setTimeout(() => {
        setCopyButtonText("Copy Link");
      }, 2000);
    } catch (err) {
      console.error("Unable to copy to clipboard:", err);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-10">
      <div className="font-bold text-xl text-primary-200">
        Share On Social Media
      </div>
      <div className="flex items-center gap-10 flex-wrap">
        <FacebookShareButton url={yourPostUrl}>
          <div className="px-4 rounded-md py-2 flex items-center justify-center gap-2 bg-[#2566b7]">
            <BiLogoFacebook />
            <span>Facebook</span>
          </div>
        </FacebookShareButton>
        <TwitterShareButton url={yourPostUrl}>
          <div className="px-4 rounded-md py-2 flex items-center justify-center gap-2 bg-[#00adf5]">
            <BsTwitter />
            <span>Twitter</span>
          </div>
        </TwitterShareButton>
        <LinkedinShareButton url={yourPostUrl}>
          <div className="px-4 rounded-md py-2 flex items-center justify-center gap-2 bg-[#037fb1]">
            <FaLinkedinIn />
            <span>Linkedin</span>
          </div>
        </LinkedinShareButton>
        <WhatsappShareButton url={yourPostUrl}>
          <div className="px-4 rounded-md py-2 flex items-center justify-center gap-2 bg-[#24d366]">
            <BsWhatsapp />
            <span>WhatsApp</span>
          </div>
        </WhatsappShareButton>
        <TelegramShareButton url={yourPostUrl}>
          <div className="px-4 rounded-md py-2 flex items-center justify-center gap-2 bg-[#36ade1]">
            <LiaTelegram />
            <span>Telegram</span>
          </div>
        </TelegramShareButton>
        <EmailShareButton url={yourPostUrl}>
          <div className="px-4 rounded-md py-2 flex items-center justify-center gap-2 bg-[#535353]">
            <AiOutlineMail />
            <span>Email</span>
          </div>
        </EmailShareButton>
        <div
          onClick={handleCopyLink}
          className="px-4 rounded-md cursor-pointer py-2 flex items-center justify-center gap-2 bg-black border border-1"
        >
          <AiOutlineMail />
          <span>{copyButtonText}</span>
        </div>
      </div>
    </div>
  );
}
