import React from "react";
import Image from "next/future/image";
import { Huddle } from "../../types";
import { dateFormatter } from "../../utils/helperFunctions";
type Props = {
  huddle: Huddle;
};

function HuddleCarouselItem({ huddle }: Props) {
  const dateTime = dateFormatter(huddle.day_time);

  return (
    <>
      <div className="h-full lg:w-[300px] max-h-72 col-span-1 rounded-l-lg relative">
        <Image
          src={huddle.image}
          fill
          className="h-full w-[300px] max-h-72 col-span-1 rounded-l-lg"
          alt={huddle.name}
        />
      </div>
      <div className="flex flex-col justify-self-start max-w-[300px] w-full text-lg pt-2">
        <h1 className="font-extrabold text-palette-orange text-2xl">
          {huddle.name}
        </h1>
        <p>
          On {dateTime.monthDayYear} at {dateTime.time}
        </p>
        <p className="mt-8">At {huddle.address}</p>
        <p>{huddle.description}</p>
      </div>
    </>
  );
}

export default HuddleCarouselItem;
