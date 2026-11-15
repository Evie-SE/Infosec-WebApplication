import Order from "../model/orderModel.js";

// CREATE Order
export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    
    // Populate customer and product details for the response
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("customer", "username email")
      .populate("items.product", "name price");

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// GET All Orders (supports dashboard order reporting & sales trends)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "username email")
      .populate("items.product", "name price category");
      
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};