import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync, selectLoginError, selectUser } from "../authSlice";


const initialLoginDetails = {
	email: '',
	password: '',
};


export default function Login() {
	const [loginDetails, setLoginDetails] = useState(initialLoginDetails);
	const [emailError, setEmailError] = useState(false);

	const dispatch = useDispatch();
	const loginError = useSelector(selectLoginError);
	const user = useSelector(selectUser);

	const disabled = loginDetails.email === '' || loginDetails.password === '' || emailError;


	useEffect(() => {
		const loggedInUser = JSON.parse(sessionStorage.getItem('user'));

		if (loggedInUser) {
			dispatch(loginUserAsync(loggedInUser));
		}

		if (user) {
			sessionStorage.setItem('user', JSON.stringify(user));
		}
	})


	console.log('user in login ', user);



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

	function handleSubmit(e) {
		e.preventDefault();

		dispatch(loginUserAsync(loginDetails));

		setLoginDetails(initialLoginDetails);
	}

  return (
	    <>
		  {
			user && <Navigate to='/' replace={true}></Navigate>
		  }
		  <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
				  <img
					  className="mx-auto h-10 w-auto"
					  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
					  alt="Your Company"
				  />
				  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					  Sign in to your account
				  </h2>

				  <p className="text-red-700  text-xl text-center mt-6">{loginError}</p>

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
								  autoComplete="email"
								  value={loginDetails.email}
								  onChange={handleChange}
								  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							  />
							  <p className="text-red-900 text-sm font-semibold">{emailError && 'Invalid Email Address'}</p>
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
						  <div className="mt-2">
							  <input
								  id="password"
								  name="password"
								  type="password"
								  autoComplete="current-password"
								  value={loginDetails.password}
								  onChange={handleChange}
								  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							  />
						  </div>
					  </div>

					  <div>
						  <button
							  type="submit"
							  className={`${disabled ? 'bg-gray-200 text-gray-800 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer'} flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
							  disabled={disabled}
						  >
							  Sign in
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
	  </>
  );
}
