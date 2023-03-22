import classNames from "classnames";
import Image from "next/image";
import React from "react";

interface LoaderProps {
  communityStyles?: boolean;
}
export default function Loader({ communityStyles = false }: LoaderProps) {
  const colors = {
    text: "#0D61FF",
    accent: "#0D61FF",
    textAccent: "#fff",
    primary: "#0D61FF",
  };

  const styles = {
    color: colors.textAccent,
  };
  return (
    <div
      className={classNames(
        "flex items-center relative justify-center !h- !w-12",
        {
          "text-primary": !communityStyles,
        }
      )}
      style={{ ...(communityStyles ? styles : {}) }}
    >
      <Image
        src="/assets/icons/spinner.svg"
        height={18}
        width={18}
        alt="loading"
        className="animate-spin"
      />
    </div>
  );
}
