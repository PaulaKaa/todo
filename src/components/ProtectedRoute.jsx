//ProtectedRoute is used to prevent user from entering list of todos without signing in
import { useUser } from "../context/useUser";
import { Outlet,Navigate } from "react-router-dom";

export default function ProtectedRoute() {
    const { user } = useUser()

     if (!user || !user.token) return <Navigate to ="/signin" replace />
     return (<Outlet />)
}