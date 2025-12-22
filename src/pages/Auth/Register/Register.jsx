import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();


  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      Swal.fire("Error", "Password & Confirm Password must match!", "error");
      return;
    }

    const userData = {
      name: data.name,
      email: data.email,
      profileImage: data.profileImage,
      address: data.address,
      role: "user",       
      status: "active",   
    };

    console.log("User Registered Data ->", userData, data.profileImage[0]
);
    const profileImg = data.profileImage[0];


    // Firebase Authentication
    registerUser(data.email, data.password)
      .then(() => {
        

        const formData = new FormData();
        formData.append('image', profileImg);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
        axios.post(image_API_URL, formData)
        .then(res =>{
            const photoURL = res.data.data.url;

            // create user in the database
           const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL : photoURL
           } 
          axiosSecure.post('/users', userInfo)
          .then(res =>{
            if(res.data.insertedId){
              console.log('user created in the database')
            }
          })

            // update user profile to firebase
            const userProfile = {
                displayName : data.name,
                photoURL : photoURL
            }
            updateUserProfile(userProfile)
            .then(()=>{
                console.log('user profile updated done')
                navigate(location.state || '/');
            })
            .catch(error => console.log(error))
        })

        Swal.fire("Success", "Account Created Successfully!", "success");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur shadow-xl rounded-2xl p-8 border border-sky-100">
      
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
        <p className="text-sm text-gray-500">Join us and enjoy home-cooked meals 🍽️</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

        {/* Name */}
        <div>
          <label className="label text-sm font-medium">Full Name</label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full"
            placeholder="Your full name"
          />
          {errors.name && <p className="text-xs text-red-500">Name is required*</p>}
        </div>

        {/* Email */}
        <div>
          <label className="label text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered w-full"
            placeholder="example@mail.com"
          />
          {errors.email && <p className="text-xs text-red-500">Email is required*</p>}
        </div>

        {/* Profile Image URL */}
        <div>
          <label className="label text-sm font-medium">Profile Image</label>
          <input type="file"
            {...register("profileImage", { required: true })}
            className="file-input input-bordered w-full"
            placeholder="Please Upload a photo"
          />
          {errors.profileImage && <p className="text-xs text-red-500">Profile image link required*</p>}
        </div>

        {/* Address */}
        <div>
          <label className="label text-sm font-medium">Address</label>
          <input
            {...register("address", { required: true })}
            placeholder="Your present address"
            className="input input-bordered w-full"
          />
          {errors.address && <p className="text-xs text-red-500">Address required*</p>}
        </div>

        {/* Password */}
        <div>
          <label className="label text-sm font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input input-bordered w-full"
            placeholder="********"
          />
          {errors.password?.type === "required" && <p className="text-xs text-red-500">Password required*</p>}
          {errors.password?.type === "minLength" && <p className="text-xs text-orange-500">Min 6 characters</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="label text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
            className="input input-bordered w-full"
            placeholder="Re-enter password"
          />
          {errors.confirmPassword && <p className="text-xs text-red-500">Confirm password required*</p>}
        </div>

        <button className="btn w-full mt-2 bg-red-500 hover:bg-red-600 border-none text-white font-semibold">
          Register
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
                Already have an account? <Link
                state={location.state}
                to="/login" className="text-red-500 font-medium">Please Login</Link>
              </p>
      </form>
    </div>
  );
};

export default Register;
