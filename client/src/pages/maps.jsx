import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import {useState, useEffect} from 'react';
import {useSpring, animated} from '@react-spring/web';
import {CircularProgress, Stack} from '@mui/material';

const BusCenterLocations = ({ location }) => {
  const [busCenterLocations, setBusCenterLocations] = useState([]);

  useEffect(() => {
    // Call the Google Maps API to fetch nearby bus center locations
    const fetchBusCenterLocations = async () => {
      const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=bus_station&key=AIzaSyDdkLjwrF4t0T6C1gmNBSzrBs6wVXp0rUE`);
      const data = await response.json();
      setBusCenterLocations(data.results);
    };

    fetchBusCenterLocations();
  }, [location]);

  return (
    <div>
      <h3>Bus Center Locations:</h3>
      <GoogleMap center={location} zoom={15}>
        {busCenterLocations.map((location) => (
          <Marker key={location.place_id} position={{ lat: location.geometry.location.lat, lng: location.geometry.location.lng }} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default BusCenterLocations;
