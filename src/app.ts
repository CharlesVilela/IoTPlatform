import express, { response } from 'express';
import morgan from 'morgan';

import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';

//Routes

import routes from './routes';

class Application {

    app: express.Application;

    constructor() {

        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', 3100);
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(cors());

        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', '*');
            res.header('Access-Control-Allow-Credentials', '*');
            res.header('Access-Control-Expose-Headers', 'x-access-token');
            next();
        });

    }

    routes() {
        this.app.use(routes);
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });

    }
}


export default Application;