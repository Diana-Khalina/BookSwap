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

// Mock users with zipCode instead of lat/lon
const mockUsers = [
  { id: 1, name: "Anna", zipCode: "32708" }, // Florida ZIP
  { id: 2, name: "Oleh", zipCode: "33101" }, // Miami, FL
];

const BookSwapMap = ({ userZipCode }) => {
  const [error, setError] = useState(""); // Error state
  const [users, setUsers] = useState([]); // Nearby users with coordinates

  // Function to fetch coordinates for a given ZIP code
  const fetchCoordinates = async (zip) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${zip}&country=US&format=json`
      );
      const data = await response.json();
      if (data.length === 0) {
        setError("Coordinates not found. Please check the ZIP code.");
        return null;
      }
      const { lat, lon } = data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } catch (err) {
      console.error("Error fetching coordinates:", err);
      setError("Error fetching data.");
      return null;
    }
  };

  // Fetch cloud users from the API and geocode their ZIP codes
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch coordinates for the current user
        const userCoords = await fetchCoordinates(userZipCode);
        if (!userCoords) {
          return; // Skip if we can't fetch user's coordinates
        }

        // Fetch coordinates for all nearby users
        const usersWithCoords = await Promise.all(
          mockUsers.map(async (user) => {
            try {
              const coords = await fetchCoordinates(user.zipCode);
              return { ...user, latitude: coords.latitude, longitude: coords.longitude };
            } catch (err) {
              console.error(`Error fetching coordinates for user ${user.id}:`, err);
              return null; // Skip users with an error
            }
          })
        );
        // Filter out any users that failed to fetch coordinates
        setUsers(usersWithCoords.filter((u) => u !== null));
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Error fetching users data.");
      }
    };

    fetchUsers();
  }, [userZipCode]);

  return (
    <div className="container text-center mt-4">
      <h2 className="mb-3">Users Nearby</h2>
      {error && <p className="text-danger">{error}</p>}

      <MapContainer
        center={users.length > 0 ? [users[0].latitude, users[0].longitude] : [27.9944024, -81.7602544]} // Default to Florida if no users
        zoom={10}
        style={{ height: "500px", width: "100%", marginTop: "20px" }}
        className="border rounded shadow-sm"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* User markers */}
        {users.map((user) => (
          <Marker key={user.id} position={[user.latitude, user.longitude]} icon={customIcon}>
            <Popup>
              <div>
                <strong>{user.name}</strong> is looking for books!
                <br />
                {/* Link to the user's book swap page */}
                <a href={`/user/${user.zipCode}`}>See books for swap</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BookSwapMap;
