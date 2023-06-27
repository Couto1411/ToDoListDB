-- USUARIO
INSERT INTO usuario (nome_usuario,nome,senha,telefone1,telefone2,email) VALUES("","","","","","")
-- Cadastra usuário
SELECT usuario_id from usuario where email= ""
-- Retorna o id do usuario assim que cadastra
SELECT * FROM usuario WHERE email = ""
-- Faz o login com email
SELECT usuario_id,nome_usuario,nome,email,telefone1,telefone2 FROM usuario where usuario_id= 0
-- Pega as informações do usuário pra mostrar no perfil
UPDATE usuario SET nome_usuario = "", senha = "", nome = "", email = "", telefone1 = "", telefone2 = "" WHERE usuario_id = 0
-- Atualiza informações+senha do usuário
UPDATE usuario SET nome_usuario = "", nome = "", email = "", telefone1 = "", telefone2 = "" WHERE usuario_id = 0
-- Atualiza informações-senha do usuário

-- NOTIFICACAO
SELECT usuario_id FROM lista WHERE lista_id= 0
-- Busca o id do criador para verificar se quem está logado é o criador
INSERT INTO convidado(usuario_id,lista_id,estado_convite) VALUES( 0 , 0 ,0)
-- Insere novo convite
SELECT l.usuario_id FROM lista l where l.lista_id= 0
-- Busca o id do criador para verificar se quem está logado é o criador
DELETE FROM convidado WHERE usuario_id= 0 and lista_id= 0
-- Deleta um convite / Rejeita um convite
SELECT c.estado_convite, c.lista_id, l.nome as nome_lista, u.nome_usuario from convidado c join lista l on l.lista_id=c.lista_id join usuario u on u.usuario_id=l.usuario_id WHERE c.usuario_id= 0
-- Busca informações das listas que foi convidado/aceitou
UPDATE convidado SET estado_convite=1 WHERE usuario_id= 0 and lista_id= 0
-- Aceita um convite

-- TAREFA
UPDATE lista SET data_hora_mod = now(), usuario_id_mod = 0 WHERE lista_id = 0 
-- Atualiza horário e usuario que modificou a lista
SELECT c.usuario_id as convidados_id, l.usuario_id FROM convidado c join lista l on c.lista_id=l.lista_id where c.lista_id = 0 and c.estado_convite=1
SELECT l.usuario_id FROM lista l where l.lista_id = 0
-- Consulta para verificar se o usuário da requisição é criador ou convidado da lista
INSERT INTO tarefa(descricao,data_cadastro,data_vencimento,concluida,titulo,lista_id,usuario_id) VALUES ( "" , "" , "" ,0, "" , 0 , 0 )
-- Cria tarefa
UPDATE tarefa SET descricao = "" , data_cadastro = "" , data_vencimento = "" , concluida = "" ,titulo = "" ,lista_id = 0 ,usuario_id = 0 WHERE tarefa_id= 0
-- Edita tarefa
DELETE FROM tarefa WHERE tarefa_id= 0
-- Deleta tarefa
SELECT * FROM tarefa where lista_id= 0
-- Busca tarefas
SELECT u.usuario_id as id,u.nome FROM usuario u WHERE nome_usuario LIKE "%%" and u.usuario_id != 0
-- Busca usuários a convidar a partir de uma string

-- LISTA
DELETE FROM convidado WHERE lista_id=0
DELETE FROM tarefa WHERE lista_id=0
DELETE FROM lista WHERE lista_id=0
-- Deleta todos os convites de uma lista, todas as tarefas dessa lista e a prórpia lista