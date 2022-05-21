import App from './app';
import database from './database';

//STARTING THE SERVER
database();
const app = new App();
app.start();

