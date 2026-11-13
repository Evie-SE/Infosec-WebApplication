import Product from "../model/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const { name } = newProduct;

    // Optional: Check if a product with the same name already exists
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).json({ message: "Product already exists." });
    }

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// READ (All): Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// READ (One): Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// UPDATE: Update an existing product by ID
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);

    if (!productExist) {
      return res.status(404).json({ message: "Product not found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true, // Returns the updated document instead of the old one
      runValidators: true, // Ensures schema rules (like required fields & Number type) are checked
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// DELETE: Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);

    if (!productExist) {
      return res.status(404).json({ message: "Product not found." });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

