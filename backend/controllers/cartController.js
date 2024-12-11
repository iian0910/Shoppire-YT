import userModel from "../models/userModel.js"

// Add To Cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body

    const userData = await userModel.findById(userId)
    const cartData = await userData.cartData

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId] = {}
      cartData[itemId][size] = 1
    }

    await userModel.findByIdAndUpdate(userId, {cartData})

    res.json({
      success: true,
      message: 'Added to Card'
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Updating From Cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body

    const userData = await userModel.findById(userId)
    const cartData = await userData.cartData

    cartData[itemId][size] = quantity
    await userModel.findByIdAndUpdate(userId, {cartData})

    res.json({
      success: true,
      message: 'Cart Updated'
    })
  } catch (error) {
    res.json({
      success: true,
      message: error.message
    })
  }
}

// Get User Cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body
    
    const userData = await userModel.findById(userId)
    const cartData = await userData.cartData

    res.json({
      success: true,
      cartData
    })
  } catch (error) {
    res.json({
      success: true,
      message: error.message
    })
  }
}

export {
  addToCart,
  updateCart,
  getUserCart
}