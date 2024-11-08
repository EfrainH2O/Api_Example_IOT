const mysql = require("../database/db");
const constants = require("../constants");

// Variables para almacenar el último dato recibido y el último nivel enviado
let latestData = null;
let lastSentLevel = null;

// Define un intervalo de tiempo para enviar datos (por ejemplo, cada 60 segundos)
const INTERVAL = 5000; // 5 segundos

// Función para insertar el dato más reciente en la base de datos si el nivel es diferente
function sendLatestDataToDatabase() {
  if (latestData !== null) {
    const { valor, nivel } = latestData;

    // Solo enviar si el nivel es diferente al último nivel enviado
    if (nivel !== lastSentLevel) {
      const conn = mysql.getConnection();

      conn.connect((error) => {
        if (error) {
          console.error('Error connecting to database:', error);
          return;
        }

        const sql = constants.insertFotoresistencia;
        const params = [new Date(), valor, nivel];

        conn.execute(sql, params, (error, data) => {
          if (error) {
            console.error('Error executing query:', error);
          } else {
            console.log('Latest data inserted:', data);
            // Actualizar el último nivel enviado
            lastSentLevel = nivel;
          }
          conn.end();
        });

        // Limpiar el último dato después de insertarlo
        latestData = null;
      });
    } else {
      latestData = null; // Limpiar, aunque no se envíe
    }
  }
}

// Configurar el intervalo para enviar los datos más recientes
setInterval(sendLatestDataToDatabase, INTERVAL);

// Endpoint para insertar datos de Fotoresistencia
async function insertLogFotoresistencia(req, res) {
  try {
    // Recibir los datos del cuerpo de la solicitud
    const valor = req.body.valor;

    // Determinar el nivel en función del valor
    let nivel = '';
    if (valor < 100) {
      nivel = 'Bajo';
    } else if (valor >= 100 && valor <= 200) {
      nivel = 'Medio';
    } else if (valor > 200) {
      nivel = 'Alto';
    } else {
      nivel = 'Desconocido';
    }

    // Almacenar el último dato recibido
    latestData = { valor, nivel };

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

// Otros endpoints
async function getLogFotoresistencia(req, res) {
  try {
    const sql = constants.selectFotoresistencia;
    const conn = mysql.getConnection();

    conn.connect((error) => {
      if (error) throw error;
      conn.query(sql, (error, data, fields) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          const formattedData = data.map((record) => ({
            ...record,
            fecha: new Date(record.fecha).toLocaleString('es-ES', { timeZone: 'UTC' }),
          }));
          console.log('Data retrieved:', formattedData);
          res.json({ data: formattedData });
        }
        conn.end();
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send(error.message);
  }
}

async function getLogFotoresistenciaByDateBetween(req, res) {
  try {
    const sql = constants.selectFotoresistenciaByDate;
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
  getLogFotoresistencia,
  insertLogFotoresistencia,
  getLogFotoresistenciaByDateBetween,
};