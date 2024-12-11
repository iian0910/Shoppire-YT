import { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import Footer from '../components/Footer'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function PlaceOrder() {

  const [ method, setMethod ] = useState('COD')

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_charges, products } = useContext(ShopContext)

  const [ formData, setFormData ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_charges
      }

      switch(method) {
        // api calls for COD
        case 'COD':
          const { data } = await axios.post(backendUrl + '/api/order/place', orderData, { headers: {token} })
          if (data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(data.message)
          }
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section>
      {/* container */}
      <form onSubmit={onSubmitHandler} className="max-padd-container">
        <div className="max-padd-container py-10 bg-white rounded-2xl my-6 max-xl:mt-8">
          <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
            <div className="flex flex-1 flex-col gap-3 text-[95%]">
              <h3 className="h3">Delivery Information</h3>
              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.firstName}
                  required
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.lastName}
                  required
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
                />
              </div>
              <input
                onChange={onChangeHandler}
                value={formData.email}
                required
                type="email"
                name="email"
                placeholder="Email"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
              <input
                onChange={onChangeHandler}
                value={formData.phone}
                required
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
              <input
                onChange={onChangeHandler}
                value={formData.street}
                required
                type="text"
                name="street"
                placeholder="Street"
                className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
              />
              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.city}
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.state}
                  required
                  type="text"
                  name="state"
                  placeholder="State"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
                />
              </div>
              <div className="flex gap-3">
                <input
                  onChange={onChangeHandler}
                  value={formData.zipcode}
                  required
                  type="text"
                  name="zipcode"
                  placeholder="Zip Code"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
                />
                <input
                  onChange={onChangeHandler}
                  value={formData.country}
                  required
                  type="text"
                  name="country"
                  placeholder="Country"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none"
                />
              </div>
            </div>
            {/* cart total */}
            <div className='flex flex-1 flex-col'>
              <CartTotal />
              {/* Payment method */}
              <div className='my-6'>
                <h3 className='bold-20 mb-5'>Payment<span className='text-secondary'>Method</span></h3>
                <div className='flex gap-3'>
                  <div onClick={() => setMethod('stripe')} className={`${method === 'stripe' ? 'text-secondary !font-bold' : ''} btn-light !py-1 cursor-pointer`}>Stripe</div>
                  <div onClick={() => setMethod('COD')} className={`${method === 'COD' ? 'text-secondary !font-bold' : ''} btn-light !py-1 cursor-pointer`}>Cash on Delivery</div>
                </div>
              </div>
              <div>
                <button type='submit' className='btn-secondary'>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </section>
  )
}