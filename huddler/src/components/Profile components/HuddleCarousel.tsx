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

  console.log(huddles);

  return Array.isArray(huddles) ? (
    <div
      className="pl-1 h-64 lg:h-[19rem] flex overflow-x-scroll gap-4 px-2"
      id="carousel"
    >
      {huddles.map((huddle) => (
        <div
          className="w-full px-0.5 md:w-[30rem] h-68 lg:h-[19rem] shadow-md border-palette-dark hover:border-palette-orange bg-white bg-opacity-50 border relative rounded-lg"
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
  ) : <div className="pl-1 h-64 lg:h-72 flex"> </div>;
}

export default HuddleCarousel;
