const {Router} = require('express');
const router = Router();

router.get('/',(req,res) => {
    res.status(200).send({text: 'all good'});
})

module.exports = router;