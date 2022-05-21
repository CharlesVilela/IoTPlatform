import { Schema, Document, model } from 'mongoose';

interface ICanal extends Document {
    canais: string;
}

interface Iinscricoes extends Document {
    inscricoes: string;
}
interface DispositivoInterface extends Document {
    nome: string;
    descricao: string;
    tipo: string;
    usuario: string;
    inscricoes: Array<Iinscricoes>;
    canais: Array<ICanal>;
    dataHoraRegistro: Date;
}

const DispositivoSchema = new Schema ({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    descricao: {
        type: String,
    },
    caracteristica: {
        type: String
    },
    tipo: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    inscricoes: [{
        type: Schema.Types.ObjectId,
        ref: 'Topico'
    }],
    canais: [{
        type: Schema.Types.ObjectId,
        ref: 'Canal'
    }],
    dataHoraRegistro: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export default model<DispositivoInterface>('Dispositivo', DispositivoSchema);