import { Amplify, Auth, withSSRContext } from 'aws-amplify';
import { useEffect } from 'react';
import Main from '../../src/components/NewUserForm/MainForm';
import { useAuth } from '../../src/contexts/AuthContext';
import { getAllHuddles } from '../../src/utils/APIServices/huddleServices';
import { getSession, recommendedForUser } from '../../src/utils/helperFunctions';

export const getServerSideProps = async (context) => {
  const { Auth } = withSSRContext(context)
  try {
    const user = await Auth.currentAuthenticatedUser()
    return {
      props: {
        authenticated: true, username: user.username
      }
    }
  } catch (err) {
    return {
      props: {
        authenticated: false
      }
    }
  }
}

function index(props) {
  console.log(props.username);

  const { currentUser } = useAuth()
  useEffect(() => {
    // Access the user session on the client
    getter()
      // console.log(currentUser)
  }, [])

  async function getter() {
    // const data = await recommendedForUser(currentUser);
    // const res = await Auth.currentAuthenticatedUser();
    // console.log(await res);
  }



  return <h1>hi</h1>;
}

export default index;

