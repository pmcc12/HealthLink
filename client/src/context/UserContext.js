import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import logIn from '../services/login.service.ts';
import logOut from '../services/logout.service.ts'
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
    const [appointmentDoctor, setAppointmentDoctor] = useState({});
    const [appointmentId, setAppointmentId] = useState('')
    const [remoteAppointment, setRemoteAppointment] = useState(true);
    const [dateAndTime, setDateAndTime] = useState('');
    const [location, setLocation] = useState({});
    const [priceMeeting, setPriceMeeting] = useState(0);
    const [roomId, setRoomId] = useState('')


    //choosen doctor for meeting
    const [selectedDoctor, setSelectedDoctor] = useState({
        selected: false
    });



    //http request status code
    const  reqStatus = useRef(0);

    //context is created so that children components at any point can access to state and inner methods

    // useEffect(() => {

    // }, [])

    //when we want try a call, we neede to have the callee id (id)

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

    async function handleLogIn(email,password,redirect){
        try{
           const user = await logIn(email,password)
           if(user){
               setUser(user);
               setIsDoctor(user.isdoctor);
               setUserAuth(true);
                redirect()
            }
        }catch(err){
            console.log('error: ',err);
        };
    }

    async function handleLogOut(){
      try{
        await logOut()
        setUserAuth(false);
        setUser({})
      }catch(err) {
        console.log(err)
      }
    }

    const createAppointment = (appointmentDateAndTime) => {
        console.log('lets fetch appointments')
        fetch(`${process.env.REACT_APP_HOST}/appointment`,{
            method: "POST",
            credentials: 'include',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                PatientId: userId,
                DoctorId: selectedDoctor.id,
                remoteappointment: remoteAppointment,
                onsiteappointment: !remoteAppointment,
                date: appointmentDateAndTime,
                location: geolocation,
                price: remoteAppointment ? selectedDoctor.priceremote : selectedDoctor.priceonsite,
                priceonsite: selectedDoctor.priceonsite,
            })
        })
        .then(res => res.json())
        .then(data => setUser(data))
    }

    return (
        <UserContext.Provider value={{
            userAuth,
            setUserAuth,
            user,
            setUser,
            userRegistered,
            setUserRegistered,
            isDoctor,
            setIsDoctor,
            userId,
            setUserId,
            userEmail,
            setUserEmail,
            setPassword,
            userName,
            setUserName,
            userAge,
            setUserAge,
            geolocation,
            setGeolocation,
            peerId,
            setPeerId,
            stripeId,
            setStripeId,
            specialty,
            setSpecialty,
            priceRemote,
            setPriceRemote,
            priceOnSite,
            setPriceOnSite,
            workYears,
            setWorkYears,
            createAppointment,
            handleLogIn,
            handleLogOut,
            createUser,
            onSiteAvailability,
            setOnSiteAvailability,
            userRadius,
            setUserRadius,
            selectedDoctor,
            setSelectedDoctor,
            remoteAppointment,
            setRemoteAppointment,
            dateAndTime,
            setDateAndTime}}>
            {children}
        </UserContext.Provider>
    )

}

//Custom hook
export const useUser = () => {
    return useContext(UserContext);
}
