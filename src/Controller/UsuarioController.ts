import Usuario from '../entities/model/Usuario';
import { Request, Response } from 'express';

import statusCode from '../config/statusCode';
import validations from '../validations/Validations';
import Criptografar from '../config/Criptografar';

class UsuarioController {

    public async Cadastrar(req: Request, res: Response) {
        try {
            const { nome, nomeUsuario, email, senha } = req.body;

            const validar = await validations.validarPreenchimentoCamposObrigatorios(nome, nomeUsuario, email, senha);

            if (validar != "") {
                return res.status(statusCode.bad).json(validar);
            }
            if (await validations.verifcarExisteUsuarioByEmail(email) != null) {
                return res.status(statusCode.success).json("Já existe um usuário com esse e-mail cadastrado. Tente com outro e-mail!");
            } else {
                const senhaCriptografada = await Criptografar.criptografar(senha);
                const usuario = new Usuario({ nome: nome, nomeUsuario: nomeUsuario, email: email, senha: senhaCriptografada, papel: "usuario" });
                await Usuario.create(usuario);
                return res.status(statusCode.success).json(usuario);
            }

        } catch (error) {
            return res.status(statusCode.error).send('Ocorreu um erro inesperado ao tentar cadastrar usuario!');
        }
    }

    public async ListarTodos(req: Request, res: Response) {
        try {
            const usuarios = await Usuario.find();

            if (usuarios == null)
                return res.status(statusCode.success).send('Não tem usuarios cadastrados!');
            else {
                const usuarios = await Usuario.find();
                return res.json(usuarios);
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error Listen!');
        }
    }

    public async BuscarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (await validations.verifcarExisteUsuarioById(id) == null) {
                return res.status(statusCode.not_found).send('Não existe usuario cadastrado com esse Id!');
            }
            else {
                const usuario = await Usuario.findById(id);
                return res.status(statusCode.success).json(usuario);
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error Listen!');
        }
    }

    public async Atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, nomeUsuario, email, senha } = req.body;

            const validar = await validations.validarPreenchimentoCamposObrigatorios(nome, nomeUsuario, email, senha);

            if (validar != "") {
                return res.status(statusCode.bad).json(validar);
            }

            const optUsuario = await validations.verifcarExisteUsuarioByEmail(email);

            if (optUsuario != null && optUsuario.id != id) {
                return res.status(statusCode.bad).json("O e-mail para qual você está tentando atualizar já pertence a outro usuário. Tente novamente com outro e-mail!");
            } else {
                const senhaCriptografada = await Criptografar.criptografar(senha);
                const usuario = await Usuario.findByIdAndUpdate(id, { nome: nome, nomeUsuario: nomeUsuario, email: email, senha: senhaCriptografada.toString() });
                return res.status(statusCode.success).json(usuario);
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error Update!');
        }
    }

    public async Deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const validar = await validations.verifcarExisteUsuarioById(id);

            if (validar != null) {
                const usuario = await Usuario.findByIdAndDelete(id);
                return res.status(statusCode.success).json(usuario);
            } else {
                return res.status(statusCode.success).json("Não existe usuario cadastrado com esse Id: " + id);
            }

        } catch (error) {
            return res.status(statusCode.error).send('Error ao deletar usuario!');
        }
    }

    public async ImagemPerfil(req: Request, res: Response) {

        try {
            const { id } = req.params;
            const { originalname: name, size, filename: key } = req.file;

            const imagem = {
                name: name,
                size: size,
                url: ""
            }

            await Usuario.findByIdAndUpdate(id, { imagemPerfil: imagem });
            return res.status(statusCode.success).send('Adicionado com sucesso!');
        } catch (error) {
            return res.status(statusCode.error).send('Error ao deletar usuario!');
        }
    }

}

export default new UsuarioController();