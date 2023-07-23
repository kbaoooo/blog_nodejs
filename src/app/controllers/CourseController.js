import CourseModel from '../models/Course.js';
import mongooseSupporter from '../../ultis/mongoose.js';

class CourseController {
    // [GET] courses/:slug
    show(req, res, next) {
        CourseModel.findOne({ slug: req.params.slug })
            .exec()
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseSupporter.mongooseToObject(course),
                })
            })
            .catch(next);
    }

    // [GET] courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] courses/store
    async store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new CourseModel(formData);
        try {
            await course.save();
            res.redirect('/me/stored/courses');
        } catch (err) {
            next(err);
        }
    }

    // [GET] courses/edit
    edit(req, res, next) {
        CourseModel.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseSupporter.mongooseToObject(course)
            }))
            .catch(next)
    }

    // [PUT] /courses/:id
    async update(req, res, next) { 
        await CourseModel.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [DELETE] /courses/:id
    async delete(req, res, next) { 
        await CourseModel.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id/force
    async forceDelete(req, res, next) { 
        await CourseModel.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    async restore(req, res, next) { 
        await CourseModel.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.actions) {
            case 'delete': 
                CourseModel.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default: 
                res.json({message: 'Action Invalid'})
        }
    }

    // [POST] /courses/handle-trash-actions
    handleTrashActions(req, res, next) {
        switch(req.body.actions) {
            case 'delete-force': 
                CourseModel.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'restore': 
                CourseModel.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default: 
                res.json({message: 'Action Invalid'})
        }
    }
}

export default new CourseController();
