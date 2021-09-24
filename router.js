const {Router} = require('express');
const router = Router();
const controller = require('./controllers/contollers');

router.get('/',(req,res) => {
    res.status(200).send({text: 'all good'});
})

//DATABASE ROUTES

// get doctor appointments
router.get('/doctor/:id/appointments', controller.getDoctorAppointments);

// get a patient by id
router.get('/patient/:id', controller.getPatient)

// get a doctor by id
router.get('/doctor/:id', controller.getDoctor)

// get all doctors
router.get('/doctors', controller.getAllDoctors)

// create a patient
router.post('/patient', controller.addPatient)

// create a doctor
router.post('/doctor', controller.addDoctor)

// create a appointment
router.post('/appointment', controller.addAppointment)

// Signalling Server routes
router.post('/', controller.callHandshake)

// payments



module.exports = router;