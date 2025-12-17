import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
    const {orderId} = useParams();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: order} = useQuery({
        queryKey: ['orders', orderId ],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/orders/${orderId}`);
            return res.data;
        }
    })

    const handlePayment = async () => {
            const paymentInfo = {
                price: order.price,
                orderId: order._id,
                userEmail: order.userEmail,
                orderName: order.mealName,
            }
            const res = await axiosSecure.post('/create-checkout-session', paymentInfo );

            console.log(res.data.url);
            window.location.href = res.data.url;
    }

    if(isLoading){
        return <div> 
            <span className='loading loading-infinity loading-xl'> </span>
             </div>
    }

    return (
        <div>
            <h2> Please Pay ${order.price} for : {order.mealName} </h2>
            <button onClick={handlePayment} className='btn btn-primary text-black'> Pay </button>
        </div>
    );
};

export default Payment;