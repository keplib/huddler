import React, { useContext, useState, useEffect, createContext } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    handlePromise();
  }, []);

  const handlePromise = async () => {
    const aws_id = await Auth.currentUserInfo();
    if (!aws_id) {
      setLoading(false)
      router.replace('/')
      return
    }
    setCurrentUser(aws_id.username);
    setLoading(false);
  };

  // const isAuthenticated = () => {
  //   if (!currentUser) return false;
  //   else return true
  // }

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

