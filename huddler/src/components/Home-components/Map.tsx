import React, { useState } from "react";
import placeholder from "../../../public/placeholder.jpg";
import Image from "next/future/image";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindowF,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
export default function Map({ huddles }) {
  const [showHuddle, setShowHuddle] = useState({
    name: "",
    description: "somedetails",
    attendants: 532,
    latitude: 41.3,
    longitude: 2.154,
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
  const [selected, setSelected] = useState(null);
  const PlacesAutocomplete = () => {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        /* Define search scope here */
      },
      debounce: 300,
    });
    const ref = useOnclickOutside(() => {
      // When user clicks outside of the component, we can dismiss
      // the searched suggestions by calling this method
      clearSuggestions();
    });

    const handleInput = (e) => {
      // Update the keyword of the input element
      setValue(e.target.value);
    };

    const handleSelect =
      ({ description }) =>
      () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter to "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description }).then((results) => {
          const { lat, lng } = getLatLng(results[0]);
          setCenter({ lat, lng });
          setSelected(true);
        });
      };

    const renderSuggestions = () =>
      data.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li
            key={place_id}
            onClick={handleSelect(suggestion)}
            className="bg-white py-1 px-2 border-black border-solid w-[100%] cursor-pointer"
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      });

    return (
      <div ref={ref}>
        <input
          className="py-1 outline-none placeholder: pl-[0.5rem] w-[100%]"
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Look for a Place . . ."
        />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div>
    );
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
        <div className="absolute z-10 mt-40 ml-4 shadow-md rounded-md w-50">
          <PlacesAutocomplete />
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
            <Marker position={center} animation={google.maps.Animation.DROP} />
          )}
          {huddles ? (
            huddles.map((huddle) => {
              return (
                <Marker
                  key={huddle.id}
                  position={{
                    lng: Number(huddle.longitude),
                    lat: Number(huddle.latitude),
                  }}
                  animation={google.maps.Animation.DROP}
                  onClick={() => {
                    console.log(huddle);
                    setShowHuddle(huddle);
                  }}
                />
              );
            })
          ) : (
            <></>
          )}
          {showHuddle.name ? (
            <InfoWindowF
              position={{
                lat: Number(showHuddle.latitude),
                lng: Number(showHuddle.longitude),
              }}
              onCloseClick={() =>
                setShowHuddle({
                  name: "",
                  description: "somedetails",
                  attendants: 532,
                  latitude: 41.3,
                  longitude: 2.154,
                  checkedIn: false,
                })
              }
            >
              <div className="animation-fadein">
                <h1 className="font-bold text-orange-600 mb-1">
                  {showHuddle.name}
                </h1>
                <h1>{showHuddle.when}</h1>
                <Image
                  alt="img"
                  src={placeholder}
                  height={200}
                  width={200}
                  className="rounded-lg"
                />
                <h2 className="mt-1">attendants: 1234</h2>
                <h3 className="h-12 w-48 overflow-auto mt-3">
                  {showHuddle.description}
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
