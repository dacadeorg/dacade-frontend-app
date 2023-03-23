import { ReactElement } from "react";


/**
 * Interface for video component props
 * @date 3/23/2023 - 10:20:04 AM
 *
 * @interface VideoProps
 * @typedef {VideoProps}
 */
interface VideoProps {
  url: string;
};

/**
 * Video component
 * This component is responsible for rendering videos using an iframe.
 * @date 3/23/2023 - 10:19:00 AM
 *
 * @export
 * @param {VideoProps} { url }
 * @returns {ReactElement}
 */
export default function Video({ url }: VideoProps): ReactElement {
  return (
    <div className="relative mt-7 lg:w-full lg:h-auto aspect-w-16 aspect-h-11 md:aspect-h-10 lg:aspect-h-9 md:w-full h-auto md:m-auto md:ml-auto">
      <iframe src={url} allowFullScreen />
    </div>
  );
}
