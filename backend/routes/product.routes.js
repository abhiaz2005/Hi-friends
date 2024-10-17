import express from "express";
import {
  addProduct,
  addToCart,
  getCart,
  getOrder,
  getProduct,
  getProductSeller,
  orderProduct,
  removeFactoryItem,
  removeItem,
} from "../controller/product.controller.js";

const router = express.Router();

router.get("/get", getProduct);
router.get("/getseller", getProductSeller);
router.get("/getcart", getCart);
router.get("/getorder", getOrder);
router.post("/add", addProduct);
router.post("/addtocart", addToCart);
router.post("/order", orderProduct);
router.delete("/deleteproduct", removeItem);
router.delete("/removeproduct", removeFactoryItem);

export default router;
