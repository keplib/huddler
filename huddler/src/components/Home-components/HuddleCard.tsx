import Image from "next/image";
import React from "react";
import { dateFormatter } from "../../utils/helperFunctions";
const HuddleCard = ({ item, handleActive, active }: any) => {
  console.log(item);
  const dateTime = dateFormatter(item.day_time);
  return item !== active ? (
    // Huddles class
    <div
      className="rounded-lg border-solid border-[0.5px] bg-white bg-opacity-50 border-palette-dark p-4 shadow-md hover:border-palette-orange"
      onClick={() => handleActive(item)}
    >
      <h1 className="mb-2 font-extrabold text-palette-orange text-lg">
        <strong>{item.name}</strong>
      </h1>
      <h2 className="mb-1">
        On {dateTime.monthDayYear} at {dateTime.time}
      </h2>
      <div className="flex justify-center">
        <img
          src={item.image}
          className="rounded-md h-44 min-w-[12rem] shadow-md"
        ></img>
        {/* <Image
          className="rounded-lg"
          alt="event-image"
          src={item.image}
          height={175}
          width={175}
        /> */}
      </div>
      <div className="col-span-1 self-center">
        <br />
        <p>At {item.address}</p>
        <p>{item.description}</p>
        <br />
      </div>
    </div>
  ) : (
    // Active huddle class
    <div
      className="flex flex-col bg-red-200 border p-4"
      onClick={() => handleActive(item)}
    >
      <div className="col-span-2">
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </div>
      <div className="inline-block h-full w-full">
        {item.images.stringValues.map((image: string, i: number) => (
          <Image src={image} height={200} width={200} key={i} />
        ))}
      </div>
    </div>
  );
};

export default HuddleCard;
