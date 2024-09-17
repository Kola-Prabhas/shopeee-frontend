import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../features/cart/cartSlice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { selectUserInfo, updateUserAsync } from '../features/user/userSlice';

import CartItem from '../features/cart/components/cartItem';
import CartTotalStats from '../features/cart/components/cartTotalStats';


function CheckoutPage() {
	const dispatch = useDispatch();
	const user = useSelector(selectUserInfo);
	const order = useSelector(selectCurrentOrder);
	const items = useSelector(selectCartItems);


	const {
		register,
		handleSubmit,
		reset,
	} = useForm();

	const [selectedAddress, setSelectedAddress] = useState(null);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');


	const totalItems = items.length;
	const totalPrice = items.reduce((total, current) => total + current.product.price * current.quantity, 0);
	const totalDiscountPrice = items.reduce((total, current) => total + current.product.discountPrice.toFixed(2) * current.quantity, 0)


	function handleAddressChange(index) {
		console.log(user.addresses[index])
		setSelectedAddress(user.addresses[index])
	}


	function handlePaymentChange(e) {
		setSelectedPaymentMethod(e.target.value);
	}
	

	function handleOrder() {
		if (selectedAddress && selectedPaymentMethod) {
			const order = {
				items,
				totalItems,
				totalPrice,
				user: user.id,
				selectedAddress,
				selectedPaymentMethod,
				status: 'pending'
			}

			dispatch(createOrderAsync(order));
		}
	}




	return (
		<div className="mx-auto w-[90%] max-w-[1500px] px-4 sm:px-6 lg:px-4 ">
			{user.role === 'admin' && <Navigate to='/' replace={true} />}

			{items.length === 0 && <Navigate to='/' replace={true} />}

			{order && order.selectedPaymentMethod === 'card' && <Navigate to={`/stripe-checkout`} replace={true} />}

			{order && order.selectedPaymentMethod === 'cash' && <Navigate to={`/order-details/${order.id}`} replace={true} />}

			<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
				<div className="col-span-3">
					<form
						noValidate
						onSubmit={handleSubmit(data => {
							dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }));
							reset();

						})}
					>
						<div className="border-b border-gray-900/10 pb-12">
							<h2 className="text-base xl:text-4xl font-semibold leading-7 text-gray-900">Personal Information</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div className="sm:col-span-4">
									<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
										Full name
									</label>
									<div className="mt-2">
										<input
											type="text"
											{...register('name', { required: 'Name is required' })}
											id="name"
											autoComplete="given-name"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>
								<div className="sm:col-span-4">
									<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
										Email address
									</label>
									<div className="mt-2">
										<input
											id="email"
											{...register('email', { required: 'Email is required' })}
											type="email"
											autoComplete="email"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>
								<div className="sm:col-span-4 ">

									<label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
										Phone
									</label>
									<div className="mt-2">
										<input
											id="phone"
											{...register('phone', { required: 'Phone is required' })}
											type="tel"
											autoComplete="phone"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>

									</div>

								</div>




								<div className="col-span-full">
									<label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
										Street address
									</label>
									<div className="mt-2">
										<input
											type="text"
											{...register('street', { required: 'Street is required' })}
											id="street"
											autoComplete="street"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="sm:col-span-2 sm:col-start-1">
									<label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
										City
									</label>
									<div className="mt-2">
										<input
											type="text"
											{...register('city', { required: 'City is required' })}
											id="city"
											autoComplete="address-level2"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="sm:col-span-2">
									<label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
										State / Province
									</label>
									<div className="mt-2">
										<input
											type="text"
											{...register('state', { required: 'State is required' })}
											id="state"
											autoComplete="address-level1"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>

								<div className="sm:col-span-2">
									<label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
										ZIP / Postal code
									</label>
									<div className="mt-2">
										<input
											type="text"
											{...register('pinCode', { required: 'Pin Code is required' })}
											id="pinCode"
											autoComplete="pinCode"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
									</div>
								</div>
							</div>
							<div className="mt-6 flex items-center justify-end gap-x-6">
								<button type="button" className="text-sm font-semibold leading-6 rounded-md  px-3 py-2 text-gray-900 hover:bg-gray-200">
									Reset
								</button>
								<button
									type="submit"
									className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Add Address
								</button>
							</div>
						</div>

						<div className="border-b border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
							{user.addresses.length > 0 ? (
								<p className="mt-1 text-sm leading-6 text-gray-600">
									Choose from existing addresses
								</p>
							) : (
								<p className="mt-2 text-center font-medium text-sm leading-6 text-red-500">
									Add an address to deliver products
								</p>
							)}
							<ul className="divide-y divide-gray-100">
								{user.addresses.map((address, index) => (
									<li key={index} className="flex justify-between gap-x-6 py-5">
										<div className="flex min-w-0 gap-x-4">
											<input
												name="address"
												type="radio"
												onChange={() => handleAddressChange(index)}
												className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
											/>

											<div className="min-w-0 flex-auto">
												<p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
												<p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
												<p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
											</div>
										</div>
										<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
											<p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
											<p className="text-sm leading-6 text-gray-900">{address.city}</p>
										</div>
									</li>
								))}
							</ul>

							<div className="mt-10 space-y-10">

								<fieldset>
									<legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
									<p className="mt-1 text-sm leading-6 text-gray-600">
										Choose one
									</p>
									<div className="mt-6 space-y-6">

										<div className="flex items-center gap-x-3">
											<input
												id="cash"
												name="payment-methods"
												type="radio"
												value="cash"
												checked={selectedPaymentMethod === "cash"}
												onChange={handlePaymentChange}
												className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
											<label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
												cash
											</label>
										</div>
										<div className="flex items-center gap-x-3">
											<input
												id="card"
												name="payment-methods"
												type="radio"
												value="card"
												checked={selectedPaymentMethod === "card"}
												onChange={handlePaymentChange}
												className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
											<label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
												card
											</label>
										</div>
									</div>
								</fieldset>
							</div>
						</div>
					</form >
				</div>

				<div className="col-span-2 px-4 sm:px-2 lg:px-2 bg-[#f9f9f9]">
					<h1 className="text-4xl mb-4 font-semibold tracking-tight text-gray-700 text-center">Cart</h1>


					<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
						<div className="flow-root">
							<ul className="-my-6 divide-y divide-gray-200">
								{items.map((item) => (
									<CartItem item={item} />
								))}
							</ul>
						</div>
					</div>


					<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
						<CartTotalStats
							totalItems={totalItems}
							totalPrice={totalPrice}
							totalDiscountPrice={totalDiscountPrice}
						/>
						<p className="mt-0.5 mx-2 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
						<div className="mt-6 mx-auto max-w-[400px]">
							<div
								onClick={handleOrder}
								className="flex items-center justify-center cursor-pointer rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
							>
								Order Now
							</div>
						</div>
						<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
							<p>
								or{' '}
								<Link to='/'>
									<button
										type="button"
										className="font-medium text-indigo-600 hover:text-indigo-500"
									>
										Continue Shopping
										<span aria-hidden="true"> &rarr;</span>
									</button>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckoutPage;
