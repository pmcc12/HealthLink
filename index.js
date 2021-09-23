const express = require('express');
const app = express(); // express object created
const server = require('http').createServer(app); // http server object created (remark: only created, but hasn't started yet.. this will be only done with the server.listen())
// const io = require('socket.io')(server,{
//     cors : {
//         origin: "http://localhost:3000", //we might need to change, when front end is deployed in netlify
//         methods: ["GET","POST"]
//     }
// }); // we give our server object to the socket.io library knows our server when where we are listening
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/model')
const router = require('./router');
require('dotenv').config(); 

const {devPORT} = process.env || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use((req,res,next) => {
    req.server = server;
    next();
})
app.use(router);

(async function bootstrap() {
    //    await db.sequelize.sync({force:true}); drop all tables and create again
    await db.sequelize.sync();
    server.listen(devPORT, () => {
        console.log('Server and DB Operating in port ',devPORT);
    })
})();

