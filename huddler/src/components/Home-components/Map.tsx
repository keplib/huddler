import React, { useState } from "react";
import Image from "next/future/image";
import Link from "next/link";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { Huddle } from "../../types";

type Props = { huddles: Huddle[] };
export default function Map({ huddles }: Props) {
  const [showHuddle, setShowHuddle] = useState<Huddle | undefined>(undefined);
  const [checkedIn, setCheckedIn] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [map, setMap] = useState({});
  const [selected, setSelected] = useState(false);
  const [containerSize, setContainerSize] = useState({
    width: "80vw",
    height: "47vw",
  });
  // later change center to user location
  const [center, setCenter] = useState({
    lat: 41.39,
    lng: 2.154,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
    version: "weekly",
    libraries: ["places"],
  });
  return isLoaded ? (
    <div className="mt-16 mr-6 relative">
      <div className="absolute p-3 z-20 mt-24 ml-1">
        {containerSize.width == "80vw" ? (
          <button
            className="p-2  bg-white shadow-md"
            onClick={() =>
              setContainerSize({
                width: "40vw",
                height: "47vw",
              })
            }
          >
            &#x2771;
          </button>
        ) : (
          <button
            className=" bg-white  shadow-md"
            onClick={() =>
              setContainerSize({
                width: "80vw",
                height: "47vw",
              })
            }
          >
            &#x2770;
          </button>
        )}
        <Link
          href={{
            pathname: "/create",
            query: { name: locationName, lat: center.lat, lng: center.lng },
          }}
        >
          <a href="" className="ml-12 p-2 bg-white shadow-md font-medium ">
            Create
          </a>
        </Link>
      </div>
      <div className="shadow-xl">
        <div className="absolute z-10 mt-40 ml-4 shadow-md rounded-md w-50">
          <PlacesAutocomplete
            hook={setCenter}
            setSelected={setSelected}
            setLocationName={setLocationName}
          />
        </div>
        <GoogleMap
          zoom={12}
          mapContainerStyle={containerSize}
          center={center}
          onLoad={(map) => setMap(map)}
          onUnmount={() => setMap({})}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {selected && (
            <Marker
              position={center}
              animation={google.maps.Animation.DROP}
              draggable={true}
              onDragEnd={(e) =>
                setCenter({
                  lat: e.latLng?.lat() || center.lat,
                  lng: e.latLng?.lng() || center.lng,
                })
              }
            />
          )}
          {huddles ? (
            huddles.map((huddle: Huddle) => {
              return (
                <Marker
                  key={huddle.id + ""}
                  position={{
                    lat: Number(huddle.latitude),
                    lng: Number(huddle.longitude),
                  }}
                  animation={google.maps.Animation.DROP}
                  onClick={() => {
                    setShowHuddle(huddle);
                  }}
                />
              );
            })
          ) : (
            <></>
          )}
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
          <></>
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}
