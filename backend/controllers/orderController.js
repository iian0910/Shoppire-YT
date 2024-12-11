import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

// Place order using Cash
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.json({
      success: true,
      message: 'Order Placed'
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Place order using Stripe
const placeOrderStripe = async (req, res) => {
  
}

// All orders data from admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({
      success: true,
      orders
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

// All orders data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body

    const orders = await orderModel.find({userId})

    res.json({
      success: true,
      orders
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

// updating order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body
    await orderModel.findByIdAndUpdate(orderId, {status})

    res.json({
      success: true,
      message: 'Status Update'
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

export {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus
}