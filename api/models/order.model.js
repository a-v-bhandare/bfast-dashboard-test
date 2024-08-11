import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    clientId:{
      type: String,
      required: true,
      unique: true,
    },
    clientName:{
      type: String,
      required: true,
    },
    clientPhoneNo:{
      type: String,
      required: true,
    },
    clientEmail:{
      type: String,
      required: true,
      unique: true,
    },
    clientPincode:{
      type: String,
      required: true,
    },
    clientAddress:{
      type: String,
      required: true,
    },
    parcelWeight:{
      type: Number,
      required: true,
    },
    length:{
      type: Number,
      required: true,
    },
    breadth:{
      type: Number,
      required: true,
    },
    height:{
      type: Number,
      required: true,
    },
    productName:{
      type: String,
      required: true,
    },
    productAmount:{
      type: Number,
      required: true,
    },
    productQuantity:{
      type: Number,
      required: true,
    },
    paymentMethod:{
      type: String,
      required: true,
    },
    pickupDate:{
      type: Date,
      required: true,
    },
    receiverName:{
      type: String,
      required: true,
    },
    receiverPhoneNo:{
      type: String,
      required: true,
    },
    receiverEmail:{
      type: String,
      required: true,
    },
    receiverState:{
      type: String,
      required: true,
    },
    receiverPincode:{
      type: String,
      required: true,
    },
    receiverAddress:{
      type: String,
      required: true,
    },
    AWBNumber:{
      type: String,
      required: true,
    },
    expectedDeliveryDate:{
      type: Date,
      required: true,
    },
    GPOPriceWithoutGST:{
      type: Number,
      required: true,
    },
    GPOPriceWithGST:{
      type: Number,
      required: true,
    },
    AWB:{
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    deliveryCompany:{
      type: String,
      required: true,
    },
    date:{
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    deliveryDate:{
      type: Date,
      required: true,
    },
    daystoDeliver:{
      type: Number,
      required: true,
    },
    trackingLink:{
      type: String,
      required: true,
    },
    dispatchInformationSent:{
      type: String,
      required: true,
    },
    deliveryConfirmation:{
      type: String,
      required: true,
    },
    aggregatorName:{
      type: String,
      required: true,
    },
    deliveryPartner:{
      type: String,
      required: true,
    },
    pricewithoutGST:{
      type: Number,
      required: true,
    },
    pricewithGST:{
      type: Number,
      required: true,
    },
    estimatedDeliveryDays:{
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required:true,
    },
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;