import { ACTIONS } from './actions';
import { addCartItem, clearCart, closeToast, descreaseCart, filterProducts, getCartTotal, getUser, increaseCart, logout, openToast, setToastMessage, setUser, toggleDrawer, toogleClass } from './appControllers';
export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.TOGGLE_DRAWER:
                return toggleDrawer(state);
        case ACTIONS.OPEN_TOAST:
                return openToast(state,action.payload);
        case ACTIONS.CLOSE_TOAST:
                return closeToast(state);
        case ACTIONS.GET_USER:
                return getUser(state);
        case ACTIONS.SET_USER:
                return setUser(state,action.payload);
        case ACTIONS.SET_TOAST_MESSAGE:
                return setToastMessage(state,action.payload);
        case ACTIONS.ADD_TO_CART:
                return addCartItem(state,action.payload);
        case ACTIONS.GET_CART_TOTAL:
                return getCartTotal(state);
        case ACTIONS.INCREASE_CART:
                return increaseCart(state,action.payload);
        case ACTIONS.DESCREASE_CART:
                return descreaseCart(state,action.payload);
        case ACTIONS.CLEAR_CART:
                return clearCart(state);
        case ACTIONS.FILTER_PRODUCTS:
                return filterProducts(state,action.payload);
        case ACTIONS.TOOGLE_CLASS:
                return toogleClass(state,action.payload);
        case ACTIONS.LOGOUT:
                return logout(state);
        default:
            throw new Error('Unhandled action type: ' + action.type);
    }
};
