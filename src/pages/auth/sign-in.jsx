import React, { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { postData } from '@/fetchers';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';


export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/dashboard/home');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await postData({
        endpoint: '/user/login',
        payload: { username, password },
      });
  
      const { token } = response;
  
      if (token) {
        Cookies.set('token', token, { expires: 1 });
        const decoded = jwtDecode(token);
        const role = decoded.role;
        if (role === 'SuperAdmin' || role === 'Admin') {
          navigate('/dashboard/home');
        }
      }
    } catch (error) {
      console.error('Login failed:', error.message || error);
  
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid credentials or server error.',
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: '#facc15',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (

    <section className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row bg-gradient-to-br from-gray-900 via-indigo-800 to-purple-700">

      {/* Form Section */}
      <div className="w-full lg:w-3/5 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full px-4 sm:px-8 lg:px-16"
        >
          <Typography variant="h2" className="font-bold mb-4 text-white text-center">
            Welcome To <span className="text-yellow-300">Protech</span>
          </Typography>
          <Typography variant="paragraph" className="text-white/90 text-lg text-center">
            Enter your email and password to Sign In.
          </Typography>

          <form onSubmit={handleLogin} className="mt-8 mb-2 mx-auto w-full max-w-md space-y-6">
            <div>
              <label className="text-sm text-white font-medium">Your Email</label>
              <input
                type="text"
                placeholder="name@mail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200"
              />
            </div>

            <div>
              <label className="text-sm text-white font-medium">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-yellow-300 transition duration-200"
                />
                <div
                  className="absolute right-3 top-2/4 -translate-y-2/4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-white/80" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-white/80" />
                  )}
                </div>
              </div>
            </div>

            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                fullWidth
                type="submit"
                className="bg-yellow-400 text-black font-bold hover:bg-yellow-300 transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Logging in...' : '✨ Log In'}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Side Image */}
      <div className="p-4 ml-14 w-3/5 h-full rounded-3xl hidden lg:block">
        <img
          src="/img/offpic.jpg"
          alt="Pattern"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;
