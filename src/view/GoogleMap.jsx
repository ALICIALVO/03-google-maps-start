import { useEffect, useRef } from "react";

const log = (...args) => console.log.apply(null, ["GoogleMap -->", ...args]);

export default function GoogleMap({ lat, lng, zoom, marker }) {
  const map = useRef(null);
  const mapDiv = useRef(null);
  const markerRef = useRef(null); 

  async function createMap() {
    const { Map, Marker } = await google.maps.importLibrary("maps");

    map.current = new Map(mapDiv.current, {
      center: { lat, lng },
      zoom: zoom,
    });

    // create marker if marker prop is provided:
    if (marker) {
      markerRef.current = new Marker({
        position: marker,
        map: map.current,
      });
    }
  }

  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    if (!map.current) return;
    log("useEffect >>>>");
    log("lat:", lat);
    log("lng:", lng);
    log("zoom:", zoom);
    log("mapDiv:", mapDiv);
    log("<<<< useEffect");
    map.current.setCenter({ lat, lng });
    map.current.setZoom(zoom);

    // update marker position if marker prop changes:
    if (markerRef.current && marker) {
      markerRef.current.setPosition(marker);
      // window.addEventListener()
    } else if (marker) {
      markerRef.current = new google.maps.Marker({
        position: marker,
        map: map.current,
      });
    }
  }, [lat, lng, zoom, marker]);

  return <div ref={mapDiv} className="map-box"/>;
}

