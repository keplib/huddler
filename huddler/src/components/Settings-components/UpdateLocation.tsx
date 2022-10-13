import Map from '../Home-components/Map';
import { useState, useRef } from 'react';
import PlacesAutoCompleter from '../Home-components/PlacesAutocomplete';

type Props = {
  currentUserLongitude: number;
  currentUserLatitude: number;
};
const UpdateLocation = ({
  currentUserLongitude,
  currentUserLatitude,
}: Props) => {
  const [error, setError] = useState('');

  const changeLocation = async () => {
    try {
      //await here we post the new location to the DB
      //If success the h1 down below should show the new location
    } catch {
      setError("We weren't able to update your location. Please try again");
    }
  };

  return (
    <>
      {error && <div className='bg-red-600'>{error}</div>}
      <h1>
        This is your current location:{/* In here we put the user location */}
      </h1>
      <button onClick={changeLocation}>Update Location</button>
      <Map />
    </>
  );
};

export default UpdateLocation;

