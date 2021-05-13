import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/LogPage';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from "react-router-dom";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUDIENCE;

ReactDOM.render(
  <BrowserRouter>
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={audience}
    scope="read:current_user update:current_user_metadata">
    <App clientId={clientId} />
  </Auth0Provider>,
  </BrowserRouter>,
  document.getElementById('root')
);