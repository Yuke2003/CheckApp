const express = require("express");
const router = express.Router();
const rentController = require("./../controllers/rentController");
const userController = require("./../controllers/userController");

router.route("/top-5-cheap").get(rentController.TopRents,rentController.findAllRents)

router.route("/").get(userController.protect, rentController.findAllRents).post(
  // userController.protect,
  // userController.restrictTo("buyer"),
  rentController.createRent
);

router
  .route("/:id")
  .get(
    // userController.protect,
    // userController.restrictTo("seller"),
    rentController.getOneRent
  )
  .patch(
    // userController.protect,
    // userController.restrictTo("buyer"),
    rentController.updateRent
  )
  .delete(
    // userController.protect,
    // userController.restrictTo("buyer"),
    rentController.deleteRent
  );

module.exports = router;
