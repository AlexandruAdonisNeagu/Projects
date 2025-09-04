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
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` varchar(10) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Modules` varchar(255) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('cor001','Computer Science ','Web_Dev,Programing,SQL_Basics','2021-09-15 00:00:00','2021-09-15 00:00:00'),('cor002','Computer Science with Web Development ','Web_Dev,Programing,SQL_Basics','2021-09-15 00:00:00','2021-09-15 00:00:00'),('cor003','Computer Science with Artificial Inteligence ','Python_Basics,Programing,SQL_Basics','2021-09-15 00:00:00','2021-09-15 00:00:00');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coursemodule`
--

DROP TABLE IF EXISTS `coursemodule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursemodule` (
  `course_id` varchar(10) NOT NULL,
  `module_id` varchar(10) NOT NULL,
  KEY `CourseModule_fk0` (`course_id`),
  KEY `CourseModule_fk1` (`module_id`),
  CONSTRAINT `CourseModule_fk0` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `CourseModule_fk1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursemodule`
--

LOCK TABLES `coursemodule` WRITE;
/*!40000 ALTER TABLE `coursemodule` DISABLE KEYS */;
INSERT INTO `coursemodule` VALUES ('cor001','mod001'),('cor001','mod003'),('cor001','mod002'),('cor002','mod001'),('cor002','mod002'),('cor002','mod003'),('cor003','mod004'),('cor003','mod002'),('cor003','mod003');
/*!40000 ALTER TABLE `coursemodule` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,17,'mod001','test','2021-04-18 14:54:48'),(2,17,'mod001','sper sa mearga','2021-04-18 14:59:12'),(3,17,'mod001','test','2021-04-18 14:49:24'),(4,17,'mod001','test','2021-04-18 15:04:39'),(5,17,'mod001','lol','2021-04-18 15:05:42'),(6,17,'mod001','muie','2021-04-18 15:28:13'),(7,17,'mod001','caca','2021-04-18 15:35:46'),(8,17,'mod001','oare','2021-04-18 15:43:21'),(9,17,'mod001','de ce sunt un labagiu coaie?','2021-04-18 15:43:31'),(10,19,'mod001','ce faci ana?','2021-04-18 15:49:14'),(11,19,'mod001','ted','2021-04-18 15:49:29'),(12,19,'mod001','muie constantin','2021-04-18 15:49:56'),(13,17,'mod001','te fac o tura cu masina?','2021-04-18 15:50:11'),(14,19,'mod001','da','2021-04-18 15:50:16'),(15,19,'mod001','dar sa stii, ca nu ma futr cu tine din prima..','2021-04-18 16:02:04'),(16,19,'mod002','ce faci?','2021-04-18 16:03:55'),(17,17,'mod002','uite, pe acasa, tu?','2021-04-18 16:04:02'),(18,19,'mod002','uite, dau ceva la curiosi.. ;)','2021-04-18 16:06:49'),(19,17,'mod002','hai ca esti nesimtit','2021-04-18 16:06:59'),(20,19,'mod002','hai tu, nu te futi cu mine?','2021-04-18 16:08:47'),(21,17,'mod002','caca','2021-04-18 16:09:01'),(22,19,'mod002','test','2021-04-18 16:09:08'),(23,19,'mod002','acum te futi?','2021-04-18 16:10:25'),(24,17,'mod002','bine mma, hai ca ma fut daca e','2021-04-18 16:10:40'),(25,19,'mod002','pe la 8 la mine e ok?','2021-04-18 16:10:47'),(26,17,'mod002','test','2021-04-18 16:11:17'),(27,17,'mod002','caca','2021-04-18 16:14:09'),(28,17,'mod002','test','2021-04-18 16:15:55'),(29,17,'mod002','nush ba','2021-04-18 16:16:06'),(30,19,'mod002','e nu stii, lasa vrajeala','2021-04-18 16:17:17'),(31,17,'mod002','jur man, nu eu am fost','2021-04-18 16:17:27'),(32,19,'mod001','bine, ma mai gandesc de fapt','2021-04-18 16:18:29'),(33,17,'mod001','','2021-04-18 16:18:49'),(34,17,'mod001','lol','2021-04-18 16:19:10'),(35,19,'mod001','intro','2021-04-18 16:19:15'),(36,19,'mod001','ce se intampla?','2021-04-18 16:21:11'),(37,17,'mod001','nu stiu, nu merge deloc','2021-04-18 16:21:19'),(38,19,'mod001','acum merge, aia e','2021-04-18 16:21:29'),(39,19,'mod001','lllll','2021-04-18 16:21:53'),(40,17,'pc_1_12','salut Visan','2021-04-18 17:09:29'),(41,17,'pc_1_12','ce fac','2021-04-18 17:09:37'),(42,17,'pc_1_12','ce fac','2021-04-18 17:09:39'),(43,17,'pc_1_12','ce fac','2021-04-18 17:09:42'),(44,17,'pc_2_12','buna ziua Domn profesor, nu prea imi merge internetul..','2021-04-18 17:12:22'),(45,1,'mod001','ce faceti ma parlitilor?','2021-04-18 17:56:02'),(46,1,'mod001','test','2021-04-18 17:56:19'),(47,19,'mod003','domn profesor, va put picioarele','2021-04-18 17:59:34'),(48,1,'mod003','da, ne vedem in toamna cretinule','2021-04-18 18:00:16'),(49,19,'mod003','sa ma sugi de pula','2021-04-18 18:00:22'),(50,19,'mod003','da de ce nu merge','2021-04-18 18:02:04'),(51,1,'mod003','merge boule, esti tu prost','2021-04-18 18:02:11'),(52,19,'mod001','caca','2021-04-18 18:04:02'),(53,20,'pc_1_15','sarumana domn profesor','2021-04-18 23:27:04'),(54,1,'pc_1_15','Da ana, cu ce te pot ajuta?','2021-04-18 23:27:52'),(55,20,'pc_1_15','am o restanta, oare nu o putem rezolva altfel..','2021-04-18 23:28:30'),(56,1,'pc_1_15','Ba cum sa nu','2021-04-18 23:28:39'),(57,1,'pc_1_15','am o restanta, oare nu o putem rezolva altfel..','2021-04-18 23:29:29'),(58,1,'mod001','ckjsdbvbsvli','2021-04-25 22:01:20'),(59,25,'pc_1_21','Buna siuaaa','2021-04-25 22:52:53'),(60,25,'pc_2_21','bla','2021-04-25 22:54:00'),(61,33,'pc_2_20','buna ziua ','2021-04-25 23:26:55'),(62,33,'pc_1_20','hei','2021-04-26 16:10:48'),(63,33,'pc_1_20','','2021-04-26 16:37:15'),(64,33,'pc_1_20','hei ','2021-04-26 16:41:35'),(65,33,'pc_1_20','','2021-04-26 16:41:36'),(66,33,'pc_1_20','','2021-04-26 16:41:36'),(67,35,'pc_2_22','hei ','2021-04-26 16:44:12'),(68,35,'pc_2_22','','2021-04-26 16:46:48'),(69,35,'pc_2_22','','2021-04-26 16:46:49'),(70,35,'pc_2_22','','2021-04-26 16:53:32'),(71,35,'pc_2_22','','2021-04-26 16:53:33'),(72,35,'pc_2_22','','2021-04-26 16:53:34'),(73,35,'pc_2_22','','2021-04-26 16:53:37'),(74,35,'pc_2_22','Buna siua ','2021-04-26 17:28:00'),(75,35,'pc_1_22','Hello','2021-04-26 18:39:43'),(76,35,'mod001','hei','2021-04-26 18:42:48'),(77,1,'pc_1_15','dua','2021-04-26 18:47:15');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `id` varchar(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `teacher_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Module_fk0` (`teacher_id`),
  CONSTRAINT `Module_fk0` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES ('mod001','Web Development','2021-09-15 00:00:00','2021-12-15 00:00:00',1),('mod002','SQL Basics','2021-09-15 00:00:00','2021-12-15 00:00:00',1),('mod003','Programming','2021-09-15 00:00:00','2021-12-15 00:00:00',2),('mod004','Python Basics','2021-09-15 00:00:00','2021-12-15 00:00:00',3);
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `id` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('mod001','','2021-04-18 14:45:41'),('mod002','','2021-04-18 15:42:04'),('mod003','','2021-04-18 17:59:15'),('mod004','','2021-04-26 21:10:39'),('pc_1_12','','2021-04-18 17:07:14'),('pc_1_15','','2021-04-18 23:26:56'),('pc_1_17','','2021-04-26 16:20:40'),('pc_1_20','','2021-04-26 16:09:15'),('pc_1_21','','2021-04-25 22:52:36'),('pc_1_22','','2021-04-26 16:48:38'),('pc_2_12','','2021-04-18 17:12:06'),('pc_2_20','','2021-04-25 23:26:48'),('pc_2_21','','2021-04-25 22:53:44'),('pc_2_22','','2021-04-26 16:43:33'),('pc_3_12','','2021-04-26 20:54:34');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room users`
--

DROP TABLE IF EXISTS `room users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room users` (
  `room_id` varchar(10) NOT NULL,
  `user_id` int NOT NULL,
  KEY `Room Users_fk1` (`user_id`),
  KEY `Room Users_fk0` (`room_id`),
  CONSTRAINT `Room Users_fk0` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  CONSTRAINT `Room Users_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room users`
--

LOCK TABLES `room users` WRITE;
/*!40000 ALTER TABLE `room users` DISABLE KEYS */;
/*!40000 ALTER TABLE `room users` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `students` VALUES (1,'cor002','Gabriel-Sebastian Visan','Somewhere in Romania','Stoddart Street'),(2,'cor002','Andreea Ceva','Somewhere in Bulgaria','Somewhere in Newcastle'),(3,'cor002','Andreea Ceva','Somewhere in Bulgaria','Somewhere in Newcastle'),(4,'cor002','Andreea Ceva','Somewhere in Bulgaria','Somewhere in Newcastle'),(5,'cor002','Andreea Ceva','Somewhere in Bulgaria','Somewhere in Newcastle'),(6,'cor002','Andreea Ceva','Somewhere in Bulgaria','Somewhere in Newcastle'),(7,'cor002','Alex Neagu','Strada Movilei','Fenom'),(8,'cor001','Benchea Alex','Romanitei 12','Codrul cosminului 22'),(9,'cor001','Alex madianez','asd','fdsa'),(10,'cor002','asda','asda','sadsad'),(11,'cor002','asdf','asdf','asdf'),(12,'cor003','Caca Maca','asda','afsd'),(13,'cor002','Teo','123','123'),(15,'cor001','Ana Jora','asdfa','asfdawsf'),(16,'cor003','Diana Prahoveanu','fedegejf','ghhkk'),(17,'cor003','Curcubea ','fghhj','fghjkl'),(18,'cor002','Ana Petcu','67 Farandlae Road','78 City Road'),(19,'cor002','Ana Popescu ','78 Bremish Street','98 City Road '),(20,'cor002','Bianca Vergu','77 Lime Square','89 Byker Street'),(21,'cor003','Gabriela Nuta','89 Fenham Road','12 Byker Avenue'),(22,'cor001','Adonis Ion','45 Knoull Court','78 Northumbarland Street');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers`
--

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
INSERT INTO `teachers` VALUES (1,'Alex Benchea'),(2,'Scursaru Andrei'),(3,'Scrumaru Serban');
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'alexbenchea@benchea.co','bencheaboss',1,NULL,1),(2,'scursaru@benchea.co','bencheaboss2',1,NULL,2),(3,'scrumaru@benchea.co','bencheaboss3',1,NULL,3),(6,'sebastar59@gmail.com','pass1346',2,1,NULL),(8,'andree@gmail.coma','test123',2,3,NULL),(9,'andree@gmail.coma','test123',2,4,NULL),(10,'andree@gmail.coma','test123',2,5,NULL),(11,'andree@gmail.coma','test123',2,6,NULL),(12,'andree@gmail.coma','test123',2,7,NULL),(13,'alexneag@eboss.co.ro','praola123',2,8,NULL),(14,'alexandrubenchea99@gmail.com','123456',2,9,NULL),(15,'alexandrubenchea89@gmail.com','123456',2,10,NULL),(16,'alexandrubenchea79@gmail.com','$2b$12$9j0Un12GZU1dwLU99H7mzeD3hkzCsjjHFgxqLKe7.cyp28xcp8Hc.',2,11,NULL),(17,'alexandrubenchea@gmail.com','$2b$12$CF8KRfFjCIRfdGsv1i.EDuPglPew7LZG3xen48/aNwZn4rHvRR40G',2,12,NULL),(18,'caca@caca.com','$2b$12$kW6JAhcQyIzQOcwJUnhXfeYAxnQOQxVIZ.sl32kfI9N4UOcQaDU/G',2,13,NULL),(19,'teo@teo.com','$2b$12$9p5Xraa1KBlxIGEXrpFbku7pRuauYrspF9mh0HOio3WXZxAdi0UKW',2,14,NULL),(20,'jora@jora.com','$2b$12$xpiF6d95T/xLuPy3s7Er0eMCjVIHgFzg/Vkx9137OtIax0bJNHzuC',2,15,NULL),(23,'curcubeu@yahoo.com','$2b$12$hg62fCzvmDC0VmcgE2nE0.FJFCotkvLTo/GrGTPKvKF351.hDuCBa',2,17,NULL),(31,'anapetcu@yahoo.com','$2b$12$2TPRCfe.TKLLI6ENq/2MNOyFWXBA7nCgi51TbAIlL9ifNzBa5NZBe',2,18,NULL),(32,'anapopescu@gmail.com','$2b$12$je.YCXrLq7d2mz3xkgMs.uZbpaasOz0cawX1IvFgDiuKYzqBuGwLS',2,19,NULL),(33,'biancavergu@gmail.com','$2b$12$.JpyKAQmBeCYLalkxCLowuokDC18Xg5YjUUq3DVuY.LplQfcUMOtK',2,20,NULL),(34,'gabrielanuta@gmail.ro','$2b$12$HRgtVdGbshppe.laPE8zueJy//tFL2z0j676bhdhJ0yPUZMB4wj4u',2,21,NULL),(35,'adonision@yahoo.com','$2b$12$dVx7Cun2ieFr2aaVD/65DeQqJ9YGsgTbypJialdbyNCaiTne4qxMK',2,22,NULL);
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

-- Dump completed on 2021-04-26 23:33:15
