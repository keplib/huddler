import React, { useEffect } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

type Description = {
  description: string;
};
type Props = {
  stockValue: string;
  setLocationData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      lat: string;
      lng: string;
    }>
  >;
  locationData: {
    name: string;
    lat: string;
    lng: string;
  };
};
const AutocompleteHuddleForm = ({
  stockValue,
  setLocationData,
  locationData,
}: Props) => {
  useEffect(() => {
    setValue(stockValue);
  }, [stockValue]);
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

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValue(e.currentTarget.value);
  };

  const handleSelect =
    ({ description }: Description) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setLocationData({ name: description, lat: "" + lat, lng: "" + lng });
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
          className="bg-white py-1 px-2 border-palette-light border-b-2 cursor-pointer w-[95%]"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        className="outline-palette-orange outline-1 shadow-sm rounded-md w-[100%]"
        defaultValue={value}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Look for a Place . . ."
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <ul className="absolute shadow-sm rounded-sm">{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export default AutocompleteHuddleForm;
