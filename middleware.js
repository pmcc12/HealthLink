const authMiddleware = async (req, res, next) => {
    console.log('inside authMiddleware');
    //will check inside the session, if this uid exists.. basically session-express library is registring all the uid (user ids), when someone wants to access one of the endpoints, needs to have a token/cookie which was hashed/salted with a secret-key. Only with it will have its access granted on the if(!req.session.uid)
    if(!req.session.uid){
        console.log('No ID!');
        //for forbidden access correct http code is 403
        res.status(403).send({message: 'not allowed'});
    } else {
        console.log('PASS!');
        console.log(req.session.uid);
        next();
    }
}

module.exports = authMiddleware;