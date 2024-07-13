import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, checkUser, /* updateUser, */ signOut } from './authAPI';

const initialState = {
	loggedInUser: null,
	loginError: '',
	signUpError: '',
    status: 'idle',
};


export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (user) => {
    const response = await createUser(user);
    return response.data;
  }
);


export const checkUserAsync = createAsyncThunk(
	'auth/checkUser',
	async (loginDetails, {rejectWithValue}) => {
		try {
			const response = await checkUser(loginDetails);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.data);
		}
		
	}
);

export const signOutAsync = createAsyncThunk(
	'auth/signOut',
	async (userId) => {
		const response = await signOut(userId);
		return response.data;
	}
);

// export const updateUserAsync = createAsyncThunk(
// 	'auth/updateUser',
// 	async (update) => {
// 		const response = await updateUser(update);
// 		return response.data;
// 	}
// );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
   
  },
 
  extraReducers: (builder) => {
    builder
		.addCase(createUserAsync.pending, (state) => {
		state.status = 'loading';
		})
		.addCase(createUserAsync.fulfilled, (state, action) => {
		state.status = 'idle';
		state.loggedInUser = action.payload;
		})
		.addCase(createUserAsync.rejected, (state, action) => {
			state.status = 'idle';
			state.signUpError = action.error;
		})
			
		.addCase(checkUserAsync.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(checkUserAsync.fulfilled, (state, action) => {
			state.status = 'idle';
			state.loggedInUser = action.payload;
		})
		.addCase(checkUserAsync.rejected, (state, action) => {
			state.status = 'idle';
			state.loginError = action.payload;
		})
		.addCase(signOutAsync.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(signOutAsync.fulfilled, (state, action) => {
			state.status = 'idle';
			state.loggedInUser = null;
		})
  },
})


export const selectUser = (state) => state.auth.loggedInUser;
export const selectLoginError = (state) => state.auth.loginError.message;
export const selectSignUpError = (state) => state.auth.signUpError.message;

export default authSlice.reducer;
