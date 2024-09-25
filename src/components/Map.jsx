/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from './Button';
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {isLoading, position: geoLocationPosition, getPosition} = useGeolocation();

  const {lat, lng} = useUrlPosition();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);

    return;
  }, [lat, lng])

  useEffect(() => {
    if (geoLocationPosition && geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);

    return;
  }, [geoLocationPosition])

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && <Button type="primary" onClick={getPosition}>{isLoading ? 'Loading...' : 'Use Your Position'}</Button>}
      <MapContainer
        center={mapPosition}
        className={styles.map}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeMapCenter position={mapPosition}/>
        <DetectClick/>
      </MapContainer>
    </div>
  );
}

function ChangeMapCenter ({position}) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick () {
  const navigate = useNavigate();

  useMapEvents({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}
