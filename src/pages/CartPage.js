import { useSelector } from "react-redux";
import Cart from "../features/cart/components/cart";
import { selectItems } from "../features/cart/cartSlice";
import Navbar from "../features/navbar";


function CartPage() {
	const items = useSelector(selectItems);

	console.log(items);

	return ( 
		<>
			<Navbar>
			  <Cart />
			</Navbar>
		</>
	);
}

export default CartPage;