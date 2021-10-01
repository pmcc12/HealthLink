const fs = require('fs');
const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;
const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const path = require('path'); //builtin in node. help us to get the specific path to this file

const config = {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
}


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, config);


sequelize.authenticate().then(console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error))




const db = {};
const files = fs.readdirSync(__dirname); //asking node to give us a list of the files in the current folder ('models' in this case and will be an array of strings)

//we going to grab each file from the list of files @models folder
for (const file of files) {
    if (file !== 'model.js') {
        //require(path.join(__dirname,file)) we are importing an individual model file (app)
        //require(path.join(__dirname,file))(Sequelize,Sequelize.DataType) the models are expecting 2 arguments: sequelize instance and the available DataTypes. (Bottomline: we are executing each model function file)
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

        db[model.name] = model; //we add to our db object so that we can access later. PS: model.name <=> to the first argument in the function sequelize.define() in every model
    }
}

//this loop is done after for(const file of files) because we want to be sure all models exist in the db object
for (const model in db) {
    if (db[model].associate) {
        db[model].associate(db); //we run through all the models and execute any associations presents in the model definition
    }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;