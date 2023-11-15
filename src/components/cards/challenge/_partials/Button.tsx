import { useState } from "react";
import CloseIcon from "@/icons/close-top-right.svg";

interface ButtonProps {
  text: string;
  onClick: () => void;
}
export default function Button({ text, onClick }: ButtonProps) {
  const [isTextVisible, setistextVisible] = useState(false);
  return (
    <div className="ml-auto cursor-pointer relative" onMouseEnter={() => setistextVisible(true)} onMouseLeave={() => setistextVisible(false)} onClick={onClick}>
      <CloseIcon />
      <span className={`absolute -top-8 -right-6 text-sm bg-white p-0.5 px-1.5 rounded shadow-md ${isTextVisible ? "block" : "hidden"}`}>{text} </span>
    </div>
  );
}
