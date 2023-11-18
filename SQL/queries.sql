--1. Listar las empresas que tienen más documentos fallidos que exitosos
SELECT e.idempresa, e.razonsocial,
    COUNT(DISTINCT CASE WHEN d.idestado = 1 THEN d.iddocumento END) AS ok,
    COUNT(DISTINCT CASE WHEN d.idestado = 2 THEN d.iddocumento END) AS fail
FROM empresa e
JOIN numeracion n ON e.idempresa = n.idempresa
JOIN documento d ON n.idnumeracion = d.idnumeracion
GROUP BY
    e.idempresa, e.razonsocial
HAVING
    COUNT(DISTINCT CASE WHEN d.idestado = 2 THEN d.iddocumento END) > 0
    AND COUNT(DISTINCT CASE WHEN d.idestado = 1 THEN d.iddocumento END) <> COUNT(DISTINCT CASE WHEN d.idestado = 2 THEN d.iddocumento END);



--2.  Listar todas las empresas y cuantas facturas, notas débito y notas crédito se han generado entre dos fechas dadas
SELECT e.idempresa, e.razonsocial,
    COUNT(CASE WHEN td.descripcion = 'Factura' AND d.fecha BETWEEN '2023-06-01' AND '2023-11-16' THEN 1 END) AS num_facturas,
    COUNT(CASE WHEN td.descripcion = 'Nota Débito' AND d.fecha BETWEEN '2023-06-01' AND '2023-11-16' THEN 1 END) AS num_notas_debito,
    COUNT(CASE WHEN td.descripcion = 'Nota Crédito' AND d.fecha BETWEEN '2023-06-01' AND '2023-11-16' THEN 1 END) AS num_notas_credito
FROM empresa e
JOIN numeracion n ON e.idempresa = n.idempresa
JOIN documento d ON n.idnumeracion = d.idnumeracion
JOIN tipodocumento td ON n.idtipodocumento = td.idtipodocumento
WHERE d.fecha BETWEEN '2023-06-01' AND '2023-11-16'
GROUP BY e.idempresa, e.razonsocial;



-- 3.  Listar todas las empresas y por cada una, la cantidad de documentos que están en cada uno de los estados
SELECT e.idempresa, e.razonsocial,
    COUNT(CASE WHEN d.idestado = 1 THEN 1 END) AS num_exitosos,
    COUNT(CASE WHEN d.idestado = 2 THEN 1 END) AS num_fallidos
FROM empresa e
JOIN numeracion n ON e.idempresa = n.idempresa
JOIN documento d ON n.idnumeracion = d.idnumeracion
GROUP BY e.idempresa, e.razonsocial;



-- 4. Listar las empresas que tienen más de 3 documentos no exitosos
SELECT e.idempresa, e.razonsocial,
    COUNT(CASE WHEN d.idestado = 2 THEN 1 END) AS num_fallidos
FROM empresa e
JOIN numeracion n ON e.idempresa = n.idempresa
JOIN documento d ON n.idnumeracion = d.idnumeracion
WHERE d.idestado = 2
GROUP BY e.idempresa, e.razonsocial
HAVING COUNT(CASE WHEN d.idestado = 2 THEN 1 END) > 3;



-- 5. Listar por cada empresa, cuantos documentos tiene número o fecha por fuera del rango y vigencia permitido 
--por la DIAN.
SELECT e.idempresa, e.razonsocial,
    COUNT(*) AS fueraRango
FROM empresa e
JOIN numeracion n ON e.idempresa = n.idempresa
JOIN documento d ON n.idnumeracion = d.idnumeracion
WHERE
    d.numero < n.consecutivoinicial OR
    d.numero > n.consecutivofinal OR
    d.fecha < n.vigenciainicial OR
    d.fecha > n.vigenciafinal
GROUP BY e.idempresa, e.razonsocial;



-- 6. Teniendo en cuenta que las facturas suman y las notas debito suman, listar todas las empresas y el total de dinero recibido (base+impuestos).
-- No incluya las notas crédito pues esas relacionan dinero que sale, no que entra.
SELECT e.idempresa, e.razonsocial,
    SUM(d.base + d.impuestos) AS total_recibido
FROM empresa e
JOIN numeracion n ON e.idempresa = n.idempresa
JOIN documento d ON n.idnumeracion = d.idnumeracion
JOIN estado es ON d.idestado = es.idestado
WHERE es.exitoso = TRUE
GROUP BY e.idempresa, e.razonsocial;



-- 7. Teniendo en cuenta que el “número completo” de un documento es la concatenación de su prefijo y su número (ejemplo prefijo PRUE, número 654987, numero completo es PRUE654987), determine si hay algún “número
--completo” repetido en la base de datos (dos empresas pueden tener numeraciones con el mismo prefijo) y 
--cuantas veces se repite
SELECT prefijo || CAST(numero AS VARCHAR) AS numero_completo, COUNT(*) AS frecuencia
FROM empresa e
JOIN numeracion n ON e.idempresa = n.idempresa
JOIN documento d ON n.idnumeracion = d.idnumeracion
GROUP BY numero_completo
HAVING COUNT(*) > 1;
