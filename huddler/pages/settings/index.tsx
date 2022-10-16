import React, { useState, useRef, useEffect } from 'react';

import PersonalInformation from '../../src/components/Settings-components/PersonalInformation';
import ChangePassword from '../../src/components/Settings-components/ChangePassword';
import UpdateLocation from '../../src/components/Settings-components/UpdateLocation';
import UpdateInterests from '../../src/components/Settings-components/UpdateInterests';
import DeleteUser from '../../src/components/Settings-components/DeleteUser';
import { User } from '../../src/types';
import OptionsMenu from '../../src/components/Settings-components/OptionsMenu';
import { useRouter } from 'next/router';
import { Auth} from 'aws-amplify'
import { getUserById } from '../../src/utils/APIServices/userServices';

let aws_id = '';

Auth.currentAuthenticatedUser()
  .then((user) => {
    console.log('User: ', user);
    aws_id = user.username;
    console.log('this is aws', aws_id);
  })
  .catch((err) => console.log(err));
// //mock user
// const user: User = {
//   name: 'Florian',
//   email: 'flo@flo.flo',
//   firstName: 'Florio',
// };

const SettingsPage = () => {
  // const router = useRouter();
  // if (!aws_id) router.replace('/');
  const [currentUser, setCurrentUser] = useState<User>();
  const [option, setOption] = useState('information');

  useEffect(()=>{
    loadUser()
  },[])

  console.log('aws_id', aws_id)

const loadUser = async () => {
  const user = await getUserById(aws_id)
  console.log('this is user', user)
  setCurrentUser(user)
}

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


