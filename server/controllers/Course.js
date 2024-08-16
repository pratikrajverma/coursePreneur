const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section");
const Subsection = require("../models/Subsection");
const { uploadImage } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");

//............................................create (course information) handler function...............................................
const createCourse = async (req, res) => {
  try {
    //fetch data
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    //get thumbnail
    // const thumbnail = req.files.thumbnail;

    //validation
    if (
      !courseDescription ||
      !courseName ||
      !price ||
      // !tag || !thumbnail ||
      !whatYouWillLearn ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "all fields of course are required",
      });
    }

    // if (!status  ) {
    // 	status = "Draft";
    // }

    //find  instructor details
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor details not found",
      });
    }

    //check given tag is valid or not
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    //upload image to cloudinary
    // const thumbnailImage = await uploadImage(thumbnail, process.env.FOLDER_NAME)

    //create entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      // tag: tag,
      category: categoryDetails._id,
      // thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
    });

    //add new course to User schema of instructor
    await User.findByIdAndUpdate(
      instructorDetails._id,
      { $push: { courses: newCourse._id } },
      { new: true }
    ).populate();

    //update tag ka schema
    await Category.findByIdAndUpdate(
      category,
      { $push: { course: newCourse._id } },
      { new: true }
    ).populate();

    //return response
    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create Course, error: ",
      error: error,
    });
  }
};

// ...............................................Edit Course Details.......
const editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "Subsection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//................................................get (all courses) handler function............................................
const showAllCourse = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReview: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      allCourse,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Failed to fetch courses details",
      error: error,
    });
  }
};

//................................................get course details................................
const getCourseDetails = async (req, res) => {
  try {
    //get course id
    const { courseId } = req.body;

    //find course details
    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      //.populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "Subsection",
        },
      })
      .exec();

    //validation
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course details not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch course details",
      error: error.message,
    });
  }
};

//..................................................getFullDetailsOfCourse................................
function convertSecondsToDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":");
}

const getFullDetailsOfCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "Subsection",
        },
      })
      .exec();

    let courseProgressCount = await CourseProgress.findOne({
      CourseId: courseId,
      userId: userId,
    });

    console.log("courseProgressCount : ", courseProgressCount);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    if (courseDetails.status === "Draft") {
      return res.status(403).json({
        success: false,
        message: `Accessing a draft course is forbidden`,
      });
    }

    let totalDurationInSeconds = 0;

    courseDetails.courseContent.forEach((content) => {
      content.Subsection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ....................................Get a list of Course for a given Instructor..............................
const getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

// ...............................Delete the Course..................................
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Find the course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found for deletion" });
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId);

      if (section) {
        const subSections = section.Subsection;

        for (const subSectionId of subSections) {
          await Subsection.findByIdAndDelete(subSectionId);
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId);
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createCourse,
  editCourse,
  showAllCourse,
  getCourseDetails,
  getFullDetailsOfCourse,
  getInstructorCourses,
  deleteCourse,
};
