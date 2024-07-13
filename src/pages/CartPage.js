// import { useSelector } from "react-redux";
import Cart from "../features/cart/components/cart";
// import { selectItems } from "../features/cart/cartSlice";

function CartPage() {
	// const items = useSelector(selectItems);

	// console.log(items);

	return ( 
		<div>
			<Cart />
		</div>
	);
}

export default CartPage;