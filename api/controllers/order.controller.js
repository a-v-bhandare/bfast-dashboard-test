import Order from '../models/order.model.js';

export const createOrder = async (req, res, next) => {
    try {
        const { clientId, clientName, clientPhoneNo, clientEmail, clientPincode, clientAddress,
            parcelWeight, length, breadth, height, productName, productAmount, productQuantity,
            paymentMethod, pickupDate, receiverName, receiverPhoneNo, receiverEmail,
            receiverState, receiverPincode, receiverAddress, AWBNumber, expectedDeliveryDate,
            GPOPriceWithoutGST, GPOPriceWithGST, AWB, orderId, deliveryCompany, date, status,
            deliveryDate, daystoDeliver, trackingLink, dispatchInformationSent, deliveryConfirmation,
            aggregatorName, deliveryPartner, pricewithoutGST, pricewithGST, estimatedDeliveryDays,
            orderDate, deliveryCharge } = req.body;

        const newOrder = new Order({
            clientId, clientName, clientPhoneNo, clientEmail, clientPincode, clientAddress,
            parcelWeight, length, breadth, height, productName, productAmount, productQuantity,
            paymentMethod, pickupDate, receiverName, receiverPhoneNo, receiverEmail,
            receiverState, receiverPincode, receiverAddress, AWBNumber, expectedDeliveryDate,
            GPOPriceWithoutGST, GPOPriceWithGST, AWB, orderId, deliveryCompany, date, status,
            deliveryDate, daystoDeliver, trackingLink, dispatchInformationSent, deliveryConfirmation,
            aggregatorName, deliveryPartner, pricewithoutGST, pricewithGST, estimatedDeliveryDays,
            orderDate, deliveryCharge
        });

        await newOrder.save();
        res.status(200).json(newOrder);
    } catch (error) {
        next(error);
    }
};


export const getAllOrders = async (req, res, next) => {
    const { startDate, endDate } = req.query;
    try {
        const orders = await Order.find({
            pickupDate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        })
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};


export const updateOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { orderDate, status, deliveryDate, deliveryCharge,
            clientId, clientName, clientPhoneNo, clientEmail, clientPincode, clientAddress,
            parcelWeight, length, breadth, height, productName, productAmount, productQuantity,
            paymentMethod, pickupDate, receiverName, receiverPhoneNo, receiverEmail,
            receiverState, receiverPincode, receiverAddress, AWBNumber, expectedDeliveryDate,
            GPOPriceWithoutGST, GPOPriceWithGST, AWB, deliveryCompany, date, daystoDeliver,
            trackingLink, dispatchInformationSent, deliveryConfirmation, aggregatorName,
            deliveryPartner, pricewithoutGST, pricewithGST, estimatedDeliveryDays } = req.body;

        const updatedOrder = await Order.findOneAndUpdate(
            { _id: orderId },
            {
                orderDate, status, deliveryDate, deliveryCharge,
                clientId, clientName, clientPhoneNo, clientEmail, clientPincode, clientAddress,
                parcelWeight, length, breadth, height, productName, productAmount, productQuantity,
                paymentMethod, pickupDate, receiverName, receiverPhoneNo, receiverEmail,
                receiverState, receiverPincode, receiverAddress, AWBNumber, expectedDeliveryDate,
                GPOPriceWithoutGST, GPOPriceWithGST, AWB, deliveryCompany, date, daystoDeliver,
                trackingLink, dispatchInformationSent, deliveryConfirmation, aggregatorName,
                deliveryPartner, pricewithoutGST, pricewithGST, estimatedDeliveryDays
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        const deletedOrder = await Order.findOneAndDelete({ _id: orderId });

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        next(error);
    }
};