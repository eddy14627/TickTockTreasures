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

export const filterByBrand = asyncHandler(async (req, res) => {
  const brands = req.body;
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments({ brand: { $in: brands } });
  const products = await Product.find({ brand: { $in: brands } })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  return res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

export const fetchBrandNameList = asyncHandler(async (req, res) => {
  const products = await Product.find();
  const brandNameList = [...new Set(products.map((product) => product.brand))];
  // console.log(brandNameList, "dksfjsdkfhj");
  return res.status(200).json({ brandNameList });
});

export const filterByGender = asyncHandler(async (req, res) => {
  const { gender } = req.body;
  const product = await Product.find({ gender: gender });
  return res.status(200).json({ products: product });
});
export const filterByIsWearable = asyncHandler(async (req, res) => {
  const { isWearable } = req.body;
  const product = await Product.find({ isWearable: isWearable });
  return res.status(200).json({ products: product });
});
export const filterByWatchType = asyncHandler(async (req, res) => {
  const { watchType } = req.body;
  const product = await Product.find({ watchType: watchType });
  return res.status(200).json({ products: product });
});

export const fetchAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({ products });
});

export const filterByPrice = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice } = req.body;
  const product = await Product.find({
    price: { $gte: minPrice, $lte: maxPrice },
  });
  return res.status(200).json({ products: product });
});
