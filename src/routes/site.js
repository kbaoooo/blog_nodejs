import SiteController from '../app/controllers/SiteController.js';
import { Router } from 'express';

const siteRouter = Router();

siteRouter.get('/search', SiteController.search);
siteRouter.get('/', SiteController.index);

export default siteRouter;
