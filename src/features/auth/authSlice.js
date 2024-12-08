import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
	createUser,
	loginUser,
	resetPasswordRequest,
	resetPassword,
	logoutUser
} from './authAPI';

import toast from 'react-hot-toast';



export const createUserAsync = createAsyncThunk(
	'auth/createUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await createUser(user);
			return response.data;
		} catch (error) { 
			return rejectWithValue(error.message)
		}
	}
);


export const loginUserAsync = createAsyncThunk(
	'auth/loginUser',
	async (loginDetails, { rejectWithValue }) => {
		try {
			const response = await loginUser(loginDetails);

			return response;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);


export const logoutUserAsync = createAsyncThunk(
	'auth/logoutUser',
	async () => {
		const response = await logoutUser();
		return response.data;
	}
);


export const resetPasswordRequestAsync = createAsyncThunk(
	'auth/resetPasswordRequest',
	async (email, { rejectWithValue }) => {
		try {
			const response = await resetPasswordRequest(email);

			return response.data;
		} catch (error) {
			console.log('err.message ', error.message);
			return rejectWithValue(error.message)			
		}
	}
);


export const resetPasswordAsync = createAsyncThunk(
	'auth/resetPassword',
	async ({ email, password, token }, {rejectWithValue}) => {
		try {
			const response = await resetPassword({ email, password, token });
			
			return response.message;
		} catch (error) {
			return rejectWithValue(error.message);			
		}
	}
);

const initialState = {
	status: 'idle',
	loginStatus: 'idle',
	signUpStatus: 'idle',
	
	mailSentStatus: 'idle',
	passwordResetStatus: 'idle',
};


export const authSlice = createSlice({
	name: 'auth',
	initialState,


	extraReducers: (builder) => {
		builder
			.addCase(createUserAsync.pending, (state) => {
				state.signUpStatus = 'loading';
			})
			.addCase(createUserAsync.fulfilled, (state, action) => {
				state.signUpStatus = 'idle';

				toast.success('Account created successfully');
			})
			.addCase(createUserAsync.rejected, (state, action) => {
				state.signUpStatus = 'idle';

				const message = action.payload;
				toast.error(message || 'Failed to create account');
			})


			.addCase(loginUserAsync.pending, (state) => {
				state.loginStatus = 'loading';
			})
			.addCase(loginUserAsync.fulfilled, (state, action) => {
				state.loginStatus = 'idle';
				
				toast.success('Your login successful');
			})
			.addCase(loginUserAsync.rejected, (state, action) => {
				state.loginStatus = 'idle';

				const message = action.payload;
				toast.error(message || 'Failed to login');
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

				toast.success('An email with link to reset password has been sent to you')
			})
			.addCase(resetPasswordRequestAsync.rejected, (state, action) => {
				state.mailSentStatus = 'idle';

				const message = action.payload;

				console.log('message ', message);

				toast.error(message || 'Failed to send email')
			})


			.addCase(resetPasswordAsync.pending, (state) => {
				state.passwordResetStatus = 'loading';
			})
			.addCase(resetPasswordAsync.fulfilled, (state, action) => {
				state.passwordResetStatus = 'idle';

				const message = action.payload;
				toast.success(message || 'Password reset successful');
			})
			.addCase(resetPasswordAsync.rejected, (state, action) => {
				state.passwordResetStatus = 'idle';

				const message = action.payload;
				toast.error(message || 'Failed to reset password');
			})
	},
})

export const selectSignUpError = (state) => state.auth.signUpError.message;
export const selectMailSent = (state) => state.auth.mailSent;

export const selectMailSentStatus = (state) => state.auth.mailSentStatus;
export const selectPasswordResetStatus = (state) => state.auth.passwordResetStatus;
export const selectLoginStatus = (state) => state.auth.loginStatus;
export const selectSignUpStatus = (state) => state.auth.signUpStatus;


export default authSlice.reducer;
