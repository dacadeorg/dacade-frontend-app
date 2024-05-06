import { useState } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";
import Popup from "../ui/Popup";
import Button from "../ui/button";

export default function JobOffers() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const onOpenJobOffers = () => {
    setShow(!show);
    dispatch(toggleBodyScrolling(true));
  };

  const externalClick = () => {
    setShow(!show);
    dispatch(toggleBodyScrolling(false));
  };

  return (
    <>
      <button className="underline text-primary bg-transparent pl-2 text-base" onClick={onOpenJobOffers}>
        job offers
      </button>
      <Popup center show={show} className="px-3 pt-16 pb-2" overlayClassName="bg-white opacity-80" onClose={externalClick}>
        <div className="max-h-full overflow-scroll md:max-w-sidebar relative mx-auto mt-0 w-full z-40 bg-white rounded-3xl shadow-2xl text-gray-900 px-8 py-6 min-w-98">
          <div className="space-y-6">
            <h5 className="text-lg font-medium">Job offers</h5>
            <p className="text-base">Interested in potential job opportunities? Fill in this google form and we’ll contact you for relevant roles.</p>
            <Button padding link="https://forms.gle/czmMN9L5Hh88aUQu6" target="blank" className="py-2 px-6">
              Next
            </Button>
          </div>
        </div>
      </Popup>
    </>
  );
}
