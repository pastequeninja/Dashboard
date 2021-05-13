import React, { useState } from "react";
import {withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";

const callAPI = () => {
    const { user,isAuthenticated ,getAccessToeknSilently } = useAuth0();

    const response = await fetch(`https://www.googleapis.com/gmail/v1/users/${user.id}/threads`);
    const responseData = await response.json();
    setMessage(responseData);
};

const callSecureAPI = async () => {
    const domain =  process.env.REACT_APP_AUTH0_DOMAIN;
    try {
        const accessToken = await getAccessTokenSilently(/* {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
    } */);
        const response = await fetch(
            `https://${domain}/api/v2/users/${user.name}`,
            {
                header: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )
    }
}
};

/* useEffect(() => {
        const getUserMetadata = async () => {
          const domain =  process.env.REACT_APP_AUTH0_DOMAIN;
      
          try {
            const accessToken = await getAccessTokenSilently({
              audience: `https://${domain}/api/v2/`,
              scope: "read:current_user",
            });
      
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.name}`;
    

            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

      
            const { user_metadata } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);
          } catch (e) {
            console.log("message : " + e.message);
            //console.log("name" + user.name);
          }
        };
      
        getUserMetadata();
      }, []); */