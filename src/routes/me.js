import MeController from '../app/controllers/MeController.js';
import { Router } from 'express';

const meRouter = Router();

meRouter.get('/stored/courses', MeController.storedCourses);
meRouter.get('/trash/courses', MeController.trashCourses);

export default meRouter;
