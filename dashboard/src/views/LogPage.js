import React from 'react';
import '../Style/App.css';
import LoginButton from '../components/loginButton';
import LogoutButton from '../components/logoutButton';
import Profile from './HomePage';
import { useAuth0 } from '@auth0/auth0-react';

function App(clientId) {
  const { user, isLoading, error } = useAuth0();

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Oops.. {error.message}</div>
  return (
    <>
      <LoginButton /> 
      <Profile clientId={clientId}/>
      <LogoutButton />
    </>
  );
}

export default App;
