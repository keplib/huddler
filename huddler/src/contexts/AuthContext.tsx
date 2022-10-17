import React, { useContext, useState, useEffect, createContext } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { getUserById } from '../utils/APIServices/userServices';

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [cognitoUser, setCognitoUser] = useState<any>(null);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const userLoggedIn = await Auth.currentAuthenticatedUser();
      setCognitoUser(userLoggedIn);
      if (!userLoggedIn) {
        setCognitoUser(null);
        setCurrentUser(null);
        router.replace('/');
        return;
      }
      
      setCognitoUser(userLoggedIn);
      const user = await getUserById(userLoggedIn.username);
      setCurrentUser(user);
      Hub.listen('auth', (data) => {
        const { payload } = data;
        console.log('A newauthentication user event has happened: ', data);
        if (payload.event === 'signOut') {
          console.log('User Signed Out');
          setCognitoUser(null);
          setCurrentUser(null);
        }
      });
    } catch (error) {
      console.error(
        'Error in cognito trying to signup or signin. Check in AuthContext'
      );
    }
  };

  const isAuthenticated = () => (userLoggedIn ? true : false);

  const logOut = async () => {
    return await Auth.signOut();
  };

  const value = {
    currentUser,
    isAuthenticated,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};




