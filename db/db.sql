-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: delilah_resto
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_pedido` (
  `id_detalle_pedido` int NOT NULL AUTO_INCREMENT,
  `id_pedido` int NOT NULL,
  `id_producto` int NOT NULL,
  `precio_producto` double NOT NULL,
  PRIMARY KEY (`id_detalle_pedido`),
  KEY `detalle_pedido_pedido_idx` (`id_pedido`),
  KEY `detalle_pedido_producto_idx` (`id_producto`),
  CONSTRAINT `detalle_pedido_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`),
  CONSTRAINT `detalle_pedido_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_productos`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `estatus`
--

DROP TABLE IF EXISTS `estatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estatus` (
  `codigo` varchar(45) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `forma_pago`
--

DROP TABLE IF EXISTS `forma_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma_pago` (
  `codigo` varchar(45) NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `fecha_pedido` datetime NOT NULL,
  `total_pago` double NOT NULL,
  `id_usuario` int NOT NULL,
  `codigo_forma_pago` varchar(45) NOT NULL,
  `codigo_estatus` varchar(45) NOT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `pedido_estatus_idx` (`codigo_estatus`),
  KEY `pedido_forma_pago_idx` (`codigo_forma_pago`),
  KEY `pedido_usuario_idx` (`id_usuario`),
  CONSTRAINT `pedido_estatus` FOREIGN KEY (`codigo_estatus`) REFERENCES `estatus` (`codigo`),
  CONSTRAINT `pedido_forma_pago` FOREIGN KEY (`codigo_forma_pago`) REFERENCES `forma_pago` (`codigo`),
  CONSTRAINT `pedido_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_productos` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `imagen` varchar(2000) DEFAULT NULL,
  `precio` int DEFAULT NULL,
  `estado` int DEFAULT '1',
  PRIMARY KEY (`id_productos`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` varchar(50) NOT NULL,
  `nombre` varchar(23) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `activo` tinyint DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `usuario_alias` varchar(45) DEFAULT NULL,
  `nombre_apellido` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `telefono` bigint DEFAULT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `passw` varchar(45) DEFAULT NULL,
  `id_rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `id_rol_fk_idx` (`id_rol`),
  CONSTRAINT `id_rol_fk` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-08 20:05:04

/*INSERCIÓN DE DATOS DE CONFIGURACIÓN*/

/*TABLA ESTATUS PEDIDOS*/
INSERT INTO `delilah_resto`.`estatus` (`codigo`,`descripcion`) VALUES ('PD-01', 'NUEVO');
INSERT INTO `delilah_resto`.`estatus` (`codigo`,`descripcion`) VALUES ('PD-02', 'ENVIADO');
INSERT INTO `delilah_resto`.`estatus` (`codigo`,`descripcion`) VALUES ('PD-03', 'CONFIRMADO');
INSERT INTO `delilah_resto`.`estatus` (`codigo`,`descripcion`) VALUES ('PD-04', 'PREPARANDO');
INSERT INTO `delilah_resto`.`estatus` (`codigo`,`descripcion`) VALUES ('PD-05', 'ENTREGADO');
INSERT INTO `delilah_resto`.`estatus` (`codigo`,`descripcion`) VALUES ('PD-100', 'CANCELADO');

/*TABLA ROLES USUARIOS*/
INSERT INTO `delilah_resto`.`roles` (`id_rol`, `nombre`, `descripcion`, `activo`) VALUES 
('admin', 'administrador', 'administrador del sistema', '1');
INSERT INTO `delilah_resto`.`roles` (`id_rol`, `nombre`, `descripcion`, `activo`) VALUES 
('cliente', 'usuario', 'cliente del restaurante', '1');

/*TABLA FORMA DE PAGO*/
INSERT INTO `delilah_resto`.`forma_pago` (`codigo`, `descripcion`) VALUES ('PGO-01', 'EFECTIVO');
INSERT INTO `delilah_resto`.`forma_pago` (`codigo`, `descripcion`) VALUES ('PGO-02', 'TARJETA');
