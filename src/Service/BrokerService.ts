import { Request, Response } from "express";
import mqtt from "mqtt";
import statusCode from "../config/statusCode";
import Broker from "../entities/model/Broker";

import Topico from '../entities/model/Topico';
import Dispositivo from '../entities/model/Dispositivo';
import Canal from "../entities/model/Canal";

import mosca from "mosca"


//import GerenciarBroker from "../Teste/GerenciarBroker"

class BrokerServiceConectar {

    public async conectar(req: Request, res: Response) {

        try {
            const { id } = req.params
            const { numeroIp, topico, mensagem } = req.body

            const broker = await Broker.findOne({ numeroIp: numeroIp })
            const buscarTopico = await Topico.findOne({ nome: topico })

            if (broker == null) return res.status(statusCode.not_found).json("Broker Não encontrado")
            if (buscarTopico == null) return res.status(statusCode.not_found).json("Topico não encontrado")

            const cliente = mqtt.connect(broker.numeroIp)

            var brokerState = ''
            var connected = false

            cliente.on('connect', () => {
                cliente.subscribe(buscarTopico.nome)
                Broker.findOneAndUpdate({ numeroIp: numeroIp }, { topicos: buscarTopico.id })
            })

            cliente.on('connect', async () => {

                const nome = buscarTopico.nome
                const mensagens = mensagem

                cliente.publish(nome, mensagem)
                await Topico.findByIdAndUpdate(buscarTopico.id, { mensagem: mensagem })

                const topic = { nome: nome, mensagem: mensagens }
                const canal = await Canal.findOne({ topicos: buscarTopico.id })

                if (canal == null) {
                    return res.status(statusCode.not_found).send("Canal não encontrado!")
                } else {
                    if (canal.historico == true) {

                        const historicoPublicacao = {
                            topico: nome,
                            mensagem: mensagem
                        }
                        await Canal.findByIdAndUpdate(canal.id, { $push: { historicoPublicacao: historicoPublicacao } })
                    }
                }

            })

            return res.status(statusCode.success).json('Conectado com sucesso!')
        } catch (error) {
            return res.status(statusCode.error).send('Error in Connection!');
        }
    }

    public async Subscriber(req: Request, res: Response) {

    }

    public async Publisher(req: Request, res: Response) {

    }
}

export default new BrokerServiceConectar();