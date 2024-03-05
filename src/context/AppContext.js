import React, { createContext, useContext, useEffect } from 'react';
import { useReducer } from 'react';
import { reducer } from './reducer';
import { ACTIONS } from './actions';
import { getData, postData } from '../api/apiCalls';
import { useGoogleLogin } from '@react-oauth/google';
const AppContext = createContext({ user: null, token: null });
export const AppContextProvider = ({ children }) => {
    const initialProps = {
        user: null,
        token:null,
        slug:'all',
        scrollValue:null,
        showDrawer:false,
        showToast:false,
        cart:{
            cartTotal:0,
            cartTax:0.05,
            amount:0,
            items:[]
        },
        toastMessage:'',
    };
    const [state, dispatch] = useReducer(reducer, initialProps);

    //controllers
    const changeScrollValue = (payload)=>{
        dispatch({type:ACTIONS.TOOGLE_CLASS,payload})
    }
    const addCartItem = (payload)=>{
        dispatch({type:ACTIONS.ADD_TO_CART,payload})
    }
    const removeCartItem = (payload)=>{
        dispatch({type:ACTIONS.REMOVE_FROM_CART,payload})
    }
    const descreaseCart = (payload)=>{
        dispatch({type:ACTIONS.DESCREASE_CART,payload})
    }
    const inceaseCart = (payload)=>{
        dispatch({type:ACTIONS.INCREASE_CART,payload})
    }
    const clearCart = ()=>{
        dispatch({type:ACTIONS.CLEAR_CART})
    }
    const toggleDrawer = ()=>{
        dispatch({type:ACTIONS.TOGGLE_DRAWER})
    }
    const closeToast = ()=>{
        dispatch({type:ACTIONS.CLOSE_TOAST})
    }
    const logout = ()=>{
        dispatch({type:ACTIONS.LOGOUT})
    }
    const openToast = (payload)=>{
        dispatch({type:ACTIONS.OPEN_TOAST,payload})
    }
    const getUser = ()=>{
        dispatch({type:ACTIONS.GET_USER})
    }
    const getCartTotal = ()=>{
        dispatch({type:ACTIONS.GET_CART_TOTAL})
    }
    const filterProducts= (payload)=>{
        dispatch({type:ACTIONS.FILTER_PRODUCTS,payload})
    }
    const setUser = (payload)=>{
        dispatch({type:ACTIONS.SET_USER,payload})
    }
    
    const googleLoginSuccess = async res => {
        const token = res?.access_token;
        const data = await getData(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
        );
        let user = {
            name: data?.name,
            profilePic: data?.picture,
            email: data?.email,
        };
        const newRes = await postData(`/users/auth/OuthLogin`, user);
        console.log(newRes);
        const { user: tempUser, token: tempToken } = newRes;
        dispatch({type:ACTIONS.SET_USER,payload:{user:tempUser,token:tempToken}})
    };
    const googleLoginFailure = res => {
        console.log('login failure', res);
    };
    const loginWithGoogle = useGoogleLogin({
        onError: res => googleLoginFailure(res),
        onSuccess: res => googleLoginSuccess(res),
    });
    const share = {
        ...state,
        toggleDrawer,
        inceaseCart,
        descreaseCart,
        removeCartItem,
        addCartItem,
        loginWithGoogle,
        openToast,
        closeToast,
        setUser,
        getCartTotal,
        clearCart,
        filterProducts,
        changeScrollValue,
        logout
    };
    useEffect(()=>{
        getUser();
    },[])


    return (
        <AppContext.Provider value={{ ...share }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
