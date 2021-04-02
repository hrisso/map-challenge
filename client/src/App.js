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

    // Grab data with axios GET request, map over response to create marker for each technician
    // Push makers to array to cleanup later

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
    
    // Fetch locations on mount
    
    fetchLocations()
    
    // Clear old markers using marker array and clear out marker array once removed
    
    const clearMarkers = () => {
      if (currentMarkers.length > 0) {
        for (let i = currentMarkers.length - 1; i >= 0; i--) {
          currentMarkers[i].remove();
          currentMarkers.pop()
        }
      }
    }
    
    // Notification when technicians are less than 304.8m from each other
    
    const notify = () => {
      if (locations.length > 0) {
        let techLocA = new mapboxgl.LngLat(locations[0].geometry.coordinates[0], locations[0].geometry.coordinates[1]);
        let techLocB = new mapboxgl.LngLat(locations[1].geometry.coordinates[0], locations[1].geometry.coordinates[1]);
        let techLocC = new mapboxgl.LngLat(locations[2].geometry.coordinates[0], locations[2].geometry.coordinates[1]);
  
        if (techLocA.distanceTo(techLocB) < 304.8 || techLocB.distanceTo(techLocC) < 304.8 || techLocA.distanceTo(techLocC) < 304.8) {
          new mapboxgl.Popup({ closeOnClick: false })
          .setLngLat([-115.590, 32.676])
          .setHTML('<h1>Technicians are close to each other!</h1>')
          .addTo(map);
        }
      } else {
        console.log("no data yet")
      }
    }
    // Ping for new data every minute, remove old markers, add new ones, and check for notifications
    
    const interval = setInterval(() => {
      clearMarkers()
      fetchLocations()
      notify()
    }, 60000)

    return()=>clearInterval(interval)

  }, [])

  return (
    <div className="App">
      <div id='map'></div>
    </div>
  );
}

export default App;