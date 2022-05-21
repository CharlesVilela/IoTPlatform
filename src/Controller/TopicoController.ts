import { Request, Response } from "express";

import Topico from '../model/Topico';
import Broker from '../model/Broker';

import statusCode from '../config/statusCode';
import Usuario from "../model/Usuario";
class TopicoController {

    public async Cadastrar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, porta } = req.body;

            const topico = await Topico.findOne({ nome: nome });
            if (topico != null) {
                return res.status(statusCode.conflict).send('Esse Topico já já existe! Tente outro!');
            } else {
                const newTopico = new Topico({ nome: nome, usuario: id });
                await Topico.create(newTopico);

                await Broker.findOneAndUpdate({ porta: porta }, { $push: { topico: newTopico } });

                return res.status(statusCode.success).json({ newTopico });
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error created Topico');
        }
    }

    public async ListarTodos(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const topicos = await Topico.find({ usuario: id }).populate('usuario');
            if (topicos == null) {
                return res.status(statusCode.success).send('Não tem topico cadastrado!');
            } else {
                return res.status(statusCode.success).json({ topicos });
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error listen Topico');
        }
    }

    public async BuscarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const topicos = await Topico.findById(id).populate('usuario');
            if (topicos == null) {
                return res.status(statusCode.success).send('Não tem topico cadastrado!');
            } else {
                return res.status(statusCode.success).json({ topicos });
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error listen Topico');
        }
    }

    public async Atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            await Topico.findByIdAndUpdate(id, { nome: nome });
            return res.status(statusCode.success).send('Update success!');
        } catch (error) {
            return res.status(statusCode.error).send('Error Update Broker');
        }
    }

    public async Deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await Topico.findByIdAndDelete(id);
            await Broker.findOneAndUpdate({ topico: id }, { $pull: { topico: id } });
            return res.status(statusCode.success).send('Deleting Topico success!');
        } catch (error) {
            return res.status(statusCode.error).send('Error Deleting!');
        }
    }

}

export default new TopicoController;