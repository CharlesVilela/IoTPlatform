import { Schema, model, Document, Mongoose } from 'mongoose';

interface topicoInterface extends Document {
    nome: string;
    mensagem: string;
    usuario: string;
    broker: string;
    dataHoraRegistro: Date;
}

const topicoSchema = new Schema ({
    nome:{
        type: String,
        required: true,
        unique: true
    },
    mensagem:{
        type: String
    },
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

export default model<topicoInterface>('Topico', topicoSchema);