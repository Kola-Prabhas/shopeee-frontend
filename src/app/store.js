import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import categoryReducer from '../features/product/categorySlice';
import brandReducer from '../features/product/brandSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';
import addressReducer from '../features/user/addressSlice';

import { productApi } from '../features/product/productQueryApi';
// import {orderApi} from '../features/order/orderQueryApi';



export const store = configureStore({
	reducer: {
		product: productReducer,
		[productApi.reducerPath]: productApi.reducer,
		category: categoryReducer,
		brand: brandReducer,
		auth: authReducer,
		cart: cartReducer,
		order: orderReducer,
		// [orderApi.reducerPath]: orderApi.reducer,
		user: userReducer,
		address: addressReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(productApi.middleware)
			// .concat(orderApi.middleware),
});