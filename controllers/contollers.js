const db = require('./../models/model');

//get all doctors
exports.getAllDoctors = async (req,res) => {
    try {

        console.log('welcome to getAlldoctors');
        const allDoctors = await db.Doctors.findAll();

        res.status(200).send(allDoctors);

    } catch(err){
        res.status(500).send('Error!');
    }
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
        let patientExist = false;
        const existingPatients = await db.Patients.findAll();
        for(patient of existingPatients){
            if(patient.username === username){
                patientExist = true;
                break;
            }
        }
        if(patientExist){
            //if user already exist, we will respond to the request with a null answer
            res.status(200).send()
        } else {
            const patient = await db.Patients.create({name,age,email,username,password,stripeid,location,peerid})
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
        let {name,age,workyears,email,username,password,specialty,location,priceremote,priceonsite,peerid} = req.body;

        console.log(location.type);
        let doctorExists = false;
        const existingDoctors = await db.Doctors.findAll();
        for(doctor of existingDoctors){
            if(doctor.username === username){

                doctorExists = true;
                break;
            }
        }
        if(doctorExists){
            //if user already exist, we will respond to the request with a null answer
            console.log('doctor exists');
            res.status(200).send(null);
        } else {
            const doctor = await db.Doctors.create({name: name,age: age,workyears: workyears,email: email,username: username,password: password,specialty: specialty,location: location, priceonsite: priceonsite,priceremote: priceremote,peerid: peerid});
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
        console.log('error');
        res.status(500).send(err);
    }
}

exports.getDoctorAppointments = async (req,res) => {
    try {
        console.log('welcome to getDoctor: ',req.params.id);
        //attributes = SELECT
        const doctorAppointments = await db.Appointments.findAll({ 
            attributes: ['date','roomid'],
            include: [{
                model: db.Doctors,
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
        
        console.log('connection established');

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

