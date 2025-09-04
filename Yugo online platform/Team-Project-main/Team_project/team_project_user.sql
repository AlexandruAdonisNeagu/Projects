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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int NOT NULL,
  `student_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `User_fk1` (`teacher_id`),
  KEY `User_fk0` (`student_id`),
  CONSTRAINT `User_fk0` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  CONSTRAINT `User_fk1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'alexbenchea@benchea.co','bencheaboss',1,NULL,1),(2,'scursaru@benchea.co','bencheaboss2',1,NULL,2),(3,'scrumaru@benchea.co','bencheaboss3',1,NULL,3),(6,'sebastar59@gmail.com','pass1346',2,1,NULL),(8,'andree@gmail.coma','test123',2,3,NULL),(9,'andree@gmail.coma','test123',2,4,NULL),(10,'andree@gmail.coma','test123',2,5,NULL),(11,'andree@gmail.coma','test123',2,6,NULL),(12,'andree@gmail.coma','test123',2,7,NULL),(13,'alexneag@eboss.co.ro','praola123',2,8,NULL),(14,'alexandrubenchea99@gmail.com','123456',2,9,NULL),(15,'alexandrubenchea89@gmail.com','123456',2,10,NULL),(16,'alexandrubenchea79@gmail.com','$2b$12$9j0Un12GZU1dwLU99H7mzeD3hkzCsjjHFgxqLKe7.cyp28xcp8Hc.',2,11,NULL),(17,'alexandrubenchea@gmail.com','$2b$12$CF8KRfFjCIRfdGsv1i.EDuPglPew7LZG3xen48/aNwZn4rHvRR40G',2,12,NULL),(18,'caca@caca.com','$2b$12$kW6JAhcQyIzQOcwJUnhXfeYAxnQOQxVIZ.sl32kfI9N4UOcQaDU/G',2,13,NULL),(19,'teo@teo.com','$2b$12$9p5Xraa1KBlxIGEXrpFbku7pRuauYrspF9mh0HOio3WXZxAdi0UKW',2,14,NULL),(20,'jora@jora.com','$2b$12$xpiF6d95T/xLuPy3s7Er0eMCjVIHgFzg/Vkx9137OtIax0bJNHzuC',2,15,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
