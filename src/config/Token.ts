import UsuarioInterface from "../entities/Interfaces/UsuarioInterface";

import jwt from 'jsonwebtoken';

class Token {

    public async gerarToken(usuario: UsuarioInterface): Promise<String> {

        const basetoken = 'd41d8cd98f00b204e9800998ecf8427e';
        const token = jwt.sign({ id: usuario.id, papel: usuario.papel }, basetoken, {
            expiresIn: 86400,
            algorithm: "HS256"
        });

        return token;
    }

}

export default new Token;