//ProtectedRoute is used to prevent user from entering list of todos without signing in
import { useUser } from "../context/useUser";
import { Outlet,Navigate } from "react-router-dom";


//checks if user has signed in. If not, user will be redirected to signin route. 
export default function ProtectedRoute() {
    const { user } = useUser()

     if (!user || !user.token) return <Navigate to ="/signin" replace />
     return (<Outlet />)
}