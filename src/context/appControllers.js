export const logout = (state)=>{
    localStorage.setItem('flesh-grub-user',null)
    localStorage.setItem('flesh-grub-token',null)
    return {...state,user:null,token:null}
}
export const toggleDrawer = (state)=>{
    return {...state,showDrawer:!state.showDrawer}
}
export const toogleClass = (state,payload)=>{
    return {...state,scrollValue:payload}
}
export const openToast = (state,payload)=>{
     return {...state,showToast:true,toastMessage:payload}
}
export const closeToast = (state)=>{
    return {...state,showToast:false}
}
export const setToastMessage = (state,payload)=>{
    return {...state,toastMessage:payload}
}
    export const addCartItem = (state,payload)=>{
        const newCart = [...state.cart.items,payload];
        localStorage.setItem('flesh-grub-cart',JSON.stringify(newCart));
        return {...state,cart:{...state.cart,items:newCart}}
    }
    export const filterProducts = (state,payload)=>{
        return {...state,slug:payload}
    }
    export const removeCartItem = (state,payload)=>{
        let newCart = [...state.cart,payload];
        const itemIndex = newCart.findIndex(item => item._id === payload);
        newCart.splice(itemIndex,1);
        localStorage.setItem('fast-food-cart',JSON.stringify(newCart));
    }
    export const clearCart = (state,)=>{
        localStorage.setItem('fast-food-cart',JSON.stringify([]));
        return {...state,cart:{
            cartTotal:0,
            cartTax:0.05,
            amount:0,
            items:[]
        }}
    }
    export const descreaseCart = (state,payload)=>{
        const newCart = state.cart.items.map(cartItem => {
            if (cartItem._id === payload) {
                return {
              ...cartItem,
              quantity: (cartItem.quantity -= 1),
            };
          }
          return cartItem;
        })
        localStorage.setItem('fast-food-cart',JSON.stringify(newCart));
        return {...state,cart:{...state.cart,items:newCart}}
    }
    export const increaseCart = (state,payload)=>{
        const newCart = state.cart.items.map(cartItem => {
            if (cartItem._id === payload) {
                return {
                    ...cartItem,
                    quantity: (cartItem.quantity += 1),
                };
            }
            return cartItem;
        })
        localStorage.setItem('fast-food-cart',JSON.stringify(newCart));
        return {...state,cart:{...state.cart,items:newCart}}
    }
    export const inceaseCart = (payload)=>{
    }
    export const getCartTotal = (state)=>{
        const { total, amount } = state.cart.items.reduce(
        (cartTotal, cartItem) => {
          const cartItemCost = cartItem.price * cartItem.quantity;
          cartTotal.total += cartItemCost;
          cartTotal.amount += cartItem.quantity;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      )
    //   console.log('done calculating')
    //   console.log({cart:{...state.cart,amount,cartTotal:parseFloat(total.toFixed(2))}});
      return {...state,cart:{...state.cart,amount,cartTotal:parseFloat(total.toFixed(2))}};
    }
    export const getUser = (state,)=>{
        const tempUser = JSON.parse(localStorage.getItem('flesh-grub-user'));
        const token = JSON.parse(localStorage.getItem('flesh-grub-token'));
        return {...state,user:tempUser,token}
    }
    export const setUser = (state,{user,token})=>{
        const tempUser = JSON.stringify(user);
        const Temptoken = JSON.stringify(token);
        localStorage.setItem('flesh-grub-user',tempUser)
        localStorage.setItem('flesh-grub-token',Temptoken)
        return {...state,user,token}
    }
