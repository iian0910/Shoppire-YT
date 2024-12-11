import { useContext, useEffect, useState } from 'react';
import loginImg from '../assets/Login.png';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Login() {
  const [currState, setCurrState] = useState('Login')

  const { token, setToken, backendUrl, navigate } = useContext(ShopContext)

  const [ name, setName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ email, setEmail ] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currState === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {name, email, password})
        if (data.success) {
          toast.success('Sign Up Success !')
          setCurrState('Login')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {email, password})
        if (data.success) {
          setToken(data.token)
          localStorage.setItem('userToken', data.token)
          toast.success('Login Success !')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setName('')
    setEmail('')
    setPassword('')
  },[currState])

  useEffect(() => {
    // token && navigate('/')
    if (token) {
      navigate('/')
    }
  }, [token])
  
  return (
    <section className='absolute top-0 h-full w-full z-50 bg-white'>
      {/* container */}
      <div className='flex h-full w-full'>
        {/* form side */}
        <div className='flex w-full sm:w-1/2 items-center justify-center'>
          <form onSubmit={onSubmitHandler} action="" className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800'>
            <div className='w-full mb-4'>
              <h3 className="bold-36">{currState}</h3>
            </div>
            {
              currState === 'Sign Up' &&
              (
                <div className='w-full'>
                  <label htmlFor='name' className='medium-15'>Name</label>
                  <input
                    id='name'
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
              )
            }
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
            <button type='submit' className='btn-dark w-full mt-5 !py-[9px]'>{currState === 'Sign Up' ? 'Sign Up' : 'Login'}</button>
            <div className='w-full flex flex-col gap-y-3'>
              <div className='underline medium-15'>Forgot your password?</div>
              {
                currState === 'Login' ? (
                  <div className='underline medium-15'>
                    Don&apos;t have any account? <span onClick={() => setCurrState('Sign Up')} className='cursor-pointer'>Create account</span>
                  </div>
                ) : (
                  <div className='underline medium-15'>
                    Already have an account? <span onClick={() => setCurrState('Login')} className='cursor-pointer'>Login</span>
                  </div>
                )
              }
            </div>
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