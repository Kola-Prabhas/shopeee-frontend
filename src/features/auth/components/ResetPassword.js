import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import { selectPasswordResetStatus, resetPasswordAsync } from "../authSlice";
import { useDispatch, useSelector } from 'react-redux';


export default function ResetPassword() {
	const [passwords, setPasswords] = useState({ password: '', 'confirm-password': '' });
	const [passwordError, setPasswordError] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();


	const passwordResetStatus = useSelector(selectPasswordResetStatus)

	const disabled = passwords.password === '' ||
		passwords["confirm-password"] === '' ||
		passwordError ||
		passwordResetStatus === 'loading';

	const query = new URLSearchParams(window.location.search);
	const email = query.get('email');
	const token = query.get('token');


	function handleChange(e) {
		const newPasswords = {
			...passwords,
			[e.target.id]: e.target.value
		};

		// Validate 
		const passwordError = validatePassword(e);

		setPasswordError(passwordError);
		setPasswords(newPasswords);
	}


	function validatePassword(e) {
		const id = e.target.id;

		if (id !== 'password' && id !== 'confirm-password') {
			return passwordError;
		}

		if (id === 'password' && passwords['confirm-password'] !== '') {
			return e.target.value !== passwords['confirm-password'];
		} else if (id === 'confirm-password' && passwords['password'] !== '') {
			return e.target.value !== passwords['password'];
		}

		return false;
	}


	function handleSubmit(e) {
		e.preventDefault();

		dispatch(resetPasswordAsync({
			email,
			password: passwords.password,
			token
		}))
			.unwrap()
			.then(data => {
				navigate('/login', { replace: true })
			})
			.catch((e) => {
				console.log(e);
			});
	}

	if (!email || !token) {
		return <div className='min-h-[50vh] flex items-center justify-center'>
			<p className="text-red-500 text-xl font-semibold">
				Invalid or Broken Link :(
			</p>
		</div>
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
					Reset Password
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div>
						<div className="flex items-center justify-between">
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
								New Password
							</label>

						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								readOnly={passwordResetStatus === 'loading'}
								autoComplete="current-password"
								value={passwords.password}
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
								readOnly={passwordResetStatus === 'loading'}
								autoComplete="current-password"
								value={passwords['confirm-password']}
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
							{passwordResetStatus === 'loading' ? (
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
								'Reset Password'
							)}
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
	);
}
