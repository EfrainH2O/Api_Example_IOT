/*
 * LOCAL DATABASE Config
 * 
 * Para acceder a una BD en la nube debes configurar un archivo .env
 */
const dbHost = "localhost";
const dbPort = "3306";
const dbUser = "root";
const dbPass = "useless_H2O"; // CAMBIAR CONTRASENA
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
const getAlarmaByDate = '/getAlarma';

const selectAlarma = 'SELECT * FROM alarmas';
const InsertAlarma = 'INSERT INTO alarmas (estado, ultrasonico, boton) values (?, ?, ?)';
const selectAlarmaByDate = 'SELECT * FROM alarmas WHERE fecha between ? and ?';


// SENSOR con Fotoresistencia
const getFotoresistencia = '/getFotoresistencia';
const postFotoresistencia = '/insertFotoresistencia'; // Implemented Endpoint URL
const getFotoresistenciaByDate = '/getFotoresistenciaByDate';

const selectFotoresistencia = 'SELECT id_fotoresistencia, fecha, valor, nivel FROM Fotoresistencia';
const insertFotoresistencia = 'INSERT INTO Fotoresistencia (fecha, valor, nivel) VALUES (?, ?, ?)';
const selectFotoresistenciaByDate = 'SELECT * FROM Fotoresistencia WHERE fecha between ? and ?';

// SENSOR Switch

const getSwitches = '/getSwicthes';
const getSwicthesByDate = '/getSwicthes';
const postSwicthes = '/insertSwicthes';

const selectSwicthes = 'select * from switch';
const selectSwitchesByDate = 'select * from switch where fecha between ? and ?';
const selectLastSwitches = '\
select *\
from switch  \
order by id_switch desc  \
limit 1';
const insertSwitches = 'insert into swicth (boton, ultrasonico, foto_resistencia, temperatura_humedad) values (?,?,?,?)'


module.exports = {
  // Connexion
  dbHost,
  dbPort,
  dbUser,
  dbPass,
  dbName,
  serverPort,
  // ULRbase
  contextURL,
  api,
  // Sensor Temp
  getTemperatureSensor,
  getTemperatureSensorByDate,
  postTemperatureSensor,
  selectTemperature,
  selectTemperatureByDate,
  insertTemperature,
  // SensorTempHum
  getTempHum,
  selectTempHum,
  postTemperatureHumSensor,
  insertTemperatureHum,
  getTemperatureHumSensorByDate,
  selectTemperatureHumByDate,
  // Sensor Alarma
  getAlarma,
  postAlarmaSensor,
  getAlarmaByDate,
  selectAlarma,
  InsertAlarma,
  selectAlarmaByDate,
  // Fotoresistencia
  getFotoresistencia,
  postFotoresistencia,
  selectFotoresistencia,
  insertFotoresistencia,
  getFotoresistenciaByDate,
  selectFotoresistenciaByDate,
  // Switches
  getSwitches,
  getSwicthesByDate,
  postSwicthes,
  selectSwicthes,
  selectSwitchesByDate,
  selectLastSwitches,
  insertSwitches,
};
