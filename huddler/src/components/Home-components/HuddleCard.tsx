import Image from "next/image";
import React from "react";
import placeholder from "../../../public/placeholder.jpg"


const HuddleCard = ({ item }: any) => {
  console.log(item)



  return (
    <div className="grid grid-cols-3 bg-yellow-200 border">
      <div>
        <Image src={placeholder} height={200} width={200} />
      </div>
      <div className="col-span-2">
        {item}
      </div>
    </div>
  );
}

export default HuddleCard;
