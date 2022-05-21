import { Request, Response } from 'express';

import TipoDispositivo from '../model/TipoDispositivo';
import statusCode from '../config/statusCode';

class TipoDispositivoController {

    public async Cadastrar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, fabricante, caracteristica } = req.body;

            const newTipoDispositivo = new TipoDispositivo({ nome: nome, fabricante: fabricante, caracteristica: caracteristica, usuario: id });

            await TipoDispositivo.create(newTipoDispositivo);
            return res.status(statusCode.success).send('TipoDispositivo adicionado com sucesso!');

        } catch (error) {
            return res.status(statusCode.error).send('Error created Grupo');
        }
    }

    public async ListarTodos(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tiposDispositivos = await TipoDispositivo.find({ usuario: id });
            return res.status(statusCode.success).json(tiposDispositivos);
        } catch (error) {
            return res.status(statusCode.error).send('Error created Grupo');
        }
    }

    public async BuscarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tipoDispositivo = await TipoDispositivo.findById(id);
            return res.status(statusCode.success).json(tipoDispositivo);
        } catch (error) {
            return res.status(statusCode.error).send('Error created Grupo');
        }
    }

    public async Atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, fabricante, caracteristica } = req.body;

            await TipoDispositivo.findByIdAndUpdate(id, { nome: nome, fabricante: fabricante, caracteristica: caracteristica });
            return res.status(statusCode.success).send('TipoDispositivo Atualizado com sucesso!');

        } catch (error) {
            return res.status(statusCode.error).send('Error created Grupo');
        }
    }

    public async Deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await TipoDispositivo.findByIdAndDelete(id);
            return res.status(statusCode.success).send('TipoDispositivo Deletado com sucesso!');
        } catch (error) {
            return res.status(statusCode.error).send('Error created Grupo');
        }
    }

}

export default new TipoDispositivoController;