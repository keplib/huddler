import React from "react";
import { Huddle } from "../../types";
import HuddleCarouselItem from "./HuddleCarouselItem";

type Props = {
  huddles: Huddle[];
  huddlesUserIsGoing: Huddle[];
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
};

function HuddleCarousel({
  huddles,
  huddlesUserIsGoing,
  setUpdate,
  update,
}: Props) {
  return (
    <div
      className="pl-1 h-64 lg:h-72 flex overflow-x-scroll gap-4"
      id="carousel"
    >
      {huddles.map((huddle) => (
        <div
          className="w-[30rem] h-[18rem] flex-shrink-0 shadow-md border-palette-dark hover:border-palette-orange bg-white bg-opacity-50 border relative rounded-lg"
          key={huddle.id}
        >
          <HuddleCarouselItem
            setUpdate={setUpdate}
            update={update}
            huddle={huddle}
            huddlesUserIsGoing={huddlesUserIsGoing}
          />
        </div>
      ))}
    </div>
  );
}

export default HuddleCarousel;
