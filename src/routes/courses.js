import CourseController from '../app/controllers/CourseController.js';
import { Router } from 'express';

const coursesRouter = Router();

coursesRouter.get('/create', CourseController.create);
coursesRouter.post('/store', CourseController.store);
coursesRouter.post('/handle-trash-actions', CourseController.handleTrashActions);
coursesRouter.post('/handle-form-actions', CourseController.handleFormActions);
coursesRouter.get('/:id/edit', CourseController.edit);
coursesRouter.put('/:id', CourseController.update);
coursesRouter.delete('/:id', CourseController.delete);
coursesRouter.delete('/:id/force', CourseController.forceDelete);
coursesRouter.patch('/:id/restore', CourseController.restore);
coursesRouter.get('/:slug', CourseController.show);

export default coursesRouter;
