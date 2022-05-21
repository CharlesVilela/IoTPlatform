import express from 'express';
import morgan from 'morgan';
import exphbs from 'express-handlebars';
import handlebars, { unregisterHelper, ParseOptions, create, RuntimeOptions } from 'handlebars';
import path from 'path';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
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
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.engine('.hbs', exphbs({
            handlebars: allowInsecurePrototypeAccess(handlebars),
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs'

        }));

        this.app.set('view engine', '.hbs');
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        this.app.use(cors());

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