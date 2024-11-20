const mysql = require("../database/db");
const constants = require("../constants");

// Variable para almacenar el último dato recibido
let latestData = null;

// Define un intervalo de tiempo para enviar datos (por ejemplo, cada 60 segundos)
const INTERVAL = 5000; // 5 segundos

// Función para insertar el dato más reciente en la base de datos
function sendLatestDataToDatabase() {
  if (latestData !== null) {
    const { temperatura, humedad } = latestData;
    const conn = mysql.getConnection();

    conn.connect((error) => {
      if (error) {
        console.error('Error connecting to database:', error);
        return;
      }

      const sql = constants.insertTemperatureHum;
      const params = [temperatura, humedad];

      conn.execute(sql, params, (error, data) => {
        if (error) {
          console.error('Error executing query:', error);
        } else {
          console.log('Latest data inserted:', data);
        }
        conn.end();
      });

      // Limpiar el último dato después de insertarlo
      latestData = null;
    });
  }
}

// Configurar el intervalo para enviar los datos más recientes
setInterval(sendLatestDataToDatabase, INTERVAL);

// Endpoint para insertar datos de temperatura y humedad
// Endpoint para insertar datos de temperatura y humedad
async function insertLogTemperaturaHum(req, res) {
  try {
    // Recibir los datos del cuerpo de la solicitud
    const temperatura = req.body.temperatura;
    const humedad = req.body.humedad;
    const area = req.body.area; // New field for 'area'

    // Almacenar el último dato recibido
    latestData = { temperatura, humedad, area };

    // Responder que los datos han sido recibidos
    res.json({
      status: 200,
      message: 'Latest data received and buffered for future insertion.',
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send(error.message);
  }
}

function sendLatestDataToDatabase() {
  if (latestData !== null) {
    const { temperatura, humedad, area } = latestData; // Include 'area'
    const conn = mysql.getConnection();

    conn.connect((error) => {
      if (error) {
        console.error('Error connecting to database:', error);
        return;
      }

      const sql = constants.insertTemperatureHum;
      const params = [temperatura, humedad, area]; // Add 'area' to params

      conn.execute(sql, params, (error, data) => {
        if (error) {
          console.error('Error executing query:', error);
        } else {
          console.log('Latest data inserted:', data);
        }
        conn.end();
      });

      // Clear the latest data after insertion
      latestData = null;
    });
  }
}

// Otros endpoints
async function getLogTempHum(req, res) {
  try {
    const sql = constants.selectTempHum;
    const conn = mysql.getConnection();
    conn.connect((error) => {
      if (error) throw error;
      conn.query(sql, (error, data, fields) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          console.log(data);
          res.json({ data });
        }
        conn.end();
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

async function getLogTemperatureHumByDateBetween(req, res) {
  try {
    const sql = constants.selectTemperatureHumByDate;
    const date_one = req.body.date_one;
    const date_two = req.body.date_two;
    const conn = mysql.getConnection();
    conn.connect((error) => {
      if (error) throw error;
      const params = [date_one, date_two];
      conn.execute(sql, params, (error, data, fields) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          console.log(data);
          res.json({ data });
        }
        conn.end();
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  getLogTempHum,
  insertLogTemperaturaHum,
  getLogTemperatureHumByDateBetween,
};