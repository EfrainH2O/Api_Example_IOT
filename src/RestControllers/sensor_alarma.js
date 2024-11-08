const mysql = require("../database/db");
const constants = require("../constants");

// Variables para almacenar el último valor enviado
let lastSentState = null;
let lastSentUltrasonico = null;
let lastSentBoton = null;

// Función para insertar datos si estos han cambiado
async function insertLogAlarmas(req, res) {
  try {
    const estado = req.body.estado;
    const ultrasonico = req.body.ultrasonico;
    const boton = req.body.boton;

    // Verifica cambios en los estados
    if (
      estado !== lastSentState ||
      ultrasonico !== lastSentUltrasonico ||
      boton !== lastSentBoton
    ) {
      const sql = constants.InsertAlarma;
      const params = [estado, ultrasonico, boton];
      const conn = mysql.getConnection();

      conn.connect((error) => {
        if (error) throw error;
        conn.execute(sql, params, (error, data, fields) => {
          if (error) {
            res.status(500).send(error.message);
          } else {
            console.log('Data inserted:', data);
            res.json({
              status: 200,
              message: "Valor insertado",
              affectedRows: data.affectedRows,
            });

            // Actualizar los últimos valores enviados
            lastSentState = estado;
            lastSentUltrasonico = ultrasonico;
            lastSentBoton = boton;
          }
          conn.end();
        });
      });
    } else {
      res.json({
        status: 200,
        message: "No se detectaron cambios en los datos y no se insertaron.",
      });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send(error.message);
  }
}

// Otros endpoints
async function getLogAlarmas(req, res) {
  try {
    const sql = constants.selectAlarma;
    const conn = mysql.getConnection();

    conn.connect((error) => {
      if (error) throw error;
      conn.query(sql, (error, data, fields) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          console.log('Data retrieved:', data);
          res.json({ data });
        }
        conn.end();
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send(error.message);
  }
}

async function getLogAlarmaByDateBetween(req, res) {
  try {
    const sql = constants.selectAlarmaByDate;
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
    console.error('Unexpected error:', error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  getLogAlarmas,
  insertLogAlarmas,
  getLogAlarmaByDateBetween
};