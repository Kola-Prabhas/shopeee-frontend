import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../cart/cartSlice';
import { selectUserInfo } from '../../user/userSlice';
import {
	createOrderAsync,
// 	selectCurrentOrder,
// 	selectCreateUserOrderStatus
} from '../../order/orderSlice';

import {
	selectUserAddresses,
	selectUserAddressesStatus,
	addUserAddressAsync,
	fetchUserAddressesAsync
} from "../../user/addressSlice";

import { ThreeDots } from 'react-loader-spinner'

import CartItem from './/cartItem';
import CartTotalStats from './cartTotalStats';
import AddressForm from '../../user/components/AddressForm';

import { toast } from 'react-hot-toast';



export default function Checkout() {
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(null);

	const dispatch = useDispatch();
	const user = useSelector(selectUserInfo);
	const userAddresses = useSelector(selectUserAddresses);
	const userAddressesStatus = useSelector(selectUserAddressesStatus);
	// const order = useSelector(selectCurrentOrder);
	const order = {};
	const items = useSelector(selectCartItems);

	// const createUserOrderStatus = useSelector(selectCreateUserOrderStatus);
	const createUserOrderStatus = 'idle';

	const totalItems = items.length;
	const totalPrice = items.reduce((total, current) => total + current.product.price * current.quantity, 0);
	const totalDiscountPrice = items.reduce((total, current) => total + current.product.discountPrice.toFixed(2) * current.quantity, 0)


	function handleAddressChange(index) {
		setSelectedAddress(userAddresses[index])
	}

	function handleAddAddress(address) {
		dispatch(addUserAddressAsync(address));
	}

	function handleCreateOrder() {
		if (selectedAddress) {
			const order = {
				items,
				totalItems,
				totalPrice,
				totalDiscountPrice,
				user: user.id,
				selectedAddress: {
					...selectedAddress,
					email: user.email
				},
				status: 'pending',
				paymentStatus: 'unpaid'
			}

			dispatch(createOrderAsync(order));
		} else {
			toast.error('Please select an address to place order');
		}
	}


	useEffect(() => {
		if (userAddresses?.length === 0) {
			dispatch(fetchUserAddressesAsync());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch])


	return (
		<div className="mx-auto w-[95%] max-w-[1500px]">
			{user?.role === 'admin' && <Navigate to='/' replace={true} />}

			{items.length === 0 && <Navigate to='/' replace={true} />}

			{order && order.selectedPaymentMethod === 'card' && <Navigate to={`/stripe-checkout`} replace={true} />}

			{order && order.selectedPaymentMethod === 'cash' && <Navigate to={`/order-details/${order.id}`} replace={true} />}

			<div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
				<div className="col-span-2">
					<div>
						<div className="border-b border-gray-900/10 pb-6 pt-4">
							<h2 className="text-2xl xl:text-3xl font-semibold leading-7 text-gray-900">Personal Information</h2>
							<div className="mt-6 sm:text-lg *:flex font-medium">
								<div>
									<p className="w-[60px] text-gray-900">
										Name:
									</p>
									<p className="text-gray-500">
										{user.name}
									</p>
								</div>
								<div>
									<p className="w-[60px] text-gray-900">
										Email:
									</p>
									<p className="text-gray-500">
										{user.email}
									</p>
								</div>
								<div>
									<p className="w-[60px] text-gray-900">
										Phone:
									</p>
									<p className="text-gray-500">
										{user.phone || '1234567890'}
									</p>
								</div>
							</div>
						</div>

						<div className="border-b border-gray-900/10 pb-6 pt-4">
							<h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
							{userAddressesStatus === 'loading' ? (
								<div className='min-h-[200px] flex items-center justify-center'>
									<ThreeDots
										visible={true}
										height="60"
										width="60"
										color="#4F46E5"
										radius="10"
										ariaLabel="three-dots-loading"
										wrapperStyle={{}}
										wrapperClass=""
									/>
								</div>
							) : (
								<>
									{userAddresses?.length > 0 ? (
										<p className="mt-1 text-sm leading-6 text-gray-500 font-medium">
											Choose from existing addresses
										</p>
									) : (
										<p className="my-4 text-center font-medium text-sm leading-6 text-red-500">
											Add an address to deliver products
										</p>
									)}
									<ul className="divide-y divide-gray-100">
										{userAddresses?.map((address, index) => (
											<li
												key={address.id}
												className="flex justify-between gap-x-6 py-5"
											>
												<div className="flex min-w-0 gap-x-4">
													<input
														name="address"
														type="radio"
														onChange={() => handleAddressChange(index)}
														className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
													/>

													<div className="min-w-0 flex-auto">
														<div className="flex text-sm font-semibold leading-6 text-gray-500">
															<p className='w-[65px] text-gray-900'>State: </p>
															<p>{address.state}</p>
														</div>
														<div className="flex text-sm font-semibold leading-6 text-gray-500">
															<p className='w-[65px] text-gray-900'>City: </p>
															<p>{address.city}</p>
														</div>
														<div className="flex text-sm font-semibold leading-6 text-gray-500">
															<p className='w-[65px] text-gray-900'>Street: </p>
															<p>{address.street}</p>
														</div>
														<div className="flex text-sm font-semibold leading-6 text-gray-500">
															<p className='w-[65px] text-gray-900'>Pincode: </p>
															<p>{address.pinCode}</p>
														</div>
													</div>
												</div>
											</li>
										))}
									</ul>
								</>
							)}
							{showAddressForm ? (
								<AddressForm
									submitAction={handleAddAddress}
									cancelAction={() => setShowAddressForm(false)}
								/>
							) : (
								<button
									onClick={() => setShowAddressForm(true)}
									className='block w-[150px] text-sm ml-auto bg-indigo-600 text-white px-4 py-2 rounded-[4px]'
								>
									Add Address
								</button>
							)}
						</div>

					</div>
				</div>

				<div className="col-span-2 sm:px-2 bg-[#f9f9f9]">
					<h2 className="text-2xl sm:text-3xl mt-4 mb-6 font-semibold text-gray-700 text-center">Cart</h2>
					<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
						{items.map((item) => (
							<CartItem item={item} />
						))}
					</div>

					<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
						<CartTotalStats
							totalItems={totalItems}
							totalPrice={totalPrice}
							totalDiscountPrice={totalDiscountPrice}
						/>
						<p className="mt-0.5 mx-2 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
						<div className="mt-6 mx-auto max-w-[400px]">
							{createUserOrderStatus === 'loading' ? (
								<div className='flex justify-center'>
									<ThreeDots
										visible={true}
										height="50"
										width="50"
										color="#4F46E5"
										radius="10"
										ariaLabel="three-dots-loading"
										wrapperStyle={{}}
										wrapperClass=""
									/>
								</div>
							) : (
								<div
									onClick={handleCreateOrder}
									className="flex items-center justify-center cursor-pointer rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
								>
									Order Now
								</div>
							)}
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

