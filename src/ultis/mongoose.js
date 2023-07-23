const mongooseSupporter = {
    multipleMongooseToObject: (mongoosesArray) => {
        return mongoosesArray.map((item) => item.toObject());
    },
    mongooseToObject: (mongoose) => (mongoose ? mongoose.toObject() : mongoose),
};

export default mongooseSupporter;
