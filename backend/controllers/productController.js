import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// add
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      popular
    } = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]

    const images = [image1, image2, image3, image4].filter(item => item !== undefined)

    const imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })

        return {
          public_id: result.public_id,
          url: result.secure_url
        }
      })
    )

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      popular: popular === 'true' ? true : false,
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now()
    }

    console.log(productData)

    const product = new productModel(productData)
    await product.save()

    res.json({
      success: true,
      message: 'Product has been added'
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

// list
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({})
    
    res.json({
      success: true,
      products
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

// remove
const removeProduct = async (req, res) => {
  console.log('reQ:', req.body)
  try {
    // 刪除商品時要一併刪除圖庫上傳的圖片
    const product = await productModel.findById(req.body.id)
    product.image.forEach((item) => {
      cloudinary.uploader.destroy(item.public_id)
    })
    await productModel.findByIdAndDelete(req.body.id)

    res.json({
      success: true,
      message: 'Product Removed'
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

// single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body
    const product = await productModel.findById(productId)

    if (product) {
      res.json({
        success: true,
        product
      })
    } else {
      res.json({
        success: false,
        message: 'can not find the product'
      })
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message
    })
  }
}

export {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct
}