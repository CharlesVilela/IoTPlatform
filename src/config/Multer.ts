import {Request, Response} from 'express';
import * as multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { hash } from 'bcrypt';
import { Options } from 'multer';
// import { Options } from '';

 const multerConfig  = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storege: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
          crypto.randomBytes(6, (error, hash) => {
                if (error) cb(error, 'true');

                const fileName = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, fileName);
          });  
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024,
    },
    fileFilter: (req: any, file: { mimetype: string; }, cb: (arg0: Error | null, arg1: boolean | undefined) => void) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file tupe.'), false);
        }
    }
} as Options;

export default multerConfig;
