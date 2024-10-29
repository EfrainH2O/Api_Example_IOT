
/*
 * LOCAL DATABASE Config
 * 
 *  Para acceder a una BD en la nube debes configurar un archivo .env
 */
const dbHost = "localhost";
const dbPort = "3306";
const dbUser = "root";
const dbPass = "useless_H2O";
const dbName = "iot";



/*
 * Server General Configuration
 */
const serverPort = 3000
const contextURL = '/iot'; //If needed, project context
const api = '/api'; // Sugested API URL

//SENSOR 1 URLS. Configurar URLS por cada sensor.
const getTemperatureSensor = '/getTemperatures'
const getTemperatureSensorByDate = '/getTemperatures'
const postTemperatureSensor = '/insertTemperature'; //Implemented Endpoint URL
//Luminosidad
const getLightSensor = '/getLight'
const getLightSensorByDate = '/getLight'
const postLightSensor = '/insertLight';


/*
 * DB Queries
 * Agregar queries por sensor.
 */
const selectTemperature = 'SELECT * FROM temps';
const selectTemperatureByDate = 'SELECT * FROM temps WHERE fecha between ? and ?';
const insertTemperature = 'INSERT INTO temps (valor) values (?)';
//Luminosidad sql
const selectLightSensor = 'select * from light';
const selectLightSensorByDate = 'select * from light where fecha between ? and ?';
const insertLightSensor = 'insert into light (valor) values (?)'


module.exports= {
   dbHost,dbPort,dbUser,dbPass,dbName,serverPort, contextURL,api,getTemperatureSensor,
   getTemperatureSensorByDate,postTemperatureSensor,getLightSensor,getLightSensorByDate,postLightSensor, 
   selectTemperature,selectTemperatureByDate,insertTemperature, selectLightSensor, selectLightSensorByDate,
   insertLightSensor
}