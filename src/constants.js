/*
 * LOCAL DATABASE Config
 * 
 * Para acceder a una BD en la nube debes configurar un archivo .env
 */
const dbHost = "localhost";
const dbPort = "3306";
const dbUser = "root";
const dbPass = "ernesto2003"; // CAMBIAR CONTRASENA
const dbName = "lifeguard360_basededatos"; // NOMBRE DE LA BASE DE DATOS 

/*
 * Server General Configuration
 */
const serverPort = 3000;
const contextURL = '/lifeguard360_basededatos'; // If needed, project context
const api = '/api'; // Suggested API URL

// SENSOR 1 URLS. Configurar URLS por cada sensor.
const getTemperatureSensor = '/getTemperatures';
const getTemperatureSensorByDate = '/getTemperatures';
const postTemperatureSensor = '/insertTemperature'; // Implemented Endpoint URL

/*
 * DB Queries
 * Agregar queries por sensor.
 */
const selectTemperature = 'SELECT * FROM temps';
const selectTemperatureByDate = 'SELECT * FROM temps WHERE fecha between ? and ?';
const insertTemperature = 'INSERT INTO temps (valor) values (?)';

// SENSOR Temperatura humedad
const getTempHum = '/getTempHum';
const postTemperatureHumSensor = '/insertTemperatureHum'; // Implemented Endpoint URL
const getTemperatureHumSensorByDate = '/getTempHumByDate';

const selectTempHum = 'SELECT id_temp_hum, fecha, temperatura, humedad FROM temperatura_humedad';
const insertTemperatureHum = 'INSERT INTO temperatura_humedad (temperatura, humedad) values (?, ?)';
const selectTemperatureHumByDate = 'SELECT * FROM temperatura_humedad WHERE fecha between ? and ?';

// SENSORES con alarmas
const getAlarma = '/getAlarma';
const postAlarmaSensor = '/insertAlarma'; // Implemented Endpoint URL

const selectAlarma = 'SELECT * FROM alarmas';
const InsertAlarma = 'INSERT INTO alarmas (estado, ultrasonico, boton) values (?, ?, ?)';

// SENSOR con Fotoresistencia
const getFoteresistencia = '/getFotoresistencia';
const postFotoresistencia = '/insertFotoresistencia'; // Implemented Endpoint URL

const selectFotoresistencia = 'SELECT id_fotoresistencia, fecha, valor, nivel FROM Fotoresistencia';
const insertFotoresistencia = 'INSERT INTO Fotoresistencia (fecha, valor, nivel) VALUES (?, ?, ?)';

module.exports = {
  dbHost,
  dbPort,
  dbUser,
  dbPass,
  dbName,
  serverPort,
  contextURL,
  api,
  getTemperatureSensor,
  getTemperatureSensorByDate,
  postTemperatureSensor,
  selectTemperature,
  selectTemperatureByDate,
  insertTemperature,
  getTempHum,
  selectTempHum,
  postTemperatureHumSensor,
  insertTemperatureHum,
  getTemperatureHumSensorByDate,
  selectTemperatureHumByDate,
  getAlarma,
  postAlarmaSensor,
  selectAlarma,
  InsertAlarma,
  getFoteresistencia,
  postFotoresistencia,
  selectFotoresistencia,
  insertFotoresistencia,
};
