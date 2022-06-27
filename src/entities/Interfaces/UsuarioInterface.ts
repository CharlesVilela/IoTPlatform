import { Document } from 'mongoose';

export default interface usuarioInterface extends Document {
    nomeUsuario: string;
    email: string;
    senha: string;
    dataHoraRegistro: Date;
 }