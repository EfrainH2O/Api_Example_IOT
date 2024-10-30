CREATE DATABASE lifeguard360_basededatos;
USE lifeguard360_basededatos;

DROP TABLE IF EXISTS Alarmas;
CREATE TABLE Alarmas (
	Id_alarmas INT auto_increment NOT NULL,
	fecha DATETIME DEFAULT now() NOT NULL,
	estado BOOL NOT NULL,
	ultrasonico BOOL NOT NULL,
	boton BOOL NOT NULL,
	CONSTRAINT Alarmas_pk PRIMARY KEY (Id_alarmas)
);

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
	CONSTRAINT switch_pk PRIMARY KEY (id_switch)
);
