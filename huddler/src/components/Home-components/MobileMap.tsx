import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import PlacesAutocomplete from "./PlacesAutocomplete";
import { Huddle } from "../../types";
import NewHuddleForm from "../CreateHuddle/NewHuddleForm";
import { MapInfoWindow } from "./MapInfoWindow";
const image = require("../../../public/location-pin-svgrepo-com.svg");
const libraries: (
    | "places"
    | "drawing"
    | "geometry"
    | "localContext"
    | "visualization"
)[] = ["places"];

type Props = {
    huddles?: Huddle[];
    currentPage: string;
    setLocation: React.Dispatch<React.SetStateAction<any>>;
};
export default function MobileMap({ huddles, currentPage, setLocation }: Props) {
    const [showHuddle, setShowHuddle] = useState<Huddle | undefined>(undefined);
    const [locationName, setLocationName] = useState("");
    const [selected, setSelected] = useState(false);
    const [createBox, setCreateBox] = useState(false);
    const [map, setMap] = useState({});
    const [mapSize, setMapSize] = useState({
        width: "100vw",
        height: "77vh",
    });
    const [containerSize, setContainerSize] = useState(mapSize);
    // later change center to user real life location
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
        if (center.lat !== 41.39) setSelected(true);
        if (currentPage)
            setLocation({
                name: locationName,
                lat: center.lat,
                lng: center.lng,
            });
    }, [center]);
    useEffect(() => {
        if (currentPage === "newuser") {
            setMapSize({
                width: "46.5vw",
                height: "28vw",
            });
            setContainerSize({
                width: "46.5vw",
                height: "28vw",
            });
        }
    }, []);
    return isLoaded ? (
        <div className="mt-0">
            <div className="absolute pl-3 z-10 mt-24">
                <div className="flex">
                    {containerSize.width == "40vw" ? (
                        <button
                            className="p-2 bg-white  shadow-md rounded-sm"
                            onClick={() => setContainerSize(mapSize)}
                        >
                            &#x2770;
                        </button>
                    ) : (
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
                    )}
                    {currentPage === "newuser" ? (
                        <></>
                    ) : (
                        <button
                            className="bg-white shadow-md ml-3 p-2 rounded-sm"
                            onClick={() => toggleCreate()}
                        >
                            Create
                        </button>
                    )}
                </div>
                <div className="z-10 mt-3 w-60">
                    <PlacesAutocomplete
                        hook={setCenter}
                        setSelected={setSelected}
                        setLocationName={setLocationName}
                    />
                </div>
                <div
                    id="huddle-form"
                    className="hidden flex-col items-center p-4 mt-4 bg-[rgb(248,241,229)] w-[20rem] shadow-md rounded-md border-solid border-[0.5px] border-palette-dark"
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
                            // icon={{ path: "../../../public/location-pin-svgrepo-com.svg" }}
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
