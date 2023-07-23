import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import db from './config/db/index.js';
import methodOverride from 'method-override'
import sortMiddleWare from './app/middlewares/SortMiddleWare.js';

// connect to DB
db.connect();

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

app.use(methodOverride('_method'))

// custom middleware
app.use(sortMiddleWare)

//http logger
app.use(morgan('combined'));

//template engine
app.engine('.hbs', engine(
    { 
        extname: '.hbs', 
        helpers: { 
            plus: (a, b) => a + b,
            sortable: (field, _sort) => {
                const sortType = field === _sort.column ? _sort.type : 'default'

                const icons = {
                    default: 'fa-solid fa-elevator',
                    asc: 'fa-solid fa-caret-up',
                    desc: 'fa-solid fa-caret-down'
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return (
                    `<a href="?_sort&column=${field}&type=${type}" class="icon">
                        <i class="${icon}"></i>
                    </a>`
                )
            }
        } ,
    })
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
routes(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
