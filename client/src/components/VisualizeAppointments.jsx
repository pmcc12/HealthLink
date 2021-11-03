import React from "react";
import {useEffect, useState, useRef} from 'react'
import { Button, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from "../context/UserContext";
import ButtonAppBar from "./ButtonAppBar";
import { Box } from "@mui/system";
import MiddleDividers from "./AppointCard";
import ForbiddenModal from "./ForbiddenModal"


const AppointmentsVisualizer = () => {
    
    const {getDoctorAppointments, getPatientAppointments,isDoctor} = useUser();
    const [dataFetched, setDataFetched] = useState(false);
    const [auth, setAuth] = useState(true);
    const appointments = useRef([]);

    useEffect(() => {
        //locks the fetching in future re-renders, if data was already fetched
        if(!dataFetched){
          console.log('data fetched? ',dataFetched?'true':'false');
          if(isDoctor){
            getDoctorAppointments()
            .then(res => {
              console.log(res);
              //check if Doctor is authorized by the backend
              if(res.status === 403){
                console.log('not allowed')
                setAuth(false)
              }
              return res.json()})
            .then((data) => {
              console.log('you are in doctor appointments')
              console.log(data)
              appointments.current = data
              setDataFetched(true);
            });
          } else {
            getPatientAppointments()
            .then(res => {
              console.log(res);
              //check if Patient is authorized by the backend
              if(res.status === 403){
                console.log('not allowed')
                setAuth(false)
              }
              return res.json()})
            .then((data) => {
              console.log('you are at promise resolving of getpatientappointment');
              console.log(data);
              appointments.current = data;
              setDataFetched(true);
            });
          }
        }
    }, []);

    return (
      <div>
        <ButtonAppBar />

      { !auth ? (<ForbiddenModal />) : (

        dataFetched ?
        (
          isDoctor ? 
          (
              <>
                <Container component="main" maxWidth="xs">
                  <Box
                  sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                  }}
                  >
                      {
                          appointments.current.map((appointment) => {
                            return (
                              <Box 
                              sx={{
                                borderColor: '#1976d2',
                                borderStyle: 'solid',
                                borderRadius: '10px',
                                marginBottom: '10px'
                              }}
                              >
                              <MiddleDividers isDoctor={isDoctor} appointment={appointment} />
                              </Box> 
                            )
                          })
                        
                      }
                      
                  </Box>
              </Container>
              </>
          ) 
          : 
          (
              <>
                
                <Container component="main" maxWidth="xs">
                  <Box
                  sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                  }}
                  >
                      {
                          appointments.current.map((appointment) => {
                            return (
                              <Box 
                              sx={{
                                borderColor: '#1976d2',
                                borderStyle: 'solid',
                                borderRadius: '10px',
                                marginBottom: '10px'
                              }}
                              >
                              <MiddleDividers isDoctor={isDoctor} appointment={appointment} />
                              </Box> 
                            )
                          })
                        
                      }
                      
                  </Box>
              </Container>
            </>
          )
        ) 
        : 
        (null)
      )
      }
      </div>
    )
}

export default AppointmentsVisualizer;