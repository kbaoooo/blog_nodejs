import CourseModel from '../models/Course.js';
import mongooseSupporter from '../../ultis/mongoose.js';

class SiteController {
    // [GET] courses
    index(req, res, next) {
        CourseModel.find({})
            .then((collections) => {
                res.render('home', {
                    collections:
                        mongooseSupporter.multipleMongooseToObject(collections),
                });
            })
            .catch((err) => next(err));
    }

    // [GET] search
    search(req, res) {
        res.render('search');
    }
}

export default new SiteController();
