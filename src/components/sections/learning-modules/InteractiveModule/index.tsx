import { useEffect, useMemo, useState } from "react";
import InteractiveModuleWrapper from "./Wrapper";
import Markdown from "@/components/ui/Markdown";
import Loader from "@/components/ui/Loader";
import Hint from "@/components/ui/Hint";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import Link from "next/link";
import InteractiveModuleItem from "@/components/sections/learning-modules/InteractiveModule/Item";
import { authCheck } from "@/store/feature/auth.slice";

/**
 * interactive Module props interface
 * @date 4/19/2023 - 11:57:04 AM
 *
 * @interface interactiveModuleProps
 * @typedef {interactiveModuleProps}
 */
interface interactiveModuleProps {
  data: {
    title: string;
    closing: {
      text: string;
      title: string;
    };
    items: {
      title: string;
      options: {
        text: string;
        isCorrect: boolean;
      }[];
    }[];
    ref: string;
  };
}

/**
 * interactive Module component
 * @date 4/19/2023 - 11:57:41 AM
 *
 * @export
 * @param {interactiveModuleProps} {
  data,
}
 * @returns {*}
 */
export default function InteractiveModule({
  data,
}: interactiveModuleProps) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => authCheck(state));
  const items = data?.items?.length ? data.items : [];

  const colors = useSelector((state) => state.ui.colors);
  const community = useSelector((state) => state.communities.current);
  const course = useSelector((state) => state.courses.current);

  //TODO: This will be uncommented after the navigation slice has been migrated
  // const showPageNavigation = () => {
  //   dispatch("communities/navigation/showPageNavigation");
  // };

  // const checkIfAnswered = async () => {
  //   try {
  //     if (!isLoggedIn) return;
  //     const answers = await checkAnswer(data.ref);
  //     if (!answers.length) return;
  //     setCurrent(items.length);
  //     setStarted(true);
  //     setEnded(true);
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const stepTitle =
    ended && data?.closing?.title
      ? data.closing.title
      : items[current]?.title;
  const stepSubtitle = answering
    ? "Knowledge test - Select the best option"
    : ended
    ? "Lesson end"
    : "Explanation";

  const completion = useMemo(
    () => (ended ? 100 : Math.round((current / items.length) * 100)),
    [ended, current, items.length]
  );

  useEffect(() => {
    setLoading(true);
    // checkIfAnswered();
    return () => {
      // TODO: will be uncommented when migration of the navigation
      // showPageNavigation();
    };
  }, []);

  const nextItem = () => {
    setCurrent(current + 1);
    setAnswering(false);
    if (items.length > current) return;
    completed();
  };

  const goToNextItem = () => {
    setTimeout(() => {
      nextItem();
    }, 1000);
  };

  const completed = () => {
    setEnded(true);
    // showPageNavigation();
    if (!isLoggedIn) return;
    // submitModuleAnswer();
  };

  //TODO: This will be uncommented after the courses/learnigModules slice has been migrated
  // const submitModuleAnswer = () => {
  //   dispatch(
  //     "communities/courses/learningModules/submitModuleAnswer",
  //     {
  //       ref: data.ref,
  //       course: course.ref,
  //     }
  //   );
  // };

  // const checkAnswer = () => {
  //   return dispatch(
  //     "communities/courses/learningModules/checkAnswer",
  //     data.ref
  //   );
  // };

  //TODO: This will be uncommented after the navigation slice has been migrated
  // const hidePageNavigation = () => {
  //   dispatch("communities/navigation/hidePageNavigation");
  // };

  return (
    <InteractiveModuleWrapper
      title={stepTitle}
      subtitle={stepSubtitle}
      sectionTitle={data.title}
      percentage={completion}
      duration="15 minutes"
    >
      <div>
        {!loading && (
          <>
            {!ended ? (
              <>
                {items.map((item, index) => (
                  <div key={`item-${index}`}>
                    {current === index && (
                      <InteractiveModuleItem
                        data={item}
                        completed={goToNextItem}
                        answering={() => setAnswering(true)}
                      />
                    )}
                  </div>
                ))}
              </>
            ) : (
              <Markdown value={data.closing.text} />
            )}
            {!isLoggedIn && (
              <Hint className="mt-6">
                <p>
                  Since you are not logged in, your progress
                  won&#8217;t be saved.
                </p>
                <p>
                  <Link href="/login">Login</Link>
                  to make sure your progress doesn&#8217;t get lost.
                </p>
              </Hint>
            )}
          </>
        )}
        {loading && <Loader className="h-48" community-styles />}
      </div>
    </InteractiveModuleWrapper>
  );
}
