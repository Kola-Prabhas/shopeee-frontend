import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from '../features/cart/cartSlice';
import { updateItemAsync, deleteItemFromCartAsync } from '../features/cart/cartSlice';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { selectUserInfo, updateUserAsync } from '../features/user/userSlice';







function CheckoutPage() {
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector(selectUserInfo);
	const order = useSelector(selectCurrentOrder);

	const {
		register,
		handleSubmit,
		reset,
	} = useForm();

	const [selectedAddress, setSelectedAddress] = useState(null);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');


	const items = useSelector(selectItems);
	const totalItems = items.reduce((total, current) => total + current.quantity, 0);
	const totalPrice = items.reduce((total, current) => total + current.product.price * current.quantity, 0);

	function handleQuantityChange(e, item) {
		dispatch(updateItemAsync({
			id: item.id,
			quantity: +e.target.value
		}));
	}


	function handleDelete(itemId) {
		console.log('Item Id: ', itemId);
		dispatch(deleteItemFromCartAsync(itemId));
	}

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
			{
				items.length === 0 && <Navigate to='/' replace={true}></Navigate>
			}

			{
				order && <Navigate to={`/order-details/${order.id}`} replace={true}></Navigate>
			}

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
										{...register('name', {required: 'Name is required'})}
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
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Choose from existing addresses		
						</p>
						<ul  className="divide-y divide-gray-100">
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
									<li key={item.product.id} className="flex py-6">
										<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
											<img
												src={item.product.images[0]}
												alt={item.product.title}
												className="h-full w-full object-cover object-center"
											/>
										</div>

										<div className="ml-4 flex flex-1 flex-col">
											<div>
												<div className="flex justify-between text-base font-medium text-gray-900">
													<h3>
														<a href={item.product.href}>{item.product.title}</a>
													</h3>
													<p className="ml-4">${item.product.price * item.quantity}</p>
												</div>
												<p className="mt-1 text-sm text-gray-500">red</p>
											</div>
											<div className="flex flex-1 items-end justify-between text-sm">
												<div className="text-gray-500">
													<label htmlFor="quantity" className="inline text-sm mr-5 text-left font-medium leading-6 text-gray-900">
														Qty
													</label>
													<select
														id='quantity'
														onChange={(e) => handleQuantityChange(e, item)}
														value={item.quantity}
														className='w-[65px] h-[40px]'

													>
														<option value="1">1</option>
														<option value="2">2</option>
														<option value="3">3</option>
														<option value="4">4</option>
														<option value="5">5</option>
													</select>
												</div>

												<div className="flex">
													<button
														type="button"
														className="font-medium text-indigo-600 hover:text-indigo-500"
														onClick={() => handleDelete(item.id)}
													>
														Remove
													</button>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>


					<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
						<div className="flex justify-between mx-2 my-2 text-base font-medium text-gray-900">
							<p>Total Items in cart</p>
							<p>{totalItems} items</p>
						</div>
						<div className="flex justify-between mx-2 my-2 text-base font-medium text-gray-900">
							<p>Subtotal</p>
							<p>$ {totalPrice}</p>
						</div>
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
										onClick={() => setOpen(false)}
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
