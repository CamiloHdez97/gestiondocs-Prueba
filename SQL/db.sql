CREATE DATABASE gestiondocs;
\c gestiondocs;

CREATE TABLE empresa (
	idempresa SERIAL PRIMARY KEY,
	identificacion VARCHAR(16) NOT NULL,
	razonsocial VARCHAR(16) NOT NULL
);

CREATE TABLE tipodocumento (
	idtipodocumento SERIAL PRIMARY KEY,
	descripcion VARCHAR(256) NOT NULL
);

CREATE TABLE estado (
	idestado SERIAL PRIMARY KEY,
	descripcion VARCHAR(256) NOT NULL,
	exitoso BOOLEAN NOT NULL
);

CREATE TABLE numeracion (
	idnumeracion SERIAL PRIMARY KEY,
	idtipodocumento INT NOT NULL REFERENCES tipodocumento(idtipodocumento),
	idempresa INT NOT NULL REFERENCES empresa(idempresa),
	prefijo VARCHAR(8) NOT NULL,
	consecutivoinicial INT NOT NULL,
	consecutivofinal INT NOT NULL,
	vigenciainicial DATE NOT NULL,
	vigenciafinal DATE NOT NULL
);


CREATE TABLE documento (
	iddocumento SERIAL PRIMARY KEY,
	idnumeracion INT NOT NULL REFERENCES numeracion(idnumeracion),
	idestado INT NOT NULL REFERENCES estado(idestado),
	numero INT NOT NULL,
	fecha DATE NOT NULL,
	base DECIMAL NOT NULL,
	impuestos DECIMAL NOT NULL
);

--Estado
-- exitoso
INSERT INTO estado (descripcion, exitoso) VALUES ('Recibido', true);
INSERT INTO estado (descripcion, exitoso) VALUES ('En validación', true);
INSERT INTO estado (descripcion, exitoso) VALUES ('Sin errores', true);
-- fallido
INSERT INTO estado (descripcion, exitoso) VALUES ('Formato Incorrecto', false);
INSERT INTO estado (descripcion, exitoso) VALUES ('Con errores', false);
INSERT INTO estado (descripcion, exitoso) VALUES ('Fuera de Vigencia', false);
INSERT INTO estado (descripcion, exitoso) VALUES ('Fuera de Rango', false);

--tuplas empresa
INSERT INTO empresa (identificacion, razonsocial) VALUES ('ABC001', 'Company A, Inc.');
INSERT INTO empresa (identificacion, razonsocial) VALUES ('ABC002', 'Empresa B, SA.');
INSERT INTO empresa (identificacion, razonsocial) VALUES ('ABC003', 'Empresa C, SAS');

--tipo documento
INSERT INTO tipodocumento (descripcion) VALUES ('Factura');
INSERT INTO tipodocumento (descripcion) VALUES ('Nota Debito');
INSERT INTO tipodocumento (descripcion) VALUES ('Nota Credito');

-- Numeracion Empresa 1
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (1, 1, 'TAM', 1001, 2000, '2023-01-01', '2023-12-31');
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (2, 1, 'SETG', 5001, 6000, '2023-01-01', '2023-12-31');
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (3, 1, 'NC', 7001, 8000, '2023-01-01', '2023-12-31');
-- Numeracion Empresa 2
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (1, 2, 'TAM', 3001, 4000, '2023-01-01', '2023-12-31');
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (2, 2, 'SETG', 8001, 9000, '2023-01-01', '2023-12-31');
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (3, 2, 'NC', 10001, 11000, '2023-01-01', '2023-12-31');
-- Numeracion Empresa 3
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (1, 3, 'TAM', 5001, 6000, '2023-01-01', '2023-12-31');
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (2, 3, 'SETG', 12001, 13000, '2023-01-01', '2023-12-31');
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (3, 3, 'NC', 14001, 15000, '2023-01-01', '2023-12-31');

-- documento Documentos A
INSERT INTO documento (idnumeracion, idestado, numero, fecha, base, impuestos)
VALUES (1, 3, 1001, '2023-05-10', 500.00, 75.00);
INSERT INTO documento (idnumeracion, idestado, numero, fecha, base, impuestos)
VALUES (2, 1, 5001, '2023-05-15', 200.00, 30.00);
-- documento Documentos B
INSERT INTO documento (idnumeracion, idestado, numero, fecha, base, impuestos)
VALUES (4, 6, 3001, '2023-05-20', 800.00, 120.00);
INSERT INTO documento (idnumeracion, idestado, numero, fecha, base, impuestos)
VALUES (5, 4, 8001, '2023-05-25', 100.00, 15.00);
-- documento Documentos C
INSERT INTO documento (idnumeracion, idestado, numero, fecha, base, impuestos)
VALUES (7, 2, 5001, '2023-05-30', 600.00, 90.00);
INSERT INTO documento (idnumeracion, idestado, numero, fecha, base, impuestos)
VALUES (8, 7, 14001, '2023-06-01', 300.00, 45.00);

-- Tuplas extras para pruebas
-- tipodocumento
INSERT INTO tipodocumento (descripcion) VALUES ('Factura');
INSERT INTO tipodocumento (descripcion) VALUES ('Nota Debito');
INSERT INTO tipodocumento (descripcion) VALUES ('Nota Credito');
-- estado
INSERT INTO estado (descripcion, exitoso) VALUES ('Recibido', true);
INSERT INTO estado (descripcion, exitoso) VALUES ('En validación', true);
INSERT INTO estado (descripcion, exitoso) VALUES ('Formato Incorrecto', false);
-- Numeracion Empresa 1
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (1, 1, 'TAM', 1001, 2000, '2023-01-01', '2023-12-31');
-- Numeracion Empresa 2
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (1, 2, 'TAM', 3001, 4000, '2023-01-01', '2023-12-31');
-- Numeracion Empresa 3
INSERT INTO numeracion (idtipodocumento, idempresa, prefijo, consecutivoinicial, consecutivofinal, vigenciainicial, vigenciafinal)
VALUES (1, 3, 'TAM', 5001, 6000, '2023-01-01', '2023-12-31');
-- Documentos A
INSERT INTO documento (idnumeracion, idestado, numero, fecha, base, impuestos)
VALUES (1, 3, 1001, '2023-05-10', 500.00, 75.00);
-- Documentos B
INSERT INTO documento (idnumeracion, idestado, numero, fecha, base, impuestos)
VALUES (4, 6, 3001, '2023-05-20', 800.00, 120.00);
-- Documentos C
INSERT INTO documento (idnumeracion, idestado, numero, fecha, base, impuestos)
VALUES (7, 2, 5001, '2023-05-30', 600.00, 90.00);
