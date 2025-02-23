import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default marker icon issue in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Define custom marker icon
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const mockUsers = [
  { id: 1, name: "Anna", latitude: 50.4501, longitude: 30.5234 },
  { id: 2, name: "Oleh", latitude: 50.4547, longitude: 30.5166 },
];

const BookSwapMap = ({ userZipCode }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userZipCode) {
      fetchCoordinates(userZipCode);
    }
  }, [userZipCode]);

  const fetchCoordinates = async (zip) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=UA&format=json`
      );
      const data = await response.json();

      if (data.length === 0) {
        setError("Coordinates not found. Please check the ZIP code.");
        return;
      }

      const { lat, lon } = data[0];
      setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
    } catch (error) {
      setError("Error fetching data.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Users Nearby</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <MapContainer
        center={location ? [location.latitude, location.longitude] : [50.4501, 30.5234]}
        zoom={10}
        style={{ height: "500px", width: "100%", marginTop: "20px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* User location marker */}
        {location && (
          <Marker position={[location.latitude, location.longitude]} icon={customIcon}>
            <Popup>You are here!</Popup>
          </Marker>
        )}

        {/* Nearby users markers */}
        {mockUsers.map((user) => (
          <Marker key={user.id} position={[user.latitude, user.longitude]} icon={customIcon}>
            <Popup>{user.name} is looking for books!</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BookSwapMap;
