-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th5 05, 2024 lúc 08:43 PM
-- Phiên bản máy phục vụ: 8.0.32
-- Phiên bản PHP: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ducqu444_esp_data`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `devices`
--

CREATE TABLE `devices` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `gpio` int NOT NULL,
  `isOn` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `devices`
--

INSERT INTO `devices` (`id`, `name`, `gpio`, `isOn`) VALUES
(9, 'LED 1', 12, 0),
(10, 'LED 2', 14, 0),
(11, 'LED 3', 27, 0),
(12, 'LED 4', 26, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `H_notifications`
--

CREATE TABLE `H_notifications` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `token` varchar(255) NOT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `H_notifications`
--

INSERT INTO `H_notifications` (`id`, `title`, `message`, `token`, `time`, `image`) VALUES
(4, 'Thông báo 1', 'Nọi dung 1', 'abc', '2024-04-25 10:48:17', NULL),
(5, 'Thông báo 2', 'Nọi dung 2', 'abc', '2024-04-25 10:49:47', NULL),
(6, 'Thông báo 3', 'Nọi dung 3', 'abc', '2024-04-25 10:49:53', NULL),
(7, 'Đây là tiêu đề', 'Muối còn dưới 30%', 'Array', '2024-04-25 12:33:36', NULL),
(8, 'Đây là tiêu đề', 'Muối còn dưới 30%', 'Array', '2024-04-25 12:33:53', NULL),
(9, 'Tiêu đề thông báo', 'Nội dung thông báo', 'Array', '2024-04-25 13:26:12', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `H_users`
--

CREATE TABLE `H_users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sensors`
--

CREATE TABLE `sensors` (
  `id` int NOT NULL,
  `temp` decimal(10,2) NOT NULL,
  `humid` decimal(10,2) NOT NULL,
  `thoi_gian_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `sensors`
--

INSERT INTO `sensors` (`id`, `temp`, `humid`, `thoi_gian_tao`) VALUES
(2634, 27.60, 90.00, '2024-01-08 00:55:03'),
(2635, 27.80, 94.00, '2024-01-08 00:55:10'),
(2636, 27.70, 92.00, '2024-01-08 00:55:18'),
(2637, 27.60, 90.00, '2024-01-08 00:55:26'),
(2638, 27.50, 87.00, '2024-01-08 00:55:35'),
(2639, 27.40, 84.00, '2024-01-08 00:55:43'),
(2640, 27.40, 82.00, '2024-01-08 00:55:52'),
(2641, 27.30, 80.00, '2024-01-08 00:56:00'),
(2642, 27.30, 79.00, '2024-01-08 00:56:08'),
(2643, 27.20, 78.00, '2024-01-08 00:56:17'),
(2644, 27.10, 77.00, '2024-01-08 00:56:25'),
(2645, 27.10, 76.00, '2024-01-08 00:56:33'),
(2646, 27.10, 76.00, '2024-01-08 00:56:41'),
(2647, 27.10, 75.00, '2024-01-08 00:56:49'),
(2648, 27.10, 75.00, '2024-01-08 00:56:58'),
(2649, 27.10, 75.00, '2024-01-08 00:57:06'),
(2650, 27.10, 75.00, '2024-01-08 00:57:24'),
(2651, 27.10, 74.00, '2024-01-08 00:57:31'),
(2652, 27.10, 74.00, '2024-01-08 00:57:39'),
(2653, 27.00, 74.00, '2024-01-08 00:57:47'),
(2654, 27.10, 74.00, '2024-01-08 00:57:55'),
(2655, 27.00, 74.00, '2024-01-08 00:58:03'),
(2656, 27.10, 74.00, '2024-01-08 00:58:11'),
(2657, 27.00, 73.00, '2024-01-08 00:58:18'),
(2658, 27.00, 73.00, '2024-01-08 00:58:26'),
(2659, 27.00, 73.00, '2024-01-08 00:58:35'),
(2660, 27.00, 73.00, '2024-01-08 00:58:43'),
(2661, 27.00, 73.00, '2024-01-08 00:58:51'),
(2662, 27.00, 73.00, '2024-01-08 00:58:59'),
(2663, 27.00, 73.00, '2024-01-08 00:59:07'),
(2664, 27.00, 73.00, '2024-01-08 00:59:15'),
(2665, 27.00, 73.00, '2024-01-08 00:59:23'),
(2666, 27.00, 73.00, '2024-01-08 00:59:32'),
(2667, 27.00, 73.00, '2024-01-08 00:59:40'),
(2668, 27.00, 73.00, '2024-01-08 00:59:49'),
(2669, 27.00, 73.00, '2024-01-08 00:59:57'),
(2670, 27.00, 73.00, '2024-01-08 01:00:06'),
(2671, 27.00, 73.00, '2024-01-08 01:00:14'),
(2672, 27.00, 73.00, '2024-01-08 01:00:22'),
(2673, 27.00, 73.00, '2024-01-08 01:00:31'),
(2674, 27.00, 73.00, '2024-01-08 01:00:39'),
(2675, 27.00, 73.00, '2024-01-08 01:00:47'),
(2676, 27.00, 73.00, '2024-01-08 01:00:56'),
(2677, 27.00, 73.00, '2024-01-08 01:01:05'),
(2678, 27.00, 73.00, '2024-01-08 01:01:14'),
(2679, 27.00, 73.00, '2024-01-08 01:01:22'),
(2680, 26.90, 73.00, '2024-01-08 01:01:30'),
(2681, 26.90, 73.00, '2024-01-08 01:03:01'),
(2682, 26.90, 73.00, '2024-01-08 01:03:08'),
(2683, 26.90, 73.00, '2024-01-08 01:03:16'),
(2684, 26.80, 73.00, '2024-01-08 01:03:24'),
(2685, 26.80, 73.00, '2024-01-08 01:03:31'),
(2686, 26.80, 73.00, '2024-01-08 01:03:39'),
(2687, 26.80, 73.00, '2024-01-08 01:03:48'),
(2688, 26.80, 73.00, '2024-01-08 01:03:55'),
(2689, 26.80, 73.00, '2024-01-08 01:04:04'),
(2690, 26.80, 73.00, '2024-01-08 01:04:13'),
(2691, 26.80, 73.00, '2024-01-08 01:04:21'),
(2692, 26.80, 73.00, '2024-01-08 01:04:29'),
(2693, 26.80, 73.00, '2024-01-08 01:04:37'),
(2694, 26.80, 73.00, '2024-01-08 01:04:45'),
(2695, 26.80, 73.00, '2024-01-08 01:04:53'),
(2696, 26.80, 73.00, '2024-01-08 01:05:02'),
(2697, 26.70, 73.00, '2024-01-08 01:05:10'),
(2698, 26.70, 73.00, '2024-01-08 01:05:19'),
(2699, 26.70, 73.00, '2024-01-08 01:05:27'),
(2700, 26.80, 73.00, '2024-01-08 01:05:35'),
(2701, 26.70, 73.00, '2024-01-08 01:05:44'),
(2702, 26.60, 73.00, '2024-01-08 01:05:52'),
(2703, 26.60, 73.00, '2024-01-08 01:06:01'),
(2704, 26.60, 73.00, '2024-01-08 01:06:09'),
(2705, 26.50, 73.00, '2024-01-08 01:06:17'),
(2706, 26.60, 73.00, '2024-01-08 01:06:25'),
(2707, 26.60, 74.00, '2024-01-08 01:06:34'),
(2708, 26.60, 74.00, '2024-01-08 01:06:42'),
(2709, 26.60, 74.00, '2024-01-08 01:06:51'),
(2710, 26.60, 74.00, '2024-01-08 01:06:59'),
(2711, 26.60, 74.00, '2024-01-08 01:07:08'),
(2712, 26.70, 74.00, '2024-01-08 01:08:38'),
(2713, 26.70, 74.00, '2024-01-08 01:08:45'),
(2714, 26.60, 74.00, '2024-01-08 01:08:53'),
(2715, 26.70, 74.00, '2024-01-08 01:09:01'),
(2716, 26.80, 74.00, '2024-01-08 01:09:09'),
(2717, 26.80, 74.00, '2024-01-08 01:09:17'),
(2718, 26.80, 74.00, '2024-01-08 01:09:25'),
(2719, 26.80, 74.00, '2024-01-08 01:09:33'),
(2720, 26.80, 74.00, '2024-01-08 01:09:41'),
(2721, 26.80, 74.00, '2024-01-08 01:09:50'),
(2722, 26.70, 74.00, '2024-01-08 01:09:58'),
(2723, 26.70, 74.00, '2024-01-08 01:10:06'),
(2724, 26.70, 74.00, '2024-01-08 01:10:14'),
(2725, 26.90, 75.00, '2024-01-08 01:10:22'),
(2726, 26.80, 75.00, '2024-01-08 01:10:30'),
(2727, 26.80, 75.00, '2024-01-08 01:10:39'),
(2728, 26.80, 75.00, '2024-01-08 01:10:47'),
(2729, 26.80, 75.00, '2024-01-08 01:10:56'),
(2730, 26.90, 75.00, '2024-01-08 01:11:04'),
(2731, 27.00, 75.00, '2024-01-08 01:11:12'),
(2732, 27.00, 74.00, '2024-01-08 01:11:22'),
(2733, 27.00, 74.00, '2024-01-08 01:11:30');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `text`
--

CREATE TABLE `text` (
  `id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `text_saver`
--

CREATE TABLE `text_saver` (
  `id` int NOT NULL,
  `text_column` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `text_saver`
--

INSERT INTO `text_saver` (`id`, `text_column`) VALUES
(1, 'Note something here\ndasdasdawdawwd');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `Users`
--

CREATE TABLE `Users` (
  `user_id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `account_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `Users`
--

INSERT INTO `Users` (`user_id`, `username`, `password`, `account_name`, `email`, `dob`, `created_at`) VALUES
(25, 'quan', '$2y$10$ILlRJNor7PYoOfWiQzpLDOsDcUq0SlnmOb9OH.CoeWwGRLJ0pkj6C', 'Nguyễn Đức Quân', NULL, NULL, '2024-03-21 11:15:46'),
(26, 'duc', '$2y$10$YAgwgTwNA/q/U/wqRbCi3ezRrxMx.XB6p8fF0yXetaUagzvudiNr.', NULL, NULL, NULL, '2024-03-21 11:33:53');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`) VALUES
(1, 'quan', 'ducquank52t1@gmail.com'),
(2, 'quan', 'ducquank52t1@gmail.com'),
(3, 'quan', 'ducquank52t1@gmail.com'),
(4, 'Nguyen Van Â', 'a@gmail'),
(5, 'quan', 'ducquank52t1@gmail.com'),
(6, 'Nguyễn Đức Quân', 'ducquank52t1@gmail.com'),
(7, 'quan', 'ducquank52t1@gmail.com');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `H_notifications`
--
ALTER TABLE `H_notifications`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `H_users`
--
ALTER TABLE `H_users`
  ADD PRIMARY KEY (`id`);

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
-- Chỉ mục cho bảng `sensors`
--
ALTER TABLE `sensors`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `text_saver`
--
ALTER TABLE `text_saver`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `H_notifications`
--
ALTER TABLE `H_notifications`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `H_users`
--
ALTER TABLE `H_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT cho bảng `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2734;

--
-- AUTO_INCREMENT cho bảng `text_saver`
--
ALTER TABLE `text_saver`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `Users`
--
ALTER TABLE `Users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
