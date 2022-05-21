// IMPORT DAS APIs

import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// IMPORT DO MODEL
import Usuario from '../model/Usuario';

// IMPORT DO CONFIG.

import statusCode from '../config/statusCode';
import nodemailer from '../config/MailerConfig';

class LoginService {

    public async Logar(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;
            const usuario = await Usuario.findOne({ email }).select('+senha');

            if (!usuario)
                return res.status(statusCode.bad).send('not faund');

            if (senha != usuario.senha)
                return res.status(statusCode.bad).send('Senha inválida');

                const basetoken = 'd41d8cd98f00b204e9800998ecf8427e';
                const token = jwt.sign({ id: usuario.id }, basetoken, {
                    expiresIn: 86400,
                    algorithm: "HS256"
                });
            return res.status(statusCode.success).json({ usuario, token });
        } catch (error) {
            return res.status(statusCode.error).send('Erro na tentativa de login!');
        }
    }

    // const a = await bcrypt.compare(senha, usuario.senha);
    // console.log(a, usuario.senha);

    public async RecuperarSenha(req: Request, res: Response){
        const { email } = req.body;

        try {
            const usuario = await Usuario.findOne({ email });
    
            if (!usuario)
                res.status(400).send({ error: 'Usuario não encontrado' })
    
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