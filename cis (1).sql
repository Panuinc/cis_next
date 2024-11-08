-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2024 at 07:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cis`
--

-- --------------------------------------------------------

--
-- Table structure for table `backup`
--

CREATE TABLE `backup` (
  `backup_id` int(11) NOT NULL,
  `backup_date` datetime NOT NULL,
  `backup_title` varchar(1000) NOT NULL,
  `backup_folder_name` varchar(255) NOT NULL,
  `backup_create_by` int(11) NOT NULL,
  `backup_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `backup_update_by` int(11) DEFAULT NULL,
  `backup_update_time` datetime DEFAULT NULL,
  `backup_status` int(11) NOT NULL DEFAULT 0 COMMENT '1 = Approved , 0 = Pending',
  `backup_approved_by` int(11) DEFAULT NULL,
  `backup_approved_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `backup`
--

INSERT INTO `backup` (`backup_id`, `backup_date`, `backup_title`, `backup_folder_name`, `backup_create_by`, `backup_create_time`, `backup_update_by`, `backup_update_time`, `backup_status`, `backup_approved_by`, `backup_approved_time`) VALUES
(2, '2024-09-23 11:00:00', '1. cne-cloud 1\n2. cne-cloud 2\n3. Server HR , NAVSERVER\n4. SQL', 'Backup CNE', 1, '2024-10-04 04:16:46', NULL, NULL, 0, 1, '2024-10-07 11:53:57');

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `branch_id` int(11) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `branch_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `branch_create_by` int(11) NOT NULL,
  `branch_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `branch_update_by` int(11) DEFAULT NULL,
  `branch_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`branch_id`, `branch_name`, `branch_status`, `branch_create_by`, `branch_create_time`, `branch_update_by`, `branch_update_time`) VALUES
(1, 'สาขา 1 (สำนักงานใหญ่)', 1, 1, '2024-11-07 07:13:56', NULL, NULL),
(2, 'สาขา 2 (ลาดหลุมแก้ว)', 1, 1, '2024-11-07 07:14:01', NULL, NULL),
(3, 'สาขา 3 (โครงสร้างเหล็ก)', 1, 1, '2024-11-07 07:14:08', NULL, NULL),
(4, 'สาขา 4 (แบบเหล็กให้เช่า)', 1, 1, '2024-11-07 07:14:15', NULL, NULL),
(5, 'สาขา 5 (เครื่องจักร รถยนต์ให้เช่า)', 1, 1, '2024-11-07 07:14:21', NULL, NULL),
(6, 'สาขา 6 (หลังคาเมทัลชีท และ แปกัลวาไนซ์)', 1, 1, '2024-11-07 07:14:27', NULL, NULL),
(7, 'สาขา 7 (อะไหล่เพื่อจำหน่าย)', 1, 1, '2024-11-07 07:14:33', NULL, NULL),
(8, 'สาขา 8 (หอพักชาญนครนครลาดหลุมแก้ว)', 1, 1, '2024-11-07 07:14:38', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(11) NOT NULL,
  `department_branch_id` int(11) NOT NULL,
  `department_division_id` int(11) NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `department_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `department_create_by` int(11) NOT NULL,
  `department_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `department_update_by` int(11) DEFAULT NULL,
  `department_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department_branch_id`, `department_division_id`, `department_name`, `department_status`, `department_create_by`, `department_create_time`, `department_update_by`, `department_update_time`) VALUES
(1, 1, 1, 'พัฒนาซอฟต์แวร์', 1, 1, '2024-10-02 03:00:26', 1, '2024-11-07 15:53:05'),
(2, 1, 1, 'สนับสนุนทางด้านเทคนิค', 1, 1, '2024-10-02 03:03:05', NULL, NULL),
(3, 1, 3, 'การเงิน', 1, 1, '2024-10-02 03:28:15', NULL, NULL),
(4, 1, 4, 'บัญชี', 1, 1, '2024-10-16 09:28:17', NULL, NULL),
(5, 1, 2, 'บุคคล', 1, 1, '2024-10-22 04:59:16', NULL, NULL),
(6, 1, 1, 'ererๅๅ', 1, 1, '2024-11-06 08:52:40', 1, '2024-11-06 15:54:40'),
(7, 1, 1, 'Test 1', 1, 1, '2024-11-07 08:56:40', 1, '2024-11-07 15:57:30');

-- --------------------------------------------------------

--
-- Table structure for table `division`
--

CREATE TABLE `division` (
  `division_id` int(11) NOT NULL,
  `division_branch_id` int(11) NOT NULL,
  `division_name` varchar(255) NOT NULL,
  `division_acronym` varchar(255) NOT NULL,
  `division_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `division_create_by` int(11) NOT NULL,
  `division_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `division_update_by` int(11) DEFAULT NULL,
  `division_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `division`
--

INSERT INTO `division` (`division_id`, `division_branch_id`, `division_name`, `division_acronym`, `division_status`, `division_create_by`, `division_create_time`, `division_update_by`, `division_update_time`) VALUES
(1, 1, 'เทคโนโลยีสารสนเทศ', 'IT', 1, 1, '2024-10-01 10:00:55', 1, '2024-11-07 15:18:32'),
(2, 1, 'บุคคล', 'HR', 1, 1, '2024-10-02 02:29:47', NULL, NULL),
(3, 1, 'การเงิน', 'FN', 1, 1, '2024-10-02 03:27:26', NULL, NULL),
(4, 1, 'บัญชี', 'AC', 1, 1, '2024-10-10 08:04:49', NULL, NULL),
(5, 1, 'การควบคุมคุณภาพ', 'QC', 1, 1, '2024-10-10 08:26:24', NULL, NULL),
(6, 1, 'บริหารงานระบบคุณภาพ', 'ISO', 1, 1, '2024-10-10 09:33:50', NULL, NULL),
(7, 1, 'จัดซื้อ', 'PU', 1, 1, '2024-10-16 07:33:45', NULL, NULL),
(8, 1, 'การประกันคุณภาพ ', 'QA', 1, 1, '2024-10-22 04:30:16', NULL, NULL),
(9, 2, 'Test 11', 'T11', 1, 1, '2024-11-06 08:27:09', 1, '2024-11-06 15:34:50'),
(10, 2, 'Test 2', 'T2', 1, 1, '2024-11-06 08:27:52', NULL, NULL),
(11, 1, 'Test 1', 'T1', 1, 1, '2024-11-07 08:04:05', NULL, NULL),
(12, 1, 'Test 3', 'T3', 1, 1, '2024-11-07 08:05:23', NULL, NULL),
(13, 1, 'Test 4', 'T4', 1, 1, '2024-11-07 08:06:26', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `employee_foreign`
--

CREATE TABLE `employee_foreign` (
  `employee_foreign_id` int(11) NOT NULL,
  `employee_foreign_picture_file` varchar(255) NOT NULL,
  `employee_foreign_picture_path` varchar(255) NOT NULL,
  `employee_foreign_signature_file` varchar(255) NOT NULL,
  `employee_foreign_signature_path` varchar(255) NOT NULL,
  `employee_foreign_id_card_file` varchar(255) NOT NULL,
  `employee_foreign_id_card_path` varchar(255) NOT NULL,
  `employee_foreign_home_file` varchar(255) NOT NULL,
  `employee_foreign_home_path` varchar(255) NOT NULL,
  `employee_foreign_number` varchar(255) NOT NULL,
  `employee_foreign_card_number` varchar(255) NOT NULL,
  `employee_foreign_title` varchar(255) NOT NULL,
  `employee_foreign_firstname` varchar(255) NOT NULL,
  `employee_foreign_lastname` varchar(255) NOT NULL,
  `employee_foreign_nickname` varchar(255) NOT NULL,
  `employee_foreign_birthday` date NOT NULL,
  `employee_foreign_gender` varchar(255) NOT NULL,
  `employee_foreign_id_card` varchar(255) NOT NULL,
  `employee_foreign_citizen` varchar(255) NOT NULL,
  `employee_foreign_mou` varchar(255) NOT NULL,
  `employee_foreign_passport_no` varchar(255) NOT NULL,
  `employee_foreign_passport_start` date NOT NULL,
  `employee_foreign_passport_end` date NOT NULL,
  `employee_foreign_passport_create_by` varchar(255) NOT NULL,
  `employee_foreign_born_at` varchar(255) NOT NULL,
  `employee_foreign_enter_at` varchar(255) NOT NULL,
  `employee_foreign_enter_time` date NOT NULL,
  `employee_foreign_section_6_no` varchar(255) NOT NULL,
  `employee_foreign_check_the_type_of_visa` varchar(255) NOT NULL,
  `employee_foreign_visa_number` varchar(255) NOT NULL,
  `employee_foreign_visa_create_at` varchar(255) NOT NULL,
  `employee_foreign_work_permit_number` varchar(255) NOT NULL,
  `employee_foreign_work_permit_create_at` varchar(255) NOT NULL,
  `employee_foreign_work_permit_create_time` date NOT NULL,
  `employee_foreign_work_permit_end_time` date NOT NULL,
  `employee_foreign_social_security_number` varchar(255) NOT NULL,
  `employee_foreign_social_security_hospital_at` varchar(255) NOT NULL,
  `employee_foreign_tel` varchar(255) NOT NULL,
  `employee_foreign_email` varchar(255) NOT NULL,
  `employee_foreign_type` varchar(255) NOT NULL,
  `employee_foreign_branch_id` int(11) NOT NULL,
  `employee_foreign_site_id` int(11) NOT NULL,
  `employee_foreign_division_id` int(11) NOT NULL,
  `employee_foreign_department_id` int(11) NOT NULL,
  `employee_foreign_position_id` int(11) NOT NULL,
  `employee_foreign_role_id` int(11) NOT NULL,
  `employee_foreign_parent_id` int(11) NOT NULL,
  `employee_foreign_start_work` date NOT NULL,
  `employee_foreign_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `employee_foreign_create_by` int(11) NOT NULL,
  `employee_foreign_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `employee_foreign_update_by` int(11) DEFAULT NULL,
  `employee_foreign_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee_thai`
--

CREATE TABLE `employee_thai` (
  `employee_thai_id` int(11) NOT NULL,
  `employee_thai_picture_file` varchar(255) NOT NULL,
  `employee_thai_picture_path` varchar(255) NOT NULL,
  `employee_thai_signature_file` varchar(255) NOT NULL,
  `employee_thai_signature_path` varchar(255) NOT NULL,
  `employee_thai_id_card_file` varchar(255) NOT NULL,
  `employee_thai_id_card_path` varchar(255) NOT NULL,
  `employee_thai_home_file` varchar(255) NOT NULL,
  `employee_thai_home_path` varchar(255) NOT NULL,
  `employee_thai_number` varchar(255) NOT NULL,
  `employee_thai_card_number` varchar(255) NOT NULL,
  `employee_thai_title` varchar(255) NOT NULL,
  `employee_thai_firstname` varchar(255) NOT NULL,
  `employee_thai_lastname` varchar(255) NOT NULL,
  `employee_thai_nickname` varchar(255) NOT NULL,
  `employee_thai_birthday` date NOT NULL,
  `employee_thai_gender` varchar(255) NOT NULL,
  `employee_thai_id_card` varchar(255) NOT NULL,
  `employee_thai_citizen` varchar(255) NOT NULL,
  `employee_thai_tel` varchar(255) NOT NULL,
  `employee_thai_email` varchar(255) NOT NULL,
  `employee_thai_type` varchar(255) NOT NULL,
  `employee_thai_branch_id` int(11) NOT NULL,
  `employee_thai_site_id` int(11) NOT NULL,
  `employee_thai_division_id` int(11) NOT NULL,
  `employee_thai_department_id` int(11) NOT NULL,
  `employee_thai_position_id` int(11) NOT NULL,
  `employee_thai_role_id` int(11) NOT NULL,
  `employee_thai_parent_id` int(11) NOT NULL,
  `employee_thai_start_work` date NOT NULL,
  `employee_thai_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `employee_thai_create_by` int(11) NOT NULL,
  `employee_thai_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `employee_thai_update_by` int(11) DEFAULT NULL,
  `employee_thai_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `equipment_asset`
--

CREATE TABLE `equipment_asset` (
  `equipment_asset_id` int(11) NOT NULL,
  `equipment_asset_code` varchar(255) NOT NULL,
  `equipment_asset_equipment_type_id` int(11) NOT NULL,
  `equipment_asset_equipment_brand_id` int(11) NOT NULL,
  `equipment_asset_model` varchar(255) NOT NULL,
  `equipment_asset_serial_number` varchar(500) DEFAULT NULL,
  `equipment_asset_speck` varchar(255) DEFAULT NULL,
  `equipment_asset_license_windows` varchar(255) DEFAULT NULL,
  `equipment_asset_office` varchar(255) DEFAULT NULL,
  `equipment_asset_shop` varchar(255) DEFAULT NULL,
  `equipment_asset_shop_sender` datetime DEFAULT NULL,
  `equipment_asset_status` int(11) NOT NULL COMMENT '1 = ว่าง, 2 = กำลังใช้งาน , 3 = เก็บเป็นอะไหล่ , 4 = จำหน่ายออก, 5 = อื่นๆ',
  `equipment_asset_remark` varchar(500) DEFAULT NULL,
  `equipment_asset_using_now_user_id` int(11) DEFAULT NULL,
  `equipment_asset_send_to_user` datetime DEFAULT NULL,
  `equipment_asset_use_before_user_id` int(11) DEFAULT NULL,
  `equipment_asset_branch_id` int(11) NOT NULL,
  `equipment_asset_create_by` int(11) NOT NULL,
  `equipment_asset_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `equipment_asset_update_by` int(11) DEFAULT NULL,
  `equipment_asset_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `equipment_asset`
--

INSERT INTO `equipment_asset` (`equipment_asset_id`, `equipment_asset_code`, `equipment_asset_equipment_type_id`, `equipment_asset_equipment_brand_id`, `equipment_asset_model`, `equipment_asset_serial_number`, `equipment_asset_speck`, `equipment_asset_license_windows`, `equipment_asset_office`, `equipment_asset_shop`, `equipment_asset_shop_sender`, `equipment_asset_status`, `equipment_asset_remark`, `equipment_asset_using_now_user_id`, `equipment_asset_send_to_user`, `equipment_asset_use_before_user_id`, `equipment_asset_branch_id`, `equipment_asset_create_by`, `equipment_asset_create_time`, `equipment_asset_update_by`, `equipment_asset_update_time`) VALUES
(2, '', 1, 2, 'test1', 'test1', 'test1', 'No', 'No', 'test1', '2024-10-03 00:00:00', 1, 'test1', 1, '2024-10-03 00:00:00', 1, 1, 1, '2024-10-03 08:48:00', 1, '2024-10-03 16:40:29'),
(3, '', 1, 2, 'test1', 'test1', 'test1', 'No', 'No', 'test1', '2024-10-03 00:00:00', 1, 'test1', 1, '2024-10-03 00:00:00', 2, 1, 1, '2024-10-03 08:48:17', NULL, NULL),
(4, 'Notebook-Acer-000004', 1, 2, 'test1', 'test1', 'test1', 'No', 'No', 'test1', '2024-10-03 00:00:00', 1, 'test1', 1, '2024-10-03 00:00:00', 2, 1, 1, '2024-10-03 08:50:54', NULL, NULL),
(5, 'Imax-Apple-000005', 2, 3, 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', '2024-10-03 00:00:00', 1, 'test2', 2, '2024-10-03 00:00:00', 1, 2, 1, '2024-10-03 08:52:59', 1, '2024-10-03 17:05:10');

-- --------------------------------------------------------

--
-- Table structure for table `equipment_brand`
--

CREATE TABLE `equipment_brand` (
  `equipment_brand_id` int(11) NOT NULL,
  `equipment_brand_name` varchar(255) NOT NULL,
  `equipment_brand_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `equipment_brand_create_by` int(11) NOT NULL,
  `equipment_brand_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `equipment_brand_update_by` int(11) DEFAULT NULL,
  `equipment_brand_update_time` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `equipment_brand`
--

INSERT INTO `equipment_brand` (`equipment_brand_id`, `equipment_brand_name`, `equipment_brand_status`, `equipment_brand_create_by`, `equipment_brand_create_time`, `equipment_brand_update_by`, `equipment_brand_update_time`) VALUES
(1, 'Dell', 1, 1, '2024-10-03 06:20:55', 1, '2024-10-03 06:21:07'),
(2, 'Acer', 1, 1, '2024-10-03 08:47:19', NULL, NULL),
(3, 'Apple', 1, 1, '2024-10-03 08:52:10', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `equipment_type`
--

CREATE TABLE `equipment_type` (
  `equipment_type_id` int(11) NOT NULL,
  `equipment_type_name` varchar(255) NOT NULL,
  `equipment_type_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `equipment_type_create_by` int(11) NOT NULL,
  `equipment_type_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `equipment_type_update_by` int(11) DEFAULT NULL,
  `equipment_type_update_time` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `equipment_type`
--

INSERT INTO `equipment_type` (`equipment_type_id`, `equipment_type_name`, `equipment_type_status`, `equipment_type_create_by`, `equipment_type_create_time`, `equipment_type_update_by`, `equipment_type_update_time`) VALUES
(1, 'Notebook', 1, 1, '2024-10-03 06:14:45', 1, '2024-10-03 06:15:36'),
(2, 'Imax', 1, 1, '2024-10-03 08:52:24', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `position_id` int(11) NOT NULL,
  `position_branch_id` int(11) NOT NULL,
  `position_division_id` int(11) NOT NULL,
  `position_department_id` int(11) NOT NULL,
  `position_name` varchar(255) NOT NULL,
  `position_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `position_create_by` int(11) NOT NULL,
  `position_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `position_update_by` int(11) DEFAULT NULL,
  `position_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `position`
--

INSERT INTO `position` (`position_id`, `position_branch_id`, `position_division_id`, `position_department_id`, `position_name`, `position_status`, `position_create_by`, `position_create_time`, `position_update_by`, `position_update_time`) VALUES
(1, 1, 1, 1, 'เจ้าหน้าที่พัฒนาซอฟต์แวร์', 1, 1, '2024-10-02 03:12:36', 1, '2024-11-07 16:06:09'),
(2, 1, 1, 2, 'เจ้าหน้าที่สนับสนุนทางด้านเทคนิค', 1, 1, '2024-10-02 03:30:02', 1, '2024-10-17 09:04:26'),
(3, 1, 1, 1, 'Test 11', 1, 1, '2024-10-17 02:19:42', 1, '2024-10-22 13:19:36'),
(4, 1, 1, 2, 'เจ้าหน้าที่ซัพพอร์ท1', 1, 1, '2024-10-18 09:52:32', NULL, NULL),
(5, 1, 2, 5, 'เจ้าหน้าที่บุคคล', 1, 1, '2024-10-22 06:19:11', NULL, NULL),
(6, 1, 3, 3, 'sasa111', 1, 1, '2024-11-06 09:09:58', 1, '2024-11-06 16:11:37'),
(7, 1, 3, 3, 'Test 11', 1, 1, '2024-11-07 09:09:54', 1, '2024-11-07 16:10:01');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `role_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `role_create_by` int(11) NOT NULL,
  `role_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `role_update_by` int(11) DEFAULT NULL,
  `role_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`, `role_status`, `role_create_by`, `role_create_time`, `role_update_by`, `role_update_time`) VALUES
(1, 'ผู้จัดการฝ่าย', 1, 1, '2024-10-02 03:07:01', 1, '2024-11-06 16:32:28'),
(2, 'ผู้ช่วยผู้จัดการฝ่าย', 1, 1, '2024-10-02 04:56:36', NULL, NULL),
(3, 'หัวหน้าแผนก', 1, 1, '2024-10-02 04:56:48', NULL, NULL),
(4, 'เจ้าหน้าที่', 1, 1, '2024-10-02 04:56:58', NULL, NULL),
(5, 'Test 1', 1, 1, '2024-10-16 09:39:37', 1, '2024-10-16 16:47:27'),
(6, 'Test 2', 1, 1, '2024-10-18 09:57:21', 1, '2024-10-22 13:22:30'),
(7, 'Test 3', 1, 1, '2024-10-22 06:22:12', 1, '2024-11-07 15:37:19'),
(8, 'Test 4', 1, 1, '2024-11-06 08:57:33', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `site`
--

CREATE TABLE `site` (
  `site_id` int(11) NOT NULL,
  `site_branch_id` int(11) NOT NULL,
  `site_name` varchar(255) NOT NULL,
  `site_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `site_create_by` int(11) NOT NULL,
  `site_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `site_update_by` int(11) DEFAULT NULL,
  `site_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `site`
--

INSERT INTO `site` (`site_id`, `site_branch_id`, `site_name`, `site_status`, `site_create_by`, `site_create_time`, `site_update_by`, `site_update_time`) VALUES
(1, 1, 'สำนักงานใหญ่ ', 1, 1, '2024-10-02 03:09:29', 1, '2024-11-06 16:33:26'),
(2, 2, 'ลาดหลุมแก้ว', 1, 1, '2024-10-16 09:46:55', 1, '2024-11-06 15:36:18'),
(3, 3, '(โครงสร้างเหล็ก)', 1, 1, '2024-10-18 10:01:53', 1, '2024-11-07 15:33:00'),
(4, 4, 'แบบเหล็กให้เช่า', 1, 1, '2024-10-22 06:34:44', NULL, NULL),
(5, 5, 'เครื่องจักร รถยนต์ให้เช่า', 1, 1, '2024-11-06 08:37:52', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_number` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_firstname` varchar(255) NOT NULL,
  `user_lastname` varchar(255) NOT NULL,
  `user_nickname` varchar(255) NOT NULL,
  `user_branch_id` int(11) NOT NULL,
  `user_site_id` int(11) NOT NULL,
  `user_division_id` int(11) NOT NULL,
  `user_department_id` int(11) NOT NULL,
  `user_position_id` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `user_parent_id` int(11) NOT NULL,
  `user_type` varchar(255) NOT NULL,
  `user_id_card` varchar(255) NOT NULL,
  `user_citizen` varchar(255) NOT NULL,
  `user_level` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_tel` varchar(255) NOT NULL,
  `user_picture_file` varchar(255) NOT NULL,
  `user_picture_path` varchar(255) NOT NULL,
  `user_signature_file` varchar(255) NOT NULL,
  `user_signature_path` varchar(255) NOT NULL,
  `user_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Disable , 1 = Enable	',
  `user_create_by` int(11) NOT NULL,
  `user_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_update_by` int(11) DEFAULT NULL,
  `user_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_number`, `user_password`, `user_firstname`, `user_lastname`, `user_nickname`, `user_branch_id`, `user_site_id`, `user_division_id`, `user_department_id`, `user_position_id`, `user_role_id`, `user_parent_id`, `user_type`, `user_id_card`, `user_citizen`, `user_level`, `user_email`, `user_tel`, `user_picture_file`, `user_picture_path`, `user_signature_file`, `user_signature_path`, `user_status`, `user_create_by`, `user_create_time`, `user_update_by`, `user_update_time`) VALUES
(1, 'IT67070002', '$2b$10$bDouYdklpblo4V/IdPjcw.bPaXj9LJOcS887MGl4mCLx6XfjG55K2', 'ภาณุวัต', 'แจ้งชัดใจ', 'อิ๊น', 1, 1, 1, 1, 1, 1, 1, 'รายเดือน', '1719900485752', 'ไทย', 'superadmin', 'panuwat.ja.forwork@gmail.com', '0988241645', 'IT67070002.png', 'public/images/user_picture/IT67070002.png', 'IT67070002.png', 'public/images/signature/IT67070002.png', 1, 1, '2024-09-06 09:06:51', NULL, NULL),
(2, 'IT67070001', '$2b$10$bDouYdklpblo4V/IdPjcw.bPaXj9LJOcS887MGl4mCLx6XfjG55K2', 'ทอรุ้ง', 'บำรุงจิตต์	', 'ทราย', 1, 1, 1, 1, 1, 1, 1, 'รายเดือน', '1234567890123', 'ไทย', 'user', 'Thorung@channakorn.co.th', '0895282482', 'IT67070001.png', 'public/images/user_picture/IT67070001.png', 'IT67070001.png', 'public/images/signature/IT67070001.png', 1, 1, '2024-09-09 08:02:28', NULL, NULL),
(3, '11111', '$2b$10$bDouYdklpblo4V/IdPjcw.bPaXj9LJOcS887MGl4mCLx6XfjG55K2', '11111', '11111', '11111', 1, 1, 1, 1, 1, 4, 1, 'รายเดือน', '11111', 'ไทย', 'user', '11111@gmaill.com', '11111', '11111.png', 'public/images/user_picture/11111.png', '11111.png', 'public/images/signature/11111.png', 1, 1, '2024-10-22 08:21:41', 1, '2024-11-06 17:02:42');

-- --------------------------------------------------------

--
-- Table structure for table `user_log`
--

CREATE TABLE `user_log` (
  `log_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `login_time` datetime DEFAULT current_timestamp(),
  `logout_time` datetime DEFAULT NULL,
  `session_duration` time GENERATED ALWAYS AS (timediff(`logout_time`,`login_time`)) VIRTUAL,
  `status` enum('online','offline') DEFAULT 'offline'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user_log`
--

INSERT INTO `user_log` (`log_id`, `user_id`, `login_time`, `logout_time`, `status`) VALUES
(1, 1, '2024-11-06 10:07:35', '2024-11-06 10:08:13', 'offline'),
(2, 1, '2024-11-06 10:08:38', '2024-11-06 11:26:34', 'offline'),
(3, 1, '2024-11-06 11:26:49', '2024-11-06 17:03:35', 'offline'),
(4, 1, '2024-11-06 13:04:09', '2024-11-06 17:03:35', 'offline'),
(5, 1, '2024-11-06 13:28:46', '2024-11-06 17:03:35', 'offline'),
(6, 3, '2024-11-06 14:42:05', '2024-11-06 14:42:57', 'offline'),
(7, 3, '2024-11-06 15:48:49', '2024-11-06 15:50:23', 'offline'),
(8, 3, '2024-11-07 08:28:14', '2024-11-07 09:52:03', 'offline'),
(9, 1, '2024-11-07 09:53:56', NULL, 'online'),
(10, 3, '2024-11-07 11:46:57', '2024-11-07 11:47:14', 'offline'),
(11, 1, '2024-11-08 08:41:42', NULL, 'online'),
(12, 1, '2024-11-08 10:53:44', NULL, 'online');

-- --------------------------------------------------------

--
-- Table structure for table `warning_topic`
--

CREATE TABLE `warning_topic` (
  `warning_topic_id` int(11) NOT NULL,
  `warning_topic_number` varchar(255) NOT NULL,
  `warning_topic_name` varchar(255) NOT NULL,
  `warning_topic_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  `warning_topic_create_by` int(11) NOT NULL,
  `warning_topic_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `warning_topic_update_by` int(11) DEFAULT NULL,
  `warning_topic_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `warning_topic`
--

INSERT INTO `warning_topic` (`warning_topic_id`, `warning_topic_number`, `warning_topic_name`, `warning_topic_status`, `warning_topic_create_by`, `warning_topic_create_time`, `warning_topic_update_by`, `warning_topic_update_time`) VALUES
(1, 'หมวดหมู่ที่ 1 ', 'นโยบายทั่วไป', 1, 1, '2024-10-25 03:40:31', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `backup`
--
ALTER TABLE `backup`
  ADD PRIMARY KEY (`backup_id`),
  ADD KEY `backup_create_by` (`backup_create_by`),
  ADD KEY `backup_update_by` (`backup_update_by`),
  ADD KEY `backup_approved_by` (`backup_approved_by`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`branch_id`),
  ADD KEY `branch_create_by` (`branch_create_by`),
  ADD KEY `branch_update_by` (`branch_update_by`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`),
  ADD KEY `department_branch_id` (`department_branch_id`),
  ADD KEY `department_division_id` (`department_division_id`),
  ADD KEY `department_create_by` (`department_create_by`),
  ADD KEY `department_update_by` (`department_update_by`);

--
-- Indexes for table `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`division_id`),
  ADD KEY `division_branch_id` (`division_branch_id`),
  ADD KEY `division_create_by` (`division_create_by`),
  ADD KEY `division_update_by` (`division_update_by`);

--
-- Indexes for table `employee_foreign`
--
ALTER TABLE `employee_foreign`
  ADD PRIMARY KEY (`employee_foreign_id`),
  ADD KEY `employee_foreign_create_by` (`employee_foreign_create_by`),
  ADD KEY `employee_foreign_update_by` (`employee_foreign_update_by`),
  ADD KEY `employee_foreign_branch_id` (`employee_foreign_branch_id`),
  ADD KEY `employee_foreign_division_id` (`employee_foreign_division_id`),
  ADD KEY `employee_foreign_department_id` (`employee_foreign_department_id`),
  ADD KEY `employee_foreign_position_id` (`employee_foreign_position_id`),
  ADD KEY `employee_foreign_site_id` (`employee_foreign_site_id`),
  ADD KEY `employee_foreign_role_id` (`employee_foreign_role_id`),
  ADD KEY `employee_foreign_parent_id` (`employee_foreign_parent_id`);

--
-- Indexes for table `employee_thai`
--
ALTER TABLE `employee_thai`
  ADD PRIMARY KEY (`employee_thai_id`),
  ADD KEY `employee_thai_create_by` (`employee_thai_create_by`),
  ADD KEY `employee_thai_update_by` (`employee_thai_update_by`),
  ADD KEY `employee_thai_branch_id` (`employee_thai_branch_id`),
  ADD KEY `employee_thai_division_id` (`employee_thai_division_id`),
  ADD KEY `employee_thai_department_id` (`employee_thai_department_id`),
  ADD KEY `employee_thai_position_id` (`employee_thai_position_id`),
  ADD KEY `employee_thai_site_id` (`employee_thai_site_id`),
  ADD KEY `employee_thai_role_id` (`employee_thai_role_id`),
  ADD KEY `employee_thai_parent_id` (`employee_thai_parent_id`);

--
-- Indexes for table `equipment_asset`
--
ALTER TABLE `equipment_asset`
  ADD PRIMARY KEY (`equipment_asset_id`),
  ADD KEY `equipment_asset_create_by` (`equipment_asset_create_by`),
  ADD KEY `equipment_asset_update_by` (`equipment_asset_update_by`),
  ADD KEY `equipment_asset_branch_id` (`equipment_asset_branch_id`),
  ADD KEY `equipment_asset_equipment_brand_id` (`equipment_asset_equipment_brand_id`),
  ADD KEY `equipment_asset_equipment_type_id` (`equipment_asset_equipment_type_id`),
  ADD KEY `equipment_asset_useing_now_user_id` (`equipment_asset_using_now_user_id`),
  ADD KEY `equipment_asset_use_before_user_id` (`equipment_asset_use_before_user_id`);

--
-- Indexes for table `equipment_brand`
--
ALTER TABLE `equipment_brand`
  ADD PRIMARY KEY (`equipment_brand_id`),
  ADD KEY `equipment_brand_create_by` (`equipment_brand_create_by`),
  ADD KEY `equipment_brand_update_by` (`equipment_brand_update_by`);

--
-- Indexes for table `equipment_type`
--
ALTER TABLE `equipment_type`
  ADD PRIMARY KEY (`equipment_type_id`),
  ADD KEY `equipment_type_create_by` (`equipment_type_create_by`),
  ADD KEY `equipment_type_update_by` (`equipment_type_update_by`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`position_id`),
  ADD KEY `position_branch_id` (`position_branch_id`),
  ADD KEY `position_division_id` (`position_division_id`),
  ADD KEY `position_create_by` (`position_create_by`),
  ADD KEY `position_update_by` (`position_update_by`),
  ADD KEY `position_department_id` (`position_department_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`),
  ADD KEY `role_create_by` (`role_create_by`),
  ADD KEY `role_update_by` (`role_update_by`);

--
-- Indexes for table `site`
--
ALTER TABLE `site`
  ADD PRIMARY KEY (`site_id`),
  ADD KEY `site_branch_id` (`site_branch_id`),
  ADD KEY `site_create_by` (`site_create_by`),
  ADD KEY `site_update_by` (`site_update_by`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_branch_id` (`user_branch_id`),
  ADD KEY `user_division_id` (`user_division_id`),
  ADD KEY `user_department_id` (`user_department_id`),
  ADD KEY `user_position_id` (`user_position_id`),
  ADD KEY `user_role_id` (`user_role_id`),
  ADD KEY `user_parent_id` (`user_parent_id`),
  ADD KEY `user_create_by` (`user_create_by`),
  ADD KEY `user_update_by` (`user_update_by`),
  ADD KEY `user_site_id` (`user_site_id`);

--
-- Indexes for table `user_log`
--
ALTER TABLE `user_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `user_log_ibfk_1` (`user_id`);

--
-- Indexes for table `warning_topic`
--
ALTER TABLE `warning_topic`
  ADD PRIMARY KEY (`warning_topic_id`),
  ADD KEY `warning_topic_create_by` (`warning_topic_create_by`),
  ADD KEY `warning_topic_update_by` (`warning_topic_update_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `backup`
--
ALTER TABLE `backup`
  MODIFY `backup_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `division`
--
ALTER TABLE `division`
  MODIFY `division_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `employee_foreign`
--
ALTER TABLE `employee_foreign`
  MODIFY `employee_foreign_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee_thai`
--
ALTER TABLE `employee_thai`
  MODIFY `employee_thai_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `equipment_asset`
--
ALTER TABLE `equipment_asset`
  MODIFY `equipment_asset_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `equipment_brand`
--
ALTER TABLE `equipment_brand`
  MODIFY `equipment_brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `equipment_type`
--
ALTER TABLE `equipment_type`
  MODIFY `equipment_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `site`
--
ALTER TABLE `site`
  MODIFY `site_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_log`
--
ALTER TABLE `user_log`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `warning_topic`
--
ALTER TABLE `warning_topic`
  MODIFY `warning_topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `backup`
--
ALTER TABLE `backup`
  ADD CONSTRAINT `backup_ibfk_1` FOREIGN KEY (`backup_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `backup_ibfk_2` FOREIGN KEY (`backup_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `backup_ibfk_3` FOREIGN KEY (`backup_approved_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `branch`
--
ALTER TABLE `branch`
  ADD CONSTRAINT `branch_ibfk_1` FOREIGN KEY (`branch_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `branch_ibfk_2` FOREIGN KEY (`branch_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`department_branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `department_ibfk_2` FOREIGN KEY (`department_division_id`) REFERENCES `division` (`division_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `department_ibfk_3` FOREIGN KEY (`department_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `department_ibfk_4` FOREIGN KEY (`department_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `division`
--
ALTER TABLE `division`
  ADD CONSTRAINT `division_ibfk_1` FOREIGN KEY (`division_branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `division_ibfk_2` FOREIGN KEY (`division_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `division_ibfk_3` FOREIGN KEY (`division_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee_foreign`
--
ALTER TABLE `employee_foreign`
  ADD CONSTRAINT `employee_foreign_ibfk_1` FOREIGN KEY (`employee_foreign_create_by`) REFERENCES `employee_foreign` (`employee_foreign_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_foreign_ibfk_2` FOREIGN KEY (`employee_foreign_update_by`) REFERENCES `employee_foreign` (`employee_foreign_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_foreign_ibfk_3` FOREIGN KEY (`employee_foreign_branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_foreign_ibfk_4` FOREIGN KEY (`employee_foreign_division_id`) REFERENCES `division` (`division_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_foreign_ibfk_5` FOREIGN KEY (`employee_foreign_department_id`) REFERENCES `department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_foreign_ibfk_6` FOREIGN KEY (`employee_foreign_position_id`) REFERENCES `position` (`position_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_foreign_ibfk_7` FOREIGN KEY (`employee_foreign_site_id`) REFERENCES `site` (`site_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_foreign_ibfk_8` FOREIGN KEY (`employee_foreign_role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_foreign_ibfk_9` FOREIGN KEY (`employee_foreign_parent_id`) REFERENCES `employee_foreign` (`employee_foreign_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee_thai`
--
ALTER TABLE `employee_thai`
  ADD CONSTRAINT `employee_thai_ibfk_1` FOREIGN KEY (`employee_thai_create_by`) REFERENCES `employee_thai` (`employee_thai_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_thai_ibfk_2` FOREIGN KEY (`employee_thai_update_by`) REFERENCES `employee_thai` (`employee_thai_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_thai_ibfk_3` FOREIGN KEY (`employee_thai_branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_thai_ibfk_4` FOREIGN KEY (`employee_thai_division_id`) REFERENCES `division` (`division_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_thai_ibfk_5` FOREIGN KEY (`employee_thai_department_id`) REFERENCES `department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_thai_ibfk_6` FOREIGN KEY (`employee_thai_position_id`) REFERENCES `position` (`position_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_thai_ibfk_7` FOREIGN KEY (`employee_thai_site_id`) REFERENCES `site` (`site_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_thai_ibfk_8` FOREIGN KEY (`employee_thai_role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employee_thai_ibfk_9` FOREIGN KEY (`employee_thai_parent_id`) REFERENCES `employee_thai` (`employee_thai_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equipment_asset`
--
ALTER TABLE `equipment_asset`
  ADD CONSTRAINT `equipment_asset_ibfk_1` FOREIGN KEY (`equipment_asset_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipment_asset_ibfk_2` FOREIGN KEY (`equipment_asset_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipment_asset_ibfk_3` FOREIGN KEY (`equipment_asset_branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipment_asset_ibfk_4` FOREIGN KEY (`equipment_asset_equipment_brand_id`) REFERENCES `equipment_brand` (`equipment_brand_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipment_asset_ibfk_5` FOREIGN KEY (`equipment_asset_equipment_type_id`) REFERENCES `equipment_type` (`equipment_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipment_asset_ibfk_6` FOREIGN KEY (`equipment_asset_using_now_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipment_asset_ibfk_7` FOREIGN KEY (`equipment_asset_use_before_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equipment_brand`
--
ALTER TABLE `equipment_brand`
  ADD CONSTRAINT `equipment_brand_ibfk_1` FOREIGN KEY (`equipment_brand_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipment_brand_ibfk_2` FOREIGN KEY (`equipment_brand_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `equipment_type`
--
ALTER TABLE `equipment_type`
  ADD CONSTRAINT `equipment_type_ibfk_1` FOREIGN KEY (`equipment_type_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipment_type_ibfk_2` FOREIGN KEY (`equipment_type_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `position`
--
ALTER TABLE `position`
  ADD CONSTRAINT `position_ibfk_1` FOREIGN KEY (`position_branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `position_ibfk_2` FOREIGN KEY (`position_division_id`) REFERENCES `division` (`division_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `position_ibfk_4` FOREIGN KEY (`position_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `position_ibfk_5` FOREIGN KEY (`position_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `position_ibfk_6` FOREIGN KEY (`position_department_id`) REFERENCES `department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role`
--
ALTER TABLE `role`
  ADD CONSTRAINT `role_ibfk_1` FOREIGN KEY (`role_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_ibfk_2` FOREIGN KEY (`role_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `site`
--
ALTER TABLE `site`
  ADD CONSTRAINT `site_ibfk_1` FOREIGN KEY (`site_branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `site_ibfk_2` FOREIGN KEY (`site_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `site_ibfk_3` FOREIGN KEY (`site_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`user_division_id`) REFERENCES `division` (`division_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_3` FOREIGN KEY (`user_department_id`) REFERENCES `department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_4` FOREIGN KEY (`user_position_id`) REFERENCES `position` (`position_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_5` FOREIGN KEY (`user_role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_6` FOREIGN KEY (`user_parent_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_7` FOREIGN KEY (`user_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_8` FOREIGN KEY (`user_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_9` FOREIGN KEY (`user_site_id`) REFERENCES `site` (`site_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_log`
--
ALTER TABLE `user_log`
  ADD CONSTRAINT `user_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `warning_topic`
--
ALTER TABLE `warning_topic`
  ADD CONSTRAINT `warning_topic_ibfk_1` FOREIGN KEY (`warning_topic_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `warning_topic_ibfk_2` FOREIGN KEY (`warning_topic_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
