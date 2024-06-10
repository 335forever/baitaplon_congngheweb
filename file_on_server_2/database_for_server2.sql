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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_account`
--

LOCK TABLES `m_account` WRITE;
/*!40000 ALTER TABLE `m_account` DISABLE KEYS */;
INSERT INTO `m_account` VALUES (52,'sennguyen','$2b$10$.eMEOx/xpEarh3ZCc1mIj.PbELofbkzv2tSxvDnjPW.zpJahRftv6','Sen Nguy???n','lastmonthtodestination@gmail.com','0974282109','Ch??a L??ng, H?? N???i','2002-09-10',_binary '\0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNlbm5ndXllbiIsImlhdCI6MTcxODA0NDA4MCwiZXhwIjoxNzE4MDU0ODgwfQ.JukFy3gEK78XrXQPKLkuPe9qvdpPPqHh2pmeJ46nduA','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666d6016fb434.61992627.jpg'),(53,'ducquan','$2b$10$NzYoJ.iZUds.BaM.oXPbwuPBu2JqEVvne/XMCdKHZmSiBY487JNYy','Nguy???n ?????c Qu??n','lastmonthtodestination@gmail.com','0941672663','Tr????ng ?????nh, H?? N???i','2002-06-22',_binary '\0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1Y3F1YW4iLCJpYXQiOjE3MTgwNDE0NTUsImV4cCI6MTcxODA1MjI1NX0.bWM7T6w1CZj7sc_7AVZey-zE_QjnLvf_AUf-2jMfZm8','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666ee27ebcf08.73463792.jpg'),(54,'ragnie','$2b$10$jwePmzmXyJreL98AENTm5.zOy7MQg95Dat0IFyveO.Mp.fSZIh0sO','B??i Anh Qu???c','p.lyquangk.lythedan@gmail.com','0947578718','75 tam  trinh, Mai ?????ng, Ho??ng Mai, H?? N???i ','2002-10-03',_binary '\0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhZ25pZSIsImlhdCI6MTcxODAyODA0MSwiZXhwIjoxNzE4MDM4ODQxfQ.uaZrn186aFBbBh7Qhk0v0yAxg8-yDmwRUPY2Aaj9t3U','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6667010d5f6000.44895825.jpg'),(55,'Hider1234','$2b$10$hrDAxqk1.P0gWt47JVo9Ae03Rc21Ezvtn5T7m8JNasM1Dnms6s3Yy','Ng?? Ng???c S??m',NULL,NULL,NULL,NULL,_binary '\0','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhpZGVyMTIzNCIsImlhdCI6MTcxODAzMDg0OCwiZXhwIjoxNzE4MDQxNjQ4fQ.DuqHGzHz54bdHEhxZ0UaiYO9j8L9xb8N1xpjyM5zg2E',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_order`
--

LOCK TABLES `m_order` WRITE;
/*!40000 ALTER TABLE `m_order` DISABLE KEYS */;
INSERT INTO `m_order` VALUES (15,53,49,2,NULL,_binary '',109800,'2024-06-10 17:44:39',1,0,22,'Hello there','Hello shop');
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
  `description` text,
  PRIMARY KEY (`productID`),
  KEY `categoryID` (`categoryID`),
  KEY `shoperID` (`shoperID`),
  CONSTRAINT `M_product_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `m_productcategory` (`categoryID`),
  CONSTRAINT `M_product_ibfk_2` FOREIGN KEY (`shoperID`) REFERENCES `m_shoper` (`shoperID`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_product`
--

LOCK TABLES `m_product` WRITE;
/*!40000 ALTER TABLE `m_product` DISABLE KEYS */;
INSERT INTO `m_product` VALUES (49,'??o Thun Babytee G???n 5 N?? Ch???t T??m G??n D??y Chun H??ng',2546,54900,9,22,NULL),(50,'[ ???NH TH???T ] Ch??n v??y t???ng TR???NG d??ng xo?? ph???ng ph???i ren d??ng ng???n - Coquette Skirt',1425,150000,9,22,NULL),(51,'??o Kho??c N??? Hoodie Zip MeRse Nhi???u M??u Form R???ng Unisex Nam N??? - ??o Hoodie d??y k??o Shopmap????',315,99000,9,22,NULL),(52,'SET ??O T?? XO?? ????NH N??T B???C M???C T???T, ??I CH??A',1215,215000,9,22,NULL),(53,'Beikeyang phi??n b???n H??n Qu???c c???a t??i ??eo ch??o n??? ins c???m gi??c ti??n ti???n c???a d??y r??t ??eo vai th???i trang t??i x??',245,55000,10,22,NULL),(54,'V?? n??? ng???n ?????p c???m tay mini nh??? g???n b??? t??i nhi???u ng??n d??? th????ng',3245,59000,10,22,NULL),(55,'T??i c??i ??i bi???n n??? ??eo vai HyVa T??i c??i ??an s???i c?? l??t v???i d??y da ??i du l???ch',245,199000,10,22,NULL),(56,'Bonnie cathy Gi??y Th??? Thao Si??u Nh??? Tho??ng Kh?? Th???i Trang H??n Qu???c Cho N???',2245,205000,23,22,NULL),(57,'[Full Box] D??p Cross Platform Clog - D??p S???c Classic N??? ????? Cao 2024',225,359000,23,22,NULL),(58,'HUIYAXI Gi??y Cao G??t M??i Nh???n GI??Y SANDAL Th???i Trang M???i 2023 Cho N??? ??i???m nh???n ?????p m???t Ch???t l?????ng cao ??i???u ch???nh ???????c',325,195000,23,22,NULL),(59,'Tất cổ cao nữ chất liệu cotton, họa tiết hình thêu dễ thương - Cherry Shop',5648,6500,9,22,'Thông tin chi tiết sản phẩm tất cổ cao nữ chất liệu cotton, họa tiết hình thêu dễ thương - Cherry Shop\n\n- Tất được sản xuất chất liệu cotton tự nhiên đạt chứng nhận nguồn gốc an toàn, mềm mại, thấm hút mồ hôi tốt, giữ đôi chân luôn khô thoáng. Thiết kế vùng thoát khí tăng cường khả năng thoát mồ hôi, bổ sung công nghệ kháng khuẩn khử mùi mang lại cảm giác tự tin, thoải mái.\n\n- Thiết kế tất tinh tế cực kỳ đáng yêu, trẻ trung, năng động và đặc biệt rất thời trang.\n\n- Chun tất với công nghệ dệt kim tự động đảm bảo không bị nhão sau một thời gian sử dụng.\n\n- Chất liệu vải mềm, tất mỏng nhẹ thoáng, co giãn 4 chiều.\n\n- Đặc biệt sản phẩm tất rất dề phối đồ cho các bạn nữ.\n\n- Tất 4 mùa đều đi được mang lại cảm giác thoải mái.\n\n- Phù hợp cho các bạn chân đi giày size từ 35-41.');
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
INSERT INTO `m_productcategory` VALUES (1,'Th??? Thao & Du l???ch','C??c s???n ph???m li??n quan ?????n th??? thao v?? du l???ch'),(2,'?? t?? - Xe m??y - Xe ?????p','Ph??? t??ng v?? c??c s???n ph???m li??n quan ?????n ph????ng ti???n'),(3,'B??ch h??a Online','C??c s???n ph???m ti??u d??ng h??ng ng??y'),(4,'Nh?? C???a & ?????i S???ng','S???n ph???m cho gia ????nh v?? cu???c s???ng'),(5,'S???c ?????p','M??? ph???m v?? c??c s???n ph???m ch??m s??c s???c ?????p'),(6,'M??y t??nh & Laptop','M??y t??nh, laptop v?? ph??? ki???n li??n quan'),(7,'Vouchers & D???ch v???','C??c lo???i voucher v?? d???ch v??? kh??c nhau'),(8,'M??y ???nh & M??y quay phim','C??c lo???i m??y ???nh v?? m??y quay phim'),(9,'Th???i trang n???','Qu???n ??o v?? ph??? ki???n th???i trang d??nh cho n???'),(10,'T??i v?? n???','C??c lo???i t??i x??ch v?? v?? d??nh cho n???'),(12,'M??? v?? B??','S???n ph???m d??nh cho m??? v?? b??'),(13,'Th?? c??ng','S???n ph???m v?? ph??? ki???n cho th?? c??ng'),(14,'Nh?? s??ch online','S??ch v?? c??c s???n ph???m v??n ph??ng ph???m'),(15,'Th???i trang tr??? em','Qu???n ??o v?? ph??? ki???n th???i trang d??nh cho tr??? em'),(17,'??i???n tho???i & Ph??? ki???n','??i???n tho???i di ?????ng v?? c??c lo???i ph??? ki???n li??n quan'),(18,'?????ng h???','C??c lo???i ?????ng h??? th???i trang v?? th??ng minh'),(19,'Thi???t b??? ??i???n t???','C??c thi???t b??? ??i???n t??? kh??c nhau'),(20,'Gi??y d??p nam','C??c lo???i gi??y d??p d??nh cho nam'),(21,'????? ch??i','C??c lo???i ????? ch??i cho tr??? em v?? ng?????i l???n'),(22,'Th???i trang nam','Qu???n ??o v?? ph??? ki???n th???i trang d??nh cho nam'),(23,'Gi??y d??p n???','C??c lo???i gi??y d??p d??nh cho n???'),(24,'Thi???t b??? ??i???n gia d???ng','C??c thi???t b??? ??i???n s??? d???ng trong gia ????nh'),(25,'Gi???t gi?? & Ch??m s??c nh?? c???a','S???n ph???m gi???t gi?? v?? ch??m s??c nh?? c???a'),(26,'S???c kh???e','C??c s???n ph???m ch??m s??c s???c kh???e v?? y t???');
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
INSERT INTO `m_productimage` VALUES (49,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666dffd1d8e94.20650162.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666dffd6f3f32.63467495.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666dffdb78172.74101532.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666dffe30fd14.94960353.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666dffe755750.56887785.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666dffeb974c5.60966003.jpg'),(50,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e1872ae6f5.40826014.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e187b59598.88921065.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e18830bfd8.99325591.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e188cb1f48.78133715.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e1892ae328.22456344.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e189751d72.95401453.jpg'),(51,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e27ee62dd9.22918083.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e27f250854.07117100.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e27f5fa021.43274330.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e27f88aa56.04769575.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e27fbb6d51.52061699.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e2801381a3.68368698.jpg'),(52,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e331687242.78368862.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e3322ae659.55982249.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e332751b92.40796157.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e332ee3383.69693455.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e3338e8580.25892665.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e33436dd08.86825270.jpg'),(53,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e48d9566c3.28993685.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e48dea50e1.76061747.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e48e1b42b9.33844169.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e48e696401.92695768.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e48e7498d7.52767985.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e48ea3f789.53531037.jpg'),(54,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e5879dbf02.92586352.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e5879ddd68.16781834.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e587b972b1.01730489.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e587dc9db6.34540895.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e588117db1.52659432.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e5882503a9.39304693.jpg'),(55,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e77b4b2ac0.20230640.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e77b6385e4.83838001.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e77b7ce926.62163741.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e77bd2ddc4.00717146.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e77c51f973.54456396.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e77c712e29.41761310.jpg'),(56,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e87503d929.37197998.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e87528eed1.95761228.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e87557cc59.85481193.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e8757ce689.34055193.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e875a9d678.31843079.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e875d0e2e3.33540861.jpg'),(57,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e8e576f555.37582236.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e8e5770f28.62958263.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e8e5983f13.30684291.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e8e5cd3b10.51812329.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e8e5e46b59.48067576.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e8e611b8d9.95488262.jpg'),(58,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e987d9fe18.76000534.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e988405f58.02184270.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e988945964.27147139.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e988b1a2e0.37617540.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e988c56807.22737847.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666e988e856c0.34207905.jpg'),(59,'https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_666744e98beab9.35582455.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_666744ea2ae771.31177928.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_666744ea4ffc94.61011701.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_666744eaa3f9b0.87764835.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_666744eb006506.37866584.jpg','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_666744eb448381.30041545.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_shoper`
--

LOCK TABLES `m_shoper` WRITE;
/*!40000 ALTER TABLE `m_shoper` DISABLE KEYS */;
INSERT INTO `m_shoper` VALUES (22,'Shop c???a Xen','0974282109','Ha Noi','lastmonthtodestionation@gmail.com','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_6666d6016fb434.61992627.jpg',1009,52),(23,'TaMo','0947578718','75 tam trinh','ragnie2602@gmail.com','https://ducquan.id.vn/congngheweb/santhuongmai/uploads/img_666701ba7be2b4.13980608.jpg',1234567890,54);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_voucher`
--

LOCK TABLES `m_voucher` WRITE;
/*!40000 ALTER TABLE `m_voucher` DISABLE KEYS */;
INSERT INTO `m_voucher` VALUES (9,23,10,'2024-06-30',10000,20000,100),(10,23,10,'2024-06-30',10000,20000,1000);
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

-- Dump completed on 2024-06-11  1:37:41
