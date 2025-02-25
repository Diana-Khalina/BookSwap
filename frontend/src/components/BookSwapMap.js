import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
  { id: 1, name: "Anna", latitude: 27.9944024, longitude: -81.7602544 }, // Florida
  { id: 2, name: "Oleh", latitude: 25.7617, longitude: -80.1918 }, // Miami, FL
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
        `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=US&format=json`
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
    <div className="container text-center mt-4">
      <h2 className="mb-3">Users Nearby</h2>

      {error && <p className="text-danger">{error}</p>}

      <MapContainer
        center={location ? [location.latitude, location.longitude] : [27.9944024, -81.7602544]} // Default to Florida
        zoom={10}
        style={{ height: "500px", width: "100%", marginTop: "20px" }}
        className="border rounded shadow-sm"
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
