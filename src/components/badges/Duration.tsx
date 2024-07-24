import DateManager from "@/utilities/DateManager";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const DurationBadge = ({ value, type = "gray" }: { value: number, type?: string }) => {
    const router = useRouter();
    const duration = useMemo(() => {
        if (!value) {
            return 0;
        }
        if (isNaN(Number(value))) return value
        return DateManager.humanize(value, router.locale as string);
    }, [router.locale, value]);

    return (
        <span className={classNames("text-xxs uppercase font-semibold px-2 rounded-3xl inline-block text-gray-500",
            {
                "bg-gray-200": type === 'gray',
                "border border-gray-200": type === "bordered"
            }
        )}>
            {duration}
        </span>
    )
}

