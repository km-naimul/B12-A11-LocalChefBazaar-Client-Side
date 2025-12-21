import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden/Forbidden';

const ChefRoute = ({children}) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole()

    if(loading || !user ||  roleLoading) {
        return <div>
            <span className="loading loading-spinner text-error"></span>
        </div>
    }

    if(role !== 'chef'){
        return <Forbidden> </Forbidden>
    }

    return children;
};

export default ChefRoute;