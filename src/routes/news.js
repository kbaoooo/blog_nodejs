import NewsController from '../app/controllers/NewsController.js';
import { Router } from 'express';

const newsRouter = Router();

newsRouter.get('/:slug', NewsController.show);
newsRouter.get('/', NewsController.index);

export default newsRouter;
