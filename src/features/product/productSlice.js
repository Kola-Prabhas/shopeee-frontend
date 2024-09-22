import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsByFilter, fetchCategories, fetchBrands, fetchProductById, addProduct, updateProduct} from './productAPI';

const initialState = {
	products: [],
	categories: [],
	brands: [],
	totalItems: 0,
	selectedProduct: null,
	productsStatus: 'idle',
	brandsStatus: 'idle',
	categoriesStatus: 'idle',
    // used for fetching single product in prod detail page, editing product in adim product
	productStatus: 'idle',
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
 

 
  extraReducers: (builder) => {
	  builder
		  .addCase(fetchProductsByFilterAsync.pending, (state) => {
			  state.productsStatus = 'loading';
		  })
		  .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
			  state.productsStatus = 'idle';
			  state.products = action.payload.data;
			  state.totalItems = action.payload.totalItems;
		  })

		  .addCase(fetchCategoriesAsync.pending, (state) => {
			  state.categoriesStatus = 'loading';
		  })
		  .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
			  state.categoriesStatus = 'idle';
			  state.categories = action.payload;
		  })

		  .addCase(fetchBrandsAsync.pending, (state) => {
			  state.brandsStatus = 'loading';
		  })
		  .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
			  state.brandsStatus = 'idle';
			  state.brands = action.payload;
		  })
	  
		  .addCase(fetchProductByIdAsync.pending, (state) => {
			  state.productStatus = 'loading';
		  })
		  .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
			  state.productStatus = 'idle';
			  state.selectedProduct = action.payload;
		  })
		  .addCase(addProductAsync.pending, (state) => {
			  state.productStatus = 'loading';
		  })
		  .addCase(addProductAsync.fulfilled, (state, action) => {
			  state.productStatus = 'idle';
			  state.products.push(action.payload);
		  })
		  .addCase(updateProductAsync.pending, (state) => {
			  state.productStatus = 'loading';
		  })
		  .addCase(updateProductAsync.fulfilled, (state, action) => {
			  state.productStatus = 'idle';

			  console.log('before changing', state.products)
			  console.log('action.payload ', action.payload);

			  state.products = state.products.map(product => {
				  if (product.id === action.payload.id) {
					  return action.payload;
				  }

				  return product;
			  })

			  console.log('after changing', state.products)
		  }); 
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;

export const selectProductsStatus = (state) => state.product.productsStatus;
export const selectProductStatus = (state) => state.product.productStatus; // Used in productDetail Page
export const selectBrandsStatus = (state) => state.product.brandsStatus;
export const selectCategoriesStatus = (state) => state.product.categoriesStatus;


export default productSlice.reducer;
