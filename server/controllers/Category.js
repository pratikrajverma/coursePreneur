const Category = require("../models/Category");
// const mongoose = require("mongoose");

//...................................................create categories......................
const createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		console.log('name: ' + name)
		if (!name) {
			return res.status(400).json({
				success: false,
				message: "All fields are required"
			});
		}

		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});

		console.log(CategorysDetails);

		return res.status(200).json({
			success: true,
			message: "Categorys Created Successfully",
		});
	}
	catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

//......................................................show all categories.....................

const showAllCategories = async (req, res) => {
	try {
		const allCategorys = await Category.find(
			{},
			{ name: true }
		);

		console.log('all categories', allCategorys)
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};



//....................................................show course by click on category..........................

const categoryPageDetails = async (req, res) => {
	try {
		// getRandomInt function define kar rahe hain
		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		//get categories
		const { categoryId } = req.body;
 



		// if (!mongoose.Types.ObjectId.isValid(categoryId)) {
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "Invalid categoryId",
		// 	});
		// }


		//get course by specified categoryId
		const selectedCategory = await Category.findById(categoryId)
			.populate({ 
				path: "course",
				match: { status: "Published" },  
			})  
			.exec()
  
		if (!selectedCategory) {
			console.log("Category not found.")
			return res.status(404).json({ success: false, message: "Category not found" })
		}

		// Handle the case when there are no courses
		if (selectedCategory?.course?.length === 0) {
			console.log("No courses found for the selected category.")
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			})
		}

		// Get courses for other categories
		const categoriesExceptSelected = await Category.find({
			_id: { $ne: categoryId },
		})

		let differentCategory = await Category.findOne(
			categoriesExceptSelected[getRandomInt(0, categoriesExceptSelected.length - 1)]._id
		)
			.populate({
				path: "course",
				match: { status: "Published" },
			})
			.exec()

		// Get top-selling courses across all categories
		const allCategories = await Category.find()
			.populate({
				path: "course",
				match: { status: "Published" },
				populate: {
					path: "instructor",
				},
			})
			.exec()

		const allCourses = allCategories.flatMap((category) => category.course)

		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10)

		res.status(200).json({
			success: true,
			data: {
				selectedCategory,
				differentCategory,
				mostSellingCourses,
			},
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		})
	}
}


module.exports = { createCategory, showAllCategories, categoryPageDetails }