import { InfoWindowF } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { Huddle } from "../../types";
import Image from "next/future/image";
import {
  getUsersGoingToHuddle,
  postUserGoingToHuddle,
  removeUserGoingToHuddle,
} from "../../utils/APIServices/huddleServices";
import { dateFormatter } from "../../utils/helperFunctions";

type Props = {
  showHuddle: Huddle | undefined;
  setShowHuddle: React.Dispatch<React.SetStateAction<Huddle | undefined>>;
};
export const MapInfoWindow = ({ showHuddle, setShowHuddle }: Props) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [dateTime, setDateTime] = useState<any>();
  const isUserGoing = async () => {
    if (showHuddle) {
      const users = await getUsersGoingToHuddle(showHuddle.id);
      //CHANGE TO CURRENT USER
      users.find((user: any) => (user = 67))
        ? setCheckedIn(true)
        : setCheckedIn(false);
    }
  };
  useEffect(() => {
    isUserGoing();
    if (showHuddle) setDateTime(dateFormatter(showHuddle.day_time));
  }, [showHuddle]);
  return (
    <div>
      {showHuddle ? (
        <InfoWindowF
          position={{
            lat: Number(showHuddle.latitude),
            lng: Number(showHuddle.longitude),
          }}
          onCloseClick={() => setShowHuddle(undefined)}
        >
          <div className="animation-fadein font-medium">
            <h1 className="font-extrabold text-palette-orange mb-1 text-lg">
              {showHuddle.name}
            </h1>
            <h1 className="mb-1">
              On {dateTime.monthDayYear} at {dateTime.time}
            </h1>
            <Image
              alt="img"
              src={showHuddle.image}
              height={200}
              width={200}
              className="rounded-lg"
            />
            <h2 className="mt-1">attendants: 1234</h2>
            <h3 className="h-12 w-48 overflow-auto mt-3">
              {showHuddle.description}
            </h3>
            {checkedIn ? (
              <button
                className="float-right flex mt-3 italic font-medium bg-slate-300 p-1 rounded-md w-[4.5rem]"
                onClick={() => {
                  setCheckedIn(false);
                  removeUserGoingToHuddle(67, showHuddle.id);
                }}
              >
                Check out
              </button>
            ) : (
              <button
                className="float-right flex mt-3 italic font-medium bg-orange-300 p-1 rounded-md w-[4.5rem]"
                onClick={() => {
                  setCheckedIn(true);
                  postUserGoingToHuddle(67, showHuddle.id);
                }}
              >
                Check in
              </button>
            )}
          </div>
        </InfoWindowF>
      ) : (
        <></>
      )}
    </div>
  );
};
