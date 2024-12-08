import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';

import {
	fetchProductByIdAsync,
	selectProductById,
	selectProductStatus
} from '../productSlice';

import {
	addToCartAsync,
	selectCartItems,
	deleteItemFromCartAsync,
	selectAddingCartItems,
	selectUpdatingCartItems,
	selectDeletingCartItems
} from '../../cart/cartSlice';

import { getUserRole } from '../../auth/utils/getUserRole';
import CartQuantityChange from '../../cart/components/cartItemQuantityChange';

import Modal from '../../../components/Modal';


function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}


export default function ProductDetails() {
	const [open, setOpen] = useState(false);

	const userRole = getUserRole();

	const product = useSelector(selectProductById);
	const productStatus = useSelector(selectProductStatus);

	const items = useSelector(selectCartItems);
	const addingCartItems = useSelector(selectAddingCartItems);
	const updatingCartItems = useSelector(selectUpdatingCartItems);
	const deletingCartItems = useSelector(selectDeletingCartItems);


	const itemInCart = items.find(item => item.product?.id === product?.id);

	const isAdding = addingCartItems.includes(product?.id)
	const isUpdating = updatingCartItems.includes(itemInCart?.id);
	const isDeleting = deletingCartItems.includes(itemInCart?.id);

	const isProcessing = isAdding || isUpdating || isDeleting;

	const dispatch = useDispatch();
	const params = useParams();

	useEffect(() => {
		dispatch(fetchProductByIdAsync(params.id))

	}, [dispatch, params.id])


	function handleCartClick(e, product) {
		e.preventDefault();

		if (!itemInCart) {
			dispatch(addToCartAsync({
				product: product.id,
				quantity: 1,
			}));
		}
	}


	function handleDelete(itemId) {
		dispatch(deleteItemFromCartAsync(itemId));
	}


	return (
		productStatus === 'loading' ? (
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
			product && <div className="pt-6 bg-white">
				{/* Image gallery */}
				<div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
					<div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
						<img
							src={product.images[3]}
							alt={product.title}
							className="h-full w-full object-cover object-center"
						/>
					</div>
					<div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
						<div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
							<img
								src={product.images[1]}
								alt={product.title}
								className="h-full w-full object-cover object-center"
							/>
						</div>
						<div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
							<img
								src={product.images[2]}
								alt={product.title}
								className="h-full w-full object-cover object-center"
							/>
						</div>
					</div>
					<div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
						<img
							src={product.images[0]}
							alt={product.title}
							className="h-full w-full object-cover object-center"
						/>
					</div>
				</div>

				{/* Product info */}
				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
					</div>

					{/* Options */}
					<div className="mt-4 lg:row-span-3 lg:mt-0">
						<h2 className="sr-only">Product information</h2>
						<p className="tracking-tight text-gray-400 line-through">${product.price}</p>
						<p className="text-3xl tracking-tight text-gray-900">${product.discountPrice.toFixed(2)}</p>

						{/* Reviews */}
						<div className="mt-6">
							<h3 className="sr-only">Reviews</h3>
							<div className="flex items-center">
								<div className="flex items-center">
									{Array.from({ length: product.rating }).map((rating) => (
										<StarIcon
											key={rating}
											className={classNames(
												product.rating > rating ? 'text-gray-900' : 'text-gray-200',
												'h-5 w-5 flex-shrink-0'
											)}
											aria-hidden="true"
										/>
									))}
								</div>
								<p className="sr-only">{product.rating} out of 5 stars</p>

							</div>
						</div>

						{userRole !== 'admin' && <form className="mt-10">
							{!itemInCart && !isProcessing && (
								<button
									type="submit"
									className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									onClick={(e) => handleCartClick(e, product)}
								>
									Add to Cart
								</button>
							)}

							{isProcessing && <div className='flex items-center justify-center'>
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
							</div>}

							{itemInCart && !isProcessing && <div className='flex items-center justify-center'>
								<>
									<Modal
										open={open}
										setOpen={setOpen}
										title={`Remove ${product.title}!`}
										message='Are you sure? Do you want to remove this item from cart?'
										cancelOption='Cancel'
										confirmOption='Remove'
										// cancelAction={() => setItemId(-1)}
										confirmAction={() => handleDelete(itemInCart.id)}
									/>
									<CartQuantityChange
										setOpen={setOpen}
										itemId={itemInCart.id}
										quantity={itemInCart.quantity}
										stock={product.stock}
									/>
									<Link
										to='/cart'
										className="w-full flex items-center justify-center rounded-md border border-indigo-600 text-indigo-600 px-8 py-3 text-base font-medium bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										View Cart
									</Link>
								</>
							</div>}
						</form>}
					</div>

					<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
						{/* Description and details */}
						<div>
							<h3 className="sr-only">Description</h3>

							<div className="space-y-6">
								<p className="text-base text-gray-900">{product.description}</p>
							</div>
						</div>

						<div className="mt-10">
							<h2 className="font-bold">Details</h2>
							<ul className='list-disc mx-6'>
								<li className='text-gray-600 font-semibold'>
									Brand: <span className='text-blue-600 font-medium'>{product.brand}</span>
								</li>
								<li className='text-gray-600 font-semibold'>
									Warranty: <span className='text-blue-600 font-medium'>{product.warrantyInformation}</span>
								</li>
								<li className='text-gray-600 font-semibold'>
									Stock: <span className='text-blue-600 font-medium'>{product.stock}</span>
								</li>
								<li className='text-gray-600 font-semibold'>
									Return Policy: <span className='text-blue-600 font-medium'>{product.returnPolicy}</span>
								</li>
								<li className='text-gray-600 font-semibold'>
									Shipping Information: <span className='text-blue-600 font-medium'>{product.shippingInformation}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		))
}
