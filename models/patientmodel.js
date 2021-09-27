module.exports = (sequelize, DataTypes) => {
    const Patient = sequelize.define('Patients',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        isdoctor: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.FLOAT,
            allowNull:true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stripeid: {
            type: DataTypes.STRING,
            allowNull:true
        },
        location: {
            type: DataTypes.GEOMETRY('POINT',4326),
            allowNull: true
        },
        peerid: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Patient.associate = db => {
            db.Patients.belongsToMany(db.Doctors, {through: "Appointments"});
            // db.Patients.belongsToMany(db.Doctors, {through: "Appointments"});
    }

    return Patient;
}
