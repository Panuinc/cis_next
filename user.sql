-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2024 at 04:40 AM
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
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,

  `user_number` varchar(255) NOT NULL,
  `user_card_number` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_title` varchar(255) NOT NULL,
  `user_firstname` varchar(255) NOT NULL,
  `user_lastname` varchar(255) NOT NULL,
  `user_nickname` varchar(255) NOT NULL,
  `user_tel` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_birthday` date NOT NULL,
  `user_gender` varchar(255) NOT NULL,
  `user_id_card` varchar(255) NOT NULL,
  `user_citizen` varchar(255) NOT NULL,

  `user_type` varchar(255) NOT NULL,
  `user_branch_id` int(11) NOT NULL,
  `user_site_id` int(11) NOT NULL,
  `user_division_id` int(11) NOT NULL,
  `user_department_id` int(11) NOT NULL,
  `user_position_id` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `user_parent_id` int(11) NOT NULL,
  `user_start_work` date NOT NULL,
  `user_status` int(11) NOT NULL DEFAULT 1 COMMENT '0 = Inactive, 1 = Active',
  
  `user_picture_file` varchar(255) NOT NULL,
  `user_picture_path` varchar(255) NOT NULL,
  `user_signature_file` varchar(255) NOT NULL,
  `user_signature_path` varchar(255) NOT NULL,

  `user_create_by` int(11) NOT NULL,
  `user_create_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_update_by` int(11) DEFAULT NULL,
  `user_update_time` datetime DEFAULT NULL

-- Doc User Thai
--   `user_id_card_file` varchar(255) NOT NULL,
--   `user_id_card_path` varchar(255) NOT NULL,
--   `user_home_file` varchar(255) NOT NULL,
--   `user_home_path` varchar(255) NOT NULL,

-- Doc User foreign.
  -- `user_mou` varchar(255) NOT NULL,
  -- `user_passport_no` varchar(255) NOT NULL,
  -- `user_passport_start` date NOT NULL,
  -- `user_passport_end` date NOT NULL,
  -- `user_passport_create_by` varchar(255) NOT NULL,
  -- `user_born_at` varchar(255) NOT NULL,
  -- `user_enter_at` varchar(255) NOT NULL,
  -- `user_enter_time` date NOT NULL,
  -- `user_section_6_no` varchar(255) NOT NULL,
  -- `user_check_the_type_of_visa` varchar(255) NOT NULL,
  -- `user_visa_number` varchar(255) NOT NULL,
  -- `user_visa_create_at` varchar(255) NOT NULL,
  -- `user_work_permit_number` varchar(255) NOT NULL,
  -- `user_work_permit_create_at` varchar(255) NOT NULL,
  -- `user_work_permit_create_time` date NOT NULL,
  -- `user_work_permit_end_time` date NOT NULL,
  -- `user_social_security_number` varchar(255) NOT NULL,
  -- `user_social_security_hospital_at` varchar(255) NOT NULL,



) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_create_by` (`user_create_by`),
  ADD KEY `user_update_by` (`user_update_by`),
  ADD KEY `user_branch_id` (`user_branch_id`),
  ADD KEY `user_division_id` (`user_division_id`),
  ADD KEY `user_department_id` (`user_department_id`),
  ADD KEY `user_position_id` (`user_position_id`),
  ADD KEY `user_site_id` (`user_site_id`),
  ADD KEY `user_role_id` (`user_role_id`),
  ADD KEY `user_parent_id` (`user_parent_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_create_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`user_update_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_3` FOREIGN KEY (`user_branch_id`) REFERENCES `branch` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_4` FOREIGN KEY (`user_division_id`) REFERENCES `division` (`division_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_5` FOREIGN KEY (`user_department_id`) REFERENCES `department` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_6` FOREIGN KEY (`user_position_id`) REFERENCES `position` (`position_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_7` FOREIGN KEY (`user_site_id`) REFERENCES `site` (`site_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_8` FOREIGN KEY (`user_role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_9` FOREIGN KEY (`user_parent_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;