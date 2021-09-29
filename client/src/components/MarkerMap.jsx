import React, {useState,useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import {Map, TileLayer, Marker, Popup, Circle, Pane} from 'react-leaflet'
import mockup from '../data/mockup.json'
import useGeoLocation from '../hooks/useGeoLocation'
import InputSlider from './SliderItem';
import { useUser } from '../context/UserContext';
import OutlinedCard from './Card';
import { useContext } from 'react';
import {UserContext} from '../context/UserContext';
import { makeStyles } from '@material-ui/styles';
import { display } from '@mui/system';
import { Typography } from '@mui/material';

const getAllDoctors = () => {
    return fetch(`${process.env.REACT_APP_HOST}/doctors`)
   .then(res => {
       console.log('my headers',res.headers);
       return res.json()})
   .then(data => {
       console.log('my geojson: ',data);
       return data;
       // setDoctorsGeoJSON(data)}
   })
   .catch(err => console.log(err));
}

const MarkerMap = () => {
    
    const {geolocation, setGeolocation, userRadius, setUserRadius,isDoctor, setSelectedDoctor} = useUser();
    
    // const [readyToRenderDoctor, setReadyToRenderDoctor] = useState(false);
    // const [readyToRenderPatient, setReadyToRenderPatient] = useState(false);

    const [doctorsGeoJSON, setdoctorsGeoJSON] = useState({})
    const readyToRenderDoctor = useRef(false);
    const readyToRenderPatient = useRef(false);

    console.log('userRadius = ',userRadius);
    
    // const [appointmentCircle, setAppointmentCircle] = useState();
    const location = useGeoLocation();
     
        //location object never change.. otherwise will be a problem, only userLocation change
    const userLocation = useRef({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng
    });
        
    console.log('userLocation = ',userLocation);
    console.log('location: ',location.available, ' location coords:', location.coordinates)

        //I will mount one of two possible setups: Doctor setup (only one draggable marker with customizable radius) or User setup (several non-draggable markers representing doctors locations and its range radius)

    useEffect(() => {
        console.log('@useeffect location: ',location.available, ' location coords:', location.coordinates)
        console.log('inside useeffect!')
        console.log('useeffect: ',location.coordinates.lat,' ' ,location.coordinates.lng);
        if(location.coordinates.lat === '' && location.coordinates.lng === ''){
            return;
        } else {
            userLocation.current = {
                lat: location.coordinates.lat,
                lng: location.coordinates.lng
            };
            console.log('user location on use effect ',userLocation.current);
            getAllDoctors().then((data) => {
                readyToRenderDoctor.current=true;
                if(!data.type){
                    console.log('GEOJSON IS NULL!!')
                    return;
                } else {
                    console.log('DONE LETS GO!');
                    console.log(data);
                    readyToRenderPatient.current = true;
                    setdoctorsGeoJSON(data);
                }
            })
        }
    }, [location]);
                
    // useEffect(() => {
    // }, [doctorsGeoJSON]);

    const registerLocation = (event) => {
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
    }
                    
    const mobilizationRadiusChange = (newRadius) => {
        setUserRadius(newRadius);
    }

    const mouseOverHandler = () => {
        console.log('mouse over');
    }

    const mouseOutHandler = () => {
        console.log('mouse out')

    }

    const chooseDoctor = (user) => {
        setSelectedDoctor({
            selected: true,
            name: user.name,
            id: user.id,
            specialty: user.specialty,
            priceremote: user.priceremote,
            priceonsite: user.priceonsite,
            age: user.age
        })
    }

    const createAppointment = () => {

    }
              
    return(
 
    <>
        <Map  center={{lat: location.coordinates.lat, lng:location.coordinates.lng}} zoom={12}>
            <TileLayer 
            url={`https://api.mapbox.com/styles/v1/${process.env.REACT_APP_MAPBOX_USERID}/${process.env.REACT_APP_MAPBOX_STYLESID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_APIKEY}`}
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMaps</a>"
            />
            
            {console.log('my geo at marker:',doctorsGeoJSON)}
            {isDoctor ? (
                readyToRenderDoctor.current ? 
                <Marker position={[userLocation.current.lat,userLocation.current.lng]} draggable ondragend={(event) => registerLocation(event)}>
                    <Circle 
                    center={{lat:userLocation.current.lat, lng: userLocation.current.lng}}
                    fillColor="blue" 
                    radius={userRadius*1000}/>
                </Marker> : null
            ): (readyToRenderPatient.current ? doctorsGeoJSON.features.map((feature) => (
                
                <Marker key={feature.properties.id} position={feature.geometry.coordinates.reverse()} onmouseover={mouseOverHandler} onmouseout={mouseOutHandler}>
                    {console.log('my coordinates: ',feature.geometry.coordinates.reverse())}
                   <Circle
                    center={feature.geometry.coordinates.reverse()}
                    fillColor="blue"
                    fillOpacity="0"
                    weight="0" 
                    radius={1000*feature.properties.radius}/>
                    <Popup>
                        <OutlinedCard user={feature.properties} chooseDoctor={chooseDoctor}/>
                    </Popup>
                </Marker> 
            
            )) : null
            )}
        </Map>
        {isDoctor ? <InputSlider radiusChanger={mobilizationRadiusChange}/> : null}

    </>
    );
}

export default MarkerMap;

