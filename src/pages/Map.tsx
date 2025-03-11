import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Polygon,
  Popup,
  useMap,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import Button from "../components/ui/button";
import { toast } from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";

const parseCoordinates = (coords: string): LatLngTuple[] => {
  if (!coords) return []; // Handle empty coordinates

  const parsed = coords
    .trim()
    .split(/\s+/) // Split by space
    .map((pair) => {
      const [lng, lat] = pair.split(",").map(Number); // Convert to numbers
      return lat !== undefined && lng !== undefined
        ? ([lat, lng] as LatLngTuple)
        : null;
    })
    .filter(Boolean) as LatLngTuple[]; // Remove any null values

  return parsed.length ? parsed : []; // Ensure we return an array
};

const calculateCenter = (mapData: any[]): LatLngTuple => {
  const allCoords = mapData.flatMap((item) =>
    parseCoordinates(item.coordinates)
  );
  if (allCoords.length === 0) return [0, 0]; // Default center if no coordinates

  const avgLat =
    allCoords.reduce((sum, coord) => sum + coord[0], 0) / allCoords.length;
  const avgLng =
    allCoords.reduce((sum, coord) => sum + coord[1], 0) / allCoords.length;
  return [avgLat, avgLng];
};

const Map = ({ mapData }: { mapData: any }) => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);

  useEffect(() => {
    if (!mapData || mapData.length === 0) {
      navigate("/");
    }
  }, [mapData, navigate]);

  const center = useMemo(() => calculateCenter(mapData), [mapData]);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          toast.success("Current location obtained successfully!");
        },
        (error) => {
          console.error("Error getting user location:", error);
          toast.error("Error getting user location.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const MapUpdater = ({ location }: { location: LatLngTuple | null }) => {
    const map = useMap();
    useEffect(() => {
      if (location) {
        map.setView(location, 15);
      }
    }, [location, map]);
    return null;
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-white flex items-center hover:underline">
          <FaArrowLeftLong className="mr-2" /> Back to upload section
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-xl py-6 px-10 shadow-lg border border-white/20 my-12">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Map View
        </h2>
        <Button
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleGetCurrentLocation}
        >
          Show My Location
        </Button>
        <div className="w-full h-[500px]">
          <MapContainer
            center={center}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {mapData.map((item, index) => {
              const coords = parseCoordinates(item.coordinates);

              if (coords.length === 1) {
                return (
                  <Marker key={index} position={coords[0]}>
                    <Popup>{item.name}</Popup>
                  </Marker>
                );
              } else if (coords.length > 1 && item.name.includes("Line")) {
                return (
                  <Polyline key={index} positions={coords} color="blue">
                    <Popup>{item.name}</Popup>
                  </Polyline>
                );
              } else if (coords.length > 1 && item.name.includes("Polygon")) {
                return (
                  <Polygon key={index} positions={coords} color="red">
                    <Popup>{item.name}</Popup>
                  </Polygon>
                );
              } else {
                return null;
              }
            })}

            {userLocation && (
              <>
                <Marker position={userLocation}>
                  <Popup>Your Location</Popup>
                </Marker>
                <MapUpdater location={userLocation} />
              </>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
