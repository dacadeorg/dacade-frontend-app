import { useState } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";
import Popup from "../ui/Popup";
import Button from "../ui/button";
import CloseIcon from "@/icons/close-icon.svg";
import JobIcon from "@/icons/briefcase.svg";
import { JOBOFFERSFORMLINK } from "@/constants/jobOffers";
import { useTranslation } from "react-i18next";

/**
 * JobOffers interface props
 *
 * @interface JobOffersProps
 * @typedef {JobOffersProps}
 */
interface JobOffersProps {
  externalClick?: () => void;
}

/**
 * JobOffers component
 *
 * @export
 * @param {JobOffersProps} param0
 * @param {() => void} param0.externalClick
 * @returns {*}
 */
export default function JobOffers({ externalClick }: JobOffersProps) {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const onOpenJobOffers = () => {
    setShow(!show);
    dispatch(toggleBodyScrolling(true));
  };

  const onClose = () => {
    externalClick && externalClick();
    setShow(!show);
    dispatch(toggleBodyScrolling(false));
  };

  return (
    <>
      <button className="hidden lg:inline-block underline text-primary bg-transparent pl-2 py-0 text-base capitalize " onClick={onOpenJobOffers}>
        {t("job.offers.title")}
      </button>
      <div className="flex lg:hidden">
        <div className="w-10 h-10 ml-3 mr-2 my-3 rounded-full bg-primary">
          <JobIcon className="m-2 text-white" />
        </div>
        <div className="py-5 font-medium text-gray-900 cursor-pointer" onClick={onOpenJobOffers}>
          <p className="font-medium text-lg text-gray-900 capitalize"> {t("job.offers.title")}</p>
        </div>
      </div>
      <Popup center show={show} className="px-3" overlayClassName="bg-white opacity-80" onClose={onClose}>
        <div className="max-h-full overflow-scroll md:max-w-sidebar relative mx-auto mt-0 w-full z-40 bg-white rounded-3xl shadow-3xl text-gray-900 px-8 py-6 lg:min-w-98">
          <div className="space-y-6">
            <h5 className="text-lg font-medium"> {t("job.offers.title")}</h5>
            <p className="text-base"> {t("job.offers.description")}</p>
            <Button padding link={JOBOFFERSFORMLINK} target="blank" className="py-2 px-6">
              {t("job.offers.button.next")}
            </Button>
          </div>
          <div className="absolute top-5 right-5 w-fit h-fit">
            <Button type="button" padding={false} variant="secondary" className="p-1 bg-gray-100 hover:bg-gray-50 text-gray-900 absolute top-0" onClick={onClose}>
              <CloseIcon className="block" />
            </Button>
          </div>
        </div>
      </Popup>
    </>
  );
}