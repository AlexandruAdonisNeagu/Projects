-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: team_project
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `room_id` varchar(10) NOT NULL,
  `text` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Message_fk0` (`user_id`),
  KEY `Message_fk1` (`room_id`),
  CONSTRAINT `Message_fk0` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `Message_fk1` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,17,'mod001','test','2021-04-18 14:54:48'),(2,17,'mod001','sper sa mearga','2021-04-18 14:59:12'),(3,17,'mod001','test','2021-04-18 14:49:24'),(4,17,'mod001','test','2021-04-18 15:04:39'),(5,17,'mod001','lol','2021-04-18 15:05:42'),(6,17,'mod001','muie','2021-04-18 15:28:13'),(7,17,'mod001','caca','2021-04-18 15:35:46'),(8,17,'mod001','oare','2021-04-18 15:43:21'),(9,17,'mod001','de ce sunt un labagiu coaie?','2021-04-18 15:43:31'),(10,19,'mod001','ce faci ana?','2021-04-18 15:49:14'),(11,19,'mod001','ted','2021-04-18 15:49:29'),(12,19,'mod001','muie constantin','2021-04-18 15:49:56'),(13,17,'mod001','te fac o tura cu masina?','2021-04-18 15:50:11'),(14,19,'mod001','da','2021-04-18 15:50:16'),(15,19,'mod001','dar sa stii, ca nu ma futr cu tine din prima..','2021-04-18 16:02:04'),(16,19,'mod002','ce faci?','2021-04-18 16:03:55'),(17,17,'mod002','uite, pe acasa, tu?','2021-04-18 16:04:02'),(18,19,'mod002','uite, dau ceva la curiosi.. ;)','2021-04-18 16:06:49'),(19,17,'mod002','hai ca esti nesimtit','2021-04-18 16:06:59'),(20,19,'mod002','hai tu, nu te futi cu mine?','2021-04-18 16:08:47'),(21,17,'mod002','caca','2021-04-18 16:09:01'),(22,19,'mod002','test','2021-04-18 16:09:08'),(23,19,'mod002','acum te futi?','2021-04-18 16:10:25'),(24,17,'mod002','bine mma, hai ca ma fut daca e','2021-04-18 16:10:40'),(25,19,'mod002','pe la 8 la mine e ok?','2021-04-18 16:10:47'),(26,17,'mod002','test','2021-04-18 16:11:17'),(27,17,'mod002','caca','2021-04-18 16:14:09'),(28,17,'mod002','test','2021-04-18 16:15:55'),(29,17,'mod002','nush ba','2021-04-18 16:16:06'),(30,19,'mod002','e nu stii, lasa vrajeala','2021-04-18 16:17:17'),(31,17,'mod002','jur man, nu eu am fost','2021-04-18 16:17:27'),(32,19,'mod001','bine, ma mai gandesc de fapt','2021-04-18 16:18:29'),(33,17,'mod001','','2021-04-18 16:18:49'),(34,17,'mod001','lol','2021-04-18 16:19:10'),(35,19,'mod001','intro','2021-04-18 16:19:15'),(36,19,'mod001','ce se intampla?','2021-04-18 16:21:11'),(37,17,'mod001','nu stiu, nu merge deloc','2021-04-18 16:21:19'),(38,19,'mod001','acum merge, aia e','2021-04-18 16:21:29'),(39,19,'mod001','lllll','2021-04-18 16:21:53'),(40,17,'pc_1_12','salut Visan','2021-04-18 17:09:29'),(41,17,'pc_1_12','ce fac','2021-04-18 17:09:37'),(42,17,'pc_1_12','ce fac','2021-04-18 17:09:39'),(43,17,'pc_1_12','ce fac','2021-04-18 17:09:42'),(44,17,'pc_2_12','buna ziua Domn profesor, nu prea imi merge internetul..','2021-04-18 17:12:22'),(45,1,'mod001','ce faceti ma parlitilor?','2021-04-18 17:56:02'),(46,1,'mod001','test','2021-04-18 17:56:19'),(47,19,'mod003','domn profesor, va put picioarele','2021-04-18 17:59:34'),(48,1,'mod003','da, ne vedem in toamna cretinule','2021-04-18 18:00:16'),(49,19,'mod003','sa ma sugi de pula','2021-04-18 18:00:22'),(50,19,'mod003','da de ce nu merge','2021-04-18 18:02:04'),(51,1,'mod003','merge boule, esti tu prost','2021-04-18 18:02:11'),(52,19,'mod001','caca','2021-04-18 18:04:02'),(53,20,'pc_1_15','sarumana domn profesor','2021-04-18 23:27:04'),(54,1,'pc_1_15','Da ana, cu ce te pot ajuta?','2021-04-18 23:27:52'),(55,20,'pc_1_15','am o restanta, oare nu o putem rezolva altfel..','2021-04-18 23:28:30'),(56,1,'pc_1_15','Ba cum sa nu','2021-04-18 23:28:39'),(57,1,'pc_1_15','am o restanta, oare nu o putem rezolva altfel..','2021-04-18 23:29:29');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-19 22:36:55
