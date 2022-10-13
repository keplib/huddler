import HuddleCard from "./HuddleCard";
import { useState } from "react";
import { Huddle } from "../../types";

function Huddles({ huddles }) {
  const [active, setActive] = useState({});
  const handleActive = (huddle: Huddle) => {
    if (active === huddle) {
      setActive({});
    } else {
      setActive(huddle);
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3   w-3/4  overflow-auto mx-10 mt-20 ">
      {huddles.map((huddle: any) => (
        <HuddleCard
          item={huddle}
          key={huddle.id}
          active={active}
          handleActive={handleActive}
        />
      ))}
    </div>
  );
}

export default Huddles;
