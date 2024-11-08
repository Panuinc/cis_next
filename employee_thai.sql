-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2024 at 03:26 AM
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
  `employee_foreign_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = ลาออก , 1 = ทำงานอยู่',
  `employee_foreign_create_by` int(11) NOT NULL,
  `employee_foreign_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `employee_foreign_update_by` int(11) DEFAULT NULL,
  `employee_foreign_update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee_foreign`
--
ALTER TABLE `employee_foreign`
  MODIFY `employee_foreign_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
