import React, {useState,useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import mockup from '../data/mockup.json'
import useGeoLocation from '../hooks/useGeoLocation'
import InputSlider from './SliderItem';
import { useUser } from '../context/UserContext';

const MarkerMap = () => {
    
    const {geolocation, setGeolocation, userRadius, setUserRadius, doctorsGeoJSON,isDoctor,getAllDoctors} = useUser();

    console.log('userRadius = ',userRadius);

    // const [appointmentCircle, setAppointmentCircle] = useState();
    const appointmentCircle = useRef();
    const location = useGeoLocation();
    
    const mapRef = useRef();
    // const [userSelectedRadius, setUserSelectedRadius] = useState(2);
    // const [userLocation, setUserLocation] = useState({
    //     lat: location.coordinates.lat,
    //     lng: location.coordinates.lng
    // })

    //location object never change.. otherwise will be a problem, only userLocation change
    const userLocation = useRef({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng
        
    })
    
    
    console.log(location);
    
    //I will mount one of two possible setups: Doctor setup (only one draggable marker with customizable radius) or User setup (several non-draggable markers representing doctors locations and its range radius)
    useEffect(() => {
        console.log(geolocation);

    }, [geolocation])
    
    useEffect(() => {
        
        console.log('useeffect: ',location.coordinates.lat,' ' ,location.coordinates.lng);
        if(location.coordinates.lat === '' && location.coordinates.lng === ''){
            return;
        }
        console.log('is a doctor?',isDoctor);
        if(isDoctor){
            createDoctorMarker();
        } else {
            console.log('here in useffect again');
            createUserMap();
        }
        
    }, [location]);
    
    const registerLocation = (event) => {
        console.log('here!!!!!')
        // userDesiredLocation.current = {
            //     lat: event.target.getLatLng().lat,
            //     lng: event.target.getLatLng().lng
        // }
        console.log('rL: ',event.target.getLatLng());
        // setUserLocation({
        //     lat: event.target.getLatLng().lat,
        //     lng: event.target.getLatLng().lng
        // })
        userLocation.current = {
            lat: event.target.getLatLng().lat,
            lng: event.target.getLatLng().lng
        };

        setGeolocation({
            type: 'Point',
            coordinates: [event.target.getLatLng().lng,event.target.getLatLng().lat]
        });
        // console.log(userLocation);
        console.log(userLocation.current);
        console.log('my geolocation',geolocation)
        mobilizationRadiusChange(userRadius);
    }
    
    const mobilizationRadiusChange = (newRadius) => {
        console.log('inside mobilization');
        const {current = {}} = mapRef;
        const { leafletElement: map } = current;
        // appointmentCircle.removeFrom(map);
        appointmentCircle.current.removeFrom(map);

        let appointmentZoneCircle = L.circle([userLocation.current.lat,userLocation.current.lng], {
            radius: (newRadius*1000)
        });
        appointmentZoneCircle.addTo(map);
        // setAppointmentCircle(appointmentZoneCircle);
        appointmentCircle.current = appointmentZoneCircle;
        setUserRadius(newRadius);
        console.log('radius=',userRadius);
    }
    
    const createUserMap = () => {
        console.log(' i am a user! ');

        const {current = {}} = mapRef;
        // leafletElement let us interect with the map.. so i rename to map to be easier
        const { leafletElement: map } = current;

        if(!map){return;}

        const geoJson = new L.GeoJSON(doctorsGeoJSON, {
            onEachFeature: (feature = {}, layer) => {
                // destructuring with default values in it's empty
                const {properties = {}, geometry = {}} = feature;
                const {coordinates} = geometry;
                const {name, specialty, onsiteavailability, workyears, radius,age} = properties;
            
                let appointmentZoneCircle;
            
                if(onsiteavailability) {
                    appointmentZoneCircle = L.circle(coordinates.reverse(), {
                        radius: radius
                    });
                }
            
                const popup = L.popup();
                const popopHtmlBuilder = `
                    <div class="doctor-popup">
                        <h3>Dr.${name}</h3>
                        <ul>
                            <li>
                                <strong>Age</strong>: ${age} 
                            </li>
                            <li>
                                <strong>On site appointment?</strong> ${onsiteavailability ? 'Yes' : 'No'}
                            </li>
                            <li>
                                <strong>Specialty</strong>: ${specialty}
                            </li>
                            <li>
                                <strong>work year</strong>: ${workyears}
                            </li>
                        <ul>
                    </div>`;
            
                layer.on('mouseover',() => {
                    if(onsiteavailability){
                        appointmentZoneCircle.addTo(map)
                    }
                });
            
                layer.on('mouseout',() => {
                    if(onsiteavailability){
                        appointmentZoneCircle.removeFrom(map)
                    }
                })
            
                popup.setContent(popopHtmlBuilder);
                layer.bindPopup(popup);
            }
        });
        geoJson.addTo(map);

    }

    const createDoctorMarker = () => {
        console.log('i am a doctor!')
        const {current = {}} = mapRef;
        //leafletElement let us interect with the map.. so i rename to map to be easier
        const { leafletElement: map } = current;    
        
        // setGeolocation({
        //     type: 'Point',
        //     coordinates: [location.coordinates.lat,location.coordinates.lng]
        // })

        console.log(location.coordinates.lng + ' and ' +location.coordinates.lat)
        
        console.log('geo location: ',geolocation);

        const marker = L.marker([location.coordinates.lat,location.coordinates.lng], {
            draggable:true,
            title:"My root location"
        })

        // setUserLocation({
        //     lat: location.coordinates.lat,
        //     lng: location.coordinates.lng
        // })
        userLocation.current = {
            lat: location.coordinates.lat,
            lng: location.coordinates.lng
        }
      
        let appointmentZoneCircle = L.circle([location.coordinates.lat,location.coordinates.lng], {
            radius: (userRadius*1000)
        });
                    // appointmentZoneCircle.addTo(map);
                    
        appointmentZoneCircle.addTo(map);
        // setAppointmentCircle(appointmentZoneCircle);
        appointmentCircle.current = appointmentZoneCircle;
        
        
        marker.bindPopup('Doctor place');
        marker.addTo(map);
        marker.on("dragend",(event) => registerLocation(event));
    }
                
                return(
                    
                    // <Map center={[37.02898610453314, -7.930217746614197]} zoom={12}>
            
                    // </Map>
                    <>
        <Map ref={mapRef} center={[location.coordinates.lat, location.coordinates.lng]} zoom={12}>
            <TileLayer 
            url={`https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERID}/${process.env.REACT_APP_MAPBOX_STYLESID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_APIKEY}`}
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMaps</a>"
            />
            {/* <Marker position={[location.coordinates.lat, location.coordinates.lng]} draggable ondragend={(event) => registerLocation(event)}>
                <Popup>
                <b>{userSelectedRadius}</b>
                </Popup>
            </Marker> */}
        </Map>
        <InputSlider radiusChanger={mobilizationRadiusChange}/>
        </>
    );
}

export default MarkerMap;

