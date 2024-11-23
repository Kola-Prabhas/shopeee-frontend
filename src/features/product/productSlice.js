import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	fetchProductById,
	addProduct,
	updateProduct
} from './productAPI';

const initialState = {
	selectedProduct: null,
    // used for fetching single product in prod detail page, editing product in adim product
	productStatus: 'idle',
};


export const fetchProductByIdAsync = createAsyncThunk(
	'product/fetchProductById',
	async (id) => {
		const response = await fetchProductById(id);
		return response.data;
	}
);


export const addProductAsync = createAsyncThunk(
	'product/addProduct',
	async (product) => {
		const response = await addProduct(product);
		return response.data;
	}
);


export const updateProductAsync = createAsyncThunk(
	'product/updateProduct',
	async (update) => {
		const response = await updateProduct(update);
		return response.data;
	}
);

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
			  state.selectedProduct = action.payload;
		  })

		  // TODO: invalidate products cache when adding a product from admin side
		  .addCase(addProductAsync.pending, (state) => {
			  state.productStatus = 'loading';
		  })
		  .addCase(addProductAsync.fulfilled, (state, action) => {
			  state.productStatus = 'idle';
			  state.products.push(action.payload);
		  })

		  // TODO: invalidate products cache when updating a product from admin side
		  .addCase(updateProductAsync.pending, (state) => {
			  state.productStatus = 'loading';
		  })
		  .addCase(updateProductAsync.fulfilled, (state, action) => {
			  state.productStatus = 'idle';
			  
			  state.products = state.products.map(product => {
				  if (product.id === action.payload.id) {
					  return action.payload;
				  }

				  return product;
			  });
			  state.selectedProduct = action.payload;
		  }); 
  },
});

export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductStatus = (state) => state.product.productStatus; // Used in productDetail Page


export default productSlice.reducer;
