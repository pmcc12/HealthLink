import {MapContainer, TileLayer} from 'react-leaflet'
export const myMap = () => {

return(
    // <Map center={[37.02898610453314, -7.930217746614197]} zoom={12}>
        
    // </Map>
    <MapContainer center={[37.02898610453314, -7.930217746614197]} zoom={12}>
        <TileLayer/>
    </MapContainer>
);
}
