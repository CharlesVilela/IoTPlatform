import { Request, Response } from 'express';

import Broker from '../entities/model/Broker';
import statusCode from '../config/statusCode';

class BrokerController {

    public async Cadastrar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { numeroIp, porta, clear, payload, qos, retain } = req.body;

            const broker = await Broker.findOne({ porta: porta });
            if (broker != null) {
                return res.status(statusCode.conflict).send('Esse Broker já existe! Tente outro!');
            } else {
                const newBroker = new Broker({ numeroIp: numeroIp, porta: porta, clear: clear, payload: payload, qos: qos, retain: retain, usuario: id });
                await Broker.create(newBroker);
                return res.status(statusCode.created).json({ newBroker });
            }
        } catch (error) {
            return res.status(statusCode.error).send('Error created Broker');
        }
    }

    public async ListarTodos(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const brokers = await Broker.find({ usuario: id });
            return res.status(statusCode.success).json({ brokers });
        } catch (error) {
            return res.status(statusCode.error).send('Error listen Brokers');
        }
    }

    public async BuscarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const broker = await Broker.findById(id);
            return res.status(statusCode.success).json(broker);
        } catch (error) {
            return res.status(statusCode.error).send('Error listen Brokers');
        }
    }

    public async Atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { numeroIp, porta, clear, payload, qos, retain } = req.body;
            const broker = await Broker.findByIdAndUpdate(id, { numeroIp: numeroIp, porta: porta, clear: clear, payload: payload, qos: qos, retain: retain });

            return res.status(statusCode.success).send('Update success');
        } catch (error) {
            return res.status(statusCode.error).send('Error Update Broker');
        }
    }

    public async Deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await Broker.findByIdAndDelete(id);
            return res.status(statusCode.success).send('Deleting Broker success!');
        } catch (error) {
            return res.status(statusCode.error).send('Error Deleting!');
        }
    }

}

export default new BrokerController;