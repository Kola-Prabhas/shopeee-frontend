import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItem, fetchItemsByUserId, clearCart, updateItem } from './cartAPI';

import toast from 'react-hot-toast';


const initialState = {
	items: [],
	deletingCartItems:[], // cart items which are going to be removed	
	status: 'idle',
	addToCartStatus: 'idle',

};


export const addToCartAsync = createAsyncThunk(
	'cart/addToCart',
	async (item) => {
		const response = await addToCart(item);
		return response.data;
	}
);


export const fetchItemsByUserIdAsync = createAsyncThunk(
	'cart/fetchItemsByUserId',
	async () => {
		const response = await fetchItemsByUserId();
		return response.data;
	}
);


export const updateItemAsync = createAsyncThunk(
	'cart/updateItem',
	async (item) => {
		const response = await updateItem(item);
		return response.data;
	}
);


export const deleteItemFromCartAsync = createAsyncThunk(
	'cart/deleteItemFromCart',
	async (itemId) => {
		console.log('itemId ', itemId)
		try {
			const response = await deleteItem(itemId);
			return response.data;
		} catch (error) {
			console.log('error ', error);
			throw error;			
		}
	}
);


export const clearCartAsync = createAsyncThunk(
	'cart/clearCart',
	async (cartItems) => {
		const response = await clearCart(cartItems);
		return response.data;
	}
);



export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(addToCartAsync.pending, (state) => {
				state.addToCartStatus = 'loading';
			})
			.addCase(addToCartAsync.fulfilled, (state, action) => {
				state.addToCartStatus = 'idle';
				state.items.push(action.payload);
				
				const product = action.payload.product;
				toast.success(`${product.title} added to cart🥳`);
			})


			.addCase(fetchItemsByUserIdAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.items = action.payload;
			})


			.addCase(updateItemAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateItemAsync.fulfilled, (state, action) => {
				state.status = 'idle';

				const index = state.items.findIndex(item => item.id === action.payload.id);
				state.items[index] = action.payload;

				
				const product = action.payload.product;
				toast.success(`${product.title} quantity updated to ${action.payload.quantity}`);
			})


			.addCase(deleteItemFromCartAsync.pending, (state, action) => {
				const itemId = action.meta.arg;
				state.deletingCartItems.push(itemId)
			})
			.addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
				const index = state.items.findIndex(item => item.id === action.payload.id);
				state.items.splice(index, 1);

				const product = action.payload.product;
				toast.success(`${product.title} removed from cart`);
			})
			.addCase(deleteItemFromCartAsync.rejected, (state, action) => {
				state.deletingCartItems =
					state.deletingCartItems.filter(item => item.id !== action.payload.id)
			})


			.addCase(clearCartAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(clearCartAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.items = [];
				toast.success('Cart cleared successfully')
			})
	},
});


export const selectCartItems = (state) => state.cart.items;
export const selectDeletingCartItems = (state) => state.cart.deletingCartItems;
export const selectCartItemsStatus = (state) => state.cart.status;
export const selectAddToCartStatus = (state) => state.cart.addToCartStatus;

export default cartSlice.reducer;
