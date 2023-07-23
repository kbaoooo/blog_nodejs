import mongoose from 'mongoose';

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/f8_education_dev');
        console.log('Connect success');
    } catch (err) {
        console.log('Connect fail');
    }
}

export default { connect };
