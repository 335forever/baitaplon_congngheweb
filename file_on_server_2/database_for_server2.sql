-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: database_for_server2
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `m_account`
--

DROP TABLE IF EXISTS `m_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_account` (
  `accountid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `isShoper` bit(1) NOT NULL DEFAULT b'0',
  `token` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`accountid`),
  UNIQUE KEY `username_uniq` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_account`
--

LOCK TABLES `m_account` WRITE;
/*!40000 ALTER TABLE `m_account` DISABLE KEYS */;
INSERT INTO `m_account` VALUES (34,'quan','$2b$10$UEfQ4FPp4ObAy4YKWboCWus7gu.b.i.NRkk9GPfMYev8IjDDkxw4m','quan','ducquank52t1@gmail.com','0941672663','Ha Noi','2002-06-22',_binary '','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW4iLCJpYXQiOjE3MTc5NTczNzMsImV4cCI6MTcxNzk2ODE3M30.1Ne_mXydFwybLt9Vtf8pjUvRQpz2WxrKtzCb20mGV4E',NULL),(39,'quan2205','$2b$10$ryIdarkmHXTfULXESx1lMeInes3HI2B565iKQ1ji0CHoNvN/e342G','NDQ',NULL,NULL,NULL,NULL,_binary '','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW4yMjA1IiwiaWF0IjoxNzE3OTI0NzQ1LCJleHAiOjE3MTc5MzU1NDV9.u6dwPoacMogQbXG7jHwlykEZMdybv_M3LdjNCpcg6M8',NULL),(40,'quan2205-01','$2b$10$XBxXhg.XSRGuIocVLAQ8a.UmobSv53OmynzKz7Jbzlt6zQ47vzPdm','Your Name',NULL,'0941672663','Ha Noi',NULL,_binary '','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW4yMjA1LTAxIiwiaWF0IjoxNzE2Mzk1MzgwLCJleHAiOjE3MTY0MDYxODB9.RbMN8rSrefUU-WdNhXgbTguzoUAMen2S9O9uMQ6uJLQ',NULL),(43,'quan2205-03','$2b$10$24NHznITG5aeS22.LL70s.YSOg3ASDhPbwUAuUz61IJ9Ox4Av6fgC','quan','ducquank52t1@gmail.com','0941672663','Ha Noi','2002-06-22',_binary '','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW4yMjA1LTAzIiwiaWF0IjoxNzE2NDA1NDQ5LCJleHAiOjE3MTY0MTYyNDl9._MwxFtG6FbvYZVWDtkBIMS-pGCvHlm1OblcfvktjRlw',NULL),(44,'quan2205-04','$2b$10$GFgaeNXWeKl1aNIdeKqaC.Dnv74oO4UeQ0mvlMdB59qi6PusGF1bS','Your Name',NULL,NULL,NULL,NULL,_binary '','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW4yMjA1LTA0IiwiaWF0IjoxNzE3OTQ4NDIyLCJleHAiOjE3MTc5NTkyMjJ9.nHIqk81c5fcJuJjgVLoVv1rBcX4GwgacdO4FoWwC7Uw',NULL),(45,'quan2205-05','$2b$10$WKZmhUYh8WOKXL/.XciATekYCHH8YM0bLblGpfQ.G1fn2mMwS9WZ2','NDQ',NULL,'0941672663',NULL,NULL,_binary '\0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW4yMjA1LTA1IiwiaWF0IjoxNzE3OTYwMDczLCJleHAiOjE3MTc5NzA4NzN9.ICpSnc7Qcs_m2v6NTDFbzIn2inZ8Eqrfa8E_ttp1rUw',NULL),(46,'quan2205-06','$2b$10$kaw6DuZOL34RcMMPePmkBeUKoKeonM7jD0ZvllphG0zNC51ECVOAG','NDQ',NULL,'0941672663',NULL,NULL,_binary '\0',NULL,NULL),(47,'quan0306-01','$2b$10$sK15a7.5qKEttrI3xRVAG.o/dJVcatFlhOyKnGU5AzrRRvLqiprVq','NDQ',NULL,'0941672663',NULL,NULL,_binary '\0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW4wMzA2LTAxIiwiaWF0IjoxNzE3NzUyMzAzLCJleHAiOjE3MTc3NjMxMDN9.nsxWYHyc2Zj4xAm-YdkW5RSX8CaMqIEcCYVOqSSJyxs',NULL),(48,'ragnie','$2b$10$oe9yYy7S3FTKQm3bfjWYU.hal/7VZuS24OmbAjxPjc2kRP6DXc6xC','R.Sohlman','ragnie2602@gmail.com','0947578718',NULL,'2002-10-03',_binary '\0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhZ25pZSIsImlhdCI6MTcxNzc1NjI5NCwiZXhwIjoxNzE3NzY3MDk0fQ.yOJVZ56IqYFRVZXZkj4hASDe-1A3MrJnKoBNJp3qF0o',NULL),(49,'quan0806-01','$2b$10$VA.mC4j66NKtPT4pv5ldm.xurwKLNsbgkti8nvz7MBH0iz8i3LqQK','NDQ',NULL,'0941672663',NULL,NULL,_binary '\0',NULL,NULL),(50,'quan0906-01','$2b$10$Y3JfAzBPpVGkiJQqPgZGKu65cqxMk1vOWuScPQ6EekTW8Filye03O','NDQ',NULL,'0941672663',NULL,NULL,_binary '\0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW4wOTA2LTAxIiwiaWF0IjoxNzE3OTI2MTM4LCJleHAiOjE3MTc5MzY5Mzh9.qQEzdyzMIMPKW8571yL51lTrfFjk_cbpje6cYQdLL_0',NULL),(51,'quan1006-01','$2b$10$s0/Z5ZtjiYjwdtNvtBm1W.WUv4x20FVkm2jVkGykzMw90Gfb//CtW','quan','ducquank52t1@gmail.com','0941672663','Ha Noi','2002-06-22',_binary '','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InF1YW4xMDA2LTAxIiwiaWF0IjoxNzE4MDA1OTk1LCJleHAiOjE3MTgwMTY3OTV9.o44BhKLGfAczu6ptJU0GKng3eSo1mpgzCJFZ11F8lrQ','new_link');
/*!40000 ALTER TABLE `m_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_cart`
--

DROP TABLE IF EXISTS `m_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_cart` (
  `accountID` int NOT NULL,
  `productID` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`accountID`,`productID`),
  KEY `productID` (`productID`),
  CONSTRAINT `M_cart_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `m_account` (`accountid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `M_cart_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `m_product` (`productID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_cart`
--

LOCK TABLES `m_cart` WRITE;
/*!40000 ALTER TABLE `m_cart` DISABLE KEYS */;
INSERT INTO `m_cart` VALUES (43,40,2);
/*!40000 ALTER TABLE `m_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_order`
--

DROP TABLE IF EXISTS `m_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_order` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `accountID` int DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `voucherID` int DEFAULT NULL,
  `isPaid` bit(1) DEFAULT NULL,
  `total` bigint DEFAULT NULL,
  `orderDate` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT NULL,
  `paymentMethod` int DEFAULT NULL,
  `shoperID` int DEFAULT NULL,
  `msgToUser` varchar(255) DEFAULT NULL,
  `msgToShop` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `accountID` (`accountID`),
  KEY `productID` (`productID`),
  KEY `voucherID` (`voucherID`),
  KEY `FK_shoperID` (`shoperID`),
  CONSTRAINT `FK_shoperID` FOREIGN KEY (`shoperID`) REFERENCES `m_shoper` (`shoperID`),
  CONSTRAINT `M_order_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `m_account` (`accountid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `M_order_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `m_product` (`productID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `M_order_ibfk_3` FOREIGN KEY (`voucherID`) REFERENCES `m_voucher` (`voucherID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_order`
--

LOCK TABLES `m_order` WRITE;
/*!40000 ALTER TABLE `m_order` DISABLE KEYS */;
INSERT INTO `m_order` VALUES (10,34,34,2,NULL,_binary '',256000,'2024-06-09 09:02:43',0,0,6,'Hello there',NULL),(11,45,34,2,NULL,_binary '\0',256000,'2024-06-09 17:06:45',2,0,6,NULL,'See you again'),(12,45,34,2,NULL,_binary '\0',256000,'2024-06-09 17:06:53',0,0,6,NULL,NULL),(13,45,34,2,NULL,_binary '\0',256000,'2024-06-09 17:07:45',0,0,6,NULL,'CMNM'),(14,45,34,2,NULL,_binary '\0',256000,'2024-06-09 17:43:46',0,0,6,NULL,'Hello shop');
/*!40000 ALTER TABLE `m_order` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`quan`@`localhost`*/ /*!50003 TRIGGER `update_voucher_quantity` AFTER INSERT ON `m_order` FOR EACH ROW BEGIN
    IF NEW.voucherID != -1 THEN
        UPDATE m_voucher SET quantity = quantity - 1 WHERE voucherID = NEW.voucherID;
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
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`quan`@`localhost`*/ /*!50003 TRIGGER `update_product_quantity` AFTER INSERT ON `m_order` FOR EACH ROW BEGIN
    UPDATE m_product SET quantity = quantity - NEW.quantity WHERE productID = NEW.productID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `m_product`
--

DROP TABLE IF EXISTS `m_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_product` (
  `productID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `categoryID` int DEFAULT NULL,
  `shoperID` int DEFAULT NULL,
  PRIMARY KEY (`productID`),
  KEY `categoryID` (`categoryID`),
  KEY `shoperID` (`shoperID`),
  CONSTRAINT `M_product_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `m_productcategory` (`categoryID`),
  CONSTRAINT `M_product_ibfk_2` FOREIGN KEY (`shoperID`) REFERENCES `m_shoper` (`shoperID`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_product`
--

LOCK TABLES `m_product` WRITE;
/*!40000 ALTER TABLE `m_product` DISABLE KEYS */;
INSERT INTO `m_product` VALUES (34,'Set b??? n??? Banamo Fashion set ??o t?? ????i hai l???p d??y ??o b???n chun to 128',291,128000,9,6),(40,'Set b??? n??? Banamo Fashion set ??o t?? ????i hai l???p d??y ??o b???n chun to 129',253,129000,9,12),(41,'Set b??? n??? Banamo Fashion set ??o t?? ????i hai l???p d??y ??o b???n chun to 129',0,129000,9,13),(42,'B??t M??u 12/24/36/48/60 Acrylic Marker V??? Tr??n M???i Ch???t Li???u C?? Th??? V??? Ch???ng M??u, M??u S???c T????i S??ng D??? S??? D???ng',2548,25000,14,13),(43,'B??t M??u 12/24/36/48/60 Acrylic Marker V??? Tr??n M???i Ch???t Li???u C?? Th??? V??? Ch???ng M??u, M??u S???c T????i S??ng D??? S??? D???ng',2548,25000,14,14),(46,'B??t M??u 12/24/36/48/60 Acrylic Marker V??? Tr??n M???i Ch???t Li???u C?? Th??? V??? Ch???ng M??u, M??u S???c T????i S??ng D??? S??? D???ng',2548,25000,14,6),(48,'B??t M??u Acrylic Marker V??? Tr??n M???i Ch???t Li???u C?? Th??? V??? Ch???ng M??u, M??u S???c T????i S??ng D??? S??? D???ng',2548,26000,14,6);
/*!40000 ALTER TABLE `m_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_productcategory`
--

DROP TABLE IF EXISTS `m_productcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_productcategory` (
  `categoryID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`categoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_productcategory`
--

LOCK TABLES `m_productcategory` WRITE;
/*!40000 ALTER TABLE `m_productcategory` DISABLE KEYS */;
INSERT INTO `m_productcategory` VALUES (1,'Th? Thao & Du l?ch',''),(2,'?? t?? - xe m??y - xe ??p',''),(3,'B??ch h??a Online',''),(4,'Nh?? C?a & ??i S?ng',''),(5,'S?c ??p',''),(6,'M??y t??nh & Laptop',''),(7,'Vouchers & D?ch v?',''),(8,'M??y ?nh & M??y quay phim',''),(9,'Th?i trang n?',''),(10,'T??i v?? n?',''),(12,'M? & B??',''),(13,'Th?? c?ng',''),(14,'Nh?? S??ch Online',''),(15,'Th?i  trang tr? em',''),(17,'?i?n tho?i v?? ph? ki?n',''),(18,'??ng H?',''),(19,'Thi?t B? ?i?n T?',''),(20,'D??y D??p Nam',''),(21,'?? Ch?i',''),(22,'Th?i Trang Nam',''),(23,'D??y D??p N?',''),(24,'Thi?t B? ?i?n Gia D?ng',''),(25,'Gi?t gi? & Ch?m s??c nh?? c?a',''),(26,'S?c kh?e',''),(27,'Ph? Ki?n & Trang S?c N?','');
/*!40000 ALTER TABLE `m_productcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_productimage`
--

DROP TABLE IF EXISTS `m_productimage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_productimage` (
  `productID` int NOT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL,
  `image4` varchar(255) DEFAULT NULL,
  `image5` varchar(255) DEFAULT NULL,
  `image6` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`productID`),
  CONSTRAINT `m_productimage_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `m_product` (`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_productimage`
--

LOCK TABLES `m_productimage` WRITE;
/*!40000 ALTER TABLE `m_productimage` DISABLE KEYS */;
INSERT INTO `m_productimage` VALUES (34,'link1','link2','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a43bda400.61248453.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a43e85354.95577783.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a445db9e3.97880641.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a44bd5f72.56707453.jpg'),(40,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a42835e02.63616726.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a42ec41c5.98337769.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a43bda400.61248453.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a43e85354.95577783.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a445db9e3.97880641.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a44bd5f72.56707453.jpg'),(41,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a42835e02.63616726.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a42ec41c5.98337769.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a43bda400.61248453.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a43e85354.95577783.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a445db9e3.97880641.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e0a44bd5f72.56707453.jpg'),(42,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9828e03.36831353.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9c91ad7.41283981.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9ec3e25.74683923.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17fa175ad8.28980001.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17fa9076b9.84355020.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17faa7e042.46316948.jpg'),(43,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9828e03.36831353.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9c91ad7.41283981.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9ec3e25.74683923.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17fa175ad8.28980001.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17fa9076b9.84355020.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17faa7e042.46316948.jpg'),(46,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9828e03.36831353.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9c91ad7.41283981.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9ec3e25.74683923.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17fa175ad8.28980001.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17fa9076b9.84355020.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17faa7e042.46316948.jpg'),(48,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9828e03.36831353.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9c91ad7.41283981.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17f9ec3e25.74683923.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17fa175ad8.28980001.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17fa9076b9.84355020.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_664e17faa7e042.46316948.jpg');
/*!40000 ALTER TABLE `m_productimage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `m_shoper`
--

DROP TABLE IF EXISTS `m_shoper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_shoper` (
  `shoperID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `taxid` int DEFAULT NULL,
  `accountID` int DEFAULT NULL,
  PRIMARY KEY (`shoperID`),
  KEY `accountID` (`accountID`),
  CONSTRAINT `M_shoper_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `m_account` (`accountid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_shoper`
--

LOCK TABLES `m_shoper` WRITE;
/*!40000 ALTER TABLE `m_shoper` DISABLE KEYS */;
INSERT INTO `m_shoper` VALUES (6,NULL,NULL,NULL,NULL,NULL,NULL,34),(12,NULL,NULL,NULL,NULL,NULL,NULL,39),(13,NULL,NULL,NULL,NULL,NULL,NULL,40),(14,NULL,NULL,NULL,NULL,NULL,NULL,43),(20,'Shop của Quân','0974282109','Ha Noi','ducquank52t1@gmail.com','link_avatar',2206,44),(21,'Shop thu 2 cua Quan','0974282109','Ha Noi','ducquank52t1@gmail.com','link avatar of shop',1009,51);
/*!40000 ALTER TABLE `m_shoper` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`quan`@`localhost`*/ /*!50003 TRIGGER `update_isShoper` AFTER INSERT ON `m_shoper` FOR EACH ROW BEGIN
    UPDATE m_account
    SET isShoper = 1
    WHERE accountID = NEW.accountID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `m_voucher`
--

DROP TABLE IF EXISTS `m_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_voucher` (
  `voucherID` int NOT NULL AUTO_INCREMENT,
  `shoperID` int DEFAULT NULL,
  `discountPercent` int DEFAULT NULL,
  `expired` date DEFAULT NULL,
  `minprice` int DEFAULT NULL,
  `maxdiscount` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`voucherID`),
  KEY `shoperID` (`shoperID`),
  CONSTRAINT `M_voucher_ibfk_1` FOREIGN KEY (`shoperID`) REFERENCES `m_shoper` (`shoperID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_voucher`
--

LOCK TABLES `m_voucher` WRITE;
/*!40000 ALTER TABLE `m_voucher` DISABLE KEYS */;
INSERT INTO `m_voucher` VALUES (5,12,5,'2024-05-30',-1,-1,200),(6,6,15,'2024-05-31',-1,-1,2206),(7,6,10,'2024-05-31',-1,20000,998),(8,6,10,'2024-05-31',300000,20000,1000);
/*!40000 ALTER TABLE `m_voucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-10 15:43:46
