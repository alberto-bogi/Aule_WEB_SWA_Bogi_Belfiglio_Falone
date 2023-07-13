-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: aule_web
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `amministratore`
--

DROP TABLE IF EXISTS `amministratore`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amministratore` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `psw` varchar(200) NOT NULL,
  `versione` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amministratore`
--

LOCK TABLES `amministratore` WRITE;
/*!40000 ALTER TABLE `amministratore` DISABLE KEYS */;
INSERT INTO `amministratore` VALUES (1,'Stefano130101','00000000000000000000000000000000576377a442fa733d4284587721176163622e9d8983149269b06300bfcfe382cf',0);
/*!40000 ALTER TABLE `amministratore` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `associazione_aula_gruppo`
--

DROP TABLE IF EXISTS `associazione_aula_gruppo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `associazione_aula_gruppo` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_aula` int NOT NULL,
  `ID_gruppo` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_aula` (`ID_aula`),
  KEY `ID_gruppo` (`ID_gruppo`),
  CONSTRAINT `associazione_aula_gruppo_ibfk_1` FOREIGN KEY (`ID_aula`) REFERENCES `aula` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `associazione_aula_gruppo_ibfk_2` FOREIGN KEY (`ID_gruppo`) REFERENCES `gruppo` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `associazione_aula_gruppo`
--

LOCK TABLES `associazione_aula_gruppo` WRITE;
/*!40000 ALTER TABLE `associazione_aula_gruppo` DISABLE KEYS */;
INSERT INTO `associazione_aula_gruppo` VALUES (1,1,2),(2,1,1),(3,2,1),(4,2,2),(5,3,1),(6,3,2);
/*!40000 ALTER TABLE `associazione_aula_gruppo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attrezzatura`
--

DROP TABLE IF EXISTS `attrezzatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attrezzatura` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `numero_di_serie` varchar(40) NOT NULL,
  `ID_aula` int DEFAULT NULL,
  `versione` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `ID_aula` (`ID_aula`),
  CONSTRAINT `attrezzatura_ibfk_1` FOREIGN KEY (`ID_aula`) REFERENCES `aula` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attrezzatura`
--

LOCK TABLES `attrezzatura` WRITE;
/*!40000 ALTER TABLE `attrezzatura` DISABLE KEYS */;
INSERT INTO `attrezzatura` VALUES (1,'PROIETTORE','ABC111',1,0),(2,'MONITOR','ABC222',1,0),(3,'LAVAGNA','ABC333',2,0),(4,'PROIETTORE','ABC123',3,0),(5,'MICROFONO','ABC888',1,0),(6,'MONITOR','ABC999',1,0),(7,'LAVAGNA','ABC777',NULL,0),(8,'PROIETTORE','ABC227',NULL,0),(9,'MICROFONO','ABC756',NULL,0);
/*!40000 ALTER TABLE `attrezzatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aula`
--

DROP TABLE IF EXISTS `aula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aula` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(20) NOT NULL,
  `luogo` varchar(20) NOT NULL,
  `edificio` varchar(20) NOT NULL,
  `piano` int NOT NULL,
  `capienza` int NOT NULL,
  `numero_prese_elettriche` int NOT NULL,
  `numero_prese_di_rete` int NOT NULL,
  `note_generiche` text,
  `ID_responsabile` int DEFAULT NULL,
  `versione` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `ID_responsabile` (`ID_responsabile`),
  CONSTRAINT `aula_ibfk_1` FOREIGN KEY (`ID_responsabile`) REFERENCES `responsabile` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aula`
--

LOCK TABLES `aula` WRITE;
/*!40000 ALTER TABLE `aula` DISABLE KEYS */;
INSERT INTO `aula` VALUES (1,'ROSSA','VIA VETOIO,5','RENATO RICAMO',1,60,10,5,'lorem ipsum ...',1,0),(2,'A1.2','VIA VETOIO,5','ALAN TURING',1,40,10,5,'xyz xyz, lorem ipsum, prova descrizione',2,0),(3,'A1.3','VIA PROVA,10','ALAN TURING',1,20,10,5,'....lorem ipsum....',3,0);
/*!40000 ALTER TABLE `aula` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_aula_before_insert` BEFORE INSERT ON `aula` FOR EACH ROW BEGIN 
    DECLARE result INT;
    SELECT ID into result FROM Aula WHERE nome = NEW.nome;
    IF result IS NOT NULL THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'esiste già un\'aula con il seguente nome';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_aula_before_update` BEFORE UPDATE ON `aula` FOR EACH ROW BEGIN 
    DECLARE result INT;
    SELECT count(ID) into result FROM Aula WHERE nome = NEW.nome AND NEW.nome <> OLD.nome;
    IF result > 0 THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'esiste già un\'aula con il seguente nome';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `corso`
--

DROP TABLE IF EXISTS `corso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `corso` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `corso_di_laurea` varchar(30) DEFAULT NULL,
  `tipo_laurea` varchar(20) NOT NULL,
  `anno_di_frequentazione` int DEFAULT NULL,
  `versione` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corso`
--

LOCK TABLES `corso` WRITE;
/*!40000 ALTER TABLE `corso` DISABLE KEYS */;
INSERT INTO `corso` VALUES (1,'MATEMATICA DISCRETA','INFORMATICA','TRIENNALE',2,0),(2,'FISICA','INFORMATICA','TRIENNALE',2,0),(3,'INGLESE B2','INFORMATICA','Triennale',3,0);
/*!40000 ALTER TABLE `corso` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_name_corso_before_insert` BEFORE INSERT ON `corso` FOR EACH ROW BEGIN 
    DECLARE result INT;
    SELECT ID into result FROM Corso WHERE nome = NEW.nome;
    IF result IS NOT NULL THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'esiste già un corso con il seguente nome';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_corso_before_insert` BEFORE INSERT ON `corso` FOR EACH ROW BEGIN 
    DECLARE result INT;
    SELECT ID into result FROM Corso WHERE nome = NEW.nome;
    IF result IS NOT NULL THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'esiste già un corso con il seguente nome';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evento` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  `descrizione` text,
  `tipologia` varchar(15) NOT NULL,
  `data_evento` date NOT NULL,
  `ora_inizio` time NOT NULL,
  `ora_fine` time NOT NULL,
  `ricorrenza` varchar(20) DEFAULT NULL,
  `data_fine_ricorrenza` date DEFAULT NULL,
  `ID_corso` int DEFAULT NULL,
  `ID_responsabile` int DEFAULT NULL,
  `ID_aula` int NOT NULL,
  `versione` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `ID_corso` (`ID_corso`),
  KEY `ID_responsabile` (`ID_responsabile`),
  KEY `ID_aula` (`ID_aula`),
  CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`ID_corso`) REFERENCES `corso` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `evento_ibfk_2` FOREIGN KEY (`ID_responsabile`) REFERENCES `responsabile` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `evento_ibfk_3` FOREIGN KEY (`ID_aula`) REFERENCES `aula` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (1,'LEZIONE MATEMATICA','lezione di matematica discreta, esercitazione per prove parziali','LEZIONE','2023-07-12','11:30:00','20:30:00','SETTIMANALE','2023-08-12',1,1,1,0),(2,'PROVA PARZIALE DI FISICA','prima prova parziali di fisica','PARZIALE','2023-07-13','09:30:00','12:30:00','GIORNALIERA','2023-07-16',2,2,1,0),(3,'ESERCITAZIONE INGLESE','b2 english exam','ESAME','2023-07-12','18:30:00','17:30:00','NESSUNA',NULL,3,3,2,0);
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Ricorrenza` BEFORE INSERT ON `evento` FOR EACH ROW BEGIN
	IF NEW.ricorrenza <> "NESSUNA" and NEW.data_fine_ricorrenza IS NULL THEN
			SIGNAL SQLSTATE '45000' SET message_text = 'Non è stata definita una data di fine per
				la ricorrenza dell\'evento';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Definizione_corso` BEFORE INSERT ON `evento` FOR EACH ROW BEGIN
		if new.tipologia IN ("LEZIONE", "ESAME", "PARZIALE") and new.ID_corso IS NULL
        THEN
			SIGNAL SQLSTATE '45000' SET message_text = 'Non è stato specificato il corso dell\'evento';
		END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_evento_before_insert` BEFORE INSERT ON `evento` FOR EACH ROW BEGIN 
    DECLARE result INT;
    SELECT ID into result FROM Evento WHERE nome = NEW.nome;
    IF result IS NOT NULL THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'un evento con lo stesso nome è già stato programmato';
	END IF;
    SET result = null;
    SELECT ID INTO result FROM Evento WHERE NEW.data_evento = data_evento AND ID_aula = NEW.ID_aula AND ( 
		(NEW.ora_inizio BETWEEN ora_inizio + INTERVAL 1 MINUTE AND ora_fine - INTERVAL 1 MINUTE) OR (NEW.ora_fine BETWEEN ora_inizio + INTERVAL 1 MINUTE AND ora_fine - INTERVAL 1 MINUTE) OR
        (NEW.ora_inizio < ora_inizio AND NEW.ora_fine > ora_fine))  LIMIT 1;
	
    IF result IS NOT NULL THEN 
		SIGNAL SQLSTATE '45000' SET message_text = 'la fascia oraria scelta è già stata programmata';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `inserisci_eventi_ricorrenti` AFTER INSERT ON `evento` FOR EACH ROW BEGIN
	DECLARE data_evento_ricorrente DATE;
	SET data_evento_ricorrente = new.data_evento;
    
	if(new.ricorrenza = "MENSILE") then
    SET data_evento_ricorrente = data_evento_ricorrente + interval 1 month;
		while(data_evento_ricorrente <= new.data_fine_ricorrenza) DO
			call insert_evento_ricorrente(new.ID, data_evento_ricorrente);
            SET data_evento_ricorrente = data_evento_ricorrente + interval 1 month;
            
			end while;
	end if;
    
    if(new.ricorrenza = "GIORNALIERA") then
		SET data_evento_ricorrente = data_evento_ricorrente + interval 1 day;
		while(data_evento_ricorrente <= new.data_fine_ricorrenza) DO
			call insert_evento_ricorrente(new.ID, data_evento_ricorrente);
            SET data_evento_ricorrente = data_evento_ricorrente + interval 1 day;
            
		end while;
	end if;
    
    if(new.ricorrenza = "SETTIMANALE") then
		set data_evento_ricorrente = data_evento_ricorrente + interval 1 week;
		while(data_evento_ricorrente <= new.data_fine_ricorrenza) DO
			call insert_evento_ricorrente(new.ID, data_evento_ricorrente);
            set data_evento_ricorrente = data_evento_ricorrente + interval 1 week;
            
		end while;
	end if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_evento_before_update` BEFORE UPDATE ON `evento` FOR EACH ROW BEGIN 
    DECLARE result INT;
    SELECT ID into result FROM Evento WHERE nome = NEW.nome AND NEW.nome <> OLD.nome;
    IF result IS NOT NULL THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'un evento con lo stesso nome è già stato programmato';
	END IF;
    SET result = null;
    SELECT ID INTO result FROM Evento WHERE NEW.data_evento = data_evento AND NEW.nome <> nome AND ID_aula = NEW.ID_aula AND( 
		(NEW.ora_inizio BETWEEN ora_inizio AND ora_fine) OR (NEW.ora_fine BETWEEN ora_inizio AND ora_fine) OR
        (NEW.ora_inizio < ora_inizio AND NEW.ora_fine > ora_fine))  LIMIT 1;
	
    IF result IS NOT NULL THEN 
		SIGNAL SQLSTATE '45000' SET message_text = 'la fascia oraria scelta è già stata programmata';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `inserisci_eventi_ricorrenti_modifica_evento` AFTER UPDATE ON `evento` FOR EACH ROW BEGIN 
	DECLARE data_evento_ricorrente DATE;
	call delete_eventi_ricorrenti(NEW.ID);
	SET data_evento_ricorrente = NEW.data_evento;
    
	if(NEW.ricorrenza = "MENSILE") then
    SET data_evento_ricorrente = data_evento_ricorrente + interval 1 month;
		while(data_evento_ricorrente <= new.data_fine_ricorrenza) DO
			call insert_evento_ricorrente(new.ID, data_evento_ricorrente);
            SET data_evento_ricorrente = data_evento_ricorrente + interval 1 month;
            
			end while;
	end if;
    
    if(NEW.ricorrenza = "GIORNALIERA") then
		SET data_evento_ricorrente = data_evento_ricorrente + interval 1 day;
		while(data_evento_ricorrente <= new.data_fine_ricorrenza) DO
			call insert_evento_ricorrente(new.ID, data_evento_ricorrente);
            SET data_evento_ricorrente = data_evento_ricorrente + interval 1 day;
            
		end while;
	end if;
    
    if(NEW.ricorrenza = "SETTIMANALE") then
		set data_evento_ricorrente = data_evento_ricorrente + interval 1 week;
		while(data_evento_ricorrente <= new.data_fine_ricorrenza) DO
			call insert_evento_ricorrente(new.ID, data_evento_ricorrente);
            set data_evento_ricorrente = data_evento_ricorrente + interval 1 week;
            
		end while;
	end if;
    
	

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `evento_ricorrente`
--

DROP TABLE IF EXISTS `evento_ricorrente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evento_ricorrente` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `data_evento` date NOT NULL,
  `ID_evento` int NOT NULL,
  `versione` int DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `ID_evento` (`ID_evento`),
  CONSTRAINT `evento_ricorrente_ibfk_1` FOREIGN KEY (`ID_evento`) REFERENCES `evento` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento_ricorrente`
--

LOCK TABLES `evento_ricorrente` WRITE;
/*!40000 ALTER TABLE `evento_ricorrente` DISABLE KEYS */;
INSERT INTO `evento_ricorrente` VALUES (9,'2023-07-19',1,0),(10,'2023-07-26',1,0),(11,'2023-08-02',1,0),(12,'2023-08-09',1,0),(16,'2023-07-14',2,0),(17,'2023-07-15',2,0),(18,'2023-07-16',2,0);
/*!40000 ALTER TABLE `evento_ricorrente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gruppo`
--

DROP TABLE IF EXISTS `gruppo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gruppo` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `descrizione` varchar(60) NOT NULL,
  `versione` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gruppo`
--

LOCK TABLES `gruppo` WRITE;
/*!40000 ALTER TABLE `gruppo` DISABLE KEYS */;
INSERT INTO `gruppo` VALUES (1,'COPPITO','POLO','POLO DI COPPITO UNIVAQ',0),(2,'DISIM','DIPARTIMENTO','DIPERTIMENTO DI INGEGNERIA',0),(3,'ROIO','POLO','POLO DI ROIO UNIVAQ',0);
/*!40000 ALTER TABLE `gruppo` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_gruppo_before_insert` BEFORE INSERT ON `gruppo` FOR EACH ROW BEGIN
	DECLARE result INT;
    SELECT ID INTO result FROM Gruppo WHERE NEW.nome = nome;
    
    IF result IS NOT NULL THEN 
		SIGNAL SQLSTATE '45000' SET message_text = 'questo nome è già associato ad un\'organizzazione universitaria';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_gruppo_before_update` BEFORE UPDATE ON `gruppo` FOR EACH ROW BEGIN
	DECLARE result INT;
    SELECT ID INTO result FROM Gruppo WHERE NEW.nome = nome AND NEW.nome <> OLD.nome;
    
    IF result IS NOT NULL THEN 
		SIGNAL SQLSTATE '45000' SET message_text = 'questo nome è già associato ad un\'organizzazione universitaria';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `responsabile`
--

DROP TABLE IF EXISTS `responsabile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsabile` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(20) NOT NULL,
  `cognome` varchar(20) NOT NULL,
  `codice_fiscale` char(16) NOT NULL,
  `email` varchar(50) NOT NULL,
  `versione` int DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsabile`
--

LOCK TABLES `responsabile` WRITE;
/*!40000 ALTER TABLE `responsabile` DISABLE KEYS */;
INSERT INTO `responsabile` VALUES (1,'ANTONIO','VERDI','VRDNTN97W52A131K','antonio.verdi@univaq.it',0),(2,'MARIO','ROSSI','MRORSS89W12E734T','mario.rossi@univaq.it',0),(3,'GIUSEPPE','FRANCANTONIO','GSPFRC75G12S667Y','giuseppe.francantonio@univaq.it',0);
/*!40000 ALTER TABLE `responsabile` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `check_responsabile_before_insert` BEFORE INSERT ON `responsabile` FOR EACH ROW BEGIN 
    DECLARE result INT;
    DECLARE codice_fiscale char(16); 
    SET codice_fiscale = NEW.codice_fiscale;
    SELECT 	LENGTH(codice_fiscale) = 16
			AND codice_fiscale REGEXP '^[A-Z0-9]+$'
			AND SUBSTRING(codice_fiscale, 1, 6) REGEXP '^[A-Z]+$'
			AND SUBSTRING(codice_fiscale, 7, 2) REGEXP '^[0-9]+$'
			AND SUBSTRING(codice_fiscale, 9, 1) REGEXP '^[A-Z]+$'
			AND SUBSTRING(codice_fiscale, 10, 2) REGEXP '^[0-9]+$'
			AND SUBSTRING(codice_fiscale, 12, 1) REGEXP '^[A-Z]+$'
			AND SUBSTRING(codice_fiscale, 13, 3) REGEXP '^[0-9]+$'
			AND SUBSTRING(codice_fiscale, 16, 1) REGEXP '^[A-Z]+$'
			INTO result;
    IF result = 0 THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'Il codice fiscale non rispetta la struttura corretta';
	END IF;	
    SET result = null;
    SELECT ID into result FROM Responsabile WHERE email = NEW.email;
    IF result IS NOT NULL THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'questa mail è usata già da un utente';
	END IF;
    SET result = null;
    SELECT NEW.email LIKE '%@univaq.it' INTO result;
    IF result = 0 THEN
		SIGNAL SQLSTATE '45000' SET message_text = 'la mail deve appartenere al dominio dell\'università';
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'aule_web'
--

--
-- Dumping routines for database 'aule_web'
--
/*!50003 DROP PROCEDURE IF EXISTS `checkNomeAula` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `checkNomeAula`(nome_input varchar(20))
BEGIN
	select ID from aula where nome = nome_input limit 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_eventi_ricorrenti` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_eventi_ricorrenti`(ID INTEGER)
BEGIN
	DELETE FROM evento_ricorrente WHERE ID_evento = ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_evento_ricorrente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_evento_ricorrente`(ID INTEGER, data_evento_ricorrente DATE)
BEGIN
	insert into evento_ricorrente(data_evento, ID_evento) values (data_evento_ricorrente, ID);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `verifyNomeAula` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `verifyNomeAula`(nome_input varchar(20))
BEGIN
	select ID from aula where nome = nome_input limit 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-13 11:23:43
