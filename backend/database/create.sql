CREATE DATABASE IF NOT EXISTS STARTNET;

CREATE TABLE `PLANO_INTERNET` (
  `codigo_plano` int PRIMARY KEY AUTO_INCREMENT,
  `descricao` varchar(250),
  `preco` DOUBLE NOT NULL
);
CREATE TABLE `CLIENTE` (
  `cliente_ID` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(200) NOT NULL,
  `rg` char(14) UNIQUE NOT NULL UNIQUE,
  `cpf` char(11) UNIQUE NOT NULL UNIQUE,
  `telefone` varchar(11) NOT NULL,
  `data_nasc` date(8) NOT NULL,
  `codigo_plano` int
);
CREATE TABLE `ENDERECO` (
  `cliente_ID` int NOT NULL,
  `cep` char(9) NOT NULL,
  `logradouro` varchar(200) NOT NULL,
  `numero` varchar(8) NOT NULL,
  `bairro` varchar(150) NOT NULL,
  `cidade` varchar(20) NOT NULL,
  `estado` char(2) NOT NULL
);
CREATE TABLE `PAGAMENTO` (
  `cliente_ID` int,
  `valor` DOUBLE NOT NULL,
  `data_pagamento` DATE NOT NULL,
  `pago` boolean
);
CREATE TABLE `AGENDA` (
  `codigo_agenda` int PRIMARY KEY,
  `cliente_ID` int,
  `data_agendamento` DATE NOT NULL,
  `status` varchar(50)
);
ALTER TABLE
  `CLIENTE`
ADD
  FOREIGN KEY (`codigo_plano`) REFERENCES `PLANO_INTERNET` (`codigo_plano`);
ALTER TABLE
  `ENDERECO`
ADD
  FOREIGN KEY (`cliente_ID`) REFERENCES `CLIENTE` (`cliente_ID`);
ALTER TABLE
  `PAGAMENTO`
ADD
  FOREIGN KEY (`cliente_ID`) REFERENCES `CLIENTE` (`cliente_ID`);
ALTER TABLE
  `AGENDA`
ADD
  FOREIGN KEY (`cliente_ID`) REFERENCES `CLIENTE` (`cliente_ID`);
