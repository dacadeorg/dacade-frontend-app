/**
 * Video component
 * This component is responsible for rendering videos using an iframe.
 *
 * @date 3/22/2023 - 4:03:47 PM
 *
 * @typedef {VideoProps}
 */

type VideoProps = {
  url: string;
};

export default function Video({ url = "" }: VideoProps) {
  return (
    <div className="relative mt-7 lg:w-full lg:h-auto aspect-w-16 aspect-h-11 md:aspect-h-10 lg:aspect-h-9 md:w-full h-auto md:m-auto md:ml-auto">
      <iframe src={url} allowFullScreen />
    </div>
  );
}
