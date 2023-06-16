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

router.route("/filterB").post(filterByBrand);
router.route("/filterP").post(filterByPrice);
router.route("/filterW").post(filterByIsWearable);
router.route("/filterWt").post(filterByWatchType);
router.route("/filterG").post(filterByGender);
router.route("/filterApplied").post(fetchDataByFilters);
router.route("/brandList").get(fetchBrandNameList);
router.route("/reset").get(fetchAllProducts);

export default router;
