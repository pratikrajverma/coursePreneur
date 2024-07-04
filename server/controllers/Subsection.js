
const Subsection = require('../models/Subsection');
const Section = require('../models/Section');
const { uploadImage } = require('../utils/imageUploader');

require('dotenv').config();

//...............................................................create subsection...........................................................
const createSubsection = async (req, res) => {
    try {
        //fetch data
        const { sectionId, title, timeDuration, description } = req.body;

        //extract video file
        const video = req.files.video;

        //validation
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImage(video, process.env.FOLDER_NAME);


        //create sub-section details
        const SubsectionDetails = await Subsection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url
        })


        //update section document with this sub-section objectId inside Subsection[]  array
        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId },
            { $push: { Subsection: SubsectionDetails._id } },
            { new: true })
            .populate('Subsection')
            .exec()




        //return response
        return res.status(200).json({
            success: true,
            message: 'Subsection created successfully',
            updatedSection
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong while creating subsection'
        })
    }
}



//................................................................update sub-section................................. 
const updateSubsection = async (req, res) => {
    try {
        //fetch data
        const { subsectionId, sectionId, title, timeDuration, description } = req.body;

        //extract video file
        const video = req.files.video;

        console.log('data for subsection  updation', subsectionId, sectionId, title, timeDuration, description, video)

        //validation
        if (!subsectionId || !sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: 'all fields are required for update sub-section'
            })
        }


        //upload video to cloudinary
        const uploadDetails = await uploadImage(video, process.env.FOLDER_NAME);


        //update sub-section details
        await Subsection.findByIdAndUpdate(subsectionId ,
            {
                title: title,
                timeDuration: timeDuration,
                description: description,
                videoUrl: uploadDetails.secure_url
            },
        )

        const updatededSection = await Section.findById(sectionId).populate('Subsection')

        console.log('updated section', updatededSection)

        return res.status(200).json({
            success: true,
            message: 'Subsection updated successfully',
            updatededSection
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong while updating sub-section'
        })
    }
}




//...............................................................Delete Sub-section..................................................


const deleteSubsection = async (req, res) => {
    try {
        // fetch data
        const { subsectionId, sectionId } = req.body;

        // validation
        if (!subsectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required for deleting subsection'
            });
        }

        // delete subsection from section model
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { Subsection: subsectionId } },
            { new: true } // To return the updated document
        );

        // delete subsection from database
        const deletedSubsection = await Subsection.findByIdAndDelete(subsectionId);

        if (!deletedSubsection) {
            return res.status(400).json({
                success: false,
                message: 'Deleted subsection not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Subsection deleted successfully',
            updatedSection: updatedSection
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong while deleting subsection'
        });
    }
};







module.exports = { createSubsection, updateSubsection, deleteSubsection }
