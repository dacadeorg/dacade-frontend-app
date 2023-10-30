import { ReactElement, useEffect } from "react";
import Popup from "@/components/ui/Popup";
import Header from "./_partials/Header";
import Section from "@/components/ui/Section";
import SubmissionView from "@/components/sections/submissions/View";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { findSubmssionById } from "@/store/feature/communities/challenges/submissions";

/**
 * Submission interface props
 * @date 4/27/2023 - 11:45:48 AM
 *
 * @interface SubmissionPopup
 * @typedef {SubmissionPopup}
 */
interface SubmissionPopup {
  show: boolean;
  onClose: () => void;
  submissionId: string | undefined;
}

export default function SubmissionPopup({ show, onClose, submissionId }: SubmissionPopup): ReactElement {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSubmission = async () => {
      await dispatch(findSubmssionById({ id: submissionId as string }));
    };
    fetchSubmission();
  }, [submissionId, dispatch]);
  return (
    <Popup show={show} onClose={onClose}>
      <div className="py-8 overflow-hidden h-full w-full">
        <div className="bg-white my-auto lg:w-10/12 w-11/12 rounded-3.5xl relative mx-auto h-screen flex flex-col">
          <div className="w-full flex-none">
            <Header onClose={onClose} />
          </div>
          <div className="overflow-y-scroll flex-1 py-5 md:py-10 lg:p-20">
            <Section>
              <SubmissionView />
            </Section>
          </div>
        </div>
      </div>
    </Popup>
  );
}
