const catchAsyncErrorsMiddleware = require("../middleware/catchAsyncErrorsMiddleware");
const toursModel = require("../models/toursModel");
const ApiFeatures = require("../utils/apiFeatures");

// create a tour
exports.createTour = catchAsyncErrorsMiddleware(async (req, res, next) => {
  const user = await toursModel.create(req.body);
  res.status(201).json({
    success: true,
    user,
  });
});

// Get All tours
exports.getAllTours = catchAsyncErrorsMiddleware(async (req, res, next) => {
  const limit = req.query.limit;
  const toursCount = await toursModel.countDocuments();

  const apiFeature = new ApiFeatures(toursModel.find(), req.query)
    .selectingFields()
    .sorting()
    .pagination(limit);

  const tours = await apiFeature.query;

  res.status(200).json({
    success: true,
    message:
      limit && limit <= toursCount
        ? `${limit} user is showing out of ${toursCount} users`
        : `All ${toursCount} users are showing`,
    users: tours,
  });
});

// Get All cheapestTours
exports.getCheapestTours = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const cheapestTours = await toursModel.find().sort({ price: 1 }).limit(3);

    res.status(200).json({
      success: true,
      message: "Cheapest tours are showing",
      users: cheapestTours,
    });
  }
);

// Get All treinding Tours
exports.getTrendingTours = catchAsyncErrorsMiddleware(
  async (req, res, next) => {
    const trendingTours = await toursModel.find().sort({ totalViews: -1 }).limit(3);

    res.status(200).json({
      success: true,
      message: "treinding tours are showing",
      trendingTours,
    });
  }
);

// update a Tour
exports.updateTour = catchAsyncErrorsMiddleware(async (req, res, next) => {
  const id = req.params.id;
  const tour = await toursModel.findById(id);
  if (!tour) {
    return res.status(404).json({
      success: false,
      message: "Tour not found. Something went wrong",
    });
  }
  const updatedTour = await toursModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Tour updated successfully",
    updatedTour,
  });
});

// Get tour details by ID Increase the view count by 1 for this tour every time a user hits this endpoint
exports.getTourDetails = catchAsyncErrorsMiddleware(async (req, res, next) => {
  const id = req.params.id;
  const tour = await toursModel.findById(id);
  if (!tour) {
    return res.status(404).json({
      success: false,
      message: "Tour not found. Something went wrong",
    });
  }
  const updatedTour = await toursModel.findByIdAndUpdate(
    req.params.id,
    { $inc: { totalViews: 1 } },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Tour details are showing",
    tour: updatedTour,
  });
});
