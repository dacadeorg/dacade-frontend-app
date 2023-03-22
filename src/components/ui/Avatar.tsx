import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { Children, ReactNode } from "react";
import { FC } from "react";

type User = {
  displayName?: string;
  username?: string;
  avatar?: string;
};

type AvatarProps = {
  icon?: string;
  image?: string;
  color?: string;
  user?: User;
  size?: "extra" | "large" | "medium" | "medium-fixed" | "small-fixed" | "mini";
  shape?: "rounded" | "rounded-3xl" | "full" | "squared";
  useLink?: boolean;
};

const Span: FC<{ children: ReactNode }> = ({ children }) => {
  return <span>{children}</span>;
};

const Avatar: FC<AvatarProps> = ({
  icon,
  image,
  color,
  user = {},
  size = "small",
  shape = "circular",
  useLink = true,
}) => {
  const initials = user?.displayName ? user?.displayName[0] : null;

  const link = user?.username && useLink ? `/profile/${user.username}` : null;

  const sizeClasses =
    size === "extra"
      ? "w-32 h-32 text-4xl"
      : size === "large"
      ? "w-15 h-15 text-2xl"
      : size === "medium"
      ? "w-10 h-10 sm:h-12 sm:w-12 md:w-15 md:h-15 text-xl sm:text-2xl"
      : size === "medium-fixed"
      ? "w-10 h-10 text-2xl"
      : size === "small-fixed"
      ? "w-7 h-7 text-xl"
      : size === "mini"
      ? "w-5 h-5 text-xl"
      : "w-9 h-9 text-lg";

  const shapeClasses =
    shape === "rounded"
      ? "rounded-xl"
      : shape === "rounded-3xl"
      ? "rounded-3xl"
      : shape === "full"
      ? "rounded-full"
      : shape === "squared"
      ? "rounded-none"
      : "rounded-full";

  const Component = useLink ? Link : Span;

  return (
    <Component
      href={link as Url}
      className={`bg-primary inline-flex overflow-hidden text-white items-center justify-center uppercase leading-none align-middle ${sizeClasses} ${shapeClasses} ${
        user ? "cursor-pointer" : ""
      }`}
      style={{ backgroundColor: color }}
    >
      {user && user.avatar ? (
        <Image
          src={user.avatar}
          alt="img"
          layout="fill"
          className="object-cover w-full h-full"
        />
      ) : (
        <span>{initials}</span>
      )}
      {icon && (
        <Image layout="fill" src={icon} alt="icon image" className="p-2" />
      )}
      {image && (
        <Image
          src={image}
          layout="fill"
          alt="icon image"
          className="p-0 object-cover w-full h-full"
        />
      )}
    </Component>
  );
};

export default Avatar;
