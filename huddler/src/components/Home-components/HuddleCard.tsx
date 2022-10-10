import Image from "next/image";
import React from "react";
import placeholder from "../../../public/placeholder.jpg"


const HuddleCard = ({ item }: any) => {

  console.log(item)

  return (
    <div className="grid grid-cols-3 bg-yellow-200 border p-4 hover:scale-110">
      <div>
        <Image src={item.images.stringValues[0]} height={200} width={200} />
      </div>
      <div className="col-span-2">
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </div>
    </div>
  );
}

export default HuddleCard;
