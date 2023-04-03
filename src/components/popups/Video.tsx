import React, { ReactElement, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import Video from "@/components/ui/Video";
import PlayIcon from "@/icons/play.svg";
import { useTranslation } from "next-i18next";

/**
 * Video popup component
 * @date 4/3/2023 - 4:44:54 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function VideoPopup(): ReactElement {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const videoPopupRef = useRef<HTMLSpanElement>(null);

  const toggle = () => {
    setShow(!show);
    // TODO: Will be uncommented after the implementation of redux
    // dispatch('ui/toggleBodyScrolling', show)
  };

  const externalClick = () => {
    if (show) {
      setShow(false);
      // TODO: Will be uncommented after the implementation of redux
      // dispatch('ui/toggleBodyScrolling', show)
    }
  };

  useOnClickOutside(videoPopupRef, externalClick);

  return (
    <div>
      <span onClick={externalClick} ref={videoPopupRef}>
        <li
          className="content-wrapper inline-block align-middle mr-2 max-w-2xl relative text-gray-500 cursor-pointer"
          onClick={toggle}
        >
          <span className="flex space-x-1 text-primary hover:text-primary-dark mt-3 text-base leading-normal">
            <PlayIcon className="-mt-1" fill="white" />
            <div className="leading-normal font-light">
              <span className="font-medium">{t("app.name")}</span>{" "}
              {t("page.index.main.button.description")}
            </div>
          </span>
        </li>
        <div className="flex justify-center">
          <div
            className={`z-50 mt-0 w-full inline-block fixed top-14 md:top-24 left-0 right-0 bg-transparent px-auto rounded-3.5xl text-gray-900 no-scrollbar max-w-full h-auto content-wrapper justify-self-center sm:m-auto ${
              !show && "hidden"
            }`}
          >
            <Video
              className="z-50 aspect-w-16 aspect-h-8 max-w-full m-auto justify-center bg-black"
              url="https://youtube.com/embed/GmVrQDulaLY"
            />
          </div>
        </div>
      </span>
      <div
        className={`opacity-25 fixed inset-0 z-30 bg-black ${
          !show && "hidden"
        }`}
      />
    </div>
  );
}
