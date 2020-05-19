import React, { useState, useEffect } from 'react';
import './App.css';
import { ReactBingmaps } from 'react-bingmaps';

const App = () => {

  const BING_MAP_KEY = 'AjKN0COWeWD833rN9YLImjGFVNwCamryudiRwPbSk0F0fytfz--tIBggYuBJ3yVY';

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [markers, setMarkers] = useState([]);

  const [mapClickable, setMapClickable] = useState(false);

  useEffect(() => {
    console.log('Effect run');
  }, [])


  function AddPushPinOnClick(clickedLocation) {
    console.log(mapClickable, clickedLocation);
    // if (mapClickable) {
    setLatitude(clickedLocation.latitude.toFixed(3));
    setLongitude(clickedLocation.longitude.toFixed(3));
    // }
  }

  function AddCoords() {
    console.log("submit")
    if (latitude != '' && longitude != '') {
      setMarkers([...markers, { location: [latitude, longitude] }])
      console.log(markers);
    }
    else { console.log("no cords!") }
  }

  function ChangeMethod(methodNumber) {
    console.log("change method", methodNumber);
    setLatitude('');
    setLongitude('');

    if (methodNumber == 1) {
      console.log("set map clickable to false");
      setMapClickable(false);
    }
    else if (methodNumber == 2) {
      console.log("set map clickable to true");
      setMapClickable(true);
    }
    console.log(mapClickable);
  }


  return (
    <div className="App">
      {/* Title */}
      <h1>Aquant.io Polygon Map</h1>

      <div className="main-container">

        {/* Form & List */}
        <div style={{ flex: 1 }}>
          {/* Form */}
          <div className="cords-form">
            <p>Coordinates Form</p>
            <div style={{ textAlign: 'left', padding: 10 }}>
              <div>
                <input type="radio" name="methodRadio" defaultChecked={true} onChange={() => ChangeMethod(1)} />
                <label>Add by Cords</label>
              </div>

              <div>
                <input type="radio" name="methodRadio" onChange={() => ChangeMethod(2)} />
                <label>Add by Place</label>
              </div>
            </div>

            <div style={{ padding: 10 }}>
              <div>
                <input id="latitudeInput" type="text" defaultValue={latitude} />
              </div>

              <div>
                <input id="longitudeInput" type="text" defaultValue={longitude} />
              </div>
            </div>

            <input type="submit" value="Submit Coords" style={{ margin: 10 }} onClick={() => AddCoords()} />
          </div>
          {/* Marker List */}
          {markers && markers.length > 0 && <div className="location-list">
            Markers
            {markers.map((cord, i) => (
            <div key={i}>
              {cord.latitude} - {cord.longitude}
            </div>
          ))}
          </div>}
        </div>


        {/* MAP */}
        <div style={{ flex: 4 }}>
          <ReactBingmaps
            bingmapKey={BING_MAP_KEY}
            center={[32.0741, 34.7922]}
            zoom={13}

            getLocation={
              { addHandler: "click", callback: AddPushPinOnClick }
            }

            pushPins={markers}
          >
          </ReactBingmaps>
        </div>
        {/* END-MAP */}

      </div>
    </div>
  );
}

export default App;
