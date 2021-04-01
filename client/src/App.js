import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaHJpc3NvIiwiYSI6ImNrbXR1eHQ1aDB2NGgydW14dGZrMTM0YW4ifQ.m-RNG_OwqXr2RlUZ1WE5rQ';

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-115.590, 32.676], // starting position [lng, lat]
      zoom: 14 // starting zoom
    });

    let currentMarkers = [];
    
    const fetchLocations = async () => {
      try {
        const resp = await axios.get('http://localhost:3001/api/v1/solar_farms/1/technicians');
        setLocations(resp.data.features)
        resp.data.features.map((feature) => {
          let marker = new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map);
          currentMarkers.push(marker);
          return currentMarkers;
        })
      } catch (error) {
        throw error
      }
    }

    const clearMarkers = () => {
      if (currentMarkers.length > 0) {
        for (let i = currentMarkers.length - 1; i >= 0; i--) {
          currentMarkers[i].remove();
          currentMarkers.pop()
        }
      }
    }

    fetchLocations()

    const interval = setInterval(() => {
      clearMarkers()
      fetchLocations()
    },10000)

    return()=>clearInterval(interval)

//window.alert(name)

  }, [])

  return (
    <div className="App">
      <div id='map'></div>
    </div>
  );
}

export default App;