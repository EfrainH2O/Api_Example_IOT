
const constants = require("./constants")
const express = require('express');
//Sensor temperatura_humedad
const temperaturaHumController = require('./RestControllers/sensor_temperatura_humedad.js');

//sensores con alarmas (boton y ultrasonico)
const alarmasController = require('./RestControllers/sensor_alarma.js');

//sensores con Fotoresistencia
const FotoresistenciaController = require('./RestControllers/sensor_fotoresistencia.js');

// Switch functions controller;
const SwitchController = require('./RestControllers/sensor_switch');

const router = express.Router();

router.get("/",function(req,res){
    res.send('<html><head><title>API IoT</title></head><body><h1>Hellal!</h1></body></html>');
});


//Entradas Base


//Para sensor temperatura y humedad
router.get(constants.contextURL + constants.api + constants.getTempHum, temperaturaHumController.getLogTempHum);
router.post(constants.contextURL + constants.api + constants.postTemperatureHumSensor, temperaturaHumController.insertLogTemperaturaHum);
router.post(constants.contextURL + constants.api + constants.getTemperatureHumSensorByDate, temperaturaHumController.getLogTemperatureHumByDateBetween);

//Para sensor con alarma (boton y ultrasonico)
router.get(constants.contextURL + constants.api + constants.getAlarma, alarmasController.getLogAlarmas);
router.post(constants.contextURL + constants.api + constants.postAlarmaSensor, alarmasController.insertLogAlarmas);
router.post(constants.contextURL + constants.api + constants.getAlarmaByDate, alarmasController.getLogAlarmaByDateBetween);

//Para sensor con Fotoresistencia
router.get(constants.contextURL + constants.api + constants.getFotoresistencia, FotoresistenciaController.getLogFotoresistencia);
router.post(constants.contextURL + constants.api + constants.postFotoresistencia, FotoresistenciaController.insertLogFotoresistencia);
router.post(constants.contextURL + constants.api + constants.getFotoresistenciaByDate,FotoresistenciaController.getLogFotoresistenciaByDateBetween);

//Entradas Switch
router.post(constants.contextURL + constants.api + constants.postSwicthes,SwitchController.insertLogSwitches);
router.post(constants.contextURL + constants.api + constants.getSwicthesByDate, SwitchController.getLogSwitchesByDateBetween);
router.get(constants.contextURL + constants.api + constants.getSwitches, SwitchController.getLogSwitches);

//le decimos a Node que queremos hacer uso de nuestro router en otros archivos (como por ejemplo, app.js)
module.exports = router; 