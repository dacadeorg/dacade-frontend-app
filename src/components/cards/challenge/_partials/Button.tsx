import { useState } from "react";
import CloseIcon from "@/icons/close-top-right.svg";
import Loader from "@/components/ui/Loader";

export interface ButtonProps {
  text: string;
  onClick: () => void;
  loading: boolean;
}

export default function Button({ text, onClick, loading }: ButtonProps) {
  const [isTextVisible, setistextVisible] = useState(false);
  return (
    <div className="ml-auto cursor-pointer relative " onMouseEnter={() => setistextVisible(true)} onMouseLeave={() => setistextVisible(false)} onClick={onClick}
    data-testid = "button"
    >
      <>
        {loading ? (
          <Loader isSmallSpinner  data-testid = "loader"/>
        ) : (
          <>
            <CloseIcon />
            <span className={`absolute -top-8 -right-6 text-sm bg-white p-0.5 px-1.5 rounded shadow-md ${isTextVisible ? "block" : "hidden"}`}
            data-testid="button-text"
            >{text} </span>
          </>
        )}
      </>
    </div>
  );
}
