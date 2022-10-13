import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { Huddle } from "../../types";
import NewHuddleForm from "../CreateHuddle/NewHuddleForm";
import { MapInfoWindow } from "./MapInfoWindow";
const image = require("../../../public/pinIcon.jpg");
const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

type Props = { huddles: Huddle[] };
export default function Map({ huddles }: Props) {
  const [showHuddle, setShowHuddle] = useState<Huddle | undefined>(undefined);
  const [locationName, setLocationName] = useState("");
  const [selected, setSelected] = useState(false);
  const [createBox, setCreateBox] = useState(false);
  const [map, setMap] = useState({});
  const [containerSize, setContainerSize] = useState({
    width: "60vw",
    height: "40vw",
  });
  // later change center to user location
  const [center, setCenter] = useState({
    lat: 41.39,
    lng: 2.154,
  });

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
    version: "weekly",
    libraries,
  });
  const toggleCreate = () => {
    const form = document.getElementById("huddle-form");
    if (createBox) {
      form?.classList.remove("animate-fade-in");
      form?.classList.add("animate-fade-out");
      setTimeout(() => {
        form?.classList.remove("flex");
        form?.classList.add("hidden");
      }, 500);
      setCreateBox(false);
      return;
    }
    form?.classList.remove("hidden");
    form?.classList.add("flex");
    form?.classList.remove("animate-fade-out");
    form?.classList.add("animate-fade-in");
    setCreateBox(true);
  };
  useEffect(() => {
    setSelected(true);
  }, [center]);
  return isLoaded ? (
    <div className="mt-0 mr-0">
      <div className="absolute pl-3 z-10 mt-24">
        <div className="flex">
          {containerSize.width == "60vw" ? (
            <button
              className="p-2  bg-white shadow-md "
              onClick={() =>
                setContainerSize({
                  width: "40vw",
                  height: "40vw",
                })
              }
            >
              &#x2771;
            </button>
          ) : (
            <button
              className="p-2 bg-white  shadow-md rounded-sm"
              onClick={() =>
                setContainerSize({
                  width: "60vw",
                  height: "40vw",
                })
              }
            >
              &#x2770;
            </button>
          )}
          <button
            className="bg-white shadow-md ml-3 p-2 rounded-sm"
            onClick={() => toggleCreate()}
          >
            Create
          </button>
        </div>
        <div className="z-10 mt-3">
          <PlacesAutocomplete
            hook={setCenter}
            setSelected={setSelected}
            setLocationName={setLocationName}
          />
        </div>
        <div
          id="huddle-form"
          className="hidden flex-col items-center border-solid border-2 p-4 mt-4 bg-white w-[20rem] shadow-sm"
        >
          <NewHuddleForm
            center={center}
            setCenter={setCenter}
            data={{
              name: locationName,
              lat: "" + center.lat,
              lng: "" + center.lng,
            }}
          />
        </div>
      </div>
      <div className="shadow-xl rounded-md ">
        <GoogleMap
          zoom={12}
          mapContainerStyle={containerSize}
          center={center}
          onLoad={(map) => setMap(map)}
          onUnmount={() => setMap({})}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {selected && (
            <MarkerF
              position={center}
              animation={google.maps.Animation.DROP}
              draggable={true}
              icon={{ path: image }}
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
                <MarkerF
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
          <MapInfoWindow
            showHuddle={showHuddle}
            setShowHuddle={setShowHuddle}
          />
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}
