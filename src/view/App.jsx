import { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import GoogleMap from "./GoogleMap";

// utility function
const log = (...args) => console.log.apply(null, ["App -->", ...args]);

export default function App() {

  const [latlng, setLatlng] = useState({
    lat: -34.397,
    lng: 150.644,
  });

  // state for rendering:
  const [zoom, setZoom] = useState(8);
  const [location, setLocation] = useState(0);
  const[markerReady, setMarkerReady]= useState(false);

  // ui:
  const zoomInput = useRef(null);
  const markerTitleInput = useRef(null);
  const markerTypeInput = useRef(null);

  // value ref attributes:
  const markerTitle = useRef("");
  const markerType = useRef("");

  
  
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
            setZoom(Number(zoomInput.current.value));
          }
          
          function locateMeHandler() {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  setLatlng({ lat: latitude, lng: longitude });
                  setZoom(16); 
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
            
            useEffect(()=> {
              if(markerReady === true) {
                setMarkerReady(false);
                markerTitleInput.current.value = ""
                markerTypeInput.current.value = "None"
              }
            },[markerReady])



            function updateField(event){
          const val = event.target.value;
          switch (event.target.name){
          case "markerTitle":
          markerTitle.current = val;
          break;
          case "markerType":
          markerType.current = val;
          break;
          default:
            log("Field not supported");
    }

  }

    function addMarker(){
      setMarkerReady(true);
    }


  return (
    <div className="app">
      <TopBar>Google Maps Example in React</TopBar>
      <div className="hbox mb20">
        <button data-city="tel aviv" onClick={reposition}>Tel Aviv</button>
        <button data-city="london" onClick={reposition}>London</button>
        <button data-city="paris" onClick={reposition}>Paris</button>
        <input
          ref={zoomInput}
          value={zoom}
          onChange={zoomHandler}
          type="number"
          min="8" max="16"
          placeholder="8"
        />
        <button className="custom-map-control-button" onClick={locateMeHandler}>LOCATE ME</button>
      </div>
      <div className="marker-div">
        <span>Marker name: &nbsp; </span>
        <input 
        ref={markerTitleInput}
        name="markerTitle"
        type="text" 
        className="marker-input"
        onChange={updateField}
        placeholder="Type your marker"
        />
        <select
         ref={markerTypeInput} 
         name="markerType"
          // className="" 
          onChange={updateField}>
          <option value="None">SELECT</option>
          <option value="Pub">Pub</option>
          <option value="Coffee Shop">Coffee Shop</option>
          <option value="Park">Park</option>
          <option value="Museum">Museum</option>
          <option value="Shopping Mall">Shopping Mall</option>
          <option value="Movie Theater">Movie Theater</option>
          <option value="Gym">Gym</option>
          <option value="Buffet">Buffet</option>
        </select>
        <button onClick={addMarker}>Add Your Marker</button>
      </div>


      <GoogleMap 
      lat={latlng.lat} 
      lng={latlng.lng} 
      zoom={zoom}
      location={location}
      markerTitle={markerTitle.current}
      markerType={markerType.current}
      markerReady={markerReady}
      />


    </div>
  );
}
