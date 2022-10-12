import { InfoWindowF } from "@react-google-maps/api";
import React, { useState } from "react";
import { Huddle } from "../../types";
import Image from "next/future/image";

type Props = {
  showHuddle: Huddle | undefined;
  setShowHuddle: React.Dispatch<React.SetStateAction<Huddle | undefined>>;
};
export const MapInfoWindow = ({ showHuddle, setShowHuddle }: Props) => {
  const [checkedIn, setCheckedIn] = useState(false);

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
          <div className="animation-fadein">
            <h1 className="font-bold text-orange-600 mb-1">
              {showHuddle.name}
            </h1>
            <h1>{showHuddle.when}</h1>
            <Image
              alt="img"
              src={showHuddle.images.stringValues[0]}
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
                onClick={() => setCheckedIn(false)}
              >
                Check out
              </button>
            ) : (
              <button
                className="float-right flex mt-3 italic font-medium bg-orange-300 p-1 rounded-md w-[4.5rem]"
                onClick={() => setCheckedIn(true)}
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
