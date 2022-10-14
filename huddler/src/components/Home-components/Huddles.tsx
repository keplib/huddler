import HuddleCard from "./HuddleCard";
import { useState } from "react";
import { Huddle } from "../../types";

type Props = {
  huddles: Huddle[];
};

function Huddles({ huddles }: Props) {
  const [active, setActive] = useState<Huddle | {}>();

  const handleActive = (huddle: Huddle) => {
    if (active === huddle) {
      setActive({});
    } else {
      setActive(huddle);
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3   w-3/4 ml-10 ">
      {huddles.map((huddle: any) => (
        <HuddleCard
          item={huddle}
          key={huddle.id}
          active={active as Huddle}
          handleActive={handleActive}
        />
      ))}
    </div>
  );
}

export default Huddles;
