import Image from "next/image";
import { useRef, useState, useEffect, ReactElement } from "react";
import useOnClickOutside from "use-onclickoutside";

/**
 * Story card component props interface
 * @date 3/29/2023 - 12:18:26 PM
 *
 * @interface StoryProps
 * @typedef {StoryProps}
 */

interface StoryProps {
  story: {
    content?: string;
    icon?: string;
  };
  position: number;
  gridPosition: number;
  count: number;
}

/**
 * Story component card
 * @date 3/29/2023 - 12:17:37 PM
 *
 * @export
 * @param {StoryCardProps} {
  story,
  position,
  gridPosition,
  count,
}
 * @returns {ReactElement}
 */

export default function Story({
  story,
  position,
  gridPosition,
  count,
}: StoryProps): ReactElement {
  const [showBubble, setShowBubble] = useState(false);
  const [height, setHeight] = useState(0);
  const bubbleRef = useRef<HTMLDivElement>(null);

  /**
   * Hook from use-onclickoutside.
   * it takes two arguments, the ref of the element, which are:
   *    - The ref of the element on which the out side click will be detected
   *    - The callback to be executed when the out side click is detected
   */
  useOnClickOutside(bubbleRef, () => {
    if (showBubble) {
      setShowBubble(false);
    }
  });

  useEffect(() => {
    setHeight(bubbleRef.current?.parentElement?.clientHeight || 0);

    const updateHeight = () => {
      setHeight(bubbleRef.current?.parentElement?.clientHeight || 0);
    };

    window.addEventListener("resize", () => {
      updateHeight();
    });

    return () => {
      window.removeEventListener("resize", () => {
        updateHeight();
      });
    };
  }, [bubbleRef]);

  /**
   * Get the position according to the number of stories
   * @date 3/29/2023 - 12:19:00 PM
   *
   * @returns {string}
   */
  const getPosition = (): string => {
    const angle = 360 / count;
    const rotation = angle * position + 25 * (gridPosition + 1);
    return `rotate(${rotation}deg)
        translate(${height / 2}px)
        rotate(-${rotation}deg)`;
  };

  return (
    <div
      ref={bubbleRef}
      onClick={() => setShowBubble(true)}
      className="absolute border border-solid border-gray-200 bg-gray-50 rounded-full p-1 top-2/4 left-2/4 -m-7 flex flex-row-reverse"
      style={{
        transform: getPosition(),
      }}
    >
      <Image
        className="object-cover h-14 w-14 rounded-full"
        src={story.icon as string}
        alt="story icon"
      />

      {showBubble && story.content && (
        <div className="absolute p-4 md:p-7 left-6 md:-left-9 -ml-2 -mt-5 md:ml-20 lg:w-72 md:w-56 w-48 -bottom-60 md:bottom-16 bg-yellow-50 rounded-3.5xl rounded-tl-none md:rounded-tl-3.5xl md:rounded-bl-none text-yellow-900 border border-solid border-black border-opacity-5">
          <span>{story.content}</span>
        </div>
      )}
    </div>
  );
}
