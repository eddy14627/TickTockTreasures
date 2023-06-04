import express from "express";
const router = express.Router();
import {
  fetchAllProducts,
  fetchBrandNameList,
  fetchDataByFilters,
  filterByBrand,
  filterByGender,
  filterByIsWearable,
  filterByPrice,
  filterByWatchType,
} from "../controllers/filtersControllers.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/filterB").post(protect, filterByBrand);
router.route("/filterP").post(protect, filterByPrice);
router.route("/filterW").post(protect, filterByIsWearable);
router.route("/filterWt").post(protect, filterByWatchType);
router.route("/filterG").post(protect, filterByGender);
router.route("/filterApplied").get(protect, fetchDataByFilters);
router.route("/brandList").get(protect, fetchBrandNameList);
router.route("/reset").get(protect, fetchAllProducts);

export default router;
