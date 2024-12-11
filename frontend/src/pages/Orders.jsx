import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import axios from "axios"
import { toast } from "react-toastify"

export default function Orders() {

  const { backendUrl, token, currency } = useContext(ShopContext)

  const [ orderData, setOrderData ] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const { data } = await axios.post(backendUrl + '/api/order/userOrders', {}, { headers:{token} })
      if (data.success) {
        let allOrdersItem = []

        data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })

        setOrderData(allOrdersItem.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <section>
      <div className="max-padd-container">
        <div className="max-padd-container py-10 bg-white rounded-2xl my-6 max-xl:mt-8">
          {/* title */}
          <div>
            <h3 className="h3">Order <span className="text-secondary">List</span></h3>
          </div>
          {/* container */}
          {
            orderData.map((item, i) => (
              <div key={i}>
                <div className="py-4 text-gray-700 flex flex-col gap-4">
                  <div className="flex gap-x-3 w-full">
                    {/* image */}
                    <div className="flex gap-6">
                      <img src={item.image[0].url} alt="" className="w-[77px] rounded-lg" />
                    </div>
                    {/* order info */}
                    <div className="block w-full">
                      <h5 className="h5 capitalize line-clamp-1">{item.name}</h5>
                      <div className="flexBetween">
                        <div>
                          <div className="flex items-center gap-x-2 sm:gap-x-3">
                            <div className="flexCenter gap-x-2">
                              <h5 className="medium-14">Price:</h5>
                              <p>{currency}{item.price}</p>
                            </div>
                            <div className="flexCenter gap-x-2">
                              <h5 className="medium-14">Quantity:</h5>
                              <p>{item.quantity}</p>
                            </div>
                            <div className="flexCenter gap-x-2">
                              <h5 className="medium-14">Size:</h5>
                              <p>{item.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-x-2">
                            <h5 className="medium-14">Date:</h5>
                            <p className="text-gray-400">{new Date(item.date).toDateString()}</p>
                          </div>
                          <div className="flex items-center gap-x-2">
                            <h5 className="medium-14">Payment</h5>
                            <p className="text-gray-400">{item.paymentMethod}</p>
                          </div>
                        </div>
                        {/* Status & button */}
                        <div className="flex flex-col xl:flex-row gap-3">
                          <div className="flex items-center gap-2">
                            <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                            <p>{item.status}</p>
                          </div>
                          <button onClick={loadOrderData} className="btn-secondary !p-1.5 !text-xs">Track Order</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="mx-auto h-[1px] w-4/5 bg-gray-900/10 mt-2"/>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}