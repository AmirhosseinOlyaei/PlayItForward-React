import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
    width: '300px',
    height: '200px'
  };
  
  
  
  function ToyMap({ lat, lng }) {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    })
  
    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat, lng }}
          zoom={14}
          options={{ disableDefaultUI: true }}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
    ) : <></>
  }

  export default ToyMap;
 