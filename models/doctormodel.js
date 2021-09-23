module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctors',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.FLOAT,
            allowNull:true
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
            allowNull: false,
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
        priceremote: {
            // field:'price_remote',
            type: DataTypes.FLOAT,
            allowNull: false
        },
        priceonsite: {
            // field:'price_on_site',
            type: DataTypes.FLOAT,
            allowNull: false
        },
        peerid: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Doctor.associate = db => {
        db.Doctors.belongsToMany(db.Patients, {through: "Appointments"});
        // db.Doctors.(db.Appointments, {foreignKey: "Appointments"});

    }

    return Doctor;
}