import Image from "next/image";
import React from "react";

const HuddleCard = ({ huddle, handleActive, active }: any) => {
  return (huddle !== active) ? (
    // Huddles class
    <div className="grid grid-cols-3 bg-yellow-200 border p-4 hover:scale-110" onClick={() => handleActive(huddle)}>
      <div>
        <Image src={huddle.image} height={200} width={200} />
      </div>
      <div className="col-span-2">
        <h1>{huddle.name}</h1>
        <p>{huddle.description}</p>
      </div>
    </div>
  ) :
    // Active huddle class
    <div className="flex flex-col bg-red-200 border p-4" onClick={() => handleActive(huddle)}>
    <div className="col-span-2">
      <h1>{huddle.name}</h1>
      <p>{huddle.description}</p>
    </div>
      <div className="inline-block h-full w-full">
        {huddle.images.stringValues.map((image:string,i:number) => (
          <Image src={image} height={200} width={200} key={i} />
        ))}
    </div>
  </div>;
}

export default HuddleCard;
