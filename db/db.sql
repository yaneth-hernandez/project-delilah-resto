CREATE DATABASE IF NOT EXISTS delilah_resto;

USE delilah_resto;

CREATE TABLE clientes (
id_cliente INT(11) NOT NULL AUTO_INCREMENT, 
usuario VARCHAR(45) DEFAULT NULL,
nombre_completo VARCHAR(45) DEFAULT NULL,
email VARCHAR(45) DEFAULT NULL,
telefono INT(11) DEFAULT NULL,
direccion VARCHAR(45) DEFAULT NULL,
passw VARCHAR(45) DEFAULT NULL,
PRIMARY KEY (id_cliente)
);
DESCRIBE clientes;

SELECT * FROM clientes;clientes
