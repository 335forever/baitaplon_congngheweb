SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Cấu trúc bảng cho bảng `M_account`
--

CREATE TABLE `M_account` (
  `accountid` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `isShoper` bit(1) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_created_at` datetime DEFAULT NULL
) ;

--
-- Đang đổ dữ liệu cho bảng `M_account`
--

INSERT INTO `M_account` (`accountid`, `username`, `password`, `name`, `email`, `phone`, `address`, `birthday`, `isShoper`, `token`, `token_created_at`) VALUES
(1, 'quan', '$2y$10$Q2dwQ4r9AoKSxOv7jc2Ewec1RK13J3KXZNlvfEGXLySvFNOwCpy2G', 'Nguyen Duc Quan', 'ducquan@gmail.com', NULL, 'Nghe An', NULL, b'0', '56df8a476bfa1c549045d04e56d9f4cd0248d6c63fffb73affd206d8242da09c', '2024-05-05 16:55:54'),
(3, 'quanquan22', '$2y$10$pNo4VgqdPwc1jN.gaQ/kQ.udeStY/ldwib06QbTTCMDSk66oR94PO', 'Your Name', NULL, NULL, NULL, NULL, b'0', NULL, NULL),
(4, 'quanquan2', '$2y$10$tlKgSjB68fyV2U2Ttqu6GeItg64y1ccJOZf4c6yhSaRkLaF2X8MpW', 'Your Name', NULL, NULL, NULL, NULL, b'0', NULL, NULL),
(5, 'quanquan22222', '$2y$10$0l85hrd4sdTdMN0.qMZvt.RTEPYsvGgJr9PFUqHWrIxBKUQpXXv6q', 'Your Name', NULL, NULL, NULL, NULL, b'0', NULL, NULL),
(6, 'quanquanquanquan3333', '$2y$10$i3fSJGYamHYagcOrUZEho.rgcJxwzJLR84.CJEI3GQPBWWh0epAsq', 'Your Name', NULL, NULL, NULL, NULL, b'1', NULL, NULL),
(7, 'meadow', '$2y$10$RShysNt.WDYnzWXSDh7QAeuMJSEjojdb6FysdA4ravFXSStWdEL.W', 'Meadow Pham', 'hoangthanh2k3@gmail.com', '0123456789', '123 ABC, 123 XYZ', '2003-06-25', b'0', '3a04aec9fae550b229cb024065b8ee9ea448d2fd4e5ed14ba03a8180bafd6180', '2024-05-05 17:14:13'),
(8, 'meadow2', '$2y$10$5fJZY/C/tiEvUesKUQWPsuN2osKnFQ7T4OG/PbgcZUTC2dAh5GIlq', 'Meadow Pham', 'test@gmail.com', '0123456789', 'ABC XYZ 123', '2024-05-30', b'0', NULL, NULL),
(9, 'quannn', '$2y$10$9WF.xU/Emz2j4Xc7N9yI7eIQfh.ObIYt0UjgKO.oyv3lIMhShUnpi', 'Your Name', NULL, NULL, NULL, NULL, b'0', NULL, NULL),
(10, 'quann', '$2y$10$YNEgJ05eOFYI22ekJwgykeIk9zrWPdql/ruCtE21JfVf0avNiIlyy', 'Your Name', NULL, NULL, NULL, NULL, b'0', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `M_cart`
--

CREATE TABLE `M_cart` (
  `accountID` int NOT NULL,
  `productID` int NOT NULL,
  `quantity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `M_order`
--

CREATE TABLE `M_order` (
  `orderID` int NOT NULL,
  `accountID` int DEFAULT NULL,
  `productID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `voucherID` int DEFAULT NULL,
  `isPAID` bit(1) DEFAULT NULL,
  `TOTAL` int DEFAULT NULL,
  `order_date` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `M_product`
--

CREATE TABLE `M_product` (
  `productID` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `categoryID` int DEFAULT NULL,
  `shoperID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `M_productCategory`
--

CREATE TABLE `M_productCategory` (
  `categoryID` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `M_shoper`
--

CREATE TABLE `M_shoper` (
  `shoperID` int NOT NULL,
  `taxid` int DEFAULT NULL,
  `accountID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `M_shoper`
--

INSERT INTO `M_shoper` (`shoperID`, `taxid`, `accountID`) VALUES
(3, NULL, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `M_voucher`
--

CREATE TABLE `M_voucher` (
  `voucherID` int NOT NULL,
  `shoperID` int DEFAULT NULL,
  `discountPercent` int DEFAULT NULL,
  `expried` date DEFAULT NULL,
  `minprice` int DEFAULT NULL,
  `maxdiscount` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `M_account`
--
ALTER TABLE `M_account`
  ADD PRIMARY KEY (`accountid`),
  ADD UNIQUE KEY `username_uniq` (`username`);

--
-- Chỉ mục cho bảng `M_cart`
--
ALTER TABLE `M_cart`
  ADD PRIMARY KEY (`accountID`,`productID`),
  ADD KEY `productID` (`productID`);

--
-- Chỉ mục cho bảng `M_order`
--
ALTER TABLE `M_order`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `accountID` (`accountID`),
  ADD KEY `productID` (`productID`),
  ADD KEY `voucherID` (`voucherID`);

--
-- Chỉ mục cho bảng `M_product`
--
ALTER TABLE `M_product`
  ADD PRIMARY KEY (`productID`),
  ADD KEY `categoryID` (`categoryID`),
  ADD KEY `shoperID` (`shoperID`);

--
-- Chỉ mục cho bảng `M_productCategory`
--
ALTER TABLE `M_productCategory`
  ADD PRIMARY KEY (`categoryID`);

--
-- Chỉ mục cho bảng `M_shoper`
--
ALTER TABLE `M_shoper`
  ADD PRIMARY KEY (`shoperID`),
  ADD KEY `accountID` (`accountID`);

--
-- Chỉ mục cho bảng `M_voucher`
--
ALTER TABLE `M_voucher`
  ADD PRIMARY KEY (`voucherID`),
  ADD KEY `shoperID` (`shoperID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `M_account`
--
ALTER TABLE `M_account`
  MODIFY `accountid` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `M_order`
--
ALTER TABLE `M_order`
  MODIFY `orderID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `M_product`
--
ALTER TABLE `M_product`
  MODIFY `productID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `M_productCategory`
--
ALTER TABLE `M_productCategory`
  MODIFY `categoryID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `M_shoper`
--
ALTER TABLE `M_shoper`
  MODIFY `shoperID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `M_voucher`
--
ALTER TABLE `M_voucher`
  MODIFY `voucherID` int NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `M_cart`
--
ALTER TABLE `M_cart`
  ADD CONSTRAINT `M_cart_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `M_account` (`accountid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `M_cart_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `M_product` (`productID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `M_order`
--
ALTER TABLE `M_order`
  ADD CONSTRAINT `M_order_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `M_account` (`accountid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `M_order_ibfk_2` FOREIGN KEY (`productID`) REFERENCES `M_product` (`productID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `M_order_ibfk_3` FOREIGN KEY (`voucherID`) REFERENCES `M_voucher` (`voucherID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Các ràng buộc cho bảng `M_product`
--
ALTER TABLE `M_product`
  ADD CONSTRAINT `M_product_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `M_productCategory` (`categoryID`),
  ADD CONSTRAINT `M_product_ibfk_2` FOREIGN KEY (`shoperID`) REFERENCES `M_shoper` (`shoperID`);

--
-- Các ràng buộc cho bảng `M_shoper`
--
ALTER TABLE `M_shoper`
  ADD CONSTRAINT `M_shoper_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `M_account` (`accountid`);

--
-- Các ràng buộc cho bảng `M_voucher`
--
ALTER TABLE `M_voucher`
  ADD CONSTRAINT `M_voucher_ibfk_1` FOREIGN KEY (`shoperID`) REFERENCES `M_shoper` (`shoperID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

