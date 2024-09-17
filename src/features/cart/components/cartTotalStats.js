function CartTotalStats({totalItems, totalDiscountPrice, totalPrice}) {
	return (
		<>
			<div className="flex justify-between mx-2 my-2 text-base font-medium text-gray-900">
				<p>Total Items in cart</p>
				<p>{totalItems} item(s)</p>
			</div>
			<div className="flex justify-between mx-2 my-2 text-base font-medium text-gray-900">
				<p>Subtotal</p>
				<div>
					<p className='text-gray-400 line-through'>${totalPrice}</p>
					<p>${totalDiscountPrice}</p>
				</div>
			</div>
		</>
	);
}

export default CartTotalStats;