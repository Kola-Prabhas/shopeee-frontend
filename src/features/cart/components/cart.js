import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { deleteItemFromCartAsync, selectItems, updateItemAsync } from '../cartSlice';
import { getDiscountprice } from '../../../services/common';


export default function Cart() {
	const [open, setOpen] = useState(true);
	const dispatch = useDispatch();


	const items = useSelector(selectItems);
	const totalItems = items.reduce((total, current) => total + current.quantity, 0);
	const totalPrice = items.reduce((total, current) => total + current.product.price * current.quantity, 0);
	const totalDiscountPrice = items.reduce((total, current) => total + getDiscountprice(current.product.price * current.quantity, current.product.discountPercentage), 0)

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


	return (
		<div className="mx-auto mt-12 max-w-5xl px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
			{
				items.length === 0 && <Navigate to='/' replace={true}></Navigate>
			}
			<h1 className="text-4xl mb-4 font-bold tracking-tight text-gray-900 text-center">Cart</h1>


			<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
				<div className="flow-root">
					<ul className="-my-6 divide-y divide-gray-200">
						{items.map((item) => {
							return (
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
												<div>
													<p className="ml-4 line-through text-gray-400">${item.product.price * item.quantity}</p>
													<p className="ml-4">${getDiscountprice(item.product.price * item.quantity, item.product.discountPercentage)}</p>
												</div>
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
							)
						})}
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
					<div>
						<p className='text-gray-400 line-through'>$ {totalPrice}</p>
						<p>{totalDiscountPrice}</p>
					</div>
				</div>
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
  );
}
