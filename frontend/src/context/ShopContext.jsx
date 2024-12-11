import { createContext, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"

// 建立 Context
export const ShopContext = createContext()

// 建立 Provider
const ShopContextProvider = (props) => {

  const currency = '$'
  const delivery_charges = 10
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()

  const [ products, setProducts ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ showSearch, setShowSearch ] = useState(false)
  const [ cartItems, setCartItems ] = useState({})

  const [ token, setToken ] = useState('')

  // Add to cart
  const addToCart = async(itemId, size) => {

    if (!size) {
      toast.error('Please select a size before add!')
      return false
    }

    let cartData = structuredClone(cartItems) // JS 深拷貝語法

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

    setCartItems(cartData)

    if (token) {
      try {
        const { data } = await axios.post(backendUrl+'/api/cart/add', {itemId, size}, {headers: {token}})
        toast.success(data.message)
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  
  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item]
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    return totalCount
  }

  // updating the Quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems) // JS 深拷貝語法
    cartData[itemId][size] = quantity
    setCartItems(cartData)

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: {token} })
      } catch (error) {
        toast.error(error.message)
      }
    }
  }

  // getting total cart amount
  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items)
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    return totalAmount
  }

  const getProductsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/product/list')
      if (data.success) {
        setProducts(data.products)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getUserCart = async (token) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/cart/get', {}, { headers: {token} })
      console.log(data)
      if (data.success) {
        setCartItems(data.cartData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!token && localStorage.getItem('userToken')) {
      setToken(localStorage.getItem('userToken'))
      getUserCart(localStorage.getItem('userToken'))
    }
    getProductsData()
  }, [])

  const contextValue = {
    products,
    currency,
    delivery_charges,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    getCartCount,
    cartItems,
    setCartItems,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    backendUrl
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider