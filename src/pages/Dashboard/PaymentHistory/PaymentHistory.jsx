import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <h2 className='text-5xl text-blue-500'>Payment History: {payments.length} </h2>

            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>Serial</th>
        <th>Order Name</th>
        <th>Amount</th>
        <th>Transaction Id</th>
        <th> Tracking Id</th>
        <th> Date & Time</th>

      </tr>
    </thead>
    <tbody>
     {
        payments.map((payment, index) =>  <tr key={payment._id}>
        <th>{index + 1 }</th>
        <td>{payment.orderName}</td>
        <td>${payment.amount}</td>
        <td>{payment.transactionId}</td>
        <td>{payment.trackingId}</td>
        <td>{payment.paidAt}</td>
      </tr>)
     }
     
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentHistory;