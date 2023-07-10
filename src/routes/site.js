import SiteController from '../app/controllers/SiteController.js';
import { Router } from 'express';

const siteRouter = Router();

siteRouter.use('/search', SiteController.search)
siteRouter.use('/', SiteController.index)

export default siteRouter;