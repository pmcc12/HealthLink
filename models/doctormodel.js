module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctors',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        isdoctor: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.FLOAT,
            allowNull:false
        },
        workyears: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull:false
        },
        location: {
            type: DataTypes.GEOMETRY('POINT', 4326),
            allowNull: false
        },
        radius: {
            // field:'price_remote',
            type: DataTypes.FLOAT,
            allowNull: true
        },
        priceremote: {
            // field:'price_remote',
            type: DataTypes.FLOAT,
            allowNull: false
        },
        onsiteavailability: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        priceonsite: {
            // field:'price_on_site',
            type: DataTypes.FLOAT,
            allowNull: true
        },
        peerid: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Doctor.associate = db => {
        db.Doctors.belongsToMany(db.Patients, {through: "Appointments"});
        // db.Doctors.(db.Appointments, {foreignKey: "Appointments"});

    }

    return Doctor;
}