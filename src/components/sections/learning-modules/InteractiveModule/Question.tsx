import { ReactElement, useEffect, useMemo, useState } from "react";
import InteractiveModuleAnswer from "./Answer";

const RETRY_TIME = 14;

/**
 * interactive Module Question Props interface
 * @date 4/19/2023 - 1:38:31 PM
 *
 * @interface interactiveModuleQuestionProps
 * @typedef {interactiveModuleQuestionProps}
 */
interface interactiveModuleQuestionProps {
  data: {
    title: string;
    answers: string[];
    correct: number;
  };
  disable?: boolean;
  onCorrect?: (index: number) => void;
  onWrong?: (index: number) => void;
  onRetry?: () => void;
}

/**
 * Interactive Module Question component
 * @date 4/19/2023 - 1:38:51 PM
 *
 * @export
 * @param {interactiveModuleQuestionProps} {
  data,
  disable = false,
  onCorrect,
  onWrong,
  onRetry,
}
 * @returns {ReactElement}
 */
export default function InteractiveModuleQuestion({ data, disable = false, onCorrect, onWrong, onRetry }: interactiveModuleQuestionProps): ReactElement {
  const [selected, setSelected] = useState<number | null>(null);
  const [timerCount, setTimerCount] = useState<number>(0);
  const [randomizedAnswers, setRandomizedAnswers] = useState<{ text: string; id: number }[]>([]);

  const shuffleAnswers = (answers: string[]) => {
    const randomized = [...answers].map((value, index) => ({ text: value, id: index })).sort(() => Math.random() - 0.5);
    return randomized;
  };

  const memoizedRandomizedAnswers = useMemo(() => shuffleAnswers(data.answers), [data.answers]);

  useEffect(() => {
    setRandomizedAnswers(memoizedRandomizedAnswers);
  }, [memoizedRandomizedAnswers]);

  const selectAnswer = (index: number) => {
    if (disable) return;

    if (selected === index) {
      setSelected(null);
      return;
    }
    setSelected(index);
    if (index === data.correct) {
      onCorrect && onCorrect(index);
      return;
    }
    triggerRetryCountdown();
    onWrong && onWrong(index);
  };

  const triggerRetryCountdown = () => {
    setTimerCount(RETRY_TIME);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (timerCount > 0) {
      interval = setInterval(() => {
        setTimerCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (timerCount === 0) {
      onRetry && onRetry();
      setSelected(null);
      shuffleAnswers(data.answers);
    }
    return () => clearInterval(interval);
  }, [timerCount, data.answers, onRetry]);

  return (
    <div className="relative">
      <h4 className="pt-6 font-normal">{data.title}</h4>
      {randomizedAnswers.map((answer, index) => (
        <InteractiveModuleAnswer
          key={index}
          text={answer.text}
          selected={selected === answer.id}
          correct={data.correct === answer.id}
          disable={disable}
          timerCount={timerCount}
          onRetry={onRetry}
          onWrong={onWrong}
          onSelect={() => selectAnswer(answer.id)}
        />
      ))}
    </div>
  );
}
