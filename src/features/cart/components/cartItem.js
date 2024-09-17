import { useDispatch } from 'react-redux';
import { deleteItemFromCartAsync } from '../cartSlice'
import CartQuantityChange from "./cartItemQuantityChange";

function CartItem({ item }) {
	const dispatch = useDispatch();

	function handleDelete(itemId) {
		dispatch(deleteItemFromCartAsync(itemId));
	}
	

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
							<p className="ml-4">${item.product.discountPrice?.toFixed(2) * item.quantity}</p>
						</div>
					</div>
				</div>
				<div className="flex flex-1 items-end justify-between text-sm">
					<CartQuantityChange itemId={item.id}  quantity={item.quantity}/>

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
	 );
}

export default CartItem;