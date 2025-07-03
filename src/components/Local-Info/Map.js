import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import locations from '../../data/Location.json';
import markerImage from './marker.png';
import './Map.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ region, onCitySelect }) => {
  const cityCoordinates = locations.map((loc) => ({
    id: loc.id,
    name: loc.name,
    lon: loc.lon,
    lat: loc.lat,
    currencyCode: loc.currencyCode,
    image: loc.image,
  }));

  const regionCenters = {
    북아메리카: { longitude: -97.0, latitude: 39.0 },
    남아메리카: { longitude: -58.0, latitude: -12.0 },
    유럽: { longitude: 9.542, latitude: 47.390 },
    동남아시아: { longitude: 110.2772, latitude: 9.5657 },
    동북아시아: { longitude: 128.978, latitude: 37.5665 },
  };

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    zoom: 3,
    latitude: regionCenters[region].latitude,
    longitude: regionCenters[region].longitude,
  });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jsy0202/clovhrnkw008301r60m04awwo',
      center: [regionCenters[region].longitude, regionCenters[region].latitude],
      zoom: 3.5,
      scrollZoom: false,
      accessToken: 'pk.eyJ1IjoianN5MDIwMiIsImEiOiJjbG9tZWE0M3Mwa3djMm1zNm16N3R2aGx4In0.lMK1bAKtFwCfwfvsYyTSIw',
      attributionControl: false,
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

    cityCoordinates.forEach((city) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(${markerImage})`;
      el.style.width = '44px';
      el.style.height = '44px';
      el.style.backgroundSize = 'cover';

      const marker = new mapboxgl.Marker(el)
        .setLngLat([city.lon, city.lat])
        .addTo(map);

      el.addEventListener('click', () => onCitySelect(city));

      el.style.top = '-16px';
    });

    return () => map.remove();
  }, [region]);

  return (
    <div id="map" className="map-container">
      <ReactMapGL {...viewport} />
    </div>
  );
};

export default Map;