import React, { ReactElement } from "react";

type NoHtmlProps = {
    value: string;
};

function NoHtml({ value }: NoHtmlProps): ReactElement {
    const processedString = value.replace(/(<([^>]+)>)/gi, "");

    return <span>{processedString}</span>;
}

export default NoHtml;
