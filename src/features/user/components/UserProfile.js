import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { selectUserInfo, updateUserAsync } from "../userSlice";
import AddressForm from "./AddressForm";

function Profile() {
	const [editIndex, setEditIndex] = useState(-1);
	const [addAddress, setAddAddress] = useState(false);
	const userInfo = useSelector(selectUserInfo);
	const dispatch = useDispatch();


	const {
		register,
		handleSubmit,
		setValue,
		reset,
	} = useForm();

	function handleDelete(index) {
		const updateUser = {
			...userInfo,
			addresses: [
				...userInfo.addresses
			]
		};

		updateUser.addresses.splice(index, 1);

		dispatch(updateUserAsync(updateUser));
	}


	function handleEdit(index) {
		setEditIndex(index);
		const address = userInfo.addresses[index];

		setValue('name', address.name);
		setValue('email', address.email);
		setValue('phone', address.phone);
		setValue('street', address.street);
		setValue('pinCode', address.pinCode);
		setValue('city', address.city);
		setValue('state', address.state);
	}

	function toggleAddAddress() {
		setAddAddress(!addAddress);
	}


	return (
		<>
			<h1 className="text-4xl my-4 font-bold tracking-tight text-gray-800 ">User Id:  #{userInfo.id}</h1>
			<h3 className="text-2xl mb-4 font-bold tracking-tight text-gray-600 ">Email: {userInfo.email}</h3>
			<div>
				<div className="w-[60%] mx-auto flex justify-between">
					<h2 className="text-xl  font-semibold leading-7 text-gray-600">Addresses</h2>
					{
						!addAddress && (
							<button
								type="button"
								className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								onClick={toggleAddAddress}
								disabled={editIndex !== -1}
							>
								Add Address
							</button>
						)
					}
				</div>
				{
					(addAddress && editIndex === -1) && (
						<div className="mx-auto my-12 max-w-5xl px-4 py-8 sm:px-6 lg:px-8 bg-[#f9f9f9] rounded">
							<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
								<div className="col-span-3">
									<form
										noValidate
										onSubmit={handleSubmit(data => {
											const update = {
												...userInfo,
												addresses: [...userInfo.addresses, data]
											};

											toggleAddAddress()

											dispatch(updateUserAsync(update));
										})}
									>
										<div className="border-b border-gray-900/10 pb-12">

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
												<button
													onClick={toggleAddAddress}
													type="button"
													className="text-sm font-semibold leading-6 rounded-md  px-3 py-2 text-gray-900 hover:bg-gray-200"
												>
													Cancel
												</button>
												<button
													type="submit"
													className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
												>
													Add Address
												</button>
											</div>
										</div>
									</form >
								</div>
							</div>
						</div>
					)

				}
				{
					userInfo.addresses.map((address, index) => {
						return (
							<div key={index} className="mx-auto my-12 max-w-5xl px-4 py-8 sm:px-6 lg:px-8 bg-[#f9f9f9] rounded">
								{
									editIndex === index && (
										<div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
											<div className="col-span-3">
												<form
													noValidate
													onSubmit={handleSubmit(data => {
														const update = {
															...userInfo,
															addresses: userInfo.addresses.map((address, index) => {
																if (index === editIndex) {
																	return data;
																}

																return address;
															})
														};

														console.log('Edit Index ', editIndex);
														console.log('data', data)
														console.log('update ', update);

														dispatch(updateUserAsync(update));
														reset();
														setEditIndex(-1);
													})}
												>
													<div className="border-b border-gray-900/10 pb-12">

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
															<button
																onClick={() => {
																	const address = userInfo.addresses[index];

																	setValue('name', address.name);
																	setValue('email', address.email);
																	setValue('phone', address.phone);
																	setValue('street', address.street);
																	setValue('pinCode', address.pinCode);
																	setValue('city', address.city);
																	setValue('state', address.state);
																}}
																type="button"
																className="text-sm font-semibold leading-6 rounded-md  px-3 py-2 text-gray-900 hover:bg-gray-200"
															>
																Reset
															</button>
															<button
																type="submit"
																className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
															>
																Save Address
															</button>
														</div>
													</div>
												</form >
											</div>
										</div>
									)
								}
								<div className={`${editIndex === index ? 'hidden' : 'block'} border-b px-2 sm:px-6 md:px-8 xl:px-16 border-gray-900/10`}>
									<div className='py-5 space-y-2'>
										<p className="text-base font-semibold leading-6 text-gray-900">Name: {address.name}</p>
										<p className="text-base leading-6 font-semibold text-gray-900">Phone: {address.phone}</p>
										<p className="font-semibold text-base leading-5 text-gray-900">State: {address.state}</p>
										<p className="font-semibold text-base leading-5 text-gray-900">Pincode: {address.pinCode}</p>
										<p className="text-base leading-6 font-semibold text-gray-900">City: {address.city}</p>
										<p className="font-semibold text-base leading-5 text-gray-900">Street: {address.street}</p>

									</div>
								</div>
								<div className={`${editIndex === index ? 'hidden' : 'flex'} mt-6  items-center justify-end gap-x-6`}>
									<button
										type="button"
										className="text-sm font-semibold leading-6 rounded-md  px-4 py-2 text-gray-900 hover:bg-gray-200"
										onClick={() => handleDelete(index)}
									>
										Delete
									</button>
									<button
										type="submit"
										className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										onClick={() => handleEdit(index)}
									>
										Edit
									</button>
								</div>
							</div>
						);
					})
				}

			</div>
		</>
	);
}


function UserProfile() {
	const [editIndex, setEditIndex] = useState(-1);
	const [addAddress, setAddAddress] = useState(false);
	const userInfo = useSelector(selectUserInfo);
	const dispatch = useDispatch();



	function handleDelete(index) {
		const updatedUser = {
			id: userInfo.id,
			addresses: [
				...userInfo.addresses
			]
		};

		updatedUser.addresses.splice(index, 1);

		dispatch(updateUserAsync(updatedUser));
	}

	function handleAddAddress(address) {
		const updatedUserAddresses = {
			id: userInfo.id,
			addresses: [
				...userInfo.addresses,
				address,
			]
		};

		dispatch(updateUserAsync(updatedUserAddresses));
	}


	function handleEdit(index) {
		setEditIndex(index);
		const address = userInfo.addresses[index];

		// setValue('name', address.name);
		// setValue('email', address.email);
		// setValue('phone', address.phone);
		// setValue('street', address.street);
		// setValue('pinCode', address.pinCode);
		// setValue('city', address.city);
		// setValue('state', address.state);
	}

	function toggleAddAddress() {
		setAddAddress(!addAddress);
	}


	return (
		<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
			<h1 className="text-2xl sm:text-3xl font-bold mt-4 mb-8">My Profile</h1>
			<div className='flex items-center gap-4  mb-10'>
				<div className='size-24 rounded-[50%] overflow-hidden'>
					<img
						src='/profile-photo.jpg'
						alt='profile'
						className='size-full object-cover'
					/>
				</div>
				<div>
					<h2 className="text-xl font-medium">{userInfo.name}</h2>
					<h2 className="font-semibold text-gray-600">{userInfo.email}</h2>
					<h2 className="font-semibold text-gray-600">9182252115</h2>
				</div>
			</div>

			<div className='max-w-[800px]'>
				{addAddress ? (
					<AddressForm
						submitAction={handleAddAddress}
						cancelAction={toggleAddAddress}
					/>
				) : (
					<button
						onClick={toggleAddAddress}
						className='block text-sm ml-auto bg-indigo-600 text-white px-4 py-2 rounded-[4px]'
					>
						Add Address
					</button>
				)}
			</div>


			{userInfo.addresses?.map((address, index) => {
				return (
					<div
						key={index}
						className='relative max-w-[800px] my-4 px-4 py-2 border border-gray-400 rounded-lg'
					>
						<h2 className='text-xl font-semibold mb-6'>Address</h2>
						<div className='absolute right-2 top-[10px] flex items-center gap-[10px]'>
							<button>
								<img src='/edit.svg' alt="Edit" />
							</button>
							<button
								onClick={() => handleDelete(index)}
							>
								<img src='/trash.svg' alt="Delete" />
							</button>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 *:space-y-[2px]">
							<div>
								<p className="text-gray-700 font-medium">State</p>
								<p className="font-semibold text-gray-900">{address.state}</p>
							</div>
							<div>
								<p className="text-gray-700 font-medium">City</p>
								<p className="font-semibold text-gray-900">{address.city}</p>
							</div>
							<div>
								<p className="text-gray-700 font-medium">Street</p>
								<p className="font-semibold text-gray-900">{address.street}</p>
							</div>
							<div>
								<p className="text-gray-700 font-medium">Pincode</p>
								<p className="font-semibold text-gray-900">{address.pinCode}</p>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	);
}



export default UserProfile;