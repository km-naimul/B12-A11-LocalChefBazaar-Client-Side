import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden/Forbidden';

const AdminRoutes = ({children}) => {
    const { loading} = useAuth();
    const {role, roleLoading} = useRole()

    if(loading || roleLoading) {
        return <div>
            <span className="loading loading-spinner text-error"></span>
        </div>
    }

    if(role !== 'admin'){
        return <Forbidden> </Forbidden>
    }

    return children;
};

export default AdminRoutes;