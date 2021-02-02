import { useEffect, useState } from 'react';

const API_URL = "https://api.openweathermap.org/data/2.5/onecall?"; /*lat={lat}&lon={lon}&exclude={part}&appid={API key}*/
const ICON_URL = "http://openweathermap.org/img/wn/";
const API_KEY = "fb445191f13df590248ddab37a592362";

function Weather(props) {
    const [temp, setTemp] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [direction, setDirection] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');

    useEffect(() => {
        const url = `${API_URL}lat=${props.lat}&lon=${props.lng}&units=metric&appid=${API_KEY}`;
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                if (result.current !== undefined) {
                    setTemp(result.current.temp);
                    setSpeed(result.current.wind_speed);
                    setDirection(result.current.wind_deg);
                    setDescription(result.current.weather[0].description);
                    setIcon(ICON_URL + result.current.weather[0].icon + '@2x.png');
                } else {
                    alert('Could not read weather information')
                }
            })
        /* Propsit poistaa varoituksen consolista ja ei tuota haittaa tämmöisessä sovelluksessa, sillä tieto ei vaihdu enää uudelleen */
    }, [props])

    return (
        <div>
            <h3>Weather on your location</h3>
            <p>{temp} C&#176;</p>
            <p>{speed} m/s {direction} degrees</p>
            <p>{description}</p>
            <img src={icon} alt="" />
        </div>
    )
}

export default Weather;