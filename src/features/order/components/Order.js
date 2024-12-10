import { Link } from 'react-router-dom';
import ShippingDetails from './ShippingDetails';

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function Order({ order }) {
	const paid = order.paymentStatus === 'paid';

	return (
		<div className="mx-auto my-12 max-w-5xl px-4 py-8 sm:px-6 lg:px-8 bg-[#f9f9f9]">
			<h3 className="text-md sm:text-xl mb-1 font-bold text-[#333333]">Order ID: #{order.id}</h3>
			<h6 className="flex items-center gap-2 *:flex *:items-center *:gap-1 mb-1 font-semibold text-gray-900/50">
				<p>
					<span className='text-gray-900/80'>Delivery: </span>
					{capitalize(order.status)}
				</p>
			</h6>
			<h6 className="flex items-center justify-between gap-2 *:flex *:items-center *:gap-1 mb-4 font-semibold text-gray-900/50">
				<p>
					<span className='text-gray-900/80'>Payment: </span>
					{capitalize(order.paymentStatus)}
				</p>
				{!paid && <Link
					to="/stripe-checkout"
					state={{
						orderId: order.id,
						totalPrice: order.totalDiscountPrice
					}}
					className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Pay Now
				</Link>}
			</h6>


			<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
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

			<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
				<div className="flex items-center justify-between">
					<ShippingDetails address={order.selectedAddress} />
					<div className='text-base font-medium text-gray-900'>
						<p>{order.totalItems} items</p>
						<div className='text-right'>
							<p className='line-through text-gray-400'>${order.totalPrice.toFixed(2)}</p>
							<p>${order.totalDiscountPrice.toFixed(2)}</p>
						</div>
					</div>
				</div>

				<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
					<p>
						<Link
							to='/'
						>
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
		</div >
	)
}