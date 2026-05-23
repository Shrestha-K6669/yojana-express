-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 08, 2022 at 09:43 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `villaprofile`
--

-- --------------------------------------------------------

--
-- Table structure for table `familyinfo`
--

DROP TABLE IF EXISTS `familyinfo`;
CREATE TABLE IF NOT EXISTS `familyinfo` (
  `_id` varchar(32) NOT NULL,
  `family_code` varchar(80) NOT NULL,
  `r_id` varchar(32) NOT NULL,
  `h_id` varchar(32) NOT NULL,
  `t_id` varchar(32) NOT NULL,
  `name_eng` varchar(200) DEFAULT NULL,
  `name_nep` varchar(200) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `dob` varchar(80) DEFAULT NULL,
  `ctz_no` varchar(100) DEFAULT NULL,
  `created_by` varchar(32) NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `created_by` (`created_by`),
  KEY `r_id` (`r_id`),
  KEY `h_id` (`h_id`),
  KEY `t_id` (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `familyinfo`
--

INSERT INTO `familyinfo` (`_id`, `family_code`, `r_id`, `h_id`, `t_id`, `name_eng`, `name_nep`, `gender`, `dob`, `ctz_no`, `created_by`) VALUES
('31295d6a091b4faba371ea193bda41a3', '1phakding1', '0c9fbedaeab44aa2818bc23d79b478b1', '541d021a691b4012839e2e1358c6c81c', '2ca27a80e6c140ee84e1c7b4b3ceb299', 'test', 'nep test', 'Male', '54564', '757', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `housenum`
--

DROP TABLE IF EXISTS `housenum`;
CREATE TABLE IF NOT EXISTS `housenum` (
  `_id` varchar(32) NOT NULL,
  `ward_no` int(11) NOT NULL,
  `house_no` int(11) NOT NULL,
  `house_desc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `housenum`
--

INSERT INTO `housenum` (`_id`, `ward_no`, `house_no`, `house_desc`) VALUES
('541d021a691b4012839e2e1358c6c81c', 3, 1, 'ward 3 house no:1');

-- --------------------------------------------------------

--
-- Table structure for table `otherinfo`
--

DROP TABLE IF EXISTS `otherinfo`;
CREATE TABLE IF NOT EXISTS `otherinfo` (
  `_id` varchar(32) NOT NULL,
  `f_id` varchar(32) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `profession` varchar(180) DEFAULT NULL,
  `documents` json DEFAULT NULL,
  `status` json DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `f_id` (`f_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `profile_status`
--

DROP TABLE IF EXISTS `profile_status`;
CREATE TABLE IF NOT EXISTS `profile_status` (
  `_id` varchar(32) NOT NULL,
  `f_id` varchar(32) NOT NULL,
  `profile_img` int(11) DEFAULT '0',
  `ctz_doc` int(11) DEFAULT '0',
  `land_doc` int(11) DEFAULT '0',
  `cert_doc` int(11) DEFAULT '0',
  `other_doc` int(11) DEFAULT '0',
  PRIMARY KEY (`_id`),
  KEY `f_id` (`f_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reln`
--

DROP TABLE IF EXISTS `reln`;
CREATE TABLE IF NOT EXISTS `reln` (
  `_id` varchar(32) NOT NULL,
  `reln_code` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reln`
--

INSERT INTO `reln` (`_id`, `reln_code`, `name`) VALUES
('0c9fbedaeab44aa2818bc23d79b478b1', 5, 'Daughter in Law'),
('1aad9a0f7be242ef902752f5a4fadc7f', 3, 'Son'),
('2e3622a02a9947368d39978165b25e98', 4, 'Daughter'),
('5cc98e22eaa74524b18b4d1ad63c1103', 6, 'Son in Law'),
('73a165a68d48480a90381e50e9f0bb05', 2, 'Spouse'),
('a53356ab9fa54bdb91c2cf91d3fb3cad', 1, 'Owner'),
('d3f5a4ae5b0d43f68e4df86cdc58e40e', 20, 'मामाको छोरा'),
('daa5f811e888444a8229e33d72d561a5', 23, 'test relation');

-- --------------------------------------------------------

--
-- Table structure for table `sys_user`
--

DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE IF NOT EXISTS `sys_user` (
  `_id` varchar(32) NOT NULL,
  `email` varchar(80) NOT NULL,
  `sys_password` varchar(250) NOT NULL,
  `user_type` varchar(32) NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `user_type` (`user_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sys_user`
--

INSERT INTO `sys_user` (`_id`, `email`, `sys_password`, `user_type`) VALUES
('admin', 'email@e.com', 'admin', 'type1');

-- --------------------------------------------------------

--
-- Table structure for table `tole`
--

DROP TABLE IF EXISTS `tole`;
CREATE TABLE IF NOT EXISTS `tole` (
  `_id` varchar(32) NOT NULL,
  `ward_no` int(11) NOT NULL,
  `tole_name` varchar(150) NOT NULL,
  `tole_desc` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tole`
--

INSERT INTO `tole` (`_id`, `ward_no`, `tole_name`, `tole_desc`) VALUES
('2ca27a80e6c140ee84e1c7b4b3ceb299', 1, 'phakding', 'fakding');

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
CREATE TABLE IF NOT EXISTS `usertype` (
  `_id` varchar(32) NOT NULL,
  `typeName` varchar(50) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usertype`
--

INSERT INTO `usertype` (`_id`, `typeName`) VALUES
('type1', 'Admin'),
('type2', 'Editor');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `familyinfo`
--
ALTER TABLE `familyinfo`
  ADD CONSTRAINT `familyinfo_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `sys_user` (`_id`),
  ADD CONSTRAINT `familyinfo_ibfk_2` FOREIGN KEY (`r_id`) REFERENCES `reln` (`_id`),
  ADD CONSTRAINT `familyinfo_ibfk_3` FOREIGN KEY (`h_id`) REFERENCES `housenum` (`_id`),
  ADD CONSTRAINT `familyinfo_ibfk_4` FOREIGN KEY (`t_id`) REFERENCES `tole` (`_id`);

--
-- Constraints for table `otherinfo`
--
ALTER TABLE `otherinfo`
  ADD CONSTRAINT `otherinfo_ibfk_1` FOREIGN KEY (`f_id`) REFERENCES `familyinfo` (`_id`);

--
-- Constraints for table `profile_status`
--
ALTER TABLE `profile_status`
  ADD CONSTRAINT `profile_status_ibfk_1` FOREIGN KEY (`f_id`) REFERENCES `familyinfo` (`_id`);

--
-- Constraints for table `sys_user`
--
ALTER TABLE `sys_user`
  ADD CONSTRAINT `sys_user_ibfk_1` FOREIGN KEY (`user_type`) REFERENCES `usertype` (`_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
