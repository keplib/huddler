import React, { useState } from "react";
import placeholder from "../../../public/placeholder.jpg";
import Image from "next/future/image";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindowF,
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
      details: "somedetails",
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
  const containerStyle = {
    width: "80vw",
    height: "47vw",
  };
  const center = {
    lat: 41.39,
    lng: 2.154,
  };
  const apiKey = process.env.GOOGLE_API_KEY;
  const [map, setMap] = useState({});
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCkRgRrP2nqEQXJxUqBqN9V071kPOn7HoQ",
    version: "weekly",
  });

  return isLoaded ? (
    <div className="mt-16 mr-6 z-0">
      <GoogleMap
        zoom={12}
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={(map) => setMap(map)}
        onUnmount={(map) => setMap({})}
      >
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
              <h1 className="font-bold text-orange-600">{showHuddle.name}</h1>
              <Image
                alt="img"
                src={placeholder}
                height={200}
                width={200}
                className="rounded-lg"
              />
              <h2>attendants {showHuddle.attendants}</h2>
              <h3>{showHuddle.details}</h3>
              <div className="float-right flex">
                {showHuddle.checkedIn ? (
                  <button
                    onClick={() =>
                      setShowHuddle({ ...showHuddle, checkedIn: false })
                    }
                  >
                    Check out
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setShowHuddle({ ...showHuddle, checkedIn: true })
                    }
                  >
                    Check in
                  </button>
                )}
              </div>
            </div>
          </InfoWindowF>
        ) : (
          <></>
        )}
        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
