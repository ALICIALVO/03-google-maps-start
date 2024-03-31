import { useEffect, useRef } from "react";

const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAPID_KEY;

export default function GoogleMap({ lat, lng, zoom, markerReady, markerTitle, markerType }) {
  const map = useRef(null);
  const mapDiv = useRef(null);

  async function createMap() {
    const { Map } = await window.google.maps.importLibrary("maps");

    const center = { lat, lng };

    map.current = new Map(mapDiv.current, {
      center,
      zoom: 8,
      mapId: MAP_ID
    });

    if (!window.google || !window.google.maps) {
      console.error("Google Maps JavaScript API is not loaded.");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.current.setCenter(pos);
          addMarker(pos);
        },
        () => {
          handleLocationError(true);
        }
      );
    } else {
      handleLocationError(false);
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

  async function addMarker(position) {
    const { Marker } = await window.google.maps.importLibrary("marker");
    const marker = new Marker({
      position,
      map: map.current,
      title: markerTitle
    });
    const { InfoWindow } = await window.google.maps.importLibrary("maps");
    const infoWindow = new InfoWindow({
      content: `
        <div style="text-align:center">
            <h2>${markerTitle}</h2>
            <h3>Type: ${markerType}</h3>
            <br/>
            <img src="https://picsum.photos/200/100?random"/>
            <br/>
            <br/>
            <p>Nestled in the heart of Paris, <br/>
            amidst the charming cobblestone streets and elegant boulevards.<br/> 
            sweet allure of macarons in every hue of the rainbow <br/>
            lies a quaint patisserie that captivates<br/>
             </p>
            <br/>
        </div>`,
    });
    marker.addListener("click", function () {
      infoWindow.open(map.current, marker);
    });
  }

  function handleLocationError(browserHasGeolocation) {
    console.error(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
  }

  return <div ref={mapDiv} className="map-box" />;
}
