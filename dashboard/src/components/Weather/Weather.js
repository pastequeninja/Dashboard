import React, { useState, useEffect } from 'react';
import weather from '../../services/weather';

/* const weather = (props) => {
    const [refreshRate, setRefreshRate] = useState(props.parentRefreshRate);
    const [query, setQuery] = useState();
    const [Weather, setWeather] = useState();

    const search = async(e) => {
        if (e.key === 'Enter') {
            const data = await weather(query)
            setWeather(data);
            setQuery('');
        }
    }

    componentDidMount() {
        this.getLocation();
        setInterval(this.getLocation, 60000); // runs every 60 seconds.
    }

    componentWillUnmount() {
        clearTimeout(this.intervalID);
    }

    return (
        <div className="main-container">
                <input type="text" className="search" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value )} onKeyPress={search} />
                {Weather.main && (
                    <div className="city">
                        <h2 className="city-name">
                            <span>{Weather.name}</span>
                            <sup>{Weather.sys.country}</sup>
                        </h2>
                        <div className="city-temp">
                            {Math.round(Weather.main.temp)}
                            <sup>&deg;C</sup>
                    </div>
                        <div className="info">
                            <img alt={Weather.description} />
                            <p>{Weather.description}</p>
                        </div>
                    </div>
                )}
            </div>
    )
} */

 function Weather (refreshRate) {
    const [query, setQuery] = useState('');
    const [Weather, setWeather] = useState({});

    useEffect(()=>{
    }, []);

    const search = async(e) => {
        if (e.key === 'Enter') {
            const data = await weather(query)
            setWeather(data);
            setQuery('');
        }
    }

    return (
        <div className="main-container">
                <input type="text" className="search" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value )} onKeyPress={search} />
                {Weather.main && (
                    <div className="city">
                        <h2 className="city-name">
                            <span>{Weather.name}</span>
                            <sup>{Weather.sys.country}</sup>
                        </h2>
                        <div className="city-temp">
                            {Math.round(Weather.main.temp)}
                            <sup>&deg;C</sup>
                    </div>
                        <div className="info">
                            <p>{Weather.description}</p>
                        </div>
                    </div>
                )}
            </div>
    )
}

export default Weather;