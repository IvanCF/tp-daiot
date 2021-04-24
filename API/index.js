const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const PUERTO = 3001;
const fs = require("fs");

/************** */

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/************ */

var db;
var db_name;

//recursos
app.use(express.static(__dirname + "/"));

db_name = path.join(__dirname, "db", "DAIOT.db");
db = new sqlite3.Database(db_name, (err) => {
    if (err) {
        return console.error("Error---->" + err.message);
    } else {
        console.log("conexion exitosa con la BD!");
    }
});


var queryLiteDispositivo =
    " \
CREATE TABLE IF NOT EXISTS Dispositivos( \
    dispositivoId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \
    nombre TEXT, \
    ubicacion TEXT \
    );";

var queryLiteMediciones =
    "\
  CREATE TABLE IF NOT EXISTS Mediciones ( \
    medicionId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, \
    fecha TEXT, \
    valor TEXT, \
    dispositivoId INTEGER NOT NULL, \
    estado TEXT, \
    FOREIGN KEY(dispositivoId) REFERENCES Dispositivos(dispositivoId) \
  );";

db.run(queryLiteDispositivo);
db.run(queryLiteMediciones);

var queryInsertarDispositivo =
    "\
INSERT INTO Dispositivos (nombre, ubicacion) VALUES \
    ('Sensor Temp. Exterior', 'Patio'), \
	('Sensor Hum. Exterior', 'Jardin Delantero'), \
    ('Actuador Led', 'ESP32');";


var queryInsertarMediciones =
    "\
INSERT INTO Mediciones(fecha, valor, dispositivoId,estado) VALUES \
    ('2020-11-26 21:19:41', '60', 1,'activo'), \
    ('2020-11-26 21:19:41', '40', 1,'activo'), \
    ('2020-11-26 21:19:41', '30', 2,'activo'), \
    ('2020-11-26 21:19:41', '12', 2,'activo'); ";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, ""));
app.use(express.urlencoded({ extended: false }));
app.listen(PUERTO);
console.log("servidor corriendo...");

//enrutamiento
app.get("/", cors(corsOptions), (req, res) => {
    // console.log("pasa aquiii");
    res.render("index.html");
});


//=======[ listar dispositivos ]==================================================

app.get("/dispositivos/", cors(corsOptions), function(req, res) {
    let SQL = "SELECT *FROM Dispositivos";
    db.all(SQL, [], function(err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }

        return res.send(respuesta);
    });
});

/**************[ agregar mediciones ]***************************************** */
app.get(
    "/addMediciones/:fecha/:valor/:dispositivoId/:estado",
    cors(corsOptions),
    function(req, res) {
        const nueva_medida = [
            req.params.fecha,
            req.params.valor,
            req.params.dispositivoId,
            req.params.estado
        ];
        db.run(
            "INSERT INTO Mediciones(fecha, valor, dispositivoId,estado) VALUES(?,?,?,?)",
            nueva_medida,
            function(err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("se agrego!");
                res.json("{registro medi. correcto:ok}"); // ionic espera un json
            }
        );
    }
);

/*********************[ rellenar valores iniciarles - test ]********************************************************** */
app.get("/inicializar/", function(req, res) {
    db.run(queryInsertarDispositivo);
    db.run(queryInsertarMediciones);
    res.send("BD inicializado...");
});


/*************************[ listar mediciones por dispositivo ]********************************************************* */

app.get("/mediciones/:id", cors(corsOptions), function(req, res) {
    var SQL = "SELECT *FROM Mediciones WHERE dispositivoId =?";

    db.all(SQL, [req.params.id], function(err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }

        return res.send(respuesta);
    });
});

/*************************[ listar mediciones  ]********************************************************* */

app.get("/mediciones/", cors(corsOptions), function(req, res) {
    var SQL = "SELECT *FROM Mediciones";

    db.all(SQL, [], function(err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }

        return res.send(respuesta);
    });
});

/*************************[ listar mediciones  con JOIN ]********************************************************* */

app.get("/medicionesRelacionadas/", cors(corsOptions), function(req, res) {
    var SQL = "SELECT  Mediciones.medicionId AS codigo, Mediciones.fecha,Mediciones.valor,Dispositivos.nombre, Mediciones.estado \
               FROM Mediciones \
               INNER JOIN Dispositivos \
               WHERE Mediciones.dispositivoId=Dispositivos.dispositivoId";

    db.all(SQL, [], function(err, respuesta) {
        if (err) {
            res.send(err).status(400);
            return;
        }

        return res.send(respuesta);
    });
});

/**************[ agregar accion led ]***************************************** */
app.get(
    "/addAccion/:fecha/:valor/:dispositivoId/:estado",
    cors(corsOptions),
    function(req, res) {
        const nueva_medida = [
            req.params.fecha,
            req.params.valor,
            req.params.dispositivoId,
            req.params.estado
        ];
        db.run(
            "INSERT INTO Mediciones(fecha, valor, dispositivoId,estado) VALUES(?,?,?,?)",
            nueva_medida,
            function(err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log("se agrego!");
                res.json("{registro acción. correcto:ok}"); // ionic espera un json
            }
        );
    }
);