import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkAuth, createUser, loginUser, /* updateUser, */ signOut } from './authAPI';

const initialState = {
	loggedInUser: null,
	loginError: '',
	signUpError: '',
	status: 'idle',
	userChecked: false
};


export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (user) => {
    const response = await createUser(user);
    return response.data;
  }
);


export const loginUserAsync = createAsyncThunk(
	'auth/loginUser',
	async (loginDetails, {rejectWithValue}) => {
		try {
			const response = await loginUser(loginDetails);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.data);
		}
		
	}
);


/* export const checkAuthAsync = createAsyncThunk(
	'auth/checkAuth',
	async () => {
		try {
			const response = await checkAuth();
			return response.data;
		} catch (error) {
			console.log(error);
		}

	}
); */


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
			
		.addCase(loginUserAsync.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(loginUserAsync.fulfilled, (state, action) => {
			state.status = 'idle';
			state.loggedInUser = action.payload;
		})
		.addCase(loginUserAsync.rejected, (state, action) => {
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
/* 		.addCase(checkAuthAsync.pending, (state) => {
			state.status = 'loading';
		})
		.addCase(checkAuthAsync.fulfilled, (state, action) => {
			state.status = 'idle';
			state.loggedInUser = action.payload;
			state.userChecked = true;
		})
		.addCase(checkAuthAsync.rejected, (state, action) => {
			state.status = 'idle';
			state.loginError = action.payload;
			state.userChecked = false;
		}) */
  },
})


export const selectUser = (state) => state.auth.loggedInUser;
export const selectLoginError = (state) => state.auth.loginError.message;
export const selectSignUpError = (state) => state.auth.signUpError.message;
export const selectUserChecked = (state) => state.auth.userChecked;

export default authSlice.reducer;
