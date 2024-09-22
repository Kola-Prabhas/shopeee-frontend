// import { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ThreeDots } from 'react-loader-spinner'

import { selectCartItems, selectCartItemsStatus } from '../cartSlice';

import CartItem from './cartItem';
import CartTotalStats from './cartTotalStats';


export default function Cart() {
	const items = useSelector(selectCartItems);

	const cartItemsStatus = useSelector(selectCartItemsStatus);

	const totalItems = items.length;
	const totalPrice = items.reduce((total, current) => total + current.product.price * current.quantity, 0);
	const totalDiscountPrice = items.reduce((total, current) => total + current.product.discountPrice.toFixed(2) * current.quantity, 0)


	return (
		cartItemsStatus === 'loading' && items.length === 0 ? (
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
			</div>) : (
			<div className="min-h-[70vh] mx-auto max-w-5xl p-4 sm:p-6 lg:px-8 bg-[#f9f9f9]">
				<h1 className="text-4xl mb-4 font-bold tracking-tight text-gray-900 text-center">Cart</h1>
				{items.length > 0 && <>
					<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
						<div className="flow-root">
							<ul className="-my-6 divide-y divide-gray-200">
								{items?.map((item) => {
									return <CartItem key={item.product.id} item={item} />
								})}
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
						<Link to='/checkout'>
							<div className="mt-6 mx-auto max-w-[400px]">
								<span className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
									Checkout
								</span>
							</div>
						</Link>
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
				</>}
					{items.length === 0 && <h3 className="mt-20 text-xl font-semibold tracking-tight text-indigo-500 text-center">
						Your cart is empty. Add items to cart to view them here
					</h3>}
			</div>
		)
	);
}
