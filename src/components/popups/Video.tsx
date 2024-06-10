import { ReactElement, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import Video from "@/components/ui/Video";
import PlayIcon from "@/icons/play.svg";
import { useTranslation } from "next-i18next";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";

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
  const dispatch = useDispatch();

  const toggle = () => {
    setShow(!show);
    dispatch(toggleBodyScrolling(!show));
  };

  const externalClick = () => {
    if (show) {
      setShow(false);
      dispatch(toggleBodyScrolling(false));
    }
  };

  useOnClickOutside(videoPopupRef, externalClick);

  return (
    <div className="flex flex-col items-center justify-center w-fit">
      <span onClick={externalClick} ref={videoPopupRef}>
        <li className="inline-block align-middle max-w-2xl relative text-gray-500 cursor-pointer w-full" onClick={toggle}>
          <span className="flex space-x-1 text-surface-text-brand relative hover:text-primary-dark mt-3 text-base leading-normal">
            <PlayIcon className="-mt-1" fill="white" />
            <div className="leading-normal font-light">
              <span className="font-medium">{t("app.name")}</span> {t("page.index.main.button.description")}
            </div>
          </span>
        </li>
        <div className={`fixed z-50 top-1/2 left-0 right-0 transform -translate-y-1/2 ${!show && "hidden"}`}>
          <div className="max-w-full px-auto rounded-3.5xl bg-transparent text-gray-900 no-scrollbar h-auto content-wrapper justify-self-center sm:m-auto">
            <Video className="aspect-w-16 aspect-h-8 max-w-full m-auto justify-center" url="https://youtube.com/embed/GmVrQDulaLY" />
          </div>
        </div>
      </span>
      <div className={`fixed inset-0 z-30 bg-black opacity-25 ${!show && "hidden"}`} />
    </div>
  );
}
