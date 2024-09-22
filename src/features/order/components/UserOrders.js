import { useSelector } from 'react-redux';
import { selectUserOrders } from '../../user/userSlice';
import { Link } from 'react-router-dom';
import { selectOrdersStatus} from '../orderSlice';

import { ThreeDots } from 'react-loader-spinner'


export default function UserOrders() {
	const orders = useSelector(selectUserOrders);
	const ordersStatus = useSelector(selectOrdersStatus);

	console.log('orders ', orders);

	return (
		<>
			<h1 className="text-4xl my-4 font-bold tracking-tight text-gray-800 text-center">Your Orders</h1>
			{ordersStatus === 'loading' ? (
				<div className='min-h-[100vh] mt-[-100px] flex items-center justify-center'>
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
			): 
				(orders?.map(order => {
				return (
					<div className="mx-auto my-12 max-w-5xl px-4 py-8 sm:px-6 lg:px-8 bg-[#f9f9f9]">
						<h3 className="text-2xl mb-4 font-bold tracking-tight text-indigo-500 text-center">Order: #{order.id}</h3>
						<h6 className="text-xl mb-4 tracking-tight text-center font-semibold leading-7 text-indigo-600">Status: {order.status}</h6>
						<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
							<div className="flow-root">
								<ul className="-my-6 divide-y divide-gray-200">
									{order.items.map((item) => (
										<li key={item.id} className="flex py-6">
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
														<div>
															<p className="ml-4 line-through text-gray-400">${(item.product.price * item.quantity).toFixed(2)}</p>
															<p className="ml-4">${(item.product.discountPrice * item.quantity).toFixed(2)}</p>
														</div>
													</div>
													{/* <p className="mt-1 text-sm text-gray-500">red</p> */}
												</div>
												<div className="text-gray-500">
													<p className="text-sm mr-5 text-left font-medium leading-6">
														Qty: {item.quantity}
													</p>
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
								<p>{order.totalItems} items</p>
							</div>
							<div className="flex justify-between mx-2 mt-2 mb-4 text-base font-medium text-gray-900">
								<p>Subtotal</p>
								<div>
									<p className='line-through text-gray-400'>${order.totalPrice}</p>
									<p>${order.totalDiscountPrice}</p>
								</div>
							</div>
							<div className="border-b px-2 sm:px-6 md:px-8 xl:px-16 border-gray-900/10 pb-12">
								<h2 className="text-xl text-center font-semibold leading-7 text-indigo-600">Shipping Details</h2>

								<div className="flex items-center justify-between py-5">
									<div className='space-y-2'>
										<p className="text-base font-semibold leading-6 text-gray-900">Name: {order.selectedAddress.name}</p>
										<p className="text-base leading-6 font-semibold text-gray-900">Phone: {order.selectedAddress.phone}</p>
										<p className="text-base leading-6 font-semibold text-gray-900">Payment: {order.selectedPaymentMethod}</p>
									</div>
									<div className='space-y-2'>
										<p className="mt-1 truncate font-semibold text-base leading-5 text-gray-900">Street: {order.selectedAddress.street}</p>
										<p className="mt-1 truncate font-semibold text-base leading-5 text-gray-900">Pincode: {order.selectedAddress.pinCode}</p>
										<p className="text-base leading-6 font-semibold text-gray-900">City: {order.selectedAddress.city}</p>

									</div>
								</div>
							</div>

							<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
								<p>
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
				)}))
			}
			{orders.length === 0 && <h3 className="mt-20 mb-[50vh] text-2xl font-semibold tracking-tight text-indigo-500 text-center">You don't have any orders. Order something to see them here</h3>}
		</>
	);
}
