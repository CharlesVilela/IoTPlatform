import { Document } from 'mongoose';

export default interface usuarioInterface extends Document {
    nome: string;
    nomeUsuario: string;
    email: string;
    senha: string;
    papel: string;
    dataHoraRegistro: Date;
}