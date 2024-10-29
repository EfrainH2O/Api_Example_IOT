

DROP TABLE IF EXISTS Alarmas;
CREATE TABLE Alarmas (
	Id_alarmas INT auto_increment NOT NULL,
	fecha DATETIME DEFAULT now() NOT NULL,
	estado BOOL NOT NULL,
	ultrasonico BOOL NOT NULL,
	boton BOOL NOT NULL,
	CONSTRAINT Alarmas_pk PRIMARY KEY (Id_alarmas)
);

DROP TABLE IF EXISTS Nivel_iluminacion; 
CREATE TABLE Nivel_iluminacion (
	Id_nivel_iluminacion INT auto_increment NOT NULL,
	nivel VARCHAR(10) NOT NULL,
	CONSTRAINT Nivel_iluminacion_pk PRIMARY KEY (Id_nivel_iluminacion),
	CONSTRAINT nivel_unique UNIQUE (nivel)  -- Índice único para permitir clave foránea
);

LOCK TABLES Nivel_iluminacion WRITE;
INSERT INTO Nivel_iluminacion VALUES (1,"Bajo"),(2,"Medio"),(3,"Alto");
UNLOCK TABLES;

DROP TABLE IF EXISTS foto_resistencia;
CREATE TABLE foto_resistencia (
	id_fotoresistencia INT auto_increment NOT NULL,
	fecha DATETIME DEFAULT now() NOT NULL,
	nivel INT NOT NULL,
	CONSTRAINT foto_resistencia_pk PRIMARY KEY (id_fotoresistencia),
	CONSTRAINT nivel_fk FOREIGN KEY (nivel) REFERENCES Nivel_iluminacion(Id_nivel_iluminacion)
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
