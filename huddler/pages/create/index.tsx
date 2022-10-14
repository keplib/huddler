import { Amplify, Auth } from 'aws-amplify';
import { useEffect } from 'react';
import Main from '../../src/components/NewUserForm/MainForm';

function index() {
  useEffect(() => {
    // Access the user session on the client
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log("User: ", user)
      })
      .catch(err => console.log(err))
  }, [])


  return <h1>hi</h1>;
}

export default index;

