module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointments',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        remoteappointment: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        onsiteappointment: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull:true
        },
        roomid: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        location: {
            type: DataTypes.GEOMETRY('POINT', 4326),
            allowNull: true
        },
        peeriddoctor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        peeridpatient: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Appointment.associate = db => {
        db.Appointments.belongsTo(db.Patients, {
            onDelete: 'CASCADE',
        });
        db.Appointments.belongsTo(db.Doctors, {
            onDelete: 'CASCADE',
        });

    }

    return Appointment;
}