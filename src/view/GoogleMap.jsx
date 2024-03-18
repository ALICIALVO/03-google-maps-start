import { useEffect, useRef } from "react";
const log = (...args) => console.log.apply(null, ["GoogleMap -->", ...args]);

export default function GoogleMap({ lat, lng, zoom }) {
  const map = useRef(null);
  const mapDiv = useRef(null);

  async function createMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map.current = new Map(mapDiv.current, {
      center: { lat, lng },
      zoom: zoom,
    });
  }
  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    if(!map.current) return;
    log("useEffect >>>>");
    log("lat:", lat);
    log("lng:", lng);
    log("zoom:", zoom);
    log("mapDiv:", mapDiv);
    log("<<<< useEffect");
    map.current.setCenter({ lat, lng });
    map.current.setZoom(zoom);
  }, [lat, lng, zoom]);




  return <div ref={mapDiv} className="map-box" />;
}


