import Usuario from '../model/Usuario';
import { Request, Response } from 'express';

import statusCode from '../config/statusCode';
import UsuarioService from '../Service/UsuarioService';

class UsuarioController {

    public async Cadastrar(req: Request, res: Response) {
        try {
            const { nomeUsuario, email, senha } = req.body;
            const newUsuario = new Usuario({ nomeUsuario: nomeUsuario, email: email, senha: senha });

            return res.json ( UsuarioService.Cadastrar(newUsuario));
           

            // const usuario = await Usuario.findOne({ email: email });

            // if( usuario != null) { 
            //     return res.status(statusCode.conflict).send('Esse Usuario já existe! Tente outro!'); 
            // } else {
            //     await Usuario.create(newUsuario);
            //     return res.status(statusCode.created).send({ newUsuario });
            // }
        } catch (error) {
            return res.status(statusCode.error).send('Error Created!');
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
            const usuario = await Usuario.findById(id);

            if (usuario != null) {
                return res.status(statusCode.success).json(usuario);
            }
            else {
                return res.status(statusCode.not_found).send('Não tem usuarios cadastrados!');
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error Listen!');
        }
    }

    public async Atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nomeUsuario, email, senha } = req.body;
            const usuario = await Usuario.findByIdAndUpdate(id, { nomeUsuario: nomeUsuario, email: email, senha: senha });

            if (usuario != null) {
                return res.status(statusCode.success).send('Usuario Atualizado!');
            }
            else {
                return res.status(statusCode.success).send('Não tem usuarios cadastrados!');
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error Update!');
        }
    }

    public async Deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByIdAndDelete(id);
            return res.status(statusCode.success).send('Usuario Deletado com sucesso!');
        } catch (error) {
            return res.status(statusCode.error).send('Error ao deletar usuario!');
        }
    }

    public async ImagemPerfil(req: Request, res: Response){
        
        try {
            const { id } = req.params;
            const {originalname: name, size, filename: key} = req.file;

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