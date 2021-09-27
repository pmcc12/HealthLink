import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const UserContext = createContext();


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
    const [peerId, setPeerId] = useState('');
    
    //patient user specific info
    const [stripeId, setStripeId] = useState('');
    
    //doctor user specific info
    const [specialty, setSpecialty] = useState('');
    const [priceRemote, setPriceRemote] = useState(0);
    const [priceOnSite, setPriceOnSite] = useState(0);
    const [workYears, setWorkYears] = useState(0);

    //all doctors request
    const [doctors, setDoctors] = useState([])

    //appointment specific data
    const [appointmentDoctor, setAppointmentDoctor] = useState({});
    const [appointmentId, setAppointmentId] = useState('')
    const [remoteAppointment, setRemoteAppointment] = useState(true);
    const [dateAndTime, setDateAndTime] = useState('');
    const [location, setLocation] = useState({});
    const [priceMeeting, setPriceMeeting] = useState(0);
    const [roomId, setRoomId] = useState('')
       
    //context is created so that children components at any point can access to state and inner methods
    
    // useEffect(() => {
        
    // }, [])

    //when we want try a call, we need to have the callee id (id)

    const createUser = () => {
        if(isDoctor){
            fetch(`http://localhost:8080/doctor`,{
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
                    email: userEmail,
                    password: password,
                    specialty: specialty,
                    location: geolocation,
                    priceremote: priceRemote,
                    priceonsite: priceOnSite,
                    peerid: peerId
                })
            })
            .then(res => res.json())
            .then(data => setUser(data))
        }else {
            fetch(`http://localhost:8080/patient`,{
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
                    email: userEmail,
                    password: password,
                    specialty: specialty,
                    location: geolocation,
                    priceremote: priceRemote,
                    priceonsite: priceOnSite,
                    peerid: peerId
                })
            })
            .then(res => res.json())
            .then(data => setUser(data))
        }
    }

    const getAllDoctors = () => {
        fetch(`http://localhost:8080/doctors`)
        .then(res => {
            console.log(res.headers);
            res.json()})
        .then(data => setDoctors(data))
        .catch(err => console.log(err));
    }

    const Login = () => {
        fetch(`http://localhost:8080/login`,{
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => setUser(data))
    }

    const Logout = () => {
        fetch(`http://localhost:8080/logout`,{
            method: "POST",
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    const createAppointment = () => {
        fetch(`http://localhost:8080/doctor`,{
            method: "POST",
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                PatientId: userId,
                DoctorId: appointmentDoctor._id,
                remoteappointment: remoteAppointment,
                onsiteappointment: !remoteAppointment,
                date: dateAndTime,
                location: geolocation,
                price: priceMeeting,
                priceonsite: priceOnSite,
                roomid: roomId
            })
        })
        .then(res => res.json())
        .then(data => setUser(data))
    }

    return (
        <UserContext.Provider value={{userAuth,setUserAuth,user,setUser,userRegistered,setUserRegistered,isDoctor,setIsDoctor,userId,setUserId,userEmail,setUserEmail,setPassword,userName,setUserName,userAge,setUserAge,geolocation,setGeolocation,peerId,setPeerId,stripeId,setStripeId,specialty,setSpecialty,priceRemote,setPriceRemote,priceOnSite,setPriceOnSite,workYears,setWorkYears}}>
            {children}
        </UserContext.Provider>
    )

}

//Custom hook
export const useUser = () => {
    return useContext(UserContext);
}

// apiService.register = (user) => {
//     // REMOVE-START
//     return fetch(`${BASE_URL}/register`, {
//       method: 'POST',
//       credentials: 'include',
//       mode: 'cors',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user),
//     })
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
//     // REMOVE-END
//   };
  
//   apiService.login = (user) => {
//     // REMOVE-START
//     return fetch(`${BASE_URL}/login`, {
//       method: 'POST',
//       credentials: 'include',
//       mode: 'cors',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user),
//     })
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
//     // REMOVE-END
//   };
  
//   apiService.profile = () => {
//     // REMOVE-START
//     return fetch(`${BASE_URL}/me`, {
//       method: 'GET',
//       credentials: 'include',
//       mode: 'cors',
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
//     // REMOVE-END
//   };
  
//   apiService.logout = () => {
//     // REMOVE-START
//     return fetch(`${BASE_URL}/logout`, {
//       method: 'POST',
//       credentials: 'include',
//       mode: 'cors',
//       headers: { 'Content-Type': 'application/json' },
//     })
//       .then((res) => res.json())
//       .catch((err) => console.log(err));
//     // REMOVE-END
//   };