import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Components/Hooks/useAuth";
import { Spinner } from "@material-tailwind/react";


const PrivetRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
       return <Spinner className="h-16 w-16" color="blue" />
    }
    if(user){
        return children
    }
    return <Navigate state={{from: location}} replace to="/login"/>
};

export default PrivetRoute;