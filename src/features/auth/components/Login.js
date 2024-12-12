import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from 'react-loader-spinner'
import { loginUserAsync, selectLoginStatus } from "../authSlice";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';


import toast from "react-hot-toast";


const initialLoginDetails = {
	email: '',
	password: '',
};


export default function Login() {
	const [loginDetails, setLoginDetails] = useState(initialLoginDetails);
	const [emailError, setEmailError] = useState(false); // used to check whether the email is valid or not
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const loginStatus = useSelector(selectLoginStatus);

	const disabled = loginDetails.email === '' ||
		loginDetails.password === '' ||
		emailError ||
		loginStatus === 'loading';


	function handleChange(e) {
		const newDetails = {
			...loginDetails,
			[e.target.id]: e.target.value
		};

		const emailError = validateEmail(e);

		setEmailError(emailError);
		setLoginDetails(newDetails);
	}

	function validateEmail(e) {
		const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		if (e.target.id !== 'email' || e.target.value === '') {
			return emailError;
		}

		return e.target.value.match(validEmail) == null;
	}

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}


	function handleSubmit(e) {
		e.preventDefault();

		dispatch(loginUserAsync(loginDetails))
			.unwrap() // Wait for the async thunk to resolve
			.then((data) => {
				toast.success('Your login successful');
				const user = data.user;
				const redirectUrl = data.redirect;

				sessionStorage.setItem('user', JSON.stringify(user));

				if (redirectUrl) {
					navigate(redirectUrl, { replace: true })
				}
			})
			.catch((error) => {
				toast.error(error || 'Failed to login');
			});
	}



	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-10 w-auto"
					src="/ecommerce.png"
					alt="Swift Store"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
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
								readOnly={loginStatus === 'loading'}
								autoComplete="email"
								value={loginDetails.email}
								onChange={handleChange}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							<p className="text-red-500 italic text-sm font-semibold">{emailError && 'Invalid Email Address'}</p>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
								Password
							</label>
							<div className="text-sm">
								<Link to='/forgot-password' className="font-semibold text-indigo-600 hover:text-indigo-500">
									Forgot password?
								</Link>
							</div>
						</div>
						<div className="relative my-2">
							<input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								readOnly={loginStatus === 'loading'}
								autoComplete="current-password"
								value={loginDetails.password}
								onChange={handleChange}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
							{showPassword ? (
								<EyeSlashIcon
									onClick={toggleShowPassword}
									className='size-6 absolute right-2 top-[6px] text-gray-500 cursor-pointer'
								/>

							) : (
								<EyeIcon
									onClick={toggleShowPassword}
									className='size-6 absolute right-2 top-[6px] text-gray-500 cursor-pointer'
								/>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							className={`${disabled ? 'bg-gray-200 text-gray-800 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
							disabled={disabled}
						>
							{loginStatus === 'loading' ? (
								<ThreeDots
									visible={true}
									height="24"
									width="30"
									color="#4F46E5"
									radius="20"
									ariaLabel="three-dots-loading"
									wrapperStyle={{}}
									wrapperClass=""
								/>
							) : (
								'Sign in'
							)}
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{' '}
					<Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
						Create an Account
					</Link>
				</p>
			</div>
		</div>
	)
	// );
}
