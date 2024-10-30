/**
 * Instrucciones:
 * 
 * 1. Por cada sensor que tenga tu tabla de base de datos corresponsientes, deberás crear 
 *    un archivo similar al archivo /RestControllers/sensorTemperatura.js
 * 2. Registra en el router todos los métodos disponibles en tu controlador con una URL que haga mencion a dicha acción
 * 
 * 
 */
const constants = require("./constants")
const express = require('express');
const temperaturaController = require('./RestControllers/sensorTemperatura.js'); //Del profe
//Sensor humedad
const temperaturaHumController = require('./RestControllers/sensor_temperatura_humedad.js');

//sensores con alarmas (boton y ultrasonico)
const alarmasController = require('./RestControllers/sensor_alarma.js');

//sensores con Fotoresistencia
const FotoresistenciaController = require('./RestControllers/sensor_fotoresistencia.js');

const router = express.Router();

router.get("/",function(req,res){
    res.send('<html><head><title>API IoT</title></head><body><h1>Hellal!</h1></body></html>');
});

/**
 * URL's que debes configurar en tu server para incluir tus endpoints que reciben peticiones para cada 
 * sensor.
 * 
 * Hay 3 métodos actualmente, 1 get HTTP y 2 post HTTP. En todos, el primer argumento es una url (creada de manera parametrizada con constantes)
 * El segundo método es la función js que responderá a las peticiones de dicha URL. Estas están en el archivo sensorTemperatura.js
 * 
 * Para otros sensores, puedes agregar otros archivos y configurar sus url's.
 * 
 */
router.get(constants.contextURL + constants.api + constants.getTemperatureSensor, temperaturaController.getLogTemperatura);
router.post(constants.contextURL + constants.api + constants.getTemperatureSensorByDate, temperaturaController.getLogTemperatureByDateBetween);
router.post(constants.contextURL + constants.api + constants.postTemperatureSensor,temperaturaController.insertLogTemperatura);

//Para sensor temperatura y humedad
router.get(constants.contextURL + constants.api + constants.getTempHum, temperaturaHumController.getLogTempHum);
router.post(constants.contextURL + constants.api + constants.postTemperatureHumSensor, temperaturaHumController.insertLogTemperaturaHum);
router.post(constants.contextURL + constants.api + constants.getTemperatureHumSensorByDate, temperaturaHumController.getLogTemperatureHumByDateBetween);

//Para sensor con alarma (boton y ultrasonico)
router.get(constants.contextURL + constants.api + constants.getAlarma, alarmasController.getLogAlarmas);
router.post(constants.contextURL + constants.api + constants.postAlarmaSensor, alarmasController.insertLogAlarmas);

//Para sensor con Fotoresistencia
router.get(constants.contextURL + constants.api + constants.getFoteresistencia, FotoresistenciaController.getLogFotoresistencia);
router.post(constants.contextURL + constants.api + constants.postFotoresistencia, FotoresistenciaController.insertLogFotoresistencia);

//le decimos a Node que queremos hacer uso de nuestro router en otros archivos (como por ejemplo, app.js)
module.exports = router; 