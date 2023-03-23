import { ReactElement } from "react";
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
    return (
        <div
            className={`relative ${
                type === "default"
                    ? "bg-white text-gray-900"
                    : type === "primary"
                    ? "bg-primary text-white"
                    : type === "secondary"
                    ? "bg-secondary text-gray-900"
                    : "bg-gray-50 text-gray-900"
            }`}
        >
            <div className={padding}>{children}</div>
        </div>
    );
}
