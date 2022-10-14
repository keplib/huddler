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
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
};

function HuddleCarouselItem({
  huddle,
  huddlesUserIsGoing,
  setUpdate,
  update,
}: Props) {
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
    <div className="ml-3 mr-3 mt-3">
      <div className="flex mb-1">
        <h1 className="font-extrabold text-palette-orange text-2xl">
          {huddle.name}
        </h1>
        <div className="ml-auto mr-3">
          {going ? (
            <button
              onClick={(e) => {
                setGoing(!going);
                setUpdate(!update);
                removeUserGoingToHuddle(67, huddle.id);
              }}
            >
              Leave
            </button>
          ) : (
            <button
              onClick={(e) => {
                setGoing(!going);
                setUpdate(!update);
                postUserGoingToHuddle(67, huddle.id);
              }}
            >
              Join
            </button>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="h-3/4 w-[24rem] mr-3">
          <Image
            src={huddle.image}
            width={250}
            height={250}
            className="rounded-lg h-[8rem] w-[13rem]"
            alt={huddle.name}
          />
          <p>attending: {data.attending}</p>
          <div className="grid grid-cols-2 gap-2">
            {data.categories.map((category, i) => {
              return i > 3 ? (
                <></>
              ) : (
                <p className="text-center py-1 bg-palette-dark rounded-md text-white">
                  {category.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className="grid max-w-[300px] h-[13rem] w-full space-x-0 ">
          <p>{huddle.description}</p>
          <p className="text-sm self-end">
            At {huddle.address}
            <br></br>
            {dateTime.monthDayYear} at {dateTime.time}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HuddleCarouselItem;
