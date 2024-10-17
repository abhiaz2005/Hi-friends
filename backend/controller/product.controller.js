import Product from "../model/product.model.js";
import User from "../model/user.model.js";
import cloudinary from "../cloudConfig.js";

export const addProduct = async (req, res) => {
  try {
    const data = req.body;
    const {
      p_name,
      p_image,
      p_price,
      p_discount,
      p_category,
      p_description,
      p_address,
      user,
    } = data;

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(p_image, {
      folder: "/hi-friends/products",
    });

    // Create new product instance
    const newProduct = new Product({
      p_name,
      p_price,
      p_image: uploadResult.url, // Use the uploaded image URL
      p_discount,
      p_category,
      p_description,
      p_address,
      p_owner: user,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product successfully added!",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      message: "Something error in uploading!",
      error: error.message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    let product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      message: "Something error in fetching product!",
    });
  }
};

export const getProductSeller = async (req, res) => {
  try {
    let { user } = req.query;
    let product = await Product.find({ p_owner: user });
    res.status(200).json(product);
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({
      message: "Something error in fetching product!",
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    let { u_id, p_id } = req.body;
    let user = await User.findOne({ _id: u_id });
    let product = await Product.findOne({ _id: p_id });
    if (user) {
      user.cart.push(product._id);
      const updatedUser = await user.save();
      res.status(201).json({
        message: "Product added to cart",
      });
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log("error : " + error);
    res.status(500).json({
      message: "Something error in adding to cart!",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const { user } = req.query;
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    const carts = await User.findOne({ _id: user._id }).populate("cart");
    if (carts.length === 0) {
      return res.status(201).json({
        cart: [],
        message: "No products found",
      });
    } else {
      res.status(200).json(carts.cart);
    }
  } catch (error) {
    res.status(404).json({
      message: "User not found",
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { user } = req.query;
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    const orders = await User.findOne({ _id: user._id }).populate("orders");
    if (orders.length === 0) {
      return res.status(201).json({
        orders: [],
        message: "No products were ordered",
      });
    } else {
      res.status(200).json(orders.orders);
    }
  } catch (error) {
    res.status(404).json({
      message: "User not found",
    });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { orderId, user } = req.query;
    if (!orderId || !user) {
      return res.status(400).json({ message: "Order ID Or User is Missing" });
    }
    await User.findByIdAndUpdate(
      { _id: user },
      {
        $pull: { cart: orderId },
      }
    );
    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ message: "Error removing item", error: error.message });
  }
};

export const removeFactoryItem = async (req, res) => {
  try {
    const { p_id } = req.query;
    let deletedproduct = await Product.findByIdAndDelete({ _id: p_id });
    console.log(deletedproduct);
    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ message: "Error removing item", error: error.message });
  }
};

export const orderProduct = async (req, res) => {
  try {
    const { orders, user } = req.body;
    const loggedUser = await User.findOne({ _id: user });
    const productIds = orders.map((order) => order._id);
    loggedUser.orders.push(...productIds);
    let p = await loggedUser.save();
    console.log(p);
    res.status(200).json({ message: "Order placed successfully"});
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

