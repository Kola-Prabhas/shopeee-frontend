import { useDispatch} from 'react-redux';
import { deleteItemFromCartAsync, updateItemAsync } from '../cartSlice';



function CartItem({ item }) {
	const dispatch = useDispatch();

	function handleQuantityChange(e, item) {
		dispatch(updateItemAsync({
			id: item.id,
			quantity: +e.target.value
		}));
	}

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
							<p className="ml-4">${item.discountPrice?.toFixed(2)}</p>
						</div>
					</div>
					{/* <p className="mt-1 text-sm text-gray-500">red</p> */}
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
	 );
}

export default CartItem;