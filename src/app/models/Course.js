import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { model } from 'mongoose';
import mongooseDelete from "mongoose-delete";
import slug from 'mongoose-slug-updater';
import Inc from "mongoose-sequence";

const AutoIncrement = Inc(mongoose);

const Course = new Schema(
    {
        _id: { type: Number },
        name: { type: String, maxLength: 255, required: true },
        description: { type: String, maxLength: 600 },
        image: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        videoId: { type: String, required: true }, 
    },
    {   
        _id: false,
        timestamps: true,
    },
);

//add plugin
Course.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
})
Course.plugin(AutoIncrement)
mongoose.plugin(slug);

const CourseModel = model('Course', Course);

export default CourseModel;
