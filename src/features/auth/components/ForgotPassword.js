import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequestAsync, selectMailSentStatus } from "../authSlice";
import { ThreeDots } from 'react-loader-spinner';

import toast from "react-hot-toast";



export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);

	const mailSentStatus = useSelector(selectMailSentStatus);

	const disabled = email === '' ||
		emailError ||
		mailSentStatus === 'loading';

	const dispatch = useDispatch();


	function handleEmailChange(e) {
		const newEmail = e.target.value;

		const emailError = validateEmail(e);

		setEmailError(emailError);
		setEmail(newEmail);
	}

	function validateEmail(e) {
		const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		if (e.target.value === '') {
			return emailError;
		}

		return e.target.value.match(validEmail) == null;
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(resetPasswordRequestAsync(email))
			.unwrap()
			.then(() => {
				toast.success('An email with link to reset password has been sent to you')
			})
			.catch(err => {
				toast.error(err || 'Failed to send email')
			});
	}

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						className="mx-auto h-10 w-auto"
						src="/ecommerce.png"
						alt="Swift Store"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Reset password
					</h2>

				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email" className="block text-sm text-left font-medium leading-6 text-gray-900">
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoFocus={true}
									autoComplete="email"
									value={email}
									onChange={handleEmailChange}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
								<p className="text-red-500 italic text-sm font-semibold">{emailError && 'Invalid Email Address'}</p>
							</div>
						</div>
						<div>
							<button
								type="submit"
								className={`${disabled ? 'bg-gray-200 text-gray-800 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
								disabled={disabled}
							>
								{mailSentStatus === 'loading' ? (
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
									'Send Email'
								)}
							</button>
							{/* {mailSent && mailSentStatus === 'idle' && (
								<p className="mt-10 text-center text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
									We have sent a link to your gmail to reset password.									
								</p>
							)} */}

						</div>
					</form>

					{mailSentStatus !== 'loading' && <p className="mt-10 text-center text-sm text-gray-500">
						Back to {' '}
						<Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Login
						</Link>
					</p>}
				</div>
			</div>
		</>
	);
}
