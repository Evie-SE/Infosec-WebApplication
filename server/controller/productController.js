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

// READ (One): Get a single product by ID with brand and category populated
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
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

// UPDATE: Update product by ID
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
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

// DELETE: Delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};