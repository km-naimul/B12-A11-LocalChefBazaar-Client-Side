import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2>Payment is cancelled. please try again</h2>
            <Link to="/dashboard/my-orders">
            <button className='btn btn-secondary text-black'>Try again</button>
             </Link>
        </div>
    );
};

export default PaymentCancelled;