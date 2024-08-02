import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  orderItems: {
    type: Array,
    required: true,
  },
});

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;
