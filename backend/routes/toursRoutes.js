const express = require("express");
const { createTour, getAllTours, getCheapestTours, updateTour, getTourDetails, getTrendingTours } = require("../controllers/toursController");




const router = express.Router();



router.route("/tours").post(createTour).get(getAllTours);
router.route("/tours").post(createTour).get(getAllTours);
router.route("/tour/cheapest").get(getCheapestTours);
router.route("/tour/trending").get(getTrendingTours);





router.route("/tour/:id").patch(updateTour);
router.route("/tours/:id").get(getTourDetails);










module.exports = router;