import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import ResetPassword from "./pages/resetpassword/ResetPassword";


const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
index:true,
        element:<Home/>,
            },
                   {
 path:"/register",
        element:<Register/>,
            },
                 {
 path:"/login",
        element:<Login/>,
            },
            
                 {
 path:"/cart",
        element:<Cart/>,
            },

                         {
 path:"/forgotpassword",
        element:<ForgotPassword/>,
            },

             {
 path:"/resetpassword",
        element:<ResetPassword />,
            },
        ]
    },
    

]);export default router;