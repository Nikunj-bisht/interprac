const express = require('express');
const router = express.Router();
const PpdtController = require('../controller/PpdtController');



router.post("/room",PpdtController.saveImage,PpdtController.createPpdtRoom)

module.exports = router;