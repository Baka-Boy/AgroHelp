import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {useHistory} from 'react-router-dom';
import {useSpring, animated} from '@react-spring/web';
import {CircularProgress, Stack} from '@mui/material';
import pagesData from './data2.json';
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2VzaGF2c2hhcm1hMDEwMyIsImEiOiJjbGdnNG9ncTcwODIzM2VycnFzeXR6amZwIn0.CXYpx8GEO0JRa18exxV4XA";

function Soilanalysis() {
  const [data, setData] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState({});
  const mapContainer = useRef(null);
  const navigate = useHistory();

  const [result, setResult] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // const inputValue = { ...data, ...weatherData }
    const inputValue = [[
      data.AQI,data.OZONE,data.CO,weatherData.temperature,weatherData.humidity,data.NO2,data.SO2
    ]]
    // console.log(inputValue)
    axios.post('http://localhost:5000/classify', {inputValue})
      .then(response => {
        let pageName = response.data[0]
        let pageNumber = Object.values(pagesData).findIndex(pageData => pageData.name.toLowerCase() == pageName)
        navigate.push('/CropRecommend/' + pageNumber);

      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [72.8777, 19.0760], // set the initial center to Mumbai
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl());

    // geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    // Add geocoder to the map
    map.addControl(geocoder);

    // Listen for the 'result' event from the geocoder
    geocoder.on("result", (event) => {
      const location = event.result.center;
      setLocation({ lat: location[1], lng: location[0] });

       // API call for air quality data
       axios
       .get("https://api.ambeedata.com/latest/by-lat-lng", {
         headers: {
           "x-api-key":
             "3675d3c5677729a4cb062ad0f8f8294a27fc34c5bfc003b40dc075a9a3202082",
         },
         params: {
           lat: location[1],
           lng: location[0],
         },
       })
       .then((response) => {
        const {NO2,CO,OZONE,SO2,AQI} = response.data.stations[0]
        setData({ 
          NO2: ((NO2)+1).toFixed(2), 
          CO: ((CO)*100).toFixed(2),
          OZONE: ((OZONE)*2).toFixed(2),
          SO2: ((SO2)*40).toFixed(2),
          AQI: AQI.toFixed(2)
        })
       })
       .catch((error) => {
         console.log("Error:", error);
       });

     // API call for weather data
     axios
       .get("https://api.ambeedata.com/weather/latest/by-lat-lng", {
         headers: {
           "x-api-key":
             "3675d3c5677729a4cb062ad0f8f8294a27fc34c5bfc003b40dc075a9a3202082",
         },
         params: {
           lat: location[1],
           lng: location[0],
         },
       })
       .then((response) => {
        const {temperature, humidity} = response.data.data
        setWeatherData({ 
          temperature: ((temperature)/3).toFixed(2), 
          humidity: ((humidity)).toFixed(2)
        })
       })
       .catch((error) => {
         console.log("Error:", error);
       });
   });

   return () => map.remove();
 }, []);

 return (
    <div style={{ border: "1px solid #ccc", padding: "15px", paddingTop: "120px", margin: "0 auto", maxWidth: "90vw" }}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "75%", height: "70vh", borderRight: "1px solid #ccc", padding: "10px" }}>
          <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
        </div>
    <div style={{ marginLeft: "2rem" }}>
      <h3>Selected Location:</h3><br/>
      <p><b>Latitude:</b> {location?.lat}</p>
      <p><b>Longitude:</b> {location?.lng}</p><br/>
      <hr />
      <h3>Air Quality Data:</h3><br/>
      <p>
        <b>Nitrogen:</b> {data.AQI}
      </p>
      <p>
        <b>Phosphorus :</b> {data.OZONE} 
      </p>
      <p>
        <b>Potassium</b> {data.CO} 
      </p>
      <p>
        <b>Rainfall:</b> {data.SO2} 
      </p>
        <p>
          <b>Temperature:</b> {weatherData.temperature} <sup>o</sup>C
        </p>
        <p>
          <b>Humidity:</b> {weatherData.humidity}
        </p>
        <p>
        <b>pH:</b> {data.NO2} 
      </p>
      <hr />
      <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Classify</button>
      </form>
    </div>
    </div>
  </div>
</div>



    );
  }
  
  export default Soilanalysis;


  