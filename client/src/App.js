import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiaHJpc3NvIiwiYSI6ImNrbXR1eHQ1aDB2NGgydW14dGZrMTM0YW4ifQ.m-RNG_OwqXr2RlUZ1WE5rQ';

function App() {
  const [lng, setLng] = useState(-115.590876702138573);
  const [lat, setLat] = useState(32.676567128293193);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-115.590876702138573, 32.676567128293193], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
    
    const fetchLngLat = async () => {
      try {
        const resp = await axios.get('http://localhost:3001/api/v1/solar_farms/1/technicians');
        console.log(resp)
        resp.data.features.map((feature) =>
          new mapboxgl.Marker().setLngLat(feature.geometry.coordinates).addTo(map)
        )
      } catch (error) {
        throw error
      }
    }
    fetchLngLat()
  }, [])

  return (
    <div className="App">
      <div id='map'></div>
    </div>
  );
}

export default App;