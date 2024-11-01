
#Cada uno de las tablas es independientes entre si, noy hay como tal una relacion

DROP TABLE IF EXISTS Alarmas;
CREATE TABLE Alarmas (
	Id_alarmas INT auto_increment NOT NULL,
	fecha DATETIME DEFAULT now() NOT NULL,
	estado BOOL NOT NULL,
	ultrasonico BOOL NOT NULL,
	boton BOOL NOT NULL,
	CONSTRAINT Alarmas_pk PRIMARY KEY (Id_alarmas)
);
# Tabla de alarmas, con datos relevantes para el analisis de informacion

DROP table if EXISTS Fotoresistencia;
CREATE TABLE Fotoresistencia (
  id_fotoresistencia INT AUTO_INCREMENT NOT NULL,
  fecha DATETIME DEFAULT NOW() NOT NULL,
  valor INT NOT NULL,
  nivel VARCHAR(10) NOT NULL,
  CONSTRAINT foto_resistencia_pk PRIMARY KEY (id_fotoresistencia)
);

DROP TABLE IF EXISTS temperatura_humedad;
CREATE TABLE temperatura_humedad (
	id_temp_hum INT auto_increment NOT NULL,
	fecha DATETIME DEFAULT now() NOT NULL,
	temperatura FLOAT NOT NULL,
	humedad FLOAT NOT NULL,
	CONSTRAINT temperatura_humedad_pk PRIMARY KEY (id_temp_hum)
);

DROP TABLE IF EXISTS switch;
CREATE TABLE switch (
	id_switch INT auto_increment NOT NULL,
	boton BOOL NOT NULL,
	ultrasonico BOOL NOT NULL,
	foto_resistencia BOOL NOT NULL,
	temperatura_humedad BOOL NOT NULL,
	fecha DATETIME DEFAULT NOW() NOT NULL,
	CONSTRAINT switch_pk PRIMARY KEY (id_switch)
)AUTO_INCREMENT=2;

LOCK TABLES switch WRITE;
/*!40000 ALTER TABLE switch DISABLE KEYS */;
INSERT INTO switch VALUES (1,0,0,0,0,'2024-08-28 17:00:13');
/*!40000 ALTER TABLE switch ENABLE KEYS */;
UNLOCK TABLES;