import React, { useEffect, useState } from "react";
import Image from "next/future/image";
import { Huddle } from "../../types";
import { dateFormatter } from "../../utils/helperFunctions";
import {
  getHuddleCategories,
  getUsersGoingToHuddle,
  postUserGoingToHuddle,
  removeUserGoingToHuddle,
} from "../../utils/APIServices/huddleServices";
type Props = {
  huddle: Huddle;
  huddlesUserIsGoing: Huddle[];
};

function HuddleCarouselItem({ huddle, huddlesUserIsGoing }: Props) {
  const dateTime = dateFormatter(huddle.day_time);
  const [going, setGoing] = useState(false);
  //getting addicional huddle data
  const [data, setData] = useState({
    attending: 0,
    categories: [{ name: "" }],
  });
  useEffect(() => {
    if (huddlesUserIsGoing) {
      huddlesUserIsGoing.find((h) => h.id === huddle.id)
        ? setGoing(true)
        : setGoing(false);
    }
    const getter = async () => {
      const attending = await getUsersGoingToHuddle(huddle.id);
      const categories = await getHuddleCategories(huddle.id);

      setData({ attending: attending.length, categories });
    };
    getter();
  }, []);
  return (
    <>
      <div className="xl:h-72 xl:w-72 2xl:w-full max-h-72 rounded-lg relative">
        <Image
          src={huddle.image}
          fill
          className="h-full rounded-l-lg"
          alt={huddle.name}
        />
      </div>
      <div className="flex flex-col justify-self-start max-w-[300px] w-full text-lg pt-2">
        <div className="flex">
          <h1 className="font-extrabold text-palette-orange text-2xl">
            {huddle.name}
          </h1>
          <div className="ml-auto mr-3">
            {going ? (
              <button
                onClick={(e) => {
                  setGoing(!going);
                  removeUserGoingToHuddle(67, huddle.id);
                }}
              >
                Leave
              </button>
            ) : (
              <button
                onClick={(e) => {
                  setGoing(!going);
                  postUserGoingToHuddle(67, huddle.id);
                }}
              >
                Join
              </button>
            )}
          </div>
        </div>
        <p>
          On {dateTime.monthDayYear} at {dateTime.time}
        </p>
        <p>attending: {data.attending}</p>
        <p className="mt-8">At {huddle.address}</p>
        <p className="hidden md:block">{huddle.description}</p>
        <div className="grid grid-cols-3 gap-x-4 gap-y-2 mr-3 mt-auto mb-2 w-full">
          {data.categories.map((category, i) => {
            return i > 2 ? (
              <></>
            ) : (
              <p className="text-center py-1 bg-palette-dark rounded-md text-white">
                {category.name}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HuddleCarouselItem;
