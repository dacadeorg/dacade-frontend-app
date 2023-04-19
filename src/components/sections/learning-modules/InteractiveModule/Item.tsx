import React, { ReactElement, useState } from "react";
// import { useSelector } from 'react-redux';
import Button from "@/components/ui/button";
import InteractiveModuleQuestion from "@/components/sections/learning-modules/InteractiveModule/Question";
import Markdown from "@/components/ui/Markdown";
import { useSelector } from "@/hooks/useTypedSelector";
import { authCheck } from "@/store/feature/auth.slice";

/**
 * Interactive module item component
 * @date 4/19/2023 - 1:40:14 PM
 *
 * @export
 * @param {*} { data }
 * @returns {ReactElement}
 */
export default function InteractiveModuleItem({
  data,
}: any): ReactElement {
  const [answering, setAnswering] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const colors = useSelector((state) => state.ui.colors);
  const community = useSelector((state) => state.communities.current);
  const isLoggedIn = useSelector((state) => authCheck(state));

  const questions = data?.items?.length ? data.items : [];

  const ended = false;
  const started = false;

  const stepTitle =
    ended && data?.closing?.title
      ? data.closing.title
      : data?.subtitle;

  const stepSubtitle = started
    ? "Knowledge test - Select the best option"
    : ended
    ? "Lesson end"
    : "Explanation";

  //   const completion = ended
  //     ? 100
  //     : Math.round((current / questions.length) * 100);

  const completed = () => {
    setDisabled(true);
    // TODO: Implement emit completed logic
  };

  const start = () => {
    setAnswering(true);
    // TODO: Implement emit start and answering logic
  };

  return (
    <div>
      {!answering ? (
        <>
          <Markdown value={data.text} />
          <div className="mx-auto w-full text-center mt-8">
            <Button
              variant="outline-primary"
              community-styles
              onClick={start}
            >
              Understood
            </Button>
          </div>
        </>
      ) : (
        <div className="relative">
          <InteractiveModuleQuestion
            data={data.question}
            disable={disabled}
            onRetry={() => setDisabled(false)}
            onWrong={() => setDisabled(true)}
            onCorrect={completed}
          />
        </div>
      )}
    </div>
  );
}
