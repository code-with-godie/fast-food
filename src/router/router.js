import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home'
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import AuthLayout from './layout/AuthLayout';
import AppLayout from './layout/AppLayout';
import Cart from '../pages/cart/Cart';
import ComponentLayout from './layout/ComponentLayout';
import Payment from '../pages/payment/Payment';
import Protected from './layout/Protected'
import Category from '../pages/category/Category';
import SingleProduct from '../pages/single/SingleProduct';
import Menus from '../pages/menu/Menus';
import Orders from '../pages/orders/Orders';
import SuccessPayment from '../components/payment/SuccessPayment';
import OrderItems from '../pages/orders/OrderItems';
import DashboardLayout from './layout/DashboardLayout';
import HomeDashboard from '../pages/dashbord/home/Dashboard'
import Profile from '../pages/profile/Profile';
import DashboardProducts from '../pages/dashbord/products/Products'
import Users from '../pages/dashbord/users/Users';
import Success from '../pages/success/Success';
import Fail from '../pages/fail/Fail';
export const router = createBrowserRouter([
    {
        path:'/dashboard',
        element:<DashboardLayout/>,
        children:[
            {
                path:'/dashboard',
                element:<HomeDashboard/>
            },
            {
                path:'/dashboard/products',
                element:<DashboardProducts/>
            },
            {
                path:'/dashboard/users',
                element:<Users/>
            },
            {
                path:'/dashboard/profile',
                element:<Profile/>
            },
            {
                path:'/dashboard/orders',
                element:<Orders/>
            },
        ]
    },
    {
        path:'/',
        element:<AppLayout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            }
        ]
    },
    {
        path:'/',
        element:<Protected/>,
        children:[
               {
        path:'/',
        element:<ComponentLayout/>,
        children:[
            {
                path:'/cart',
                element:<Cart/>
            },
            {
                path:'/payment',
                element:<Payment/>
            },
            {
                path:'/profile',
                element:<Profile/>
            },
        ]
    },
        
]
    },
    {
        path:'/',
        element:<ComponentLayout/>,
        children:[
              {
                path:'/success',
                element:<Success/>
            },
            {
                path:'/failed',
                element:<Fail/>
            },
            {
                path:'/category/:category',
                element:<Category/>
            },
            {
                path:'/menu/:menuId',
                element:<SingleProduct/>
            },
             {
                path:'/menu',
                element:<Menus/>
            },
             {
                path:'/payment/success',
                element:<SuccessPayment/>
            },
             {
                path:'/orders',
                element:<Orders/>
            },
             {
                path:'/orders/items/:orderID',
                element:<OrderItems/>
            },
        ]
    },
    {
        path:'/auth',
        element:<AuthLayout/>,
        children:[
            {
                path:'/auth/login',
                element:<Login/>
            },
            {
                path:'/auth/register',
                element:<Register/>
            },
        ]
    },
]);
