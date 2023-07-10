import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';

import routes from './routes/index.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

//http logger
app.use(morgan('combined'));

//template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, './resources/views'));
// respond with "hello world" when a GET request is made to the homepage

//routes init
routes(app);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`),
);
