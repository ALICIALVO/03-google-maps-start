import { useEffect, useRef } from "react";

const log = (...args) => console.log.apply(null, ["GoogleMap -->", ...args]);

export default function GoogleMap({ lat, lng, zoom, location }) {
  const map = useRef(null);
  const mapDiv = useRef(null);

  
    async function createMap() {
      if (!window.google || !window.google.maps) {
        console.error("Google Maps JavaScript API is not loaded.");
        return;
      }

      const { Map } = await window.google.maps.importLibrary("maps");

      const center = location ? { lat: location.lat, lng: location.lng } : { lat, lng };

      map.current = new Map(mapDiv.current, {
        center,
        zoom: 8,
      });

      if (navigator.geolocation && !location) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.current.setCenter(pos);
          },
          () => {
            handleLocationError(true, map.current.getCenter());
          }
        );
      } else if (!location) {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.current.getCenter());
      }
    }
    useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    if (!map.current) return;
    map.current.setCenter({ lat, lng });
  }, [lat, lng]);

  useEffect(() => {
    if (!map.current) return;
    map.current.setZoom(zoom);
  }, [zoom]);

  function handleLocationError(browserHasGeolocation, pos) {
    console.error(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    if (browserHasGeolocation && pos) {
      map.current.setCenter(pos);
    }
  }

  return <div ref={mapDiv} className="map-box" />;
}
