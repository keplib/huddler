import React, { useState } from "react";
import placeholder from "../../../public/placeholder.jpg";
import Image from "next/future/image";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindowF,
  Autocomplete,
  LoadScript,
} from "@react-google-maps/api";
export default function Map() {
  const MOCKDATA = [
    {
      name: "Huddle1",
      details: "somedetails",
      attendants: 532,
      lat: 41.33,
      lng: 2.164,
      checkedIn: false,
    },
    {
      name: "Huddle2",
      details: "somedetails",
      attendants: 532,
      lat: 41.38,
      lng: 2.174,
      checkedIn: false,
    },
    {
      name: "Huddle3",
      details: "somedetails",
      attendants: 532,
      lat: 41.35,
      lng: 2.124,
      checkedIn: false,
    },
    {
      name: "Huddle4",
      details:
        "somedetails very log description to test how is it going to display i dont know what to type anymore aaaaaa lucas licas lucas",
      attendants: 532,
      lat: 41.3,
      lng: 2.154,
      checkedIn: false,
    },
  ];
  const [showHuddle, setShowHuddle] = useState({
    name: "",
    details: "somedetails",
    attendants: 532,
    lat: 41.3,
    lng: 2.154,
    checkedIn: true,
  });
  const [containerSize, setContainerSize] = useState({
    width: "80vw",
    height: "47vw",
  });
  // later change center to user location
  const [center, setCenter] = useState({
    lat: 41.39,
    lng: 2.154,
  });
  const [map, setMap] = useState({});
  const [autocomplete, setAutocomplete] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
    version: "weekly",
    libraries: ["places"],
  });
  const onPlaceChanged = async () => {
    if (autocomplete !== null) {
      const place = await autocomplete.getPlace();
      console.log(place.geometry.viewport.Va);
      setCenter({
        lat: place.geometry.viewport.Va.lo,
        lng: place.geometry.viewport.Va.hi,
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return isLoaded ? (
    <div className="mt-16 mr-6 relative">
      {containerSize.width == "80vw" ? (
        <button
          className="absolute p-2 z-20 bg-white mt-24 ml-3 shadow-md"
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
          className="absolute p-3 z-20 bg-white mt-24 ml-3 shadow-md"
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
      <div className="shadow-xl">
        <GoogleMap
          zoom={12}
          mapContainerStyle={containerSize}
          center={center}
          onLoad={(map) => setMap(map)}
          onUnmount={() => setMap({})}
        >
          {" "}
          <Autocomplete
            onPlaceChanged={() => onPlaceChanged()}
            onLoad={(auto) => {
              setAutocomplete(auto);
            }}
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
              className="w-[13.5%] h-4 py-4 pl-2 absolute shadow-lg float-right mt-24 ml-[86%] outline-none"
            />
          </Autocomplete>
          {/* Child components, such as markers, info windows, etc. */}
          {MOCKDATA ? (
            MOCKDATA.map((huddle) => {
              return (
                <Marker
                  key={huddle.lat}
                  position={{ lat: huddle.lat, lng: huddle.lng }}
                  animation={google.maps.Animation.DROP}
                  onClick={() => setShowHuddle(huddle)}
                />
              );
            })
          ) : (
            <></>
          )}
          {showHuddle.name ? (
            <InfoWindowF
              position={{ lat: showHuddle.lat, lng: showHuddle.lng }}
              onCloseClick={() =>
                setShowHuddle({
                  name: "",
                  details: "somedetails",
                  attendants: 532,
                  lat: 41.3,
                  lng: 2.154,
                  checkedIn: false,
                })
              }
            >
              <div className="animation-fadein">
                <h1 className="font-bold text-orange-600 mb-1">
                  {showHuddle.name}
                </h1>
                <Image
                  alt="img"
                  src={placeholder}
                  height={200}
                  width={200}
                  className="rounded-lg"
                />
                <h2 className="mt-1">attendants: {showHuddle.attendants}</h2>
                <h3 className="h-12 w-48 overflow-auto mt-3">
                  {showHuddle.details}
                </h3>
                {showHuddle.checkedIn ? (
                  <button
                    className="float-right flex mt-3 italic font-medium bg-slate-300 p-1 rounded-md w-[4.5rem]"
                    onClick={() =>
                      setShowHuddle({ ...showHuddle, checkedIn: false })
                    }
                  >
                    Check out
                  </button>
                ) : (
                  <button
                    className="float-right flex mt-3 italic font-medium bg-orange-300 p-1 rounded-md w-[4.5rem]"
                    onClick={() =>
                      setShowHuddle({ ...showHuddle, checkedIn: true })
                    }
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
