const express = require('express');
const router = express.Router();
const { identifier } = require("../middleware/indentifier.js"); // 👈 Import middleware

const {
  getCustomerOrder,
  createCustomerOrder,
  updateCustomerOrder,
  deleteCustomerOrder,
  getAllOrders,
  getUserOrders
} = require('../controllers/customer_orders');

router.use(identifier);

router.route('/')
  .get( getAllOrders)      // ✅ protected with identifier
  .post( createCustomerOrder); // ✅ only logged-in users can create

router.get('/user/:userId',  getUserOrders); // ✅ requires token

router.route('/:id')
  .get( getCustomerOrder)   //  protected
  .put( updateCustomerOrder)
  .delete( deleteCustomerOrder);

module.exports = router;
