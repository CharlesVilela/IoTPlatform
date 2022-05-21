import { format } from "morgan";
import { Request, Response } from 'express';

import Grupo from '../model/Grupo';
import Dispositivo from '../model/Dispositivo';
import statusCode from '../config/statusCode';

class GrupoController {

    public async Cadastrar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            const newGrupo = new Grupo({ nome: nome, usuario: id });
            await Grupo.create(newGrupo);
            return res.status(statusCode.success).json(newGrupo);

        } catch (error) {
            return res.status(statusCode.error).send('Error created Grupo');
        }
    }

    public async ListarTodos(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const Grupos = await Grupo.find({ usuario: id });

            if (Grupos == null) return res.status(statusCode.not_found).send('Nenhum Grupo foi encontrado!');

            return res.status(statusCode.success).json(Grupos);
        } catch (error) {
            return res.status(statusCode.error).send('Error Listen Grupo');
        }
    }

    public async BuscarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const BuscarGrupo = await Grupo.findById(id);

            if (BuscarGrupo == null) return res.status(statusCode.not_found).send('Grupo não foi encontrado!');

            return res.status(statusCode.success).json(BuscarGrupo);
        } catch (error) {
            return res.status(statusCode.error).send('Error Buscar Grupo');
        }
    }

    public async Atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            await Grupo.findByIdAndUpdate(id, { nome: nome });
            return res.status(statusCode.success).send('Grupo atualizado com sucesso!');
        } catch (error) {
            return res.status(statusCode.error).send('Error Atualizar Grupo');
        }
    }

    public async Deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await Grupo.findByIdAndDelete(id);
            return res.status(statusCode.success).send('Grupo Deletado com sucesso!');
        } catch (error) {
            return res.status(statusCode.error).send('Error ao Deletar Grupo');
        }
    }

    public async AdicionarDispositivo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nomeDispositivo } = req.body;

            const dispositivo = await Dispositivo.findOne({ nome: nomeDispositivo });

            if (dispositivo == null) return res.status(statusCode.not_found).send('Dispositivo não encontrado!');

            await Grupo.findByIdAndUpdate(id, { $push: { dispositivos: dispositivo.id } });
            return res.status(statusCode.success).send('Dispositivo Adicionado com sucesso!');
        } catch (error) {
            return res.status(statusCode.error).send('Error ao Deletar Grupo');
        }
    }

    public async DeletarDispositivo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nomeDispositivo } = req.body;
            const dispositivo = await Dispositivo.findOne({ nome: nomeDispositivo });

            if (dispositivo == null) return res.status(statusCode.not_found).send('Dispositivo não encontrado!');

            await Grupo.findByIdAndUpdate(id, { $pull: { dispositivos: dispositivo.id } });
            return res.status(statusCode.success).send('Dispositivo removido com sucesso!');
        } catch (error) {
            return res.status(statusCode.error).send('Ocorreu um ERROR em Remover o Dispositvo do Grupo!');
        }
    }
}

export default new GrupoController;