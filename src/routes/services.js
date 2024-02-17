const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn } = require("../shared/auth");
const {
  // postServicesSchema,
  // patchServicesSchema,
  postServicesSchema,
  patchServicesSchema,
} = require("../controllers/services/schemas/index");
const servicesController = require("../controllers/services");
const upload = require("../uploads");

const router = express.Router();

const sPostServices = [isLoggedIn, genValidator(postServicesSchema)];
// const sGetServices = [isLoggedIn];
// const mShowServices = [isLoggedIn];

const sPatchServices = [isLoggedIn, genValidator(patchServicesSchema)];

const mDeleteServices = [isLoggedIn];

router.post("/services", sPostServices, servicesController.postServices);

router.get("/services", servicesController.getServices);

router.get("/services/:id", servicesController.showServices);

router.patch("/services/:id", sPatchServices, servicesController.patchServices);

router.delete(
  "/services/:id",
  mDeleteServices,
  servicesController.deleteServices
);
module.exports = router;
