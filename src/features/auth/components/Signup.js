import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import { createUserAsync, selectUser, selectSignUpError, selectAuthStatus } from "../authSlice";
import { useDispatch, useSelector } from 'react-redux';

const initialSignupDetails = {
	email: '',
	password: '',
	"confirm-password": ''
}

export default function SignUp() {
	const [signupDetails, setSignupDetails] = useState(initialSignupDetails);
	const [passwordError, setPasswordError] = useState(false);
	const [emailError, setEmailError] = useState(false);

	const disabled = signupDetails.email === '' || signupDetails.password === '' ||
		signupDetails["confirm-password"] === '' || emailError || passwordError;

	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const signUpError = useSelector(selectSignUpError);
	const authStatus = useSelector(selectAuthStatus);




	function handleChange(e) {
		const newDetails = {
			...signupDetails,
			[e.target.id]: e.target.value
		};

		// Validate 

		const emailError = validateEmail(e);
		const passwordError = validatePassword(e);

		

		setEmailError(emailError);
		setPasswordError(passwordError);
		setSignupDetails(newDetails);
	}


	function validateEmail(e) {
		const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		if (e.target.id !== 'email' || e.target.value === '') {
			return emailError;
		}


		return e.target.value.match(validEmail) == null;
				
	}

	function validatePassword(e) {
		const id = e.target.id;
			
		if (id !== 'password' && id !== 'confirm-password') {
			return passwordError;
		}


		if (id === 'password' && signupDetails['confirm-password'] !== '') {
			return e.target.value !== signupDetails['confirm-password'];
		} else if (id === 'confirm-password' && signupDetails['password'] !== '') {
			return e.target.value !== signupDetails['password'];
		}


		return false;
	}
	
		
	function handleSubmit(e) {
		e.preventDefault();

		dispatch(createUserAsync({
			email: signupDetails.email,
			password: signupDetails.password,
			addresses: [],
			role: 'user',
		}));

		setSignupDetails(initialSignupDetails);
	}
	


	return (
		authStatus === 'loading' ? (
			<div className='min-h-[100vh] flex items-center justify-center'>
				<ThreeDots
					visible={true}
					height="80"
					width="80"
					color="#4F46E5"
					radius="10"
					ariaLabel="three-dots-loading"
					wrapperStyle={{}}
					wrapperClass=""
				/>
			</div>
		) : (
		<>
			{user && <Navigate to='/' replace={true}></Navigate>}
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="/ecommerce.png"
						alt="Swift Store"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Create an Account
					</h2>
					<p className="text-red-700  text-xl text-center mt-6">{signUpError}</p>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<label htmlFor="email" className="block text-sm text-left font-medium leading-6 text-gray-900">
								Email address
							</label>
							<div className="space-y-1">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									value={signupDetails.email}
									onChange={handleChange}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
								<p className="text-red-500 italic text-sm font-semibold">{emailError && 'Invalid Email Address' }</p>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
									Password
								</label>
								
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									value={signupDetails.password}
									onChange={handleChange}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
									Confirm Password
								</label>

							</div>
							<div className="space-y-1">
								<input
									id="confirm-password"
									name="password"
									type="password"
									autoComplete="current-password"
									value={signupDetails['confirm-password']}
									onChange={handleChange}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
								<p className="text-red-500 italic text-sm font-semibold">{passwordError && "Passwords aren't matching"}</p>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className={`${disabled ? 'bg-gray-200 text-gray-800 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
								disabled={disabled}
							>
								Sign up
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already a member?{' '}
						<Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Log In
						</Link>
					</p>
				</div>
			</div>
		</>)
	);
}
