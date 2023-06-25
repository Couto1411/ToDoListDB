INSERT INTO `todolist`.`usuario`
(`nome_usuario`,`nome`,`email`,`senha`,`telefone1`,`telefone2`)
VALUES
("lucas","lucas","lucas","lucas","lucas","lucas"),
("marcus","marcus","marcus","marcus","marcus","marcus"),
("couto","couto","couto","couto","couto","couto"),
("pablo","pablo","pablo","pablo","pablo","pablo");

INSERT INTO `todolist`.`lista`
(`nome`,`data_hora_crt`,`data_hora_mod`,`usuario_id_mod`,`usuario_id`)
VALUES
("lista1",CURDATE(),CURDATE(),1,1),
("lista2",CURDATE(),CURDATE(),2,2),
("lista3",CURDATE(),CURDATE(),1,1),
("lista4",CURDATE(),CURDATE(),3,3),
("lista5",CURDATE(),CURDATE(),4,4);

INSERT INTO `todolist`.`tarefa`
(`descricao`,`data_cadastro`,`data_vencimento`,`concluida`,`titulo`,`lista_id`,`usuario_id`)
VALUES
("Esta é a tarefa 1", CURDATE(),DATE_ADD(CURDATE(), INTERVAL 1 DAY),0,"Tarefa1",1,1),
("Esta é a tarefa 2", CURDATE(),DATE_ADD(CURDATE(), INTERVAL 1 DAY),0,"Tarefa2",1,1),
("Esta é a tarefa 3", CURDATE(),DATE_ADD(CURDATE(), INTERVAL 1 DAY),0,"Tarefa3",1,1);

INSERT INTO `todolist`.`convidado`
(`usuario_id`,`lista_id`,`estado_convite`)
VALUES
(2,1,0);


