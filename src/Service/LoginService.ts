// IMPORT DAS APIs
import { Request, Response } from "express";
import crypto from 'crypto';

import bcrypt from 'bcrypt';

// IMPORT DO MODEL
import Usuario from '../entities/model/Usuario';

// IMPORT DO CONFIG.
import statusCode from '../config/statusCode';
import nodemailer from '../config/MailerConfig';
import Token from "../config/Token";
import Validations from "../validations/Validations";

class LoginService {

    public async Logar(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            if (email === "" || senha === "")
                return res.status(statusCode.bad).json('Os campos: e-mail e senha não podem ser vazios. Preencha-os corretamente!');

            if (await Validations.validarEmail(email) == false) {
                return ("O E-mail informado é invalido. Informe um e-mail valido!");
            }

            const usuario = await Usuario.findOne({ email }).select('+senha');

            if (!usuario)
                return res.status(statusCode.bad).json('Não foi possivel encontrar um usuario cadastrado com esse e-mail. Tente novamente!');

            if (!bcrypt.compareSync(senha, usuario.senha.toString()))
                return res.status(statusCode.bad).json('Senha está incorreta. Tente novamente!');

            const token = await Token.gerarToken(usuario);

            return res.set("x-access-token", token.toString()).status(statusCode.success).json({ usuario });
        } catch (error) {
            return res.status(statusCode.error).send('Erro na tentativa de login!');
        }
    }

    public async RecuperarSenha(req: Request, res: Response) {
        try {
            const { email } = req.body;
            if (email === "")
                return res.status(statusCode.bad).json('O campo: e-mail não pode ser vazio. Preencha-o corretamente!');

            if (await Validations.validarEmail(email) == false) {
                return ("O E-mail informado é invalido. Informe um e-mail valido!");
            }

            const usuario = await Usuario.findOne({ email });

            if (!usuario)
                return res.status(400).json({ error: 'Usuario não encontrado. Tente novamente!' })

            const senhaTemporaria = crypto.randomBytes(5).toString('hex');

            await Usuario.findByIdAndUpdate(usuario?.id, { $set: { senha: senhaTemporaria } });

            nodemailer.sendMail({
                to: email,
                from: "testeppoifpe2021@gmail.com",
                subject: "Você esqueceu a sua senha não se preocupe",
                text: "Aqui está a sua senha temporária",
                html: senhaTemporaria

            }, (error) => {
                if (error) return res.status(400).send({ error: 'Error ao enviar o E-mail' });

                return res.send('Enviado com sucesso! Verifique seu E-mail para ver se chegou sua senha temporária!');
            });
        } catch (error) {
            console.log(error);
            res.status(400).send({ error: 'Erro em esqueci a minha senha' })
        }

    }


}

export default new LoginService;