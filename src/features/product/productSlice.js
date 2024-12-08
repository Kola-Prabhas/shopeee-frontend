import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	fetchProductById,
	addProduct,
	updateProduct
} from './productAPI';


export const fetchProductByIdAsync = createAsyncThunk(
	'product/fetchProductById',
	async (id, { rejectWithValue }) => {
		try {
			const response = await fetchProductById(id);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);			
		}
	}
);


export const addProductAsync = createAsyncThunk(
	'product/addProduct',
	async (product, { rejectWithValue }) => {
		try {
			const response = await addProduct(product);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);			
		}
	}
);


export const updateProductAsync = createAsyncThunk(
	'product/updateProduct',
	async (product, { rejectWithValue }) => {
		try {
			const response = await updateProduct(product);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.message);
		}
	}
);


const initialState = {
	selectedProduct: null,
	productStatus: 'idle',
	updateProductStatus: 'idle',
	addProductStatus: 'idle'
};


export const productSlice = createSlice({
	name: 'product',
	initialState,

	extraReducers: (builder) => {
		builder
			.addCase(fetchProductByIdAsync.pending, (state) => {
				state.productStatus = 'loading';
			})
			.addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
				state.productStatus = 'idle';

				const product = action.payload.product;
				state.selectedProduct = product;
			})
			.addCase(fetchProductByIdAsync.rejected, (state) => {
				state.productStatus = 'idle';
			})

			// TODO: invalidate products cache when adding a product from admin side
			.addCase(addProductAsync.pending, (state) => {
				state.addProductStatus = 'loading';
			})
			.addCase(addProductAsync.fulfilled, (state, action) => {
				state.addProductStatus = 'idle';
				// state.products.push(action.payload);
			})
			.addCase(addProductAsync.rejected, (state) => {
				state.addProductStatus = 'idle';
			})

			// TODO: invalidate products cache when updating a product from admin side
			.addCase(updateProductAsync.pending, (state) => {
				state.updateProductStatus = 'loading';
			})
			.addCase(updateProductAsync.fulfilled, (state, action) => {
				state.updateProductStatus = 'idle';

				//   state.products = state.products.map(product => {
				// 	  if (product.id === action.payload.id) {
				// 		  return action.payload;
				// 	  }

				// 	  return product;
				//   });

				const product = action.payload.product;

				state.selectedProduct = product;
			})
			.addCase(updateProductAsync.rejected, (state) => {
				state.updateProductStatus = 'idle';
			});
	},
});

export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductStatus = (state) => state.product.productStatus; // Used in productDetail Page
export const selectAddProductStatus = (state) => state.product.addProductStatus; 
export const selectUpdateProductStatus = (state) => state.product.updateProductStatus; 


export default productSlice.reducer;
