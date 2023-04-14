import Image from "next/image";
import Link from "next/link";
import { CSSProperties, ReactElement, ReactNode } from "react";
import classNames from "classnames";

/**
 * Interface for User
 * @date 3/22/2023 - 5:42:26 PM
 *
 * @typedef {User}
 */

interface User {
  displayName?: string;
  username?: string;
  avatar?: string;
}

/**
 * Interface for Avatar component props
 * @date 3/22/2023 - 5:42:18 PM
 *
 * @typedef {AvatarProps}
 */
type Size =
  | "extra"
  | "large"
  | "medium"
  | "medium-fixed"
  | "small-fixed"
  | "mini"
  | "small";

type Shape =
  | "rounded"
  | "rounded-3xl"
  | "full"
  | "squared"
  | "circular";
interface AvatarProps {
  icon?: string;
  image?: string;
  color?: string;
  user?: User | null;
  size?: Size;
  shape?: Shape;
  useLink?: boolean;
  style?: CSSProperties;
  className?: string;
}

/**
 * Span component
 * @date 3/22/2023 - 5:41:39 PM
 *
 * @param {{ children: ReactNode; }} { children }
 * @returns {ReactElement}
 */

function Span({ children }: { children: ReactNode }): ReactElement {
  return <span>{children}</span>;
}

/**
 * Avatar component
 * @date 3/22/2023 - 5:41:18 PM
 *
 * @param {AvatarProps} {
  icon,
  image,
  color,
  user = {},
  size = "small",
  shape = "circular",
  useLink = true,
}
 * @returns {ReactElement}
 */

export default function Avatar({
  icon,
  image,
  color,
  user = null,
  size = "small",
  shape = "circular",
  useLink = true,
  style,
  className,
}: AvatarProps): ReactElement {
  const initials = user?.displayName ? user?.displayName[0] : null;

  const link =
    user?.username && useLink ? `/profile/${user.username}` : "#";

  const sizeClassName = classNames("overflow-hidden", {
    "w-32 h-32 text-4xl": size === "extra",
    "w-15 h-15 text-2xl": size === "large",
    "w-10 h-10 sm:h-12 sm:w-12 md:w-15 md:h-15 text-xl sm:text-2xl":
      size === "medium",
    "w-10 h-10 text-2xl": size === "medium-fixed",
    "w-7 h-7 text-xl": size === "small-fixed",
    "w-5 h-5 text-xl": size === "mini",
    "w-9 h-9 text-lg": size === "small",
  });

  const shapeClassName = classNames({
    "rounded-xl": shape === "rounded",
    "rounded-3xl": shape === "rounded-3xl",
    "rounded-full": shape === "full" || shape === "circular",
    "rounded-none": shape === "squared",
  });

  const componentClassName = classNames(
    "bg-primary inline-flex overflow-hidden text-white items-center justify-center uppercase leading-none align-middle",
    sizeClassName,
    shapeClassName,
    className,
    {
      "cursor-pointer": user,
    }
  );

  const Component = useLink ? Link : Span;

  return (
    <Component
      href={link}
      className={componentClassName}
      style={{ backgroundColor: color, ...style }}
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
        <Image
          layout="fill"
          src={icon}
          alt="icon image"
          className="p-2"
        />
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
}
