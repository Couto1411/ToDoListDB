/* LOGICO: */
CREATE DATABASE IF NOT EXISTS `todolist`;
USE `todolist`;

CREATE TABLE Usuario (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario varchar(40),
    nome varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    senha varchar(100) NOT NULL,
    telefone1 varchar(14),
    telefone2 varchar(14)
);

CREATE TABLE Lista (
    lista_id INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(100) NOT NULL,
    data_hora_crt DateTime,
    data_hora_mod DateTime,
    usuario_id_mod INT,
    usuario_id INT,
    Constraint fk_usuario_id_cria foreign key (usuario_id) references Usuario (usuario_id) ,
    Constraint fk_usuario_id_mod foreign key (usuario_id_mod) references Usuario (usuario_id)
);

CREATE TABLE Tarefa (
    tarefa_id INT PRIMARY KEY AUTO_INCREMENT,
    descricao longtext,
    data_cadastro DateTime,
    data_vencimento DateTime,
    concluida Bool,
    titulo varchar(30),
    lista_id INT,
    usuario_id INT,
    Constraint fk_lista_id foreign key (lista_id) references Lista (lista_id),
    Constraint fk_usuario_id foreign key (usuario_id) references Usuario (usuario_id)
);

CREATE TABLE Convidado (
    usuario_id INT,
    lista_id INT,
    Constraint PRIMARY KEY (usuario_id, lista_id),
    Constraint fk_usuario_convidado_id foreign key (usuario_id) references Usuario (usuario_id),
    Constraint fk_lista_convidado_id foreign key (lista_id) references Lista (lista_id)
);
