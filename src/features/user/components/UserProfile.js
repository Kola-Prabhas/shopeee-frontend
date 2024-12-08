import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectUserAddresses,
	selectDeletingAddresses,
	selectUpdatingAddresses,
	selectUserAddressesStatus,
	fetchUserAddressesAsync,
	addUserAddressAsync,
	deleteUserAddressAsync,
	updateUserAddressAsync,
} from "../addressSlice";
import AddressForm from "./AddressForm";
import UserAddress from "./UserAddress";

import { ThreeDots } from 'react-loader-spinner';

import { useGetUserInfoQuery } from '../userQueryAPI';




function UserProfile() {
	const [editId, setEditId] = useState(null);
	const [addAddress, setAddAddress] = useState(false);

	const {
		data: user,
	} = useGetUserInfoQuery();

	const userAddresses = useSelector(selectUserAddresses);
	const userAddressesStatus = useSelector(selectUserAddressesStatus);
	const deletingAddresses = useSelector(selectDeletingAddresses);
	const updatingAddresses = useSelector(selectUpdatingAddresses);

	const dispatch = useDispatch();



	function handleDelete(addressId) {
		dispatch(deleteUserAddressAsync(addressId));
	}

	function handleAddAddress(address) {
		dispatch(addUserAddressAsync(address));
	}


	function handleEditAddress(id, address) {
		dispatch(updateUserAddressAsync({ id, address }));
	}


	function handleEdit(id) {
		setEditId(id);
	}

	function toggleAddAddress() {
		setAddAddress(!addAddress);
	}

	useEffect(() => {
		if (userAddresses?.length === 0) {
			dispatch(fetchUserAddressesAsync());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch])


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
					<h2 className="text-xl font-medium">{user?.name}</h2>
					<h2 className="font-semibold text-gray-600">{user?.email}</h2>
					<h2 className="font-semibold text-gray-600">{user?.phone}</h2>
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
						className='block w-[150px] text-sm ml-auto bg-indigo-600 text-white px-4 py-2 rounded-[4px]'
					>
						Add Address
					</button>
				)}
			</div>

			{userAddresses.length === 0 && !addAddress && userAddressesStatus !== 'loading' && <p className='max-w-[800px] my-1 text-center font-semibold'>
				No Added Addresses. Click the button to add Address
			</p>}


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
					{userAddresses?.map(address => {
						const addressId = address.id
						const isPending = deletingAddresses.includes(addressId) || updatingAddresses.includes(addressId);

						if (editId === addressId) {
							return (
								<AddressForm
									key={addressId}
									address={address}
									submitAction={(newAddress) => handleEditAddress(addressId, newAddress)}
									cancelAction={() => setEditId(null)}
								/>
							);
						}

						return (
							<UserAddress
								key={addressId}
								address={address}
								isPending={isPending}
								onEdit={() => handleEdit(addressId)}
								onDelete={() => handleDelete(addressId)}
							/>
						)
					})}

				</>
			)}
		</div>
	);
}



export default UserProfile;