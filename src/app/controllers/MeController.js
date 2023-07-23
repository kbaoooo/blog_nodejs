import CourseModel from "../models/Course.js";
import mongooseSupporter from "../../ultis/mongoose.js";

class MeController {
    // [GET] me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = CourseModel.find({});

        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({ 
                [req.query.column]: req.query.type,
            })
        }

        Promise.all([courseQuery, CourseModel.findWithDeleted({ deleted: true })
            .then(courses => {
                const countDeletedCourses = courses.length
                return countDeletedCourses;
            })])
            .then(([courses, countDeletedCourses]) => {
                res.render('me/stored-courses', {
                    countDeletedCourses,
                    courses: mongooseSupporter.multipleMongooseToObject(courses) 
                })
            })
            .catch(next)
    }

    // [GET] me/trash/courses
    trashCourses(req, res, next) {
        CourseModel.findWithDeleted({ deleted: true })
            .then(courses => res.render('me/trash-courses', {
                courses: mongooseSupporter.multipleMongooseToObject(courses) 
            }))
            .catch(next)
    }
}

export default new MeController();
