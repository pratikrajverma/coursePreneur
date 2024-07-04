const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    courseDescription: {
        type: String,
        required: true,
        trim: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
    },
    whatYouWillLearn: {
        type: String,
        trim: true
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section'
        }
    ],
    ratingAndReview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RatingAndReview'
        }
    ],
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,  
            ref: 'User',
            required: true
        }
    ],
    instructions: {
        type: [String],

    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },

    createdAt: {
        type: Date,
        default: Date.now
    },




})

module.exports = mongoose.model('Course', CourseSchema) 