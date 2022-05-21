import { json } from 'body-parser';
import {Schema, Document, model} from 'mongoose';

interface Itopicos extends Document {
    topicos: string;
}

interface CanalInterface extends Document {
    nome: string;
    historico: boolean;
    topicos: string;
    leituraOuEscrita: string;
    usuario: string;
    dataHoraRegistro: Date;
}

const CanalSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: {enum: [String, Number, Boolean, JSON]},
        default: String
    },
    historico: {
        type: Boolean,
        default: false,
    },
    historicoPublicacao:[{
        topico: {
            type: String
        },
        mensagem: {
            type: String
        },
        data: {
           type: Date,
           default: Date.now
        }
    }],
    leituraOuEscrita: {
        type: String,
        required: true
    },
    topicos: [{
        type: Schema.Types.ObjectId,
        ref: 'Topico',
        required: true
    }],
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    dataHoraRegistro: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export default model<CanalInterface>('Canal', CanalSchema);