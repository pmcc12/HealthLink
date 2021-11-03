const db = require('./../models/model');
const bcrypt = require('bcrypt');
//get all doctors
exports.getAllDoctors = async (req,res) => {
    try {

        console.log('welcome to getAlldoctors');
        const allDoctors = await db.Doctors.findAll();

        //i need all doctors in a GeoJson Format
        let geoJsonDoctors = {
            type: "FeatureCollection",
            features: []
        }
        for(doctor of allDoctors){
            let feature = {type:"Feature",properties:{},geometry:{}};
            feature.properties = {
                id: doctor.id,
                name: doctor.name,
                email: doctor.email,
                age: doctor.age,
                specialty:doctor.specialty,
                onsiteavailability: doctor.onsiteavailability,
                priceremote: doctor.priceremote,
                priceonsite: doctor.priceonsite,
                peerid: doctor.peerid,
                radius: doctor.radius,
                workyears: doctor.workyears,
                isdoctor: doctor.isdoctor
            }
            feature.geometry = doctor.location; 
            geoJsonDoctors.features.push(feature);
        }

        res.status(200).send(geoJsonDoctors);

    } catch(err){
        res.status(500).send('Error!');
    }
}

exports.login = async (req,res) => {
    try{
        console.log('here!!')
        const {email, password} = req.body;
        console.log('email: ',email,' || pass: ',password);
        const userPatient = await db.Patients.findOne({where:{ email: email }});
        console.log(userPatient)
        const userDoctor = await db.Doctors.findOne({where:{ email: email }});
        console.log(userDoctor);
        if (userPatient){
            const passValidation = await bcrypt.compare(password,userPatient.password);
            if(!passValidation){
                console.log('shit, bad pass');
                throw new Error();
            }
            //uid is the name we give to one of the properties of the session object. This property will have the session id
            req.session.uid = userPatient.id;
            console.log(req.session);
            res.status(200).send(userPatient);
        }else if(userDoctor){
            const passValidation = await bcrypt.compare(password,userDoctor.password);
            if(!passValidation){
                console.log('shit, bad pass');
                throw new Error();
            }
            req.session.uid = userDoctor.id;
            //cookie will be attached to the response object
            res.status(200).send(userDoctor);
        }else {
            res.status(409).send({message: 'User does not exists!'});
        }
          
    } catch (err) {
        res.status(500).send(null)
    }
}

exports.logout = (req,res) => {

    req.session.destroy((error) => {
        if (error) {
          res
            .status(500)
            .send({ error, message: 'Could not log out, please try again' });
        } else {
          res.clearCookie('sid');
          res.sendStatus(200);
        }
    });
}

//get patient by id
exports.getPatient = async (req,res) => {
    try {
        console.log('welcome to getPatient');
        const patient = await db.Patients.findAll({
            where: { id: req.params.id }
        });
        
        res.status(200).send(patient);
    } catch(err) {
        res.status(500).send(err);
    }
}

//get doctor by id
exports.getDoctor = async (req,res) => {
    try {
        console.log('welcome to getDoctor: ',req.params.id);
        const doctor = await db.Doctors.findAll({
            where: { id: req.params.id }
        });
        
        res.status(200).send(doctor);
    } catch(err) {
        console.log("error!")
        res.status(500).send(err);
    }
}

//create a patient
exports.addPatient = async (req,res) => {
    try {
        console.log('welcome to addPatient');
        let {name,age,email,username,password,stripeid,location,peerid} = req.body;
        console.log(name,' ',age,' ',email,' ',password);
        let patientExist = false;
        const existingPatients = await db.Patients.findAll();
        for(patient of existingPatients){
            if(patient.email === email){
                console.log('patient exists')
                patientExist = true;
                break;
            }
        }
        if(patientExist){
            //if user already exist, we will respond to the request with a null answer
            res.status(409).send({message: 'User already exists!'});
        } else {
            //10 stands for number of times the password will be encrypted. More encryption times = more secure, but also more slower too.
            const hashPass = await bcrypt.hash(password,10);
            console.log(hashPass);
            const patient = await db.Patients.create({name,age,email,password:hashPass});
            console.log(patient);
            req.session.uid = patient._id;
            res.status(200).send(patient);
        }

    } catch(err){
        res.status(500).send(err)
    }
}

//create a doctor
exports.addDoctor = async (req,res) => {
    try {
        console.log('welcome to addDoctor');
        let {name,age,workyears,email,username,password,specialty,location,priceremote,priceonsite,peerid, onsiteavailability,radius} = req.body;

        console.log(location.type);
        let doctorExists = false;
        const existingDoctors = await db.Doctors.findAll();
        for(doctor of existingDoctors){
            if(doctor.email === email){

                doctorExists = true;
                break;
            }
        }
        if(doctorExists){
            //if user already exist, we will respond to the request with a null answer
            console.log('doctor exists');
            res.status(409).send({message: 'User already exists!'});
        } else {
            const hashPass = await bcrypt.hash(password,10);
            const doctor = await db.Doctors.create({name: name,age: age,workyears: workyears,email: email,username: username,password: hashPass,specialty: specialty,location: location, priceonsite: priceonsite,priceremote: priceremote,peerid: peerid, onsiteavailability: onsiteavailability, radius:radius});
            req.session.uid = doctor._id;
            res.status(200).send(doctor);
        }

    } catch(err){
        console.log('error!')
        res.status(500).send(err)
    }
}
    // create a appointment
exports.addAppointment = async (req, res) => {
        
    try {
        console.log('here in addappointment');
        const {remoteappointment,onsiteappointment,date,roomid,price, doctor_id, patient_id} = req.body;
        // const {remoteappointment,onsiteappointment,date,roomid,price, DoctorId, PatientId} = req.body;
        
        console.log(remoteappointment,' e ',onsiteappointment,' e ',date,' e ',roomid,' e ',price);

        const appointement = await db.Appointments.create({remoteappointment: remoteappointment,onsiteappointment: onsiteappointment,date: date,roomid: roomid,price: price, DoctorId: doctor_id, PatientId: patient_id});
        // const appointement = await db.Appointments.create({remoteappointment: remoteappointment,onsiteappointment: onsiteappointment,date: date,roomid: roomid,price: price, DoctorId: doctorId, PatientId: patientId});

        res.status(200).send(appointement);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

exports.deleteAppointment = async (req,res) => {
    try {
        console.log('here in delete')
        const fb = await db.Appointments.destroy(
            {where: { id: req.params.id }
        })
        if(fb === 1) res.status(200).send({status: true});
        else res.status(200).send({status: false})
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getAppointment = async (req,res) => {
    try {
        console.log('here in delete')
        const appointment = await db.Appointments.findOne(
            {where: { id: req.params.id }
        });
        res.status(200).send(appointment);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.updateAppointmentPeer = async (req,res) => {
    try{

        console.log('Update Appointment id!')
        const {peerIdDoctor, peerIdPatient} = req.body;
        console.log('peerIdDoctor: ',peerIdDoctor);
        console.log('peerIdPatient: ',peerIdPatient);
        console.log(typeof peerIdPatient);
        let appointmentObj = {};
        if(peerIdDoctor){
            console.log('is a doctor!')
            appointmentObj = await db.Appointments.update({peeriddoctor: peerIdDoctor},{
                where: { id: req.params.id }
            });
        }
        if(peerIdPatient){
            console.log('is a patient!')
            appointmentObj = await db.Appointments.update({peeridpatient: peerIdPatient},{
                where: { id: req.params.id }
            });
        }
        console.log(appointmentObj);
        res.status(200).send(appointmentObj);
    } catch (err) {
        res.status(500).send(err);
    }

}

exports.getDoctorAppointments = async (req,res) => {
    try {
        console.log('welcome to getDoctor: ',req.params.id);
        //attributes = SELECT
        const doctorAppointments = await db.Appointments.findAll({ 
            attributes: ['id','date','roomid','onsiteappointment','remoteappointment','peeridpatient'],
            include: [{
                model: db.Patients,
                required: true
            }],
            where: { DoctorId: req.params.id }
        });
    
        res.status(200).send(doctorAppointments)
    } catch (err) {
        console.log('error! : ',err);
        res.status(500).send(err);
    }
}

exports.updateDoctorPeerID = async (req,res) => {
    try{

        const {peerid} = req.body;
        console.log('my doctor id: ',req.params.id);
        const doctor = await db.Doctors.update({peerid: peerid},{
            where: { id: req.params.id }
        });
        console.log('my doctor follows');
        console.log(doctor);
        res.status(200);

    } catch (err) {
        console.log('error! : ',err);
        res.status(500).send(err);
    }
}

exports.getPatientAppointments = async (req,res) => {
    try {
        console.log('welcome to getDoctor: ',req.params.id);
        //attributes = SELECT
        const patientAppointments = await db.Appointments.findAll({ 
            attributes: ['id','date','DoctorId','price','onsiteappointment','remoteappointment','peeriddoctor'],
            include: [{
                model: db.Doctors,
                required: true
            }],
            where: { PatientId: req.params.id }
        });
    
        res.status(200).send(patientAppointments)
    } catch (err) {
        console.log('error! : ',err);
        res.status(500).send(err);
    }
}

exports.updatePatientPeerID = async (req, res) => {

        const {peerid} = req.body;
        console.log('my patient id: ',req.params.id);
        console.log('my peer id: ', peerid);
        const patient = await db.Patients.update({peerid: peerid},{
            where: { id: req.params.id }
        });
        console.log('my patient follows');
        console.log(patient);
        res.status(200);
}

// start call - signalling events
// my signalling server event listeners 
exports.callHandshake = (req,res) => {
    const io = require('socket.io')(req.server,{
        cors : {
            origin: "*", //we might need to change, when front end is deployed in netlify
            methods: ["GET","POST"]
        }
    });

    console.log('here in callhandshake!')

    io.on('connection', (socket) => {
        socket.emit('ownuser', socket.id); //as soon client makes a request to connect with the server, a socket is created, and here we handover this client socket.id with the emit() function
        
        console.log('connection established in controller');

        socket.on('disconnect',() => {
            console.log('disconnected');
            socket.broadcast.emit("callended"); //all users will be notified that the call has been terminated
        });

        socket.on('call',({destinationUser,signallingData,senderUser,senderName}) => {
            console.log('going to call');
            io.to(destinationUser).emit("calluser",{signal: signallingData, senderUser,senderName});
        });

        socket.on('answer', (data) => {
            console.log('going to answer');
            io.to(data.callerId).emit("callaccepted", data.signaldata);
        });
    })
}

