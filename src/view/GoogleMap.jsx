import { useEffect, useRef } from "react";
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAPID_KEY;

const log = (...args) => console.log.apply(null, ["GoogleMap -->", ...args]);

export default function GoogleMap({ lat, lng, zoom, location, markerReady, markerTitle, markerType }) {
  const map = useRef(null);
  const mapDiv = useRef(null);

  
    async function createMap() {
      const { Map } = await window.google.maps.importLibrary("maps");


      const center = location ? { lat: location.lat, lng: location.lng } : { lat, lng };

      map.current = new Map(mapDiv.current, {
        center,
        zoom: 8,
        mapId: MAP_ID
      });

      if (!window.google || !window.google.maps) {
        console.error("Google Maps JavaScript API is not loaded.");
        return;
      }
      
      
      
      
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

    return () => {
      // Cleanup code here, if needed
    };
  }, [lat, lng]);

  useEffect(() => {
    if (!map.current) return;
    map.current.setZoom(zoom);
    return () => {
      // Cleanup code here, if needed
    };
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
  async function addMarker() {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const marker = new AdvancedMarkerElement({
      position: map.current.getCenter(),
      map: map.current,
      title: markerTitle
    });
    const { InfoWindow } = await google.maps.importLibrary("maps");
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
  useEffect(() => {
    if (!map.current || !markerReady) return;
    addMarker();

    return () => {
      // Cleanup code here, if needed
    };
  }, [markerReady]);

  return <div ref={mapDiv} className="map-box" />;
}
