import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

export const fetchDataByFilters = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const filters = req.body;
  console.log(filters, "filters");
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  let query = {};

  filters &&
    filters.forEach((filter) => {
      const fieldName = Object.keys(filter)[0];
      const filterValue = filter[fieldName];

      if (fieldName === "price") {
        if (Array.isArray(filterValue) && filterValue.length === 2) {
          const [minPrice, maxPrice] = filterValue;
          query[fieldName] = {
            $gte: minPrice,
            $lte: maxPrice,
          };
        } else {
          console.error("Invalid price filter:", filterValue);
        }
      } else if (Array.isArray(filterValue)) {
        if (filterValue.length > 0) query[fieldName] = { $in: filterValue };
      } else {
        query[fieldName] = filterValue;
      }
    });

  const count = await Product.countDocuments({ ...query, ...keyword });
  const products = await Product.find({ ...query, ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  return res.json({
    products,
    count,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

export const fetchBrandNameList = asyncHandler(async (req, res) => {
  const products = await Product.find();
  const brandNameList = [...new Set(products.map((product) => product.brand))];
  // console.log(brandNameList, "brandList");
  return res.status(200).json({ brandNameList });
});
