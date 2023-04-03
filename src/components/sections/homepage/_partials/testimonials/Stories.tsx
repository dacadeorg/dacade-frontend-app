import { ReactElement, useState } from "react";
import _ from "lodash";
import Story from "@/components/cards/Story";

/**
 * Testimonial interface
 * @date 4/3/2023 - 6:33:15 PM
 *
 * @typedef {Testimonial}
 */
interface Testimonial {
  title: string;
  content: string;
  author: string;
}

/**
 * Props for the testimonial section
 * @date 4/3/2023 - 6:33:27 PM
 *
 * @typedef {TestimonialsSectionProps}
 */
interface TestimonialsSectionProps {
  list: Testimonial[];
}

/**
 * Interface fo the state that store whether the number of cards and grid columns it should display
 * @date 4/3/2023 - 6:34:58 PM
 *
 * @interface ShowingBubble
 * @typedef {ShowingBubble}
 */
interface ShowingBubble {
  card: number | null;
  grid: number | null;
}

export default function TestimonialsSection({
  list,
}: TestimonialsSectionProps): ReactElement {
  const [showingBubble, setShowingBubble] = useState<ShowingBubble>({
    card: null,
    grid: null,
  });

  const gridSize = 90;

  const grids = _.chunk(list, 5);

  const getSize = (i: number) => {
    return (gridSize * (i + 1)) / grids.length;
  };

  const onBubbleHide = (card: number, grid: number) => {
    if (showingBubble.grid === grid && showingBubble.card === card) {
      setShowingBubble({
        card: null,
        grid: null,
      });
    }
  };

  const onBubbleShow = (card: number, grid: number) => {
    setShowingBubble({
      card,
      grid,
    });
  };

  return (
    <div className="relative w-full top-0 h-screen left-0 z-0 hidden md:block md:max-h-3xl lg:max-h-4xl xl:max-h-7.1xl">
      {grids.map((grid, gridIndex) => (
        <span
          key={gridIndex}
          className="border border-solid border-gray-200 m-auto rounded-full absolute inset-0 xl:max-w-6xl xl:max-h-6xl md:max-h-.5xl md:max-w-.5xl lg:max-w-3xl lg:max-h-3xl"
          style={{
            width: `${getSize(gridIndex)}vh`,
            height: `${getSize(gridIndex)}vh`,
            zIndex:
              showingBubble.grid === gridIndex
                ? 99
                : grids.length - gridIndex,
          }}
        >
          {grid.map((story, storyIndex) => (
            <Story
              key={storyIndex}
              story={story}
              position={storyIndex}
              count={grid.length}
              gridPosition={gridIndex}
              onShowBubble={() => onBubbleShow(storyIndex, gridIndex)}
              onHideBubble={() => onBubbleHide(storyIndex, gridIndex)}
            />
          ))}
        </span>
      ))}
    </div>
  );
}
