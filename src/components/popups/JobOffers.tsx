import { useDispatch } from "@/hooks/useTypedDispatch";
import { toggleJobOffersPopup } from "@/store/feature/ui.slice";
import Popup from "../ui/Popup";
import Button from "../ui/button";
import CloseIcon from "@/icons/close-icon.svg";
import { JOB_OFFERS_LINK } from "@/constants/jobOffers";
import { useTranslation } from "react-i18next";
import { useSelector } from "@/hooks/useTypedSelector";
import Link from "next/link";

/**
 * JobOffers component
 *
 * @export
 * @param {JobOffersProps} param0
 * @param {() => void} param0.externalClick
 * @returns {*}
 */
export default function JobOffers() {
  const { t } = useTranslation();

  const show = useSelector((state) => state.ui.showJobOffersPopup);

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleJobOffersPopup(!show));
  };
  return (
    <>
      <Popup center show={show} className="px-3" overlayClassName="bg-white opacity-80" onClose={toggle}>
        <div className="max-h-full sm:max-w-sidebar relative mx-auto mt-0 w-full z-40 bg-white rounded-3xl shadow-3xl text-gray-900 px-8 py-6 sm:min-w-98">
          <div className="space-y-6">
            <h5 className="text-lg font-medium"> {t("job.offers.title")}</h5>
            <p className="text-base"> {t("job.offers.description")}</p>

            <Link href={JOB_OFFERS_LINK} target="blank" onClick={toggle} className="block">
              <Button padding className="py-2 px-6 capitalize">
                {t("job.offers.button.next")}
              </Button>
            </Link>
          </div>
          <div className="absolute top-5 right-5 w-fit h-fit">
            <Button type="button" padding={false} variant="secondary" className="p-1 bg-gray-100 hover:bg-secondary text-gray-900 absolute top-0" onClick={toggle}>
              <CloseIcon className="block" />
            </Button>
          </div>
        </div>
      </Popup>
    </>
  );
}
