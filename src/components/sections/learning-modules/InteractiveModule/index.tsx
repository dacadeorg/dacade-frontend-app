import { useEffect, useState } from "react";
import InteractiveModuleWrapper from "./Wrapper";
import Markdown from "@/components/ui/Markdown";
import Loader from "@/components/ui/Loader";
import Hint from "@/components/ui/Hint";
// import InteractiveModuleItem from "~/components/sections/learning-modules/InteractiveModule/Item";

interface Props {
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

const InteractiveModule = ({ data }: Props) => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.check
  );
  const items = data?.items?.length ? data.items : [];

  const colors = useSelector((state: RootState) => state.ui.colors);
  const community = useSelector(
    (state: RootState) => state.communities.current
  );
  const course = useSelector(
    (state: RootState) => state.communities.courses.current
  );

  const stepTitle =
    ended && data?.closing?.title
      ? data.closing.title
      : items[current]?.title;
  const stepSubtitle = answering
    ? "Knowledge test - Select the best option"
    : ended
    ? "Lesson end"
    : "Explanation";
  const completion = ended
    ? 100
    : Math.round((current / items.length) * 100);

  useEffect(() => {
    setLoading(true);
    checkIfAnswered();
    return () => {
      showPageNavigation();
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
    showPageNavigation();
    if (!isLoggedIn) return;
    submitModuleAnswer();
  };

  const checkIfAnswered = async () => {
    try {
      if (!isLoggedIn) return;
      const answers = await checkAnswer(data.ref);
      if (!answers.length) return;
      setCurrent(items.length);
      setStarted(true);
      setEnded(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const submitModuleAnswer = () => {
    dispatch(
      "communities/courses/learningModules/submitModuleAnswer",
      {
        ref: data.ref,
        course: course.ref,
      }
    );
  };

  const checkAnswer = () => {
    return dispatch(
      "communities/courses/learningModules/checkAnswer",
      data.ref
    );
  };

  const hidePageNavigation = () => {
    dispatch("communities/navigation/hidePageNavigation");
  };

  const showPageNavigation = () => {
    dispatch("communities/navigation/showPageNavigation");
  };

  return (
    <InteractiveModuleWrapper
      title={stepTitle}
      subtitle={stepSubtitle}
      section-title={data.title}
      percentage={completion}
      duration="15 minutes"
    >
      <div>
        {!loading && (
          <>
            {!ended ? (
              <>
                {items.map((item, index) => (
                  <div key={index}>
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
                  Since you are not logged in, your progress won't be
                  saved.
                </p>
                <p>
                  <Link to={localePath("/login")}>Login</Link>
                  to make sure your progress doesn't get lost.
                </p>
              </Hint>
            )}
          </>
        )}
        {loading && <Loader className="h-48" community-styles />}
      </div>
    </InteractiveModuleWrapper>
  );
};
