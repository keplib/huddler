import { Amplify, Auth } from 'aws-amplify';
import { useEffect } from 'react';
import Main from '../../src/components/NewUserForm/MainForm';
import { useAuth } from '../../src/contexts/AuthContext';
import { getAllHuddles } from '../../src/utils/APIServices/huddleServices';
import { recommendedForUser } from '../../src/utils/helperFunctions';

function index() {

  const { currentUser } = useAuth()
  useEffect(() => {
    // Access the user session on the client
    getter()
      // console.log(currentUser)
  }, [])

  async function getter() {
    // const data = await recommendedForUser(currentUser);
    const data = await getAllHuddles()
    console.log(await data);
  }



  return <h1>hi</h1>;
}

export default index;

