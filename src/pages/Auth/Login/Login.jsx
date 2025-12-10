import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    console.log('form data', data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur shadow-xl rounded-2xl p-8 border border-sky-100">
      {/* Heading */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Login to your account</h1>
        <p className="text-sm text-gray-500 mt-1">
          Please enter your email and password to continue
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset space-y-3">
          {/* Email */}
          <div>
            <label className="label text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input input-bordered w-full"
              placeholder="you@example.com"
            />
            {errors.email?.type === 'required' && (
              <p className="text-red-500 text-xs mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="input input-bordered w-full"
              placeholder="••••••••"
            />
            {errors.password?.type === 'minlength' && (
              <p className="text-red-500 text-xs mt-1">
                Password must be 6 characters or longer
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs text-gray-500 hover:text-gray-700 underline-offset-2 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit button */}
          <button
            className="btn w-full mt-2 bg-red-500 hover:bg-red-600 border-none text-white font-semibold"
          >
            Login
          </button>
        </fieldset>
        <p className="mt-4 text-center text-xs text-gray-500">
        Don't have an account? <Link to="/register" className="text-red-500 font-medium">Register</Link>
      </p>
      </form>
      
    </div>
  );
};

export default Login;
