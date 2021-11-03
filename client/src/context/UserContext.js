import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export const UserContext = createContext();


//context will be available to all children who can have rights of access to calling data

export const UserContextProvider = ({children}) => {
    
    //backend authorization to access homepage
    const [userAuth, setUserAuth] = useState(false);

    //General user information
    const [user, setUser] = useState({});
    const [userRegistered, setUserRegistered] = useState(true);
    const [isDoctor, setIsDoctor] = useState(false);
    const [userId, setUserId] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState(0);
    const [geolocation, setGeolocation] = useState({});
    const [userRadius, setUserRadius] = useState(2);
    const [peerId, setPeerId] = useState('');
    
    //patient user specific info
    const [stripeId, setStripeId] = useState('');
    //this will be the doctor which the user selects for the appointment
    
    //doctor user specific info
    const [specialty, setSpecialty] = useState('');
    const [priceRemote, setPriceRemote] = useState(0);
    const [priceOnSite, setPriceOnSite] = useState(0);
    const [workYears, setWorkYears] = useState(0);
    const [onSiteAvailability, setOnSiteAvailability] = useState(false);
    
    
    //appointment specific data
    const [appointmentsUser, setAppointmentsUser] = useState([]);
    const [remoteAppointment, setRemoteAppointment] = useState(true);
    const [dateAndTime, setDateAndTime] = useState('');
    const [location, setLocation] = useState({});
    const [priceMeeting, setPriceMeeting] = useState(0);
    const [appointmentId, setAppointmentId] = useState(null)
    
    //choosen doctor for meeting
    const [selectedDoctor, setSelectedDoctor] = useState({
        selected: false
    });    

 

    //http request status code
    const  reqStatus = useRef(0);

    const createUser = () => {

        console.log('inside user!');

        if(isDoctor){
            console.log('i am a doc!');
            return fetch(`${process.env.REACT_APP_HOST}/doctor`,{
                method: "POST",
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: userName,
                    age: userAge,
                    workyears: workYears,
                    onsiteavailability: onSiteAvailability,
                    email: userEmail,
                    password: password,
                    specialty: specialty,
                    location: geolocation,
                    priceremote: priceRemote,
                    priceonsite: priceOnSite,
                    peerid: peerId,
                    radius: userRadius
                })
            })
            .then(res => {
                reqStatus.current = res.status;
                return res.json()
            })
            .then(data => {
                console.log(data);
                if(reqStatus.current === 200){
                    setUser(data)
                    return true;
                } else {
                    return false
                }
            })
            .catch(err => {
                console.log(err);
                return false;
            })
        }else {
            console.log("i am a patient!");
            return fetch(`${process.env.REACT_APP_HOST}/patient`,{
                method: "POST",
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: userName,
                    age: userAge,
                    email: userEmail,
                    password: password,
                })
            })
            .then(res => {
                reqStatus.current = res.status;
                return res.json()
            })
            .then(data => {
                if(reqStatus.current === 200){
                    console.log(data);
                    setUser(data)
                    return true;
                } else {
                    return false
                }
            })
            .catch(err => {
                console.log(err);
                return false;
            })
        }
    }
    //very important to include the credentials: 'include' to grab the set-cookie from the response header and store it into the cookie store. 
    const Login = () => {
        return fetch(`${process.env.REACT_APP_HOST}/login`,{
            method: "POST",
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                password: password
            })
        })
        .then(res => {
            console.log('response status: ',res.status);
            reqStatus.current = res.status;
            return res.json();

        })
        .then(data => {
            console.log('mydata VALUE: ',data);
            console.log('my status VALUE:', reqStatus);
            console.log('is doctor?@usercontext:',data.isdoctor);
            setUser(data);
            setIsDoctor(data.isdoctor);
            setUserId(data.id)
            
            if(reqStatus.current === 200){
                console.log('user authorized from usercontext');
                return 200;
            } else if (reqStatus.current === 409) {
                console.log('not authorized due to unknown email',reqStatus)
                return 409;
            } else {
                console.log('wrong password. not authenticated');
                return 500;
            }
        })
        .catch(err => {
            console.log('error: ',err);
            return false;
        });
        console.log('i am here?');
    }

    const Logout = () => {
        return fetch(`${process.env.REACT_APP_HOST}/logout`,{
            method: "POST",
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    const createAppointment = (appointmentDateAndTime) => {
        console.log('lets fetch appointments');
        console.log(user);
        console.log('and selected doctor id');
        console.log(selectedDoctor.id);
        fetch(`${process.env.REACT_APP_HOST}/appointment`,{
            method: "POST",
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                patient_id: userId,
                doctor_id: selectedDoctor.id,
                remoteappointment: remoteAppointment,
                onsiteappointment: !remoteAppointment,
                date: appointmentDateAndTime,
                location: geolocation,
                price: remoteAppointment ? selectedDoctor.priceremote : selectedDoctor.priceonsite,
                priceonsite: selectedDoctor.priceonsite,
            })
        })
        .then(res => res.json())
    }
    
    const getDoctorAppointments = () => {
        
        return fetch(`${process.env.REACT_APP_HOST}/doctor/${userId}/appointments`,{
            method: "GET",
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })
    }
    
    const getPatientAppointments = () => {
        
        return fetch(`${process.env.REACT_APP_HOST}/patient/${userId}/appointments`,{
            method: "GET",
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        })
    } 

    return (
        <UserContext.Provider value={{userAuth,setUserAuth,user,setUser,userRegistered,setUserRegistered,isDoctor,setIsDoctor,userId,setUserId,userEmail,setUserEmail,setPassword,userName,setUserName,userAge,setUserAge,geolocation,setGeolocation,peerId,setPeerId,stripeId,setStripeId,specialty,setSpecialty,priceRemote,setPriceRemote,priceOnSite,setPriceOnSite,workYears,setWorkYears, createAppointment,Login,Logout,createUser,onSiteAvailability, setOnSiteAvailability, userRadius, setUserRadius, selectedDoctor, setSelectedDoctor,remoteAppointment,setRemoteAppointment,dateAndTime,setDateAndTime, getPatientAppointments, getDoctorAppointments, appointmentsUser, setAppointmentsUser, appointmentId, setAppointmentId}}>
            {children}
        </UserContext.Provider>
    )

}

//Custom hook
export const useUser = () => {
    return useContext(UserContext);
}
