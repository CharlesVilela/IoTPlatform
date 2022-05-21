import { Schema, model, Document } from 'mongoose';


interface usuarioInterface extends Document {
   nomeUsuario: string;
   email: string;
   senha: string;
   dataHoraRegistro: Date;
}

 const usuarioSchema = new Schema({ 

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
        minlength: [8, 'A senha não pode ter menos que 8 caracteres'],
        maxlength: [16, 'A senha não pode ter mais que 16 caracteres'],  
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
    dataHoraRegistro: {
        type: Date,
        default: Date.now,
        required: true
    }
    });

export default model<usuarioInterface>('Usuario', usuarioSchema);

