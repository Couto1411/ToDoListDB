INSERT INTO `todolist`.`usuario`
(`nome_usuario`,`nome`,`email`,`senha`,`telefone1`,`telefone2`)
VALUES
("teste","teste","teste","$2b$10$bG5isziDLSSkx/zcdZhQsuAfWyoC4BJqQ/x7tmt5A3yenAezdUd0O","teste","teste"),
("couto","couto","couto","$2b$10$aTZDSQ8IyT92UKKmGI1VI.l4kClixOocDm5Ln/ZDJZLmb.aqGywPK","couto","couto"),
("marcus","marcus","marcus","$2b$10$CHFoK17eCKI8tMfCiZCb7.wQj3sEQplx8Ju4mBlkYpOm7z44gBz7O","marcus","marcus"),
("lucas","lucas","lucas","$2b$10$.k.4WHusE4GeDPwW05B8aOZKeEXf0fWcvS9/ygguL0Y9VFxJm7kUO","lucas","lucas"),
("pablo","pablo","pablo","$2b$10$Rs.McBRr10ogymdt5QVC3Oi267/z8zkANK5e0ELR5bjK6IMwDemEm","pablo","pablo");

INSERT INTO `todolist`.`lista`
(`nome`,`data_hora_crt`,`data_hora_mod`,`usuario_id_mod`,`usuario_id`)
VALUES
("lista1",NOW(),NOW(),1,1),
("lista2",NOW(),NOW(),2,2),
("lista3",NOW(),NOW(),1,1),
("lista4",NOW(),NOW(),3,3),
("lista5",NOW(),NOW(),4,4);

INSERT INTO `todolist`.`tarefa`
(`descricao`,`data_cadastro`,`data_vencimento`,`concluida`,`titulo`,`lista_id`,`usuario_id`)
VALUES
("Esta é a tarefa 1", NOW(),DATE_ADD(NOW(), INTERVAL 1 DAY),0,"Tarefa1",1,1),
("Esta é a tarefa 2", NOW(),DATE_ADD(NOW(), INTERVAL 1 DAY),0,"Tarefa2",1,1),
("Esta é a tarefa 3", NOW(),DATE_ADD(NOW(), INTERVAL 1 DAY),0,"Tarefa3",1,1);

INSERT INTO `todolist`.`convidado`
(`usuario_id`,`lista_id`,`estado_convite`)
VALUES
(2,1,0);
