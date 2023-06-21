import express from "express";
const router = express.Router();
import {
  fetchBrandNameList,
  fetchDataByFilters,
} from "../controllers/filtersControllers.js";

router.route("/filterApplied").post(fetchDataByFilters);
router.route("/brandList").get(fetchBrandNameList);

export default router;
