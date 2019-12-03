const express = require('express');
const GASRouter =  express.Router();
GASRouter.post('/profile', (req, res) => {
    console.log('Request', req.body);
    //   console.log('Response',res);
});
module.exports = GASRouter;