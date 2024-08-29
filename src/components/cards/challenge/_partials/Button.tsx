import { useState } from "react";
import CloseIcon from "@/icons/close-top-right.svg";
import Loader from "@/components/ui/Loader";

export interface ButtonProps {
  text: string;
  onClick: () => void;
  loading: boolean;
  testId?: string;
}

export default function Button({ text, onClick, loading, testId }: ButtonProps) {
  const [isTextVisible, setIsTextVisible] = useState(false);
  return (
    <div
      className="ml-auto cursor-pointer relative "
      onMouseEnter={() => setIsTextVisible(true)}
      onMouseLeave={() => setIsTextVisible(false)}
      onClick={onClick}
      data-testid={testId}
    >
      <>
        {loading ? (
          <Loader isSmallSpinner />
        ) : (
          <>
            <CloseIcon />
            <span className={`absolute -top-8 -right-6 text-sm bg-white p-0.5 px-1.5 rounded shadow-md ${isTextVisible ? "block" : "hidden"}`} data-testid="button-text">
              {text}{" "}
            </span>
          </>
        )}
      </>
    </div>
  );
}
