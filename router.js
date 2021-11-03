const {Router} = require('express');
const router = Router();
const controller = require('./controllers/contollers');
const authMiddleware = require('./middleware');

router.get('/',(req,res) => {
    res.status(200).send({text: 'all good'});
})

//DATABASE ROUTES

// get doctor appointments
router.get('/doctor/:id/appointments', authMiddleware ,controller.getDoctorAppointments);

// get patient appointments
router.get('/patient/:id/appointments', authMiddleware ,controller.getPatientAppointments)

// get a patient by id
router.get('/patient/:id', authMiddleware,controller.getPatient)

// update patient-user peerID
router.put('/patient/:id',authMiddleware,controller.updatePatientPeerID);

// get a doctor by id
router.get('/doctor/:id',authMiddleware,controller.getDoctor)

//update doctor-user peerID
router.put('/doctor/:id',authMiddleware,controller.updateDoctorPeerID);

//update appointment peerId
router.put('/appointment/:id',authMiddleware,controller.updateAppointmentPeer);

//delete appointment
router.delete('/appointment/:id', authMiddleware ,controller.deleteAppointment);

//get appointment
router.get('/appointment/:id',authMiddleware,controller.getAppointment);

router.post('/login', controller.login);

router.post('/logout',authMiddleware,controller.logout);

// get all doctors
router.get('/doctors',authMiddleware,controller.getAllDoctors)

// create a patient
router.post('/patient',authMiddleware,controller.addPatient)

// create a doctor
router.post('/doctor',authMiddleware,controller.addDoctor)

// create a appointment
router.post('/appointment',authMiddleware,controller.addAppointment)

// Signalling Server routes
router.post('/',authMiddleware,controller.callHandshake)

module.exports = router;