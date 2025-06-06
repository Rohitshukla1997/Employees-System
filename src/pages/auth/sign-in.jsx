import React, { useState, useEffect } from 'react'
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import { postData } from '@/fetchers';

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      // User already logged in
      navigate('/dashboar/home');
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

        // Redirect based on role
        if (role === 'SuperAdmin') {
          navigate('/dashboard/home'); // superadmin default page
        } else if (role === 'Admin') {
          navigate('/dashboard/home'); // admin default page
        }
        
      }
    } catch (error) {
      console.error('Login failed:', error.message || error);
      alert('Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen w-screen overflow-hidden flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/5 flex items-center justify-center">
        <div className="text-center w-full px-4 sm:px-8 lg:px-16">
          <Typography variant="h2" className="font-bold mb-4">Welcome To Protech</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your email and password to Sign In.
          </Typography>

          <form onSubmit={handleLogin} className="mt-8 mb-2 mx-auto w-full max-w-md">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Your email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
              <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                Password
              </Typography>
              <Input
                type={showPassword ? 'text' : 'password'}
                size="lg"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{ className: "before:content-none after:content-none" }}
              />
            </div>
            <Button
              fullWidth
              type="submit"
              className="mt-6"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </div>
      </div>

      <div className="p-4 ml-14 w-2/6 h-full rounded-3xl">
        <img
          src="/img/pattern.png"
          alt="Pattern"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
}

export default SignIn;
