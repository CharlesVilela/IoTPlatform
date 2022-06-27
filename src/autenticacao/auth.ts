import { Request, Response, NextFunction } from 'express';
import statusCode from '../config/statusCode';
import jwt, { decode } from 'jsonwebtoken';

const validarAutenticacao = (req: Request, res: Response, next: NextFunction) => {
    const autorizar = req.headers.authorization;
    
    if (!autorizar) 
      return res.status(statusCode.unauthorized).send('No token autorized');

    const partes = autorizar.split(' ');
  
      if (partes.length != 2)
          return res.status(statusCode.unauthorized).send('Token error');
  
      const [schema, token] = partes;
  
      if (!/^Bearer$/i.test(schema))
          return res.status(statusCode.unauthorized).send('Token malformatted');
  
  
      const basetoken = 'd41d8cd98f00b204e9800998ecf8427e';
  
      jwt.verify(token, basetoken, (err, decoded) => {

        if(err) return res.status(statusCode.unauthorized).send('Token invalid');
           
        return next();
      });
}

export default validarAutenticacao;