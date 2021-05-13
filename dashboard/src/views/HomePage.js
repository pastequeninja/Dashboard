import React, {useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/loading';
import Weather from '../components/Weather/Weather';
import MapGoogle from '../components/MapGoogle/MapGoogle';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import Currencies from '../components/Currencies/Currencies';
import Gallery from '../components/Gallery/Gallery';
import Fun from '../components/Fun/Fun';
import { render } from "react-dom";
import axios from "axios";


const domain =  process.env.REACT_APP_AUTH0_DOMAIN;
const id_test = "aqRCqqM54WcrBYTcoQngZ5TkfISMaRhC";/*
const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID; */

const Profile = (clientId) => {
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    const [message, setMessage] = useState("");
    const [quote, setQuote] = useState("");
     
    const callAPI = async () => {
        //const { user,isAuthenticated ,getAccessToeknSilently } = useAuth0();
        try {
        const response = await fetch(`https://www.googleapis.com/gmail/v1/users/${user.user_id}/threads`);
        const responseData = await response.json();
        setMessage(responseData);
        }catch (error) {
            setMessage(error.setMessage);
        }
    };
    
   const callSecureAPI = async () => {
        try {
            const accessToken = await getAccessTokenSilently( {
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user",
        });
        console.log("access token : " + accessToken);
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
            },
        });

      const { user_metadata } = await metadataResponse.json();

      setUserMetadata(user_metadata);
      console.log("meta :" + user_metadata);
    } catch (e) {
      console.log(e.message);
    }
  };


    function _onBoxChecked(e) {
        let id = e.target.id;
        let items = Array.from(widgets);
        items.forEach(w => {
            if (id === w.id)
                w.checked = !w.checked;
        });
        updateWidgets(items);
    }

    function changeRefreshRate(e) {
        const items = Array.from(widgets);
        items.forEach(i => {
            if (i.id === e.target.id) {
                if (i.id === 'weather')
                    i.widget = <Weather refreshRate={e.target.value}/>
                if (i.id === 'gallery')
                    i.widget = <Gallery refreshRate={e.target.value}/>
                if (i.id === 'currencies')
                    i.widget = <Currencies refreshRate={e.target.value}/>
                if (i.id === 'map')
                    i.widget = <MapGoogle refreshRate={e.target.value}/>
                if (i.id === 'fun')
                    i.widget = <Fun refreshRate={e.target.value}/>
            }
        })
        updateWidgets(items);        
    }

    let list = [
        {
            id:'weather',
            label:'Weather',
            widget:<Weather refreshRate={60}/>, //ne s'update pas
            checked: false
        },
        {
            id:'map',
            label:'GoogleMap',
            widget:<MapGoogle refreshRate={60}/>,
            checked: false,
        },
        {
            id:'currencies',
            label:'Currencies',
            widget:<Currencies refreshRate={60}/>,
            checked: false,
        },
        {
            id:'gallery',
            label:'Gallery',
            widget:<Gallery refreshRate={60}/>,
            checked: false,
        },
        {
            id:'fun',
            label:'Surprise',
            widget:<Fun refreshRate={60}/>,
            checked: false
        }
    ];
    const [widgets, updateWidgets] = useState(list);


    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(widgets);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        
        updateWidgets(items);        
    }

    return(
        isAuthenticated && (
        <div>
            <img src={user.picture} alt={user.name}/>
            <h2> {user.name} </h2>
            <h2>{user.user_id}</h2>
            {/* <button onClick={callSecureAPI} color="primary"></button> */}
            <button onClick={() => callSecureAPI()}>Post Status</button>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="widgets">
                {(provided) => (
                    <ul className="widgets" {...provided.droppableProps} ref={provided.innerRef}>
                        {widgets.map(({id, label, widget, checked}, index) => {
                            return (
                                
                                <Draggable key={id} draggableId={id} index={index}>
                                {(provided) => (
                                    
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <Checkbox id={id} label={label} onChange={_onBoxChecked} />
                                        <div>
                                            <input id={id} className="boxnbr" type='number' min='0' onChange={changeRefreshRate}></input>
                                        </div>
                                        {checked ? widget : ""}
                                    </li>
                                )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </ul>
                )}
                </Droppable>
            </DragDropContext>
            {/* <Stack tokens={stackTokens}>
            </Stack> */}
            {/* {isChecked?<Weather/>:""}
            {isGoogleChecked?<MapGoogle></MapGoogle>:""}
            {isCurrenciesChecked?<Currencies/>:""}
            {isGalleryChecked?<Gallery></Gallery>:""} */}
        </div> 
        
        )
    )
}

export default withAuthenticationRequired(Profile, {
    onRedirecting: () => <Loading />
});
/* export default Profile */