// src/components/Local-Info/Map.js
import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import locations from '../../data/Location.json';
import markerImage from './marker.png';

const Map = ({ region, onCitySelect }) => {
  const cityCoordinates = locations.map((loc) => ({
    name: loc.name,
    lon: loc.lon,
    lat: loc.lat,
    currencyCode: loc.currencyCode,
    image: loc.image,
  }));

  const regionCenters = {
    북아메리카: { longitude: -101.0, latitude: 39.0 },
    남아메리카: { longitude: -58.0, latitude: -12.0 },
    유럽: { longitude: 9.542, latitude: 47.390 },
    동남아시아: { longitude: 105.2772, latitude: 12.5657 },
    동북아시아: { longitude: 125.978, latitude: 35.5665 },
  };

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    zoom: 3,
    latitude: regionCenters[region].latitude,
    longitude: regionCenters[region].longitude,
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const newMarkers = cityCoordinates.map((city) => (
      <Marker key={city.name} longitude={city.lon} latitude={city.lat}>
        <button
          onClick={() => onCitySelect(city)}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img src={markerImage} alt={city.name} style={{ width: '44px', height: '44px' }} />
        </button>
      </Marker>
    ));

    setMarkers(newMarkers);
  }, [cityCoordinates, onCitySelect]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jsy0202/clovimo8i008401r63lhb8ayi',
      center: [regionCenters[region].longitude, regionCenters[region].latitude],
      zoom: 3.5,
      scrollZoom: false,
      accessToken: 'pk.eyJ1IjoianN5MDIwMiIsImEiOiJjbG9tZWE0M3Mwa3djMm1zNm16N3R2aGx4In0.lMK1bAKtFwCfwfvsYyTSIw',
    });

    map.on('dblclick', (e) => {
      e.preventDefault();
    });

    map.on('move', () => {
      setViewport({
        ...viewport,
        latitude: map.getCenter().lat,
        longitude: map.getCenter().lng,
        zoom: map.getZoom(),
      });
    });

    return () => map.remove();
  }, [region]);

  return (
    <>
      <div id="map" style={{ width: '100vw', height: '100vh' }} />
      <ReactMapGL {...viewport}>{markers}</ReactMapGL>
    </>
  );
};

export default Map;