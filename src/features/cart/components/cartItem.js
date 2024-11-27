import { useDispatch, useSelector } from 'react-redux';
import { deleteItemFromCartAsync } from '../cartSlice'
import CartQuantityChange from "./cartItemQuantityChange";
import { ThreeDots } from 'react-loader-spinner'
// import { selectCartItemsStatus } from '../../cart/cartSlice';

import Modal from '../../../components/Modal';
import { useState } from 'react';



function CartItem({ item }) {
	const dispatch = useDispatch();

	const [open, setOpen] = useState(false);

	// const cartItemsStatus = useSelector(selectCartItemsStatus);


	function handleDelete(itemId) {
		dispatch(deleteItemFromCartAsync(itemId));
	}


	return (
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
							<p className="ml-4 line-through text-gray-400">${(item.product.price.toFixed(2) * item.quantity).toFixed(2)}</p>
							<p className="ml-4">${(item.product.discountPrice * item.quantity).toFixed(2)}</p>
						</div>
					</div>
				</div>
				<div className={`flex flex-1 items-center justify-between text-sm`}>
					{/* {cartItemsStatus === 'loading' ? (
						<div className='ml-10'>
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
						<> */}
							<Modal
								open={open}
								setOpen={setOpen}
								title={`Remove ${item.product.title}`}
								message='Are you sure? Do you want to remove this item from cart?'
								cancelOption='Cancel'
								confirmOption='Remove'
								// cancelAction={() => setOpen(false)}
								confirmAction={() => handleDelete(item.id)}
							/>
							<CartQuantityChange
								setOpen={setOpen}
								itemId={item.id}
								quantity={item.quantity}
								stock={item.product.stock}
							/>

							<div className="flex">
								<button
									type="button"
									className="font-medium text-indigo-600 hover:text-indigo-500"
									onClick={() => setOpen(true)}
								>
									Remove
								</button>
							</div>
						{/* </>)} */}
				</div>
			</div>
		</li>
	);
}

export default CartItem;