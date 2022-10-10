import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
export default function Map() {
  const [showHuddle, setShowHuddle] = useState(true);
  const containerStyle = {
    width: "60vw",
    height: "80rem",
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
        {showHuddle ? (
          <Marker
            title="coolio"
            position={{ lat: 41.39, lng: 2.154 }}
            onClick={() => setShowHuddle(false)}
            animation={google.maps.Animation.DROP}
          />
        ) : (
          <InfoWindow
            onCloseClick={() => setShowHuddle(true)}
            position={{
              lat: 41.39,
              lng: 2.154,
            }}
          >
            <div className="bg-orange-300 ">
              <h1>InfoWindow</h1>
            </div>
          </InfoWindow>
        )}
        {/* {markers ? (
        <Marker
          position={markers.position}
          animation={google.maps.Animation.DROP}
        />
      ) : (
        <></>
      )} */}

        <></>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
