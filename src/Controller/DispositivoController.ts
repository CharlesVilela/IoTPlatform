import { Request, Response } from 'express';

import Dispositivo from '../model/Dispositivo';
import TipoDispositivo from '../model/TipoDispositivo';

import statusCode from '../config/statusCode';
import Canal from '../model/Canal';

class DispositivoController {

    public async Cadastrar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, descricao, caracteristica, tipo, tipoDispositivo } = req.body;

            const VerificarDispositivo = await Dispositivo.findOne({ nome: nome });
            if (VerificarDispositivo != null) {
                return res.status(statusCode.conflict).send('Esse Dispositivo já existe! Tente outro!');
            } else {
                const dispositivo = new Dispositivo({ nome: nome, descricao: descricao, caracteristica: caracteristica, tipo: tipo, usuario: id });
                await Dispositivo.create(dispositivo);

                await TipoDispositivo.findOneAndUpdate({ nome: tipoDispositivo }, { $push: { dispositivos: dispositivo.id } });

                return res.status(statusCode.success).json(dispositivo);
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error ao cadastrar Dispositivo!');
        }
    }

    public async Listar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const dispositivos = await Dispositivo.find({ usuario: id }).populate('inscricoes');
            return res.status(statusCode.success).json(dispositivos);
        } catch (error) {
            return res.status(statusCode.error).send('Error ao listar Dispositivo!');
        }
    }

    public async Buscar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const dispositivo = await Dispositivo.findById(id);
            return res.status(statusCode.success).json(dispositivo);
        } catch (error) {
            return res.status(statusCode.error).send('Error ao listar Dispositivo!');
        }
    }

    public async Atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, descricao, caracteristica, tipo } = req.body;

            const dispositivo = await Dispositivo.findByIdAndUpdate(id, { nome: nome, descricao: descricao, caracteristica: caracteristica, tipo: tipo, usuario: id });

            return res.status(statusCode.success).json(dispositivo);
        } catch (error) {
            return res.status(statusCode.error).send('Error ao atualizar Dispositivo!');
        }
    }

    public async Deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await Dispositivo.findByIdAndDelete(id);
            return res.status(statusCode.success).send('Deletado com sucesso!');
        } catch (error) {
            return res.status(statusCode.error).send('Error ao deletar Dispositivo!');
        }
    }

    public async AdicionarCanal(req: Request, res: Response) {
        try {
            const { nomeDispositivo, nomeCanal } = req.body;

            const canal = await Canal.findOne({ nome: nomeCanal });

            if (canal == null ) {
                return res.status(statusCode.not_found).send('Canal ou Dispositivo não encontrado! Tente novamente!');
            }else{
                await Dispositivo.findOneAndUpdate({ nome: nomeDispositivo }, { $push: { canais: canal.id } });
                return res.status(statusCode.success).send('Canal adicionado ao Dispositivo com sucesso!');
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error ao Adicionar Canal a Dispositivo!');
        }
    }

    public async DeletarCanal(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nomeCanal } = req.body;

            const canal = await Canal.findOne({ nome: nomeCanal });

            if (canal == null ) {
                return res.status(statusCode.not_found).send('Canal ou Dispositivo não encontrado! Tente novamente!');
            }else{
                await Dispositivo.findByIdAndUpdate(id, { $pull: { canais: canal.id } });
                return res.status(statusCode.success).send('Canal Removido do Dispositivo com sucesso!');
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error ao Adicionar Canal a Dispositivo!');
        }
    }

}

export default new DispositivoController;