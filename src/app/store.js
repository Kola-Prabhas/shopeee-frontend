import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import categoryReducer from '../features/product/categorySlice';
import brandReducer from '../features/product/brandSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';
import addressReducer from '../features/user/addressSlice';

import { productApi } from '../features/product/productQueryAPI';
import { userApi } from '../features/user/userQueryAPI';



export const store = configureStore({
	reducer: {
		product: productReducer,
		[productApi.reducerPath]: productApi.reducer,
		category: categoryReducer,
		brand: brandReducer,
		auth: authReducer,
		cart: cartReducer,
		order: orderReducer,
		user: userReducer,
		[userApi.reducerPath]: userApi.reducer,
		address: addressReducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(productApi.middleware)
			.concat(userApi.middleware),
});