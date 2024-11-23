import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createUser,
	loginUser,
	resetPasswordRequest,
	resetPassword,
	/* updateUser, */
	logoutUser
} from './authAPI';


const initialState = {
	loggedInUser: null,
	loginError: '',
	signUpError: '',
	status: 'idle',
	userChecked: false,
	mailSent: false,
	mailSentStatus: 'idle',
	passwordResetStatus: 'idle',
	passwordReset: false,

	loginStatus: 'idle',
	signUpStatus: 'idle'
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
	async (loginDetails, { rejectWithValue }) => {
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


export const logoutUserAsync = createAsyncThunk(
	'auth/logoutUser',
	async () => {
		const response = await logoutUser();
		return response.data;
	}
);


export const resetPasswordRequestAsync = createAsyncThunk(
	'auth/resetPasswordRequest',
	async (email) => {
		const response = await resetPasswordRequest(email);
		return response.data;
	}
);


export const resetPasswordAsync = createAsyncThunk(
	'auth/resetPassword',
	async ({email, password, token}) => {
		const response = await resetPassword({email, password, token});
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
		setLoginUser: (state, action) => {
			state.loggedInUser = action.payload;
		}
	},


	extraReducers: (builder) => {
		builder
			.addCase(createUserAsync.pending, (state) => {
				state.signUpStatus = 'loading';
			})
			.addCase(createUserAsync.fulfilled, (state, action) => {
				state.signUpStatus = 'idle';
				state.loggedInUser = action.payload;
			})
			.addCase(createUserAsync.rejected, (state, action) => {
				state.signUpStatus = 'idle';
				state.signUpError = action.error;
			})

			.addCase(loginUserAsync.pending, (state) => {
				state.loginStatus = 'loading';
			})
			.addCase(loginUserAsync.fulfilled, (state, action) => {
				state.loginStatus = 'idle';
				state.loggedInUser = action.payload;
			})
			.addCase(loginUserAsync.rejected, (state, action) => {
				state.loginStatus = 'idle';
				state.loginError = action.payload;
			})
			.addCase(logoutUserAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(logoutUserAsync.fulfilled, (state) => {
				state.status = 'idle';
				state.loggedInUser = null;
			})
			.addCase(resetPasswordRequestAsync.pending, (state) => {
				state.mailSentStatus = 'loading';
			})
			.addCase(resetPasswordRequestAsync.fulfilled, (state) => {
				state.mailSentStatus = 'idle';
				state.mailSent = true;
			})
			.addCase(resetPasswordAsync.pending, (state) => {
				state.passwordResetStatus = 'loading';
			})
			.addCase(resetPasswordAsync.fulfilled, (state) => {
				state.passwordResetStatus = 'idle';
				state.passwordReset = true;
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

export const { setLoginUser } = authSlice.actions;

export const selectUser = (state) => state.auth.loggedInUser;
// export const selectLoginError = (state) => state.auth.loginError.message;
export const selectSignUpError = (state) => state.auth.signUpError.message;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;

// export const selectAuthStatus = (state) => state.auth.status;
export const selectMailSentStatus = (state) => state.auth.mailSentStatus;
export const selectPasswordResetStatus = (state) => state.auth.passwordResetStatus;
export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectSignUpStatus = (state) => state.auth.signUpStatus;


export default authSlice.reducer;
