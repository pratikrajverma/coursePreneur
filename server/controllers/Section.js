const Section = require('../models/Section');
const Course = require('../models/Course');




//................................................................create section data..................................
const createSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, courseId } = req.body;

        //data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            })
        }

        //create section
        const newSection = await Section.create({ sectionName })


        //update Course document with new section objectId inside corseContent[] array
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            { $push: { courseContent: newSection._id } },
            { new: true })
            .populate({
                path: "courseContent",
                populate: {
                    path: "Subsection",
                },
            })
            .exec();

        //return response
        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            updatedCourse
        })




    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Error in creating section',
            error: err.message
        })
    }
}




//.........................................................update section data..............................................................
const updateSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, sectionId, courseId } = req.body;

        //data validation
        if (!sectionName || !sectionId || !courseId) { 
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields for update section'
            })
        }
 

        
        //update section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

        console.log(' updatedSection data: ', updatedSection)

        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "Subsection",
            },
        }).exec();;

        //return response
        return res.status(200).json({
            success: true,
            message: 'Section updated successfully',
            updatedCourse

        })


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Error in updating section'
        })
    }
}





//....................................................delete section................................................
const deleteSection = async (req, res) => {
    try {
        //section id fetch
        const { sectionId, courseId } = req.body;

        if (!courseId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'please send required fields for deleting section'
            })
        }


        //update courseContent of course data
        await Course.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } })

         
        const section = await Section.findById(sectionId);

        if (!section) {
            return res.status(400).json({
                success: false,
                message: 'could not find the section'
            })
        }

        //delete  sub-section array from section 
        await Section.findByIdAndUpdate(sectionId, { $pull: { Subsection: { $in: section.Subsection } } })

        //delete  section from database
        await Section.findByIdAndDelete(sectionId);

        //find the updated course and return 
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "Subsection"
            }
        })
            .exec();


        res.status(200).json({
            success: true,
            message: "Section deleted",
            data: course
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error in deleting section'
        })
    }
}




module.exports = { createSection, updateSection, deleteSection }