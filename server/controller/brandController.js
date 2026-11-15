import Brand from "../model/brandModel.js";

// CREATE Brand
export const createBrand = async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET All Brands
export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    if (!brands || brands.length === 0) {
      return res.status(404).json({ message: "No brands found." });
    }
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};