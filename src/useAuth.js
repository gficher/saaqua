import { useState } from 'react';

export default function useAuth() {
  const getAuth = () => {
    const authString = sessionStorage.getItem('auth');
    const userAuth = JSON.parse(authString);
    return userAuth;
  };

  const [auth, setAuth] = useState(getAuth());

  const saveAuth = (authInfo) => {
    sessionStorage.setItem('auth', JSON.stringify(authInfo));
    setAuth(authInfo);
  };

  return {
    setAuth: saveAuth,
    auth
  };
}
