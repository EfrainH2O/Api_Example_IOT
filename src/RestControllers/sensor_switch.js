
const mysql = require("../database/db");
const constants = require("../constants")

// Endpoint para poder recopilar toda la informacion dentro de la base de datos
async function getLogSwitches(req,res){
    try{
  
      var sql = constants.selectSwicthes;
      var conn = mysql.getConnection();
      conn.connect((error)=>{
          if (error) throw error;
          conn.query(sql, (error, data, fields) => {
              if (error) {
                res.status(500);
                res.send(error.message);
              } else {
                console.log(data);
                res.json({
                  data,
                });
              }
              conn.end();
          });
      });
    }catch(error){
      console.log(error)
      res.status(500)
      res.send(error)
    }
  }

// Endpoint para recopilar la informacion de la base de datos entre especificas fechas  
async function getLogSwitchesByDateBetween(req,res){
    try{
        var sql = constants.selectSwitchesByDate;
        var date_one = req.body.date_one;
        var date_two = req.body.date_two;

        var conn = mysql.getConnection();
        conn.connect((error)=>{
            if (error) throw error;
            var params = [date_one,date_two];
            conn.execute(sql, params, (error, data, fields) => {
                if (error) {
                res.status(500);
                res.send(error.message);
                } else {
                console.log(data);
                res.json({
                    data,
                });
                }
                conn.end();
            });
        });
    }catch(error){
        console.log(error)
        res.status(500)
        res.send(error)
    }

}


//Endpoint para la insercion de informacion
async function insertLogSwitches(req, res) {
    try {
        const sqlInsert = constants.insertSwitches;
        const sqlRetrieve = constants.selectLastSwitches;
        const nodo = req.body.nodo;
        const sA = req.body.s1;
        const sB = req.body.s2;
        let prevA = 0;
        let prevB = 0;
        let prevC = 0;
        let prevD = 0;


        const conn = mysql.getConnection();
        conn.connect((error) => {
            if (error) {
                console.error('Error conectandose a la base de datos:', error);
                res.status(500).send('Database connection failed.');
                return;
            }

            // Se recuperan los ultimos datos
            conn.query(sqlRetrieve, (error, results) => {
                if (error) {
                    conn.end();
                    res.status(500).send(error.message);
                    return;
                }

                if (results.length > 0) {
                    const lastRecord = results[0];
                    if (nodo === 'N1') {
                        prevA = lastRecord.foto_resistencia;
                        prevB = lastRecord.temperatura_humedad;
                        prevC = lastRecord.boton;
                        prevD = lastRecord.ultrasonico;

                        if(prevC == sA && prevD == sB){
                            res.status(200).send("No");
                            conn.end();
                            return
                        }
                    } else {
                        prevA = lastRecord.boton;
                        prevB = lastRecord.ultrasonico;
                        prevC = lastRecord.foto_resistencia;
                        prevD = lastRecord.temperatura_humedad;

                        if(prevC == sA && prevD == sB){
                            res.status(200).send("No");
                            conn.end();
                            return
                        }

                    }
                } else {
                    // Se avisa si no se encontraron valores anteriores.
                    console.log("No se encontraron datos anteriores.");
                    // Si no se encuentran, se reemplazan con 0
                }
                
                

                //Se verifica que se recuperaron correctamente los calores
                const params = nodo === 'N1' ? [sA, sB, prevA, prevB] : [prevA, prevB, sA, sB];

                console.log("Insertando con los paremetros:", params);

                // Se insertan nuevos valores del switch
                conn.execute(sqlInsert, params, (error, data) => {
                    if (error) {
                        res.status(500).send(error.message);
                    } else {
                        res.json({
                            status: 200,
                            message: "Valor insertado",
                            affectedRows: data.affectedRows,
                        });
                    }
                    conn.end();
                });
            });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error insesperado.');
    }
}
  

  module.exports = {
    getLogSwitches,
    getLogSwitchesByDateBetween,
    insertLogSwitches
  };
 