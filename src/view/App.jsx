import { useRef, useState } from "react";
import TopBar from "./TopBar";
import GoogleMap from "./GoogleMap";

// utility function
const log = (...args) => console.log.apply(null, ["App -->", ...args]);

export default function App() {
  const input = useRef(null);

  const [latlng, setLatlng] = useState({
    lat: -34.397,
    lng: 150.644
  });
  const [zoom, setZoom] = useState(8);
  const [location, setLocation] = useState(0);

  function reposition(event) {
    const { city } = event.target.dataset;
    switch (city) {
      case "tel aviv":
        setLatlng({ lat: 32.0042938, lng: 34.7615399 });
        break;
      case "london":
        setLatlng({ lat: 51.5285262, lng: -0.2664031 });
        break;
      case "paris":
        setLatlng({ lat: 48.8588255, lng: 2.264635 });
        break;
      default:
        alert("Location not supported");
    }
  }

  function zoomHandler() {
    setZoom(Number(input.current.value));
  }

  function locateMeHandler() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatlng({ lat: latitude, lng: longitude });
          setZoom(10); 
          setLocation(input.current.value);
        },
        (error) => {
          alert("Error fetching location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  log(latlng);
  return (
    <div className="app">
      <TopBar>Google Maps Example in React</TopBar>
      <div className="hbox mb20">
        <button data-city="tel aviv" onClick={reposition}>Tel Aviv</button>
        <button data-city="london" onClick={reposition}>London</button>
        <button data-city="paris" onClick={reposition}>Paris</button>
        <input
          ref={input}
          value={zoom}
          onChange={zoomHandler}
          type="number"
          min="8" max="16"
          placeholder="8"
        />
        <button className="custom-map-control-button" onClick={locateMeHandler}>LOCATE ME</button>
      </div>
      <GoogleMap lat={latlng.lat} lng={latlng.lng} zoom={zoom} location={location}/>
    </div>
  );
}
