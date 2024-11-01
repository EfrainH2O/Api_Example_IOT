
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
async function insertLogSwitches(req,res){
    try{

        var sqlInsert = constants.insertSwitches;
        var sqlRetrieve  = constants.selectLastSwitches;
        var nodo = req.body.nodo;
        var sA = req.body.s1;
        var sB = req.body.s2;
        var prevA = 0;
        var prevB = 0;
        var conn = mysql.getConnection();
        // 
        conn.connect((error)=>{
            if (error) throw error;
            //Funcion de revision de datos previos
            conn.query(sqlRetrieve, (error, data, fields) => {
                if (error) {
                    res.status(500);
                    res.send(error.message);
                } else {
                    if(nodo == 'N1'){
                        prevA = data.foto_resistencia;
                        prevB = data.temperatura_humedad;
                    }else{
                        prevA = data.boton;
                        prevB = data.ultrasonico;
                    }
                    console.log(data);
                }
            });
            if(nodo == "N1"){
                var params = [sA,sB,prevA,prevB]; 
            }else{
                var params = [prevA,prevB,sA,sB]; 
            }
            // Funcion de insercion de informacion
            conn.execute(sqlInsert, params, (error, data, fields) => {
                if (error) {
                    res.status(500);
                    res.send(error.message);
                } else {
                    console.log(data);
                    res.json({
                        status: 200,
                        message: "Valor insertado",
                        affectedRows: data.affectedRows,
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
  

  module.exports = {
    getLogSwitches,
    getLogSwitchesByDateBetween,
    insertLogSwitches
  };
  