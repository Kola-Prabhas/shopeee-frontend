import { useDispatch } from 'react-redux';
import { deleteItemFromCartAsync, updateItemAsync } from '../cartSlice'


function CartQuantityChange({itemId, quantity }) {
	const dispatch = useDispatch();


	function handleQuantityChange(quantity, itemId) {
		dispatch(updateItemAsync({
			id: itemId,
			quantity: quantity
		}));
	}

	function handleDelete(itemId) {
		dispatch(deleteItemFromCartAsync(itemId));
	}

	return ( 
		<div className="flex items-center gap-4 px-4 py-2 bg-[#FEFEFE] rounded-xl">
			<button
				type='button'
				onClick={() => {
					if (quantity === 1) {
						handleDelete(itemId)
					} else {
						handleQuantityChange(quantity - 1, itemId)
					}
				}}
				className='size-[30px] flex items-center justify-center active:scale-90 duration-900 hover:bg-gray-100 rounded'
			>
				<img src='/minus-icon.svg' alt='Minus Icon' className='size-[24px]' />
			</button>
			<p className='text-gray-400 text-lg'>{quantity}</p>
			<button
				type='button'
				onClick={() => handleQuantityChange(quantity + 1, itemId)}
				className='size-[30px] flex items-center justify-center active:scale-90 duration-900 hover:bg-gray-100 rounded'
			>
				<img src='/plus-icon.svg' alt='Plus Icon' className='size-[20px]' />
			</button>
		</div>
	 );
}

export default CartQuantityChange;