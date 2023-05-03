import { ReactElement, useState } from "react";
import Button from "@/components/ui/button";
import InteractiveModuleQuestion from "@/components/sections/learning-modules/InteractiveModule/Question";
import Markdown from "@/components/ui/Markdown";
import { useSelector } from "@/hooks/useTypedSelector";
import { authCheck } from "@/store/feature/auth.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";

interface InteractiveModuleItemProps {
  data: {
    text: string;
    title: string;
    options: {
      text: string;
      isCorrect: boolean;
    };
    question: {
      title: string;
      answers: string[];
      correct: number;
    };
  };
}

/**
 * Interactive module item component
 * @date 4/19/2023 - 1:40:14 PM
 *
 * @export
 * @param {*} { data }
 * @returns {ReactElement}
 */
export default function InteractiveModuleItem({ data }: InteractiveModuleItemProps): ReactElement {
  const [answering, setAnswering] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const ended = false;
  const started = false;

  const completed = () => {
    setDisabled(true);
  };

  const start = () => {
    setAnswering(true);
  };

  return (
    <div>
      {!answering ? (
        <>
          <Markdown value={data.text} />
          <div className="mx-auto w-full text-center mt-8">
            <Button variant="outline-primary" communityStyles onClick={start}>
              Understood
            </Button>
          </div>
        </>
      ) : (
        <div className="relative">
          <InteractiveModuleQuestion data={data.question} disable={disabled} onRetry={() => setDisabled(false)} onWrong={() => setDisabled(true)} onCorrect={completed} />
        </div>
      )}
    </div>
  );
}
