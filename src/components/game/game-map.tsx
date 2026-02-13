"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { Icon, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

// Custom pin cursor as data URI
const pinCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='32' viewBox='0 0 24 32'%3E%3Cpath fill='%23E84855' stroke='%23fff' stroke-width='2' d='M12 1C6 1 1 6 1 12c0 8 11 18 11 18s11-10 11-18c0-6-5-11-11-11z'/%3E%3Ccircle fill='%23fff' cx='12' cy='12' r='4'/%3E%3C/svg%3E") 12 32, crosshair`;

interface GameMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation: { lat: number; lng: number } | null;
  revealMode?: boolean;
  actualLocation?: { lat: number; lng: number };
  disabled?: boolean;
  resetKey?: number; // Used to reset map view between rounds
}


// Custom marker icons
const guessIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="24" height="32">
      <path fill="#E84855" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z"/>
      <circle fill="#fff" cx="12" cy="12" r="5"/>
    </svg>
  `),
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  popupAnchor: [0, -32],
});

const actualIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="24" height="32">
      <path fill="#22C55E" d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z"/>
      <circle fill="#fff" cx="12" cy="12" r="5"/>
    </svg>
  `),
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  popupAnchor: [0, -32],
});

// Map click handler component
function MapClickHandler({
  onLocationSelect,
  disabled,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
  disabled?: boolean;
}) {
  useMapEvents({
    click: (e) => {
      if (disabled) return;
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Auto-fit bounds component for reveal mode
function FitBounds({
  guessLocation,
  actualLocation,
}: {
  guessLocation: { lat: number; lng: number };
  actualLocation: { lat: number; lng: number };
}) {
  const map = useMap();

  useEffect(() => {
    const bounds = new LatLngBounds(
      [guessLocation.lat, guessLocation.lng],
      [actualLocation.lat, actualLocation.lng]
    );
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });
  }, [map, guessLocation, actualLocation]);

  return null;
}

// Reset map view between rounds
function MapReset({ resetKey }: { resetKey?: number }) {
  const map = useMap();

  useEffect(() => {
    if (resetKey !== undefined) {
      map.setView([20, 0], 3);
    }
  }, [map, resetKey]);

  return null;
}

export function GameMap({
  onLocationSelect,
  selectedLocation,
  revealMode = false,
  actualLocation,
  disabled = false,
  resetKey,
}: GameMapProps) {
  const defaultCenter: [number, number] = [20, 0];
  const defaultZoom = 3;

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", cursor: disabled ? "default" : pinCursor }}
      className="rounded-3xl overflow-hidden"
      minZoom={3}
      worldCopyJump={true}
      maxBounds={[[-85, -1000], [85, 1000]]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapReset resetKey={resetKey} />

      <MapClickHandler
        onLocationSelect={onLocationSelect}
        disabled={disabled || revealMode}
      />

      {/* User's guess marker */}
      {selectedLocation && (
        <Marker
          position={[selectedLocation.lat, selectedLocation.lng]}
          icon={guessIcon}
        />
      )}

      {/* Actual location marker (reveal mode) */}
      {revealMode && actualLocation && (
        <>
          <Marker
            position={[actualLocation.lat, actualLocation.lng]}
            icon={actualIcon}
          />

          {/* Polyline connecting guess to actual */}
          {selectedLocation && (
            <>
              <Polyline
                positions={[
                  [selectedLocation.lat, selectedLocation.lng],
                  [actualLocation.lat, actualLocation.lng],
                ]}
                color="#E84855"
                weight={3}
                dashArray="10, 10"
                opacity={0.8}
              />
              <FitBounds
                guessLocation={selectedLocation}
                actualLocation={actualLocation}
              />
            </>
          )}
        </>
      )}
    </MapContainer>
  );
}
