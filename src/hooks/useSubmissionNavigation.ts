import useNavigation from "@/hooks/useNavigation";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { IRootState } from "@/store";
import { showSubmission } from "@/store/feature/communities/challenges/submissions";
import { initChallengeNavigationMenu } from "@/store/feature/communities/navigation.slice";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";
import { Submission as SubmissionType } from "@/types/bounty";
import { localePath } from "@/utilities/Routing";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";



const useSubmissionNavigation = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { submission_id } = router.query;

    const navigation = useNavigation();

    const { selectedSubmission, submissions } = useMultiSelector<unknown, { selectedSubmission: SubmissionType; submissions: SubmissionType[] }>({
        selectedSubmission: (state: IRootState) => state.submissions.current,
        submissions: (state: IRootState) => state.submissions.list,
    });

    const handleCloseSubmission = useCallback(() => {
        if (!selectedSubmission) return;
        dispatch(showSubmission(""));
        setShowPopup(false);
        window.history.pushState("", "", localePath(router, router.asPath));
        dispatch(toggleBodyScrolling(false));
    }, [dispatch, router, selectedSubmission]);

    useEffect(() => {
        dispatch(initChallengeNavigationMenu(navigation.community));
    }, [navigation.community, dispatch]);

    const handleShowSubmission = useCallback(
        (e: any) => {
            const newUrl = e.detail;
            const submissionId = newUrl.replace(localePath(router, router.asPath), "").replace(/\//g, "");
            const submission = submissions.find((submission) => submission.id === submissionId);
            if (!submission) return;
            dispatch(showSubmission(submissionId));
            setShowPopup(true);
            dispatch(toggleBodyScrolling(true));
        },
        [dispatch, router, submissions]
    );

    useEffect(() => {
        window.addEventListener("onSoftNavigation", handleShowSubmission);
        window.addEventListener("popstate", handleCloseSubmission);
        return () => {
            window.removeEventListener("onSoftNavigation", handleShowSubmission);
            window.removeEventListener("popstate", handleCloseSubmission);
        };
    }, [handleCloseSubmission, handleShowSubmission]);

    // Temporary fix for links copied which have submission_id as a query parameter
    useEffect(() => {
        if (submission_id) router.push(`${router.asPath.split("?")[0]}/${submission_id}`);
    }, [router, submission_id]);


    return {
        showPopup,
        handleCloseSubmission,
        handleShowSubmission,
        selectedSubmission,
        submissions,
    }
};

export default useSubmissionNavigation;
