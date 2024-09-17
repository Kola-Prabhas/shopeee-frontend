import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsByFilter, fetchCategories, fetchBrands, fetchProductById, addProduct, updateProduct} from './productAPI';

const initialState = {
	products: [],
	categories: [],
	brands: [],
	totalItems: 0,
	selectedProduct: null,
    status: 'idle',
};




export const fetchProductsByFilterAsync = createAsyncThunk(
	'product/fetchProductsByFilter',
	async ({ filter, sort, pagination, admin }) => {

		const response = await fetchProductsByFilter(filter, sort, pagination, admin);
		// console.log(response);
		return response.data;
	}
);

export const fetchCategoriesAsync = createAsyncThunk(
	'product/fetchCategories',
	async () => {
		const response = await fetchCategories();
		return response.data;
	}
);

export const fetchBrandsAsync = createAsyncThunk(
	'product/fetchBrands',
	async () => {
		const response = await fetchBrands();
		return response.data;
	}
);

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
  reducers: { 
   
	},

 
  extraReducers: (builder) => {
	  builder
		  .addCase(fetchProductsByFilterAsync.pending, (state) => {
			  state.status = 'loading';
		  })
		  .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
			  state.status = 'idle';
			  state.products = action.payload.data;
			  state.totalItems = action.payload.totalItems;
		  })

		  .addCase(fetchCategoriesAsync.pending, (state) => {
			  state.status = 'loading';
		  })
		  .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
			  state.status = 'idle';
			  state.categories = action.payload;
		  })

		  .addCase(fetchBrandsAsync.pending, (state) => {
			  state.status = 'loading';
		  })
		  .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
			  state.status = 'idle';
			  state.brands = action.payload;
		  })
	  
		  .addCase(fetchProductByIdAsync.pending, (state) => {
			  state.status = 'loading';
		  })
		  .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
			  state.status = 'idle';
			  state.selectedProduct = action.payload;
		  })
		  .addCase(addProductAsync.pending, (state) => {
			  state.status = 'loading';
		  })
		  .addCase(addProductAsync.fulfilled, (state, action) => {
			  state.status = 'idle';
			  state.products.push(action.payload);
		  })
		  .addCase(updateProductAsync.pending, (state) => {
			  state.status = 'loading';
		  })
		  .addCase(updateProductAsync.fulfilled, (state, action) => {
			  state.status = 'idle';

			  console.log('updated product in builder', action.payload);
			  state.products = state.products.map(product => {
				  if (product.id === action.payload.id) return action.payload;

				  return product;
			  });
		  }); 
  },
});

export const { increment, decrement, incrementByAmount } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
