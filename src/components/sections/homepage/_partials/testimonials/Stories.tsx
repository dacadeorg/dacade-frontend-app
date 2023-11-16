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
  content?: string;
  icon?: string;
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

export default function TestimonialsSection({ list }: TestimonialsSectionProps): ReactElement {
  const [showingBubble, setShowingBubble] = useState<ShowingBubble>(() => ({
    card: 4,
    grid: 0,
  }));

  const gridSize = 90;

  /**
   * This line uses the chunk method from the lodash library to create an array of arrays from an input array list. The chunk
   * method splits the list array into smaller arrays (chunks) of length 5 and returns an array containing these chunks.
   * @date 4/4/2023 - 11:52:05 AM
   *
   */

  const grids = _.chunk(list, 5);

  /**
   * Generate the width or height of the grid box depending on the number of testimonials and the index
   * @date 4/4/2023 - 11:53:53 AM
   *
   * @param {number} i
   * @returns {number}
   */
  const getSize = (i: number): number => {
    return (gridSize * (i + 1)) / grids.length;
  };

  /**
   * Clear the icon which is showing the popup/bubble
   * @date 4/4/2023 - 11:56:53 AM
   *
   * @param {number} card
   * @param {number} grid
   */
  const onBubbleHide = (card: number, grid: number) => {
    if (showingBubble.grid === grid && showingBubble.card === card) {
      setShowingBubble({
        card: null,
        grid: null,
      });
    }
  };

  /**
   * Store which icon is displaying a bubble
   * @date 4/4/2023 - 11:58:52 AM
   *
   * @param {number} card
   * @param {number} grid
   */
  const onBubbleShow = (card: number, grid: number) => {
    setShowingBubble({
      card,
      grid,
    });
  };

  return (
    <div className="relative w-full top-0 h-screen left-0 z-0 hidden md:block md:max-h-3xl lg:max-h-4xl xl:max-h-7.1xl">
      {grids.map((grid, gridIndex) => {
        return (
          <span
            key={gridIndex}
            className="border border-solid border-gray-200 m-auto rounded-full absolute inset-0 xl:max-w-6xl xl:max-h-6xl md:max-h-.5xl md:max-w-.5xl lg:max-w-3xl lg:max-h-3xl"
            style={{
              width: `${getSize(gridIndex)}vh`,
              height: `${getSize(gridIndex)}vh`,
              zIndex: showingBubble.grid === gridIndex ? 99 : grids.length - gridIndex,
            }}
          >
            {grid.map((story, storyIndex) => (
              <Story
                key={storyIndex}
                story={story}
                position={storyIndex}
                count={grid.length}
                gridPosition={gridIndex}
                showingBubble={showingBubble}
                onShowBubble={() => onBubbleShow(storyIndex, gridIndex)}
                onHideBubble={() => onBubbleHide(storyIndex, gridIndex)}
              />
            ))}
          </span>
        );
      })}
    </div>
  );
}
