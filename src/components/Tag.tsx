import classNames from "classnames";

interface TagProps {
  rounded?: boolean;
  type?: "transparent" | "gray" | "light-gray" | "warn";
  value?: string;
  children?: React.ReactNode;
}

export default function Tag({
  rounded = true,
  type = "gray",
  value,
  children,
}: TagProps) {
  return (
    <div
      className={classNames(
        "text-center px-2 p-0.5 h-5 inline-flex items-center",
        { "bg-transparent bg-opacity-25 text-white": type == "transparent" },
        { "bg-gray-200 text-gray-500": type == "gray" },
        { "bg-gray-100 text-gray-500": type == "light-gray" },
        { "bg-yellow-100 text-yellow-900": type == "warn" },
        { "rounded-full": rounded },
        { rounded: !rounded }
      )}
    >
      <span className="text-xs font-medium block leading-none">
        {value ? <span>{value}</span> : children}
      </span>
    </div>
  );
}
