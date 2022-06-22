// IMPORT DAS APIs
import { Router } from 'express';
import multer from 'multer';

// IMPORT DOS CONTROLLERS
import UsuarioController from './Controller/UsuarioController';
import BrokerController from './Controller/BrokerController';
import TopicoController from './Controller/TopicoController';
import DispositivoController from './Controller/DispositivoController';
import CanalController from './Controller/CanalController';
import GrupoController from './Controller/GrupoController';
import TipoDispositivoController from './Controller/TipoDispositivoController';

// IMPORT DOS SERVICES
import LogarService from './Service/LoginService';
import BrokerService from './Service/BrokerService';

// IMPORT DO GERADOR DO TOKEN DE AUTENTICAÇÃO
import autoMidlewares from './middlewares/auth';

// IMPORT DO CONFIG
import multerConfig from './config/Multer';


const routes = Router();

// ROUTES LOGIN E RECUPERAÇÃO DE SENHA
routes.post('/usuario/logar', LogarService.Logar);
routes.post('/usuario/recuperarSenha', LogarService.RecuperarSenha);

// ROUTES USUARIO
routes.post('/usuario', UsuarioController.Cadastrar);

//routes.use(autoMidlewares); // UTILIZANDO O GERADOR DO TOKEN. DESTA LINHA PARA BAIXO SÓ SERÁ UTILIZADA SE TIVER O TOKEN DE AUTENTICAÇÃO.
routes.patch('/usuario/:id/foto', multer(multerConfig).single('file'), UsuarioController.ImagemPerfil);
routes.get('/usuario', UsuarioController.ListarTodos);
routes.get('/usuario/:id', UsuarioController.BuscarPorId); // O ID utilizado nesta Rota para BUSCAR é o ID do USUÁRIO
routes.patch('/usuario/:id', UsuarioController.Atualizar); // O ID utilizado nesta Rota para ATUALIZAR é o ID do USUÁRIO
routes.delete('/usuario/:id', UsuarioController.Deletar); // O ID utilizado nesta Rota para DELETAR é o ID do USUÁRIO


// ROUTES BROKER
routes.post('/usuario/broker/:id', BrokerController.Cadastrar); // O ID utilizado nesta rota para realizar o CADASTRO do BROKER é o ID do USUÁRIO
routes.get('/usuario/broker/:id', BrokerController.ListarTodos); // O ID utilizado nesta rota para realizar o LISTARTODOS do BROKER é o ID do USUÁRIO
routes.get('/usuario/broker/:id/buscar', BrokerController.BuscarPorId); // O ID utilizado nesta rota para realizar a BUSCA é o ID do BROKER
routes.patch('/usuario/broker/:id', BrokerController.Atualizar); // O ID utilizado nesta rota para ATUALIZAR é o ID do BROKER
routes.delete('/usuario/broker/:id', BrokerController.Deletar); // O ID utilizado nesta rota para DELETAR é o ID do BROKER


// ROUTES TOPICO
routes.post('/usuario/topico/:id', TopicoController.Cadastrar); // O ID utilizado nesta rota para realizar o CADASTRO do TÓPICO é o ID do USUÁRIO
routes.get('/usuario/topico/:id', TopicoController.ListarTodos); // O ID utilizado nesta rota para realizar o LISTARTODOS do TÓPICO é o ID do USUÁRIO
routes.get('/usuario/topico/:id/buscar', TopicoController.BuscarPorId); // O ID utilizado nesta rota para realizar a BUSCA é o ID do TÓPICO
routes.patch('/usuario/topico/:id', TopicoController.Atualizar); // O ID utilizado nesta rota para ATUALIZAR é o ID do TÓPICO
routes.delete('/usuario/topico/:id', TopicoController.Deletar); // O ID utilizado nesta rota para DELETAR é o ID do TÓPICO


// ROUTES DISPOSITIVO
routes.post('/dispositivo/cadastrar/:id', DispositivoController.Cadastrar); // O ID utilizado nesta rota para realizar o CADASTRO do DISPOSITIVO é o ID do USUÁRIO
routes.get('/dispositivo/listar/:id', DispositivoController.Listar); // O ID utilizado nesta rota para realizar o LISTARTODOS do DISPOSITIVO é o ID do USUÁRIO
routes.get('/dispositivo/buscar/:id', DispositivoController.Buscar); // O ID utilizado nesta rota para realizar a BUSCA é o ID do DISPOSITIVO
routes.put('/dispositivo/atualizar/:id', DispositivoController.Atualizar); // O ID utilizado nesta rota para ATUALIZAR é o ID do DISPOSITIVO
routes.delete('/dispositivo/deletar/:id', DispositivoController.Deletar); // O ID utilizado nesta rota para DELETAR é o ID do DISPOSITIVO
routes.put('/dispositivo/adicionarCanal', DispositivoController.AdicionarCanal);
routes.put('/dispositivo/deletarCanal/:id', DispositivoController.DeletarCanal); // O ID utilizado nesta rota para REMOVER o CANAL é o ID do DISPOSITIVO

// ROUTES CANAL
routes.post('/canal/cadastrar/:id', CanalController.Cadastrar); // O ID utilizado nesta rota para realizar o CADASTRO do CANAL é o ID do USUÁRIO
routes.get('/canal/listar/:id', CanalController.Listar); // O ID utilizado nesta rota para realizar o LISTARTODOS do CANAL é o ID do USUÁRIO
routes.get('/canal/buscar/:id', CanalController.BuscarPorID); // O ID utilizado nesta rota para BUSCAR é o ID do CANAL
routes.put('/canal/atualizar/:id', CanalController.Atualizar); // O ID utilizado nesta rota para ATUALIZAR é o ID do CANAL
routes.delete('/canal/deletar/:id', CanalController.Deletar); // O ID utilizado nesta rota para DELETAR é o ID do CANAL
routes.put('/canal/adicionarTopico/:id', CanalController.AdicionarTopicos); // O ID utilizado nesta rota para ADICIONAR é o ID do CANAL
routes.put('/canal/deletarTopico/:id', CanalController.DeletarTopicos); // O ID utilizado nesta rota para REMOVER é o ID do CANAL
routes.get('/canal/exibirHistorico/:id', CanalController.ExibirHistoricoDePublicacao) // O ID utilizado nesta rota para Exibir o HISTORICO DE PUBLICAÇÕES é o ID do CANAL


// ROUTES GRUPO
routes.post('/grupo/cadastrar/:id', GrupoController.Cadastrar); // O ID utilizado nesta rota para realizar o CADASTRO do GRUPO é o ID do USUÁRIO
routes.get('/grupo/listar/:id', GrupoController.ListarTodos); // O ID utilizado nesta rota para realizar o LISTARTODOS do GRUPO é o ID do USUÁRIO
routes.get('/grupo/buscar/:id', GrupoController.BuscarPorId); // O ID utilizado nesta rota para BUSCAR é o ID do GRUPO
routes.put('/grupo/atualizar/:id', GrupoController.Atualizar); // O ID utilizado nesta rota para ATUALIZAR é o ID do GRUPO
routes.delete('/grupo/deletar/:id', GrupoController.Deletar); // O ID utilizado nesta rota para DELETAR é o ID do GRUPO
routes.put('/grupo/adicionarDispositivo/:id', GrupoController.AdicionarDispositivo); // O ID utilizado nesta rota para ADICIONAR é o ID do GRUPO
routes.put('/grupo/deletarDispositivo/:id', GrupoController.DeletarDispositivo); // O ID utilizado nesta rota para REMOVER é o ID do GRUPO

// ROUTES TIPODISPOSITIVO
routes.post('/tipo/cadastrar/:id', TipoDispositivoController.Cadastrar); // O ID utilizado nesta rota para realizar o CADASTRO do GRUPO é o ID do USUÁRIO
routes.get('/tipo/listar/:id', TipoDispositivoController.ListarTodos); // O ID utilizado nesta rota para realizar o LISTARTODOS do GRUPO é o ID do USUÁRIO
routes.get('/tipo/buscar/:id', TipoDispositivoController.BuscarPorId); // O ID utilizado nesta rota para BUSCAR é o ID do TIPODISPOSITIVO
routes.put('/tipo/atualizar/:id', TipoDispositivoController.Atualizar); // O ID utilizado nesta rota para ATUALIZAR é o ID do TIPODISPOSITIVO
routes.delete('/tipo/deletar/:id', TipoDispositivoController.Deletar); // O ID utilizado nesta rota para DELETAR é o ID do TIPODISPOSITIVO


// ROUTES DOS SERVICES CONECTAR AO BROKER E SUBSCRIBER E PUBLISH
routes.post('/conectarBroker/:id', BrokerService.conectar); // O ID utilizado nesta rota para realizar a CONEXÃO do BROKER é o ID do USUÁRIO
routes.post('/subscriber/:id', BrokerService.Subscriber); // O ID utilizado nesta rota para realizar o SUBSCRIBER no TOPICO é O ID do DISPOSITIVO
routes.post('/publisher/:id', BrokerService.Publisher); // O ID utilizado nesta rota para PUBLICAR é o ID do TÓPICO


export default routes;