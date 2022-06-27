import { Request, Response } from 'express';

import Canal from '../entities/model/Canal';
import StatusCode from '../config/statusCode';
import Topico from '../entities/model/Topico';
import statusCode from '../config/statusCode';

class CanalController {

    public async Cadastrar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, tipo, historico, leituraOuEscrita } = req.body;

            const canal = await Canal.findOne({ nome: nome });

            if (canal != null) {
                return res.status(StatusCode.conflict).send('Esse Canal já existe! Tente outro!');
            } else {
                const newCanal = new Canal({ nome: nome, tipo: tipo, historico: historico, leituraOuEscrita: leituraOuEscrita, usuario: id });
                newCanal.save();
                return res.status(StatusCode.success).json(newCanal);
            }
        } catch (error) {
            return res.status(StatusCode.error).send('Ocorreu um ERROR ao cadastrar Canal!');
        }
    }

    public async Listar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const canais = await Canal.find({ usuario: id });

            if (canais == null) return res.status(StatusCode.not_found).send('Nenhum canal encontrado!');

            return res.status(StatusCode.success).json(canais);
        } catch (error) {
            return res.status(StatusCode.error).send('Ocorreu um ERROR ao Listar Canal!');
        }
    }

    public async BuscarPorID(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const canal = await Canal.findById(id);

            if (canal == null) return res.status(StatusCode.not_found).send('Nenhum canal encontrado!');

            return res.status(StatusCode.success).json(canal);
        } catch (error) {
            return res.status(StatusCode.error).send('Ocorreu um ERROR em Buscar o Canal!');
        }
    }

    public async Atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, tipo, historico, leituraOuEscrita } = req.body;
            await Canal.findByIdAndUpdate(id, { nome: nome, tipo: tipo, historico: historico, leituraOuEscrita: leituraOuEscrita });
            return res.status(StatusCode.success).send('Canal atualizado com sucesso!');
        } catch (error) {
            return res.status(StatusCode.error).send('Ocorreu um ERROR em Atualizar Canal!');
        }
    }

    public async Deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await Canal.findByIdAndDelete(id);
            return res.status(StatusCode.success).send('Canal deletado com sucesso!');
        } catch (error) {
            return res.status(StatusCode.error).send('Ocorreu um ERROR em Deletar o Canal!');
        }
    }

    public async AdicionarTopicos(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nomeTopico } = req.body;
            const topico = await Topico.findOne({ nome: nomeTopico });

            if (topico == null) return res.status(StatusCode.not_found).send('Topico não encontrado!');

            await Canal.findByIdAndUpdate(id, { $addToSet: { topicos: topico.id } });
            return res.status(StatusCode.success).send('Topico adicionado com sucesso!');
        } catch (error) {
            return res.status(StatusCode.error).send('Ocorreu um ERROR em Adicionar o Topico a Canal!');
        }
    }

    public async DeletarTopicos(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nomeTopico } = req.body;
            const topico = await Topico.findOne({ nome: nomeTopico });

            if (topico == null) return res.status(StatusCode.not_found).send('Topico não encontrado!');

            await Canal.findByIdAndUpdate(id, { $pull: { topicos: topico.id } });
            return res.status(StatusCode.success).send('Topico removido com sucesso!');
        } catch (error) {
            return res.status(StatusCode.error).send('Ocorreu um ERROR em Remover o Topico a Canal!');
        }
    }

    public async ExibirHistoricoDePublicacao(req: Request, res: Response) {

        const { id } = req.params;

        const canalHistorico = await Canal.findById(id)

        if (canalHistorico == null) return res.status(StatusCode.not_found).send('Canal não encontrado!');

        return res.status(statusCode.success).json(canalHistorico)


    }

}

export default new CanalController;