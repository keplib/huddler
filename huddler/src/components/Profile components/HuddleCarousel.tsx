import React from "react";
import { Huddle } from "../../types";
import HuddleCarouselItem from "./HuddleCarouselItem";

type Props = {
  huddles: Huddle[];
};

function HuddleCarousel({ huddles }: Props) {
  return (
    <div className="pl-1 h-64 lg:h-72 flex overflow-x-scroll gap-4" id="carousel">
      {huddles.map((huddle) => (
        <div
          className="gap-4 grid grid-cols-2 flex-grow-1 flex-shrink-0 shadow-md border-palette-dark hover:border-palette-orange bg-white bg-opacity-50 border relative rounded-lg"
          key={huddle.id}
        >
          <HuddleCarouselItem huddle={huddle} />
        </div>
      ))}
    </div>
  );
}

export default HuddleCarousel;
