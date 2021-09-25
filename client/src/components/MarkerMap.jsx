import React, {useEffect} from 'react';
import L, {Icon} from 'leaflet'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [35,46]
})

const MarkerMap = () => {

    useEffect(() => {
        const L = require("leaflet");
    
        delete L.Icon.Default.prototype._getIconUrl;
    
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
      }, []);

    return(

        // <Map center={[37.02898610453314, -7.930217746614197]} zoom={12}>
            
        // </Map>
        <MapContainer center={[37.02898610453314, -7.930217746614197]} zoom={12}>
            <TileLayer 
            url={`https://api.mapbox.com/styles/v1/pmcc12/cktzglgtc1xfd17movtx8e3ok/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_APIKEY}`}
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMaps</a>"
            />
            <Marker key={1} position={[37.023, -7.9284]} icon={new Icon({iconUrl: require("leaflet/dist/images/marker-icon.png"),iconSize: [35,46]})}>
                <Popup>
                    <b>Hi!!</b>
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default MarkerMap;
