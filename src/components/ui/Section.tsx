import { ReactElement } from "react";
import classNames from "classnames";

interface Props {
    type?: string;
    padding?: string;
    children: ReactElement;
}



export default function Section({
    type = "default",
    padding = "py-4",
    children,
}: Props): ReactElement {

    const sectionClassNames = classNames("relative", {
        "bg-white text-gray-900": type === "default",
        "bg-primary text-white": type === "primary",
        "bg-secondary text-gray-900": type === "secondary",
        "bg-gray-50 text-gray-900": !type
      });

    return (
        <div
            className={sectionClassNames}
        >
            <div className={padding}>{children}</div>
        </div>
    );
}
