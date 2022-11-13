import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loadUser } from "../actions/userActions";

const ProtectedRoute = ({ children, isAdmin }) => {
    
    const { isAuthenticated = false, loading = true, user } = useSelector( (state) => state.auth )
    const dispatch = useDispatch();

    useEffect( () => {
        
        if(!user){ 
            dispatch(loadUser());
        }
    }, [isAuthenticated, loading, dispatch, user])

    if (loading) return <span className='loader'></span>;

    if (loading===false && isAuthenticated){
        if (isAdmin === true & user.role !== "admin"){
            return <Navigate to="/" />;
        }
        return children;
    }else{
        return <Navigate to={"/login"} />;
    }
}

export default ProtectedRoute;