import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import InteractiveModuleWrapper from "./Wrapper";
import Markdown from "@/components/ui/Markdown";
import Loader from "@/components/ui/Loader";
import Hint from "@/components/ui/Hint";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import Link from "next/link";
import InteractiveModuleItem from "@/components/sections/learning-modules/InteractiveModule/Item";
import { authCheck } from "@/store/feature/auth.slice";
import { InteractiveModule as InteractiveModuleType } from "@/types/course";
import { hidePageNavigation, showPageNavigation } from "@/store/feature/communities/navigation.slice";
import { checkAnswer, submitModuleAnswer } from "@/store/feature/learningModules.slice";

/**
 * interactive Module props interface
 * @date 4/19/2023 - 11:57:04 AM
 *
 * @interface interactiveModuleProps
 * @typedef {interactiveModuleProps}
 */
interface interactiveModuleProps {
  data: InteractiveModuleType;
}

/**
 * interactive Module component
 * @date 4/19/2023 - 11:57:41 AM
 *
 * @export
 * @param {interactiveModuleProps} {
  data,
}
 * @returns {ReactElement}
 */
export default function InteractiveModule({ data }: interactiveModuleProps): ReactElement {
  const [current, setCurrent] = useState(0);
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);
  const dispatch = useDispatch();

  const { isLoggedIn, course } = useSelector((state) => ({
    isLoggedIn: authCheck(state),
    course: state.courses.current,
  }));
  const items = data?.items?.length ? data.items : [];

  const checkIfAnswered = useCallback(async () => {
    try {
      if (!isLoggedIn) return;
      const answers = await checkAnswer(data.ref);
      if (!answers.length) return;
      setCurrent(items.length);
      setEnded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [data.ref, isLoggedIn, items.length]);

  const stepTitle = ended && data?.closing?.title ? data.closing.title : items[current]?.title;

  const stepSubtitle = answering ? "Knowledge test - Select the best option" : ended ? "Lesson end" : "Explanation";

  const completion = useMemo(() => (ended ? 100 : Math.round((current / items.length) * 100)), [ended, current, items.length]);

  useEffect(() => {
    setLoading(true);
    hidePageNavigation()(dispatch);
    checkIfAnswered();
    return () => {
      showPageNavigation()(dispatch);
    };
  }, [checkIfAnswered, dispatch]);

  const goToNextItem = () => {
    setTimeout(() => {
      nextItem();
    }, 1000);
  };

  const completed = () => {
    setEnded(true);
    showPageNavigation()(dispatch);
    if (!isLoggedIn) return;
    dispatch(submitModuleAnswer({ ref: data.ref, course: course?.ref || "" }));
  };

  const nextItem = () => {
    const nextItem = current + 1;
    setCurrent(nextItem);
    setAnswering(false);
    if (items.length > nextItem) return;
    completed();
  };

  return (
    <InteractiveModuleWrapper title={stepTitle} subtitle={stepSubtitle} sectionTitle={data.title} percentage={completion} duration="15 minutes">
      <div>
        {!loading && (
          <>
            {!ended ? (
              <>
                {items.map((item, index) => (
                  <div key={`item-${index}`}>{current === index && <InteractiveModuleItem data={item} goToNextItem={goToNextItem} />}</div>
                ))}
              </>
            ) : (
              <Markdown value={data.closing.text} />
            )}
            {!isLoggedIn && (
              <Hint className="mt-6">
                <p>Since you are not logged in, your progress won&#8217;t be saved.</p>
                <p>
                  <Link className="underline" href="/login">
                    Login
                  </Link>
                  &nbsp; to make sure your progress doesn&#8217;t get lost.
                </p>
              </Hint>
            )}
          </>
        )}
        {loading && <Loader className="h-48" communityStyles />}
      </div>
    </InteractiveModuleWrapper>
  );
}
