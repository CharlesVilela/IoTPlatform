import { Schema, model, Document } from 'mongoose';

import { QoS } from 'mqtt';


interface Itopicos extends Document {
    topicos: string;
}

interface brokerInterface extends Document {
    numeroIp: string;
    porta: number;
    clean: boolean;
    payload: string;
    qos: QoS;
    retain: boolean;
    usuario: string;
    topicos: Array<Itopicos>;
    dataHoraRegistro: Date;
}

const brokerSchema = new Schema({
    numeroIp:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    porta:{
        type: Number,
        required: true,
        lowercase: true,
        unique: true
    },
    clear:{
        type: Boolean,
        required: true,
        lowercase: true,
        default: false
    },
    payload:{
        type: String,
        required: true,
        lowercase: true
    },
    qos:{
       type: Number,
       required: true,
       lowercase: true,
       default: 1 
    },
    retain:{
        type: Boolean,
        required: true,
        default: false
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true 
    },
    topicos:[{
        type: Schema.Types.ObjectId,
        ref: 'Topico'
    }],
    dataHoraRegistro: {
        type: Date,
        default: Date.now,
        required: true
    }
}
)



export default model<brokerInterface>('Broker', brokerSchema);