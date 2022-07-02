import { Schema, model, Document } from 'mongoose';
import usuarioInterface from "../Interfaces/UsuarioInterface";

const usuarioSchema = new Schema({

    nome: {
        type: String,
        required: [true, 'O campo Nome é obrigatório'],
        lowercase: true,

    },
    nomeUsuario: {
        type: String,
        required: [true, 'O Nome do usuário é obrigatório'],
        lowercase: true,

    },
    email: {
        type: String,
        required: [true, 'O E-mail é obrigatório'],
        lowercase: true,
        unique: true,
    },
    senha: {
        type: String,
        required: [true, 'A senha é obrigatória'],
        lowercase: true,
        select: false,
    },
    imagemPerfil: {
        name: {
            type: String
        },
        size: {
            type: Number
        },
        url: {
            type: String
        }
    },
    papel: {
        type: String,
        required: true
    },
    dataHoraRegistro: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export default model<usuarioInterface>('Usuario', usuarioSchema);


