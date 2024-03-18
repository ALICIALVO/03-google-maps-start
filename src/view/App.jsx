import { useState } from "react";
import TopBar from "./TopBar";
import GoogleMap from "./GoogleMap";

export default function App() {
  const [latlng, setLatlng] = useState({
    lat: -34.397,
    lng: 150.644
  });
  const [zoom, setZoom] = useState(8);
  const [marker, setMarker] = useState(null);

  function reposition(city) {
    switch (city) {
      case "tel aviv":
        setLatlng({ lat: 32.0042938, lng: 34.7615399 });
        setMarker({ lat: 32.0042938, lng: 34.7615399 });
        break;
      case "london":
        setLatlng({ lat: 51.5074, lng: -0.1278 });
        setMarker({ lat: 51.5074, lng: -0.1278 });
        break;
      case "paris":
        setLatlng({ lat: 48.8566, lng: 2.3522 });
        setMarker({ lat: 48.8566, lng: 2.3522 });
        break;
      default:
        alert("Location not supported");
    }
  }

  function handleZoomChange(event) {
    const newZoom = Number(event.target.value);
    setZoom(newZoom);
  }

  return (
    <div className="app">
      <TopBar>Google Maps Example in React</TopBar>
      <div className="hbox mb20">
        <button onClick={() => reposition("tel aviv")}>Tel Aviv</button>
        <button onClick={() => reposition("london")}>London</button>
        <button onClick={() => reposition("paris")}>Paris</button>
        <input
          type="number"
          min="8"
          max="16"
          placeholder="Zoom Level"
          value={zoom}
          onChange={handleZoomChange}
        />
      </div>
      <GoogleMap lat={latlng.lat} lng={latlng.lng} zoom={zoom}  marker={marker}/>

    </div>
  );
}

