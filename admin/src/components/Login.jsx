import { useState } from 'react';
import loginImg from '../assets/Login.png';
import axios from "axios";
import { backend_url } from '../App';
import { toast } from 'react-toastify';

export default function Login({ setToken }) {
  
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post(backend_url + '/api/user/admin', {email, password})

      if (data.success) {
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section className='absolute top-0 h-full w-full z-50 bg-white'>
      {/* container */}
      <div className='flex h-full w-full'>
        {/* form side */}
        <div className='flex w-full sm:w-1/2 items-center justify-center'>
          <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800'>
            <div className='w-full mb-4'>
              <h3 className="bold-36">Login</h3>
            </div>
            <div className="w-full">
              <label htmlFor='email' className='medium-15'>Email</label>
              <input
                id='email'
                type="email"
                placeholder="Email"
                required
                className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="w-full">
              <label htmlFor='password' className='medium-15'>Password</label>
              <input
                id='password'
                type="password"
                placeholder="Password"
                required
                className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button type='submit' className='btn-dark w-full mt-5 !py-[9px]'>Login</button>
          </form>
        </div>
        {/* image side */}
        <div className='w-1/2 hidden sm:block'>
          <img src={loginImg} alt="" className='object-cover h-full w-full' />
        </div>
      </div>
    </section>
  )
}