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
  `token_created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`accountid`),
  UNIQUE KEY `username_uniq` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_account`
--

LOCK TABLES `m_account` WRITE;
/*!40000 ALTER TABLE `m_account` DISABLE KEYS */;
INSERT INTO `m_account` VALUES (34,'quan','$2b$10$2nQ7PaCyyQabWki1yJCbquwItheEyXj8Lvjmy8734DV3ub5thAHBG','Nguyen Duc Quan','ducquank52t1@gmail.com',NULL,NULL,'2002-06-22',_binary '','fd613b7a1fc6f52739b3f82f6fd6ba485b38a249d70779164f3a915879e8a45c','2024-05-10 05:49:34'),(35,'quan2','$2b$10$5Tbnc9S8DDRSPm8vEBQeW.sh/32ZuCTPNR8sDMPt5amh.YsLMmZuC','Nguyen Duc Quan','ducquank52t1@gmail.com',NULL,NULL,'2002-06-22',_binary '','bffa4d1567abc19de3d566dec6097731c59c943afdcfd35f1d729bc573fdd28b','2024-05-09 06:52:08'),(36,'quan3','$2b$10$z2O/TzE.Cm6qyuKMyE4I4e47aAcLOJ4k5Pkjci7AyYvftKJrxe5AC','Nguyen Duc Quan','ducquank52t1@gmail.com',NULL,NULL,NULL,_binary '',NULL,NULL),(37,'quan4','$2b$10$bjoP2dUvvlNMlJBDn9qBWexLoW5gIHej3BieR7sBmP36dxSHTDqHm','Nguyen Duc Quan','ducquank52t1@gmail.com',NULL,NULL,NULL,_binary '',NULL,NULL),(38,'quan5','$2b$10$2AjeEqUK5WdQOY8Wgwr.5evQM7Kvg1KGpZwS0KagO3F.DuLwRJ8Ey','Nguyen Duc Quan','ducquank52t1@gmail.com',NULL,NULL,'2002-06-22',_binary '\0','7ab9b30c037647f58c36eddf91dd635aac6a8cf38dfc2d7b995651f858e1ce41','2024-05-09 07:06:17');
/*!40000 ALTER TABLE `m_account` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`quan`@`localhost`*/ /*!50003 TRIGGER `update_shoper_flag` AFTER UPDATE ON `m_account` FOR EACH ROW BEGIN
    IF NEW.isShoper <> OLD.isShoper THEN
        IF NEW.isShoper = 1 THEN
            INSERT INTO M_shoper (accountID) VALUES (NEW.accountid);
        ELSE
            DELETE FROM M_shoper WHERE accountID = NEW.accountid;
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `m_cart`
--

DROP TABLE IF EXISTS `m_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_cart` (
  `accountID` int NOT NULL,
  `productID` int NOT NULL,
  `quantity` int DEFAULT NULL,
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
  `isPAID` bit(1) DEFAULT NULL,
  `TOTAL` int DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `accountID` (`accountID`),
  KEY `productID` (`productID`),
  KEY `voucherID` (`voucherID`),
  CONSTRAINT `M_order_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `m_account` (`accountid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `M_order_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `m_product` (`productID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `M_order_ibfk_3` FOREIGN KEY (`voucherID`) REFERENCES `m_voucher` (`voucherID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_order`
--

LOCK TABLES `m_order` WRITE;
/*!40000 ALTER TABLE `m_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `m_order` ENABLE KEYS */;
UNLOCK TABLES;

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
  UNIQUE KEY `unique_name` (`name`),
  KEY `categoryID` (`categoryID`),
  KEY `shoperID` (`shoperID`),
  CONSTRAINT `M_product_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `m_productcategory` (`categoryID`),
  CONSTRAINT `M_product_ibfk_2` FOREIGN KEY (`shoperID`) REFERENCES `m_shoper` (`shoperID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_product`
--

LOCK TABLES `m_product` WRITE;
/*!40000 ALTER TABLE `m_product` DISABLE KEYS */;
INSERT INTO `m_product` VALUES (17,'├üo Chß╗æng Nß║»ng 2 Lß╗¢p Nam CHIDORI Chß║Ñt Vß║úi Umi Phß╗æi Hai M├áu Chß╗ë Sß╗æ UTpP50+ Ch├│ng Tia Uv Chß║Ñt Liß╗çu Co Gi├ún Tho├íng M├ít',100,158400,22,6),(20,'D├óy nhß║úy l├╡i c├íp th├⌐p, Chß║Ñt l╞░ß╗úng-Bß╗ün-─Éß║╣p-Rß║╗ v├┤ ─æß╗ïch 8sport, c├│ tß║í sß║»t, d├óy c├íp b├ín lß║╗',100,4950,1,6),(21,'Quß║ºn Short ─É├╣i Tß║¡p Gym Yoga LACORA Chß║íy Bß╗Ö 2 Lß╗¢p C├│ T├║i ─Éß╗▒ng ─Éiß╗çn Thoß║íi- QUAND02',100,99000,1,6),(22,'K├¼m B├│p Tay, K├¼m Tß║¡p C╞í Tay, Dß╗Ñng Cß╗Ñ Tß║¡p Gym Tß║íi Nh├á ─Éiß╗üu Chß╗ënh Lß╗▒c C├│ ─Éß║┐m 5-60kg KICO',100,15000,1,6),(23,'Xe ─æß║íp ─æß╗ïa h├¼nh 26inch TRIOBLADE Nguyß╗àn Thß║úo Mß║½u Mß╗¢i',100,1750000,2,6);
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
INSERT INTO `m_productcategory` VALUES (1,'Th? Thao & Du l?ch',''),(2,'├ö t├┤ - xe m├íy - xe ??p',''),(3,'B├ích h├│a Online',''),(4,'Nh├á C?a & ??i S?ng',''),(5,'S?c ??p',''),(6,'M├íy t├¡nh & Laptop',''),(7,'Vouchers & D?ch v?',''),(8,'M├íy ?nh & M├íy quay phim',''),(9,'Th?i trang n?',''),(10,'T├║i v├¡ n?',''),(12,'M? & B├⌐',''),(13,'Th├║ c?ng',''),(14,'Nh├á S├ích Online',''),(15,'Th?i  trang tr? em',''),(17,'?i?n tho?i v├á ph? ki?n',''),(18,'??ng H?',''),(19,'Thi?t B? ?i?n T?',''),(20,'D├áy D├⌐p Nam',''),(21,'?? Ch?i',''),(22,'Th?i Trang Nam',''),(23,'D├áy D├⌐p N?',''),(24,'Thi?t B? ?i?n Gia D?ng',''),(25,'Gi?t gi? & Ch?m s├│c nh├á c?a',''),(26,'S?c kh?e',''),(27,'Ph? Ki?n & Trang S?c N?','');
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
INSERT INTO `m_productimage` VALUES (17,'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhzto0w2cznp60','https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhzto0w2sfy989',NULL,NULL,NULL,NULL),(20,'https://down-vn.img.susercontent.com/file/77cc6595791595f9f389cc67fb3c5683','https://down-vn.img.susercontent.com/file/766b85f94a95994f2f771b4ee8ce24c5','https://down-vn.img.susercontent.com/file/1c91364554377a6f871344399b22a92c','https://down-vn.img.susercontent.com/file/3a147a89f8ebf9cda80f73376165e7e1','https://down-vn.img.susercontent.com/file/27428ac8f81dfcfd3a82ff6d523777ac','https://down-vn.img.susercontent.com/file/6c792b7b7aa8da0883d741a8943c82f9'),(21,'https://down-vn.img.susercontent.com/file/vn-11134201-23030-ljzt92n9lwove1','https://down-vn.img.susercontent.com/file/sg-11134201-23010-wnedkrc5pymv0c','https://down-vn.img.susercontent.com/file/sg-11134201-23010-71zcurc5pymvcb','https://down-vn.img.susercontent.com/file/sg-11134201-23010-pxzd5rc5pymv2d','https://down-vn.img.susercontent.com/file/sg-11134201-23010-b0i9vuc5pymvc1','https://down-vn.img.susercontent.com/file/sg-11134201-23010-kflc5rc5pymv8f'),(22,'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm777ranj8pr83','https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljximejda8eaa1','https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljximejdh98ifb','https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljximejdbmyqfb','https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljximejdd1j6fe','https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljximejdeg3mc7'),(23,'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu1hdlnfmvbzb3','https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltuiathfoe8a10','https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltuiathfr7d621','https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltuiathfslxm95','https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltuiathfu0i212','https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltuiathfvf2ic7');
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
  `taxid` int DEFAULT NULL,
  `accountID` int DEFAULT NULL,
  PRIMARY KEY (`shoperID`),
  KEY `accountID` (`accountID`),
  CONSTRAINT `M_shoper_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `m_account` (`accountid`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_shoper`
--

LOCK TABLES `m_shoper` WRITE;
/*!40000 ALTER TABLE `m_shoper` DISABLE KEYS */;
INSERT INTO `m_shoper` VALUES (6,NULL,34),(8,NULL,35),(9,NULL,36),(10,NULL,37);
/*!40000 ALTER TABLE `m_shoper` ENABLE KEYS */;
UNLOCK TABLES;

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
  `expried` date DEFAULT NULL,
  `minprice` int DEFAULT NULL,
  `maxdiscount` int DEFAULT NULL,
  PRIMARY KEY (`voucherID`),
  KEY `shoperID` (`shoperID`),
  CONSTRAINT `M_voucher_ibfk_1` FOREIGN KEY (`shoperID`) REFERENCES `m_shoper` (`shoperID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_voucher`
--

LOCK TABLES `m_voucher` WRITE;
/*!40000 ALTER TABLE `m_voucher` DISABLE KEYS */;
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

-- Dump completed on 2024-05-10 22:02:19
