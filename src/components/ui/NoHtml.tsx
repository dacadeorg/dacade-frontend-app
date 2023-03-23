import { ReactElement, useMemo } from "react";

interface NoHtmlProps {
    value: string;
}

export default function NoHtml({ value }: NoHtmlProps): ReactElement {
    const processedString = useMemo(() => {
        return value.replace(/(<([^>]+)>)/gi, "");
    }, []);

    return <span>{processedString}</span>;
}
