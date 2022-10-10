import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api";
import HuddleCard from "./HuddleCard";
export default function Map() {
  const MOCKDATA = [
    {
      huddle1: {
        name: "somename",
        details: "somedetails",
        attendants: 532,
        lat: 41.33,
        lng: 2.164,
      },
    },
    {
      huddle2: {
        name: "somename",
        details: "somedetails",
        attendants: 532,
        lat: 41.38,
        lng: 2.174,
      },
    },
    {
      huddle3: {
        name: "somename",
        details: "somedetails",
        attendants: 532,
        lat: 41.35,
        lng: 2.124,
      },
    },
    {
      huddle4: {
        name: "somename",
        details: "somedetails",
        attendants: 532,
        lat: 41.3,
        lng: 2.154,
      },
    },
  ];
  const [showHuddle, setShowHuddle] = useState(true);
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
        {/* {showHuddle ? (
          <Marker
            title="coolio"
            position={{ lat: 41.39, lng: 2.154 }}
            onClick={() => setShowHuddle(false)}
            animation={google.maps.Animation.DROP}
          />
        ) : (
          <InfoWindowF
            onCloseClick={() => setShowHuddle(true)}
            position={{
              lat: 41.39,
              lng: 2.154,
            }}
          >
            <h1>InfoWindow</h1>
          </InfoWindowF>
        )} */}
        {MOCKDATA ? (
          MOCKDATA.map((huddle) => {
            return (
              <Marker
                position={{ lat: huddle.lat }}
                animation={google.maps.Animation.DROP}
              />
            );
          })
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
