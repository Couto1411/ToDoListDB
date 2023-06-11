/* LOGICO: */
DROP DATABASE IF EXISTS `todolist`;
CREATE DATABASE `todolist`;
USE `todolist`;

CREATE TABLE Usuario (
    usuario_id INT PRIMARY KEY,
    nome_usuario varchar(40),
    senha varchar(100) NOT NULL,
    nome varchar(100) NOT NULL,
    telefone1 varchar(14),
    telefone2 varchar(14),
    email varchar(100) NOT NULL
);

CREATE TABLE Lista (
    lista_id INT PRIMARY KEY,
    nome varchar(100) NOT NULL,
    data_hora_crt DateTime,
    data_hora_mod DateTime,
    id_user_mod INT,
    criador_id INT,
    Constraint fk_criador_id foreign key (criador_id) references Usuario (usuario_id) ,
    Constraint fk_usuario_mod_id foreign key (id_user_mod) references Usuario (usuario_id)
);

CREATE TABLE Tarefa (
    tarefa_id INT PRIMARY KEY,
    descricao varchar(256),
    data_cadastro DateTime,
    data_vencimento DateTime,
    concluida Bool,
    lista_id INT,
    Constraint fk_lista_id foreign key (lista_id) references Lista (lista_id)
);

CREATE TABLE Convidados (
    usuario_id INT,
    lista_id INT,
    Constraint fk_usuario_convidado_id foreign key (usuario_id) references Usuario (usuario_id),
    Constraint fk_lista_convidado_id foreign key (lista_id) references Lista (lista_id),
    Constraint PRIMARY KEY (usuario_id,lista_id)
);