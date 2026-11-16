import Product from "../model/productModel.js";

// CREATE: Single or Bulk Product(s)
export const createProduct = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const savedProducts = await Product.insertMany(req.body, { runValidators: true });
      return res.status(201).json(savedProducts);
    }

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    
    // Populate brand and category before returning
    const populatedProduct = await Product.findById(savedProduct._id)
      .populate("brand", "name countryOfOrigin")
      .populate("category", "name description");

    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// READ (All): Get all products and populate brand and category info
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("brand", "name countryOfOrigin")
      .populate("category", "name description");

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getProductByName = async (req, res) => {
  try {
    const productName = decodeURIComponent(req.params.name);
    const product = await Product.findOne({ name: productName })
      .populate("brand", "name countryOfOrigin")
      .populate("category", "name description");

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// UPDATE (by Name): Update product by its name
export const updateProductByName = async (req, res) => {
  try {
    const productName = decodeURIComponent(req.params.name);
    const updatedProduct = await Product.findOneAndUpdate(
      { name: productName }, 
      req.body, 
      { new: true, runValidators: true }
    )
      .populate("brand", "name")
      .populate("category", "name");

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// DELETE (by Name): Delete product by its name
export const deleteProductByName = async (req, res) => {
  try {
    const productName = decodeURIComponent(req.params.name);
    const deletedProduct = await Product.findOneAndDelete({ name: productName });
    
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};