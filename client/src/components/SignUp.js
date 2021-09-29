import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useUser } from '../context/UserContext';
import { MenuItem } from '@mui/material';
import MarkerMap from './MarkerMap';
import {useHistory} from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  
  let history = useHistory();

  const specialtyList = [
    {value: "Allergy/Immunologist", label: "Allergy/Immunologist"},
    {value: 'Cardiologist', label: 'Cardiologist'},
    {value: 'Dermatologist', label: 'Dermatologist'},
    {value: 'Family Medicine', label: 'Family Medicine'},
    {value: 'Gynecologist', label: 'Gynecologist'},
    {value: 'Medical Internist', label: 'Medical Internist'},
    {value: 'Medical Geneticist', label: 'Medical Geneticist'},
    {value: 'Neurologist', label: 'Neurologist'},
    {value: 'Oncologist', label: 'Oncologist'},
    {value: 'Ophthalmologist', label: 'Ophthalmologist'},
    {value: 'Otorhinolaryngologist',label: 'Otorhinolaryngologist'},
    {value: 'Pathologist', label: 'Pathologist'},
    {value: 'Pediatrics', label: 'Pediatrics'},
    {value: 'Pneumologist', label: 'Pneumologist'},
    {value: 'Physiotherapist', label: 'Physiotherapist'},
    {value: 'Psychiatrist', label: 'Psychiatrist'},
    {value: 'Rheumatologist', label: 'Rheumatologist'},
    {value: 'Urologist', label: 'Urologist'},
  ];
  const {isDoctor, setIsDoctor,userName, setUserName, userEmail, setUserEmail, password, setPassword, specialty,setSpecialty,geolocation, setGeolocation,userAge, setUserAge, priceRemote, setPriceRemote,priceOnsite, setPriceOnSite, onSiteAvailability, setOnSiteAvailability, workYears,setWorkYears, createUser, setUserAuth} = useUser();

  const handleClick = () => {
    setIsDoctor(!isDoctor);
  }

  const handleOnSiteAvailabilityClick = () => {
    setOnSiteAvailability(!onSiteAvailability);
  }

  const handleMedicalSpecialty = (event) => {
    setSpecialty(event.target.value);
  }

  const handleUserPass = (event) => {
    setPassword(event.target.value);
  }

  const handleUserName = (event) => {
    setUserName(event.target.value);
  }

  const handleUserEmail = (event) => {
    setUserEmail(event.target.value);
  }

  const handleUserAge = (event) => {
    setUserAge(event.target.value);
  }

  const handleWorkYears = (event) => {
    setWorkYears(event.target.value);
  }

  const setDrPriceRemote = (event) => {
    setPriceRemote(event.target.value);
  }

  const setDrPriceOnSite = (event) => {
    setPriceOnSite(event.target.value);
  }

  const handleLogin = () => {
    history.push("/login");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let validUserCreation = await createUser();
    if(validUserCreation) {
      setUserAuth(true);
    }
    history.push("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <FormGroup>
            <FormControlLabel control={<Checkbox  checked={!isDoctor} onChange={handleClick}/>} label="I'm a Patient" />
            <FormControlLabel control={<Checkbox  checked={isDoctor} onChange={handleClick}/>} label="I'm a Doctor" />
          </FormGroup>
          {isDoctor ? (
            <>
              <Typography component="h1" variant="h5">
                {isDoctor ? 'Doctor' : 'Patient'} Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={userName}
                      onChange={handleUserName}
                      autoComplete="fname"
                      name="fullname"
                      required
                      fullWidth
                      id="fullname"
                      label="Full Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="number"
                      value={userAge}
                      onChange={handleUserAge}
                      inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
                      required
                      fullWidth
                      id="age"
                      label="Age"
                      name="age"
                      autoComplete="age"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={userEmail}
                      onChange={handleUserEmail}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={password}
                      onChange={handleUserPass}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-select-specialty"
                      required
                      fullWidth
                      select
                      label="Select Specialty"
                      value={specialty}
                      helperText="Please select you Specialty"
                      onChange={handleMedicalSpecialty}
                    >
                      {specialtyList.map((spec) => (
                        <MenuItem key={spec.value} value={spec.value}>
                        {spec.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
                      required
                      fullWidth
                      id="workyears"
                      label="Years of work"
                      name="workyears"
                      autoComplete="years"
                      onChange={handleWorkYears}
                      value={workYears}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      onChange={setDrPriceRemote}
                      value={priceRemote}
                      inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
                      required
                      fullWidth
                      id="chargeonline"
                      label="Charge Price On-line Appointment"
                      name="chargeonline"
                      autoComplete="charge"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MarkerMap />   
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox checked={onSiteAvailability} onClick={handleOnSiteAvailabilityClick} color="primary" />}
                      label="Available for on-site mobilizations"
                    />
                  </Grid>
                  {onSiteAvailability ? (
                    <>
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        onChange={setDrPriceOnSite}
                        value={priceOnsite}
                        inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
                        required
                        fullWidth
                        id="chargeonsite"
                        label="Charge Price On Site Appointment"
                        name="chargeonsite"
                        autoComplete="charge"
                      />
                    </Grid>  
                  </>
                  ) : null}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onclick={handleLogin} variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </>
          ) : (
            <>
              <Typography component="h1" variant="h5">
                {isDoctor ? 'Doctor' : 'Patient'} Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={userName}
                      onChange={handleUserName}
                      autoComplete="fname"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Full name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={userAge}
                      onChange={handleUserAge}
                      type="number"
                      inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
                      required
                      fullWidth
                      id="age"
                      label="age"
                      name="age"
                      autoComplete="age"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={userEmail}
                      onChange={handleUserEmail}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={password}
                      onChange={handleUserPass}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onClick={handleLogin} variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}