import { useEffect, useState } from 'react'
import { backend_url } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { TbTrash } from 'react-icons/tb'

export default function List({token, currency}) {

  const [list, setList] = useState([])

  const fetchList = async() => {
    try {
      const { data } = await axios.get(backend_url + '/api/product/list')
      if (data.success) {
        setList(data.products)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const { data } = await axios.post(backend_url + '/api/product/remove', { id }, {headers: {token}})

      if (data.success) {
        toast.success(data.message)
        await fetchList()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='pl-8'>
      <h3 className='h3'>All Products List</h3>
      <div className='flex flex-col gap-2 pt-4'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border text-secondary bg-white bold-14 rounded'>
          <h5>Image</h5>
          <h5>Name</h5>
          <h5>Category</h5>
          <h5>Price</h5>
          <h5>Remove</h5>
        </div>
        {/* product list */}
        {
          list.map((item) => (
            <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 p-1 bg-white rounded-xl'>
              <img src={item.image[0]?.url} alt="" className='w-12 rounded-lg'/>
              <h5 className='text-sm font-semibold'>{item.name}</h5>
              <p className='text-sm font-semibold'>{item.description}</p>
              <div className='text-sm font-semibold'>{currency}{item.price}</div>
              <div><TbTrash className='text-right md:text-center cursor-pointer text-lg' onClick={() => removeProduct(item._id)}/></div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
