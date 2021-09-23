const db = require('./../models/model');

//get all doctors
exports.getAllDoctors = async (req,res) => {
    try {

        console.log('welcome to getAlldoctors');
        const allDoctors = await db.Doctors.findAll();

        let clientPackage = [];

        console.log('check all doctors: ',allDoctors);

        res.status(200).send(clientPackage);

    } catch(err){
        res.status(500).send('Error!');
    }
}

//get patient by id
exports.getPatient = async (req,res) => {
    try {
        console.log('welcome to getPatient');
        const patient = await db.findAll({
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
        console.log('welcome to getDoctor');
        const doctor = await db.findAll({
            where: { id: req.params.id }
        });
        
        res.status(200).send(doctor);
    } catch(err) {
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
        let {name,age,workyears,email,username,password,speciality,location,priceremote,priceonsite,peerid} = req.body;

        console.log(location);
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
            res.status(200).send()
        } else {
            console.log('will add!')
            const doctor = await db.Patients.create({name: name,age: age,workyears: workyears,email: email,username: username,password: password,speciality: speciality,location: location,priceonsite: priceonsite,priceremote: priceremote,peerid: peerid})
            res.status(200).send(doctor);
        }

    } catch(err){
        res.status(500).send(err)
    }
}

