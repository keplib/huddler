import React, { useState, useRef, useEffect } from 'react';

import PersonalInformation from '../../src/components/Settings-components/PersonalInformation';
import ChangePassword from '../../src/components/Settings-components/ChangePassword';
import UpdateLocation from '../../src/components/Settings-components/UpdateLocation';
import UpdateInterests from '../../src/components/Settings-components/UpdateInterests';
import DeleteUser from '../../src/components/Settings-components/DeleteUser';
import { User } from '../../src/types';
import OptionsMenu from '../../src/components/Settings-components/OptionsMenu';

//mock user
const user: User = {
  name: 'Florian',
  email: 'flo@flo.flo',
  firstName: 'Florio',
};

const SettingsPage = () => {
  const [currentUser, setCurrentUser] = useState<User>(user);
  const [option, setOption] = useState('information');

  return (
    <main className='flex h-screen justify-center items-center'>
      <OptionsMenu setOption={setOption} />

      {option === 'information' && (
        <PersonalInformation currentUser={currentUser} />
      )}
      {option === 'password' && <ChangePassword />}
      {option === 'location' && (
        <UpdateLocation
          currentUserLongitude={currentUser.longitude!}
          currentUserLatitude={currentUser.latitude!}
        />
      )}
      {option === 'interests' && (
        <UpdateInterests currentUserInterests={currentUser.interests!} />
      )}
      {option === 'delete' && <DeleteUser currentUserId={currentUser.id!} />}
    </main>
  );
};

export default SettingsPage;

