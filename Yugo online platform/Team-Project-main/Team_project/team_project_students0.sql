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
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` varchar(10) NOT NULL,
  `full_name` varchar(35) DEFAULT NULL,
  `home_address` varchar(40) NOT NULL,
  `term_address` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Students_fk0` (`course_id`),
  CONSTRAINT `Students_fk0` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'cor002','Gabriel-Sebastian Visan','Somewhere in Romania','Stoddart Street'),(2,'cor002','Andreea Ceva','Somewhere in Bulgaria','Somewhere in Newcastle'),(3,'cor002','Andreea Ceva','Somewhere in Bulgaria','Somewhere in Newcastle'),(4,'cor002','Andreea Ceva','Somewhere in Bulgaria','Somewhere in Newcastle'),(5,'cor002','Andreea Ceva','Somewhere in Bulgaria','Somewhere in Newcastle'),(6,'cor002','Andreea Ceva','Somewhere in Bulgaria','Somewhere in Newcastle'),(7,'cor002','Alex Neagu','Strada Movilei','Fenom'),(8,'cor001','Benchea Alex','Romanitei 12','Codrul cosminului 22'),(9,'cor001','Alex madianez','asd','fdsa'),(10,'cor002','asda','asda','sadsad'),(11,'cor002','asdf','asdf','asdf'),(12,'cor003','Caca Maca','asda','afsd'),(13,'cor002','Teo','123','123'),(14,'cor001','Ana Jora','asdfa','asfdawsf'),(15,'cor002','Diana Popescu','56 Northumbarland','rkjgbselbkg'),(16,'cor003','Diana Prahoveanu','fedegejf','ghhkk'),(17,'cor003','Curcubea ','fghhj','fghjkl'),(18,'cor002','Ana Petcu','67 Farandlae Road','78 City Road'),(19,'cor002','Ana Popescu ','78 Bremish Street','98 City Road '),(20,'cor002','Bianca Vergu','77 Lime Square','89 Byker Street'),(21,'cor003','Gabriela Nuta','89 Fenham Road','12 Byker Avenue'),(22,'cor001','Adonis Ion','45 Knoull Court','78 Northumbarland Street');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-26  0:00:59
