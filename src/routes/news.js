import NewsController from '../app/controllers/NewsController.js';
import { Router } from 'express';

const newsRouter = Router();

newsRouter.use('/:slug', NewsController.show)
newsRouter.use('/', NewsController.index)

export default newsRouter;