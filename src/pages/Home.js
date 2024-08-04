import Navbar from "../features/navbar";
import ProductList from "../features/product-list/components/productList";


import { useEffect } from 'react';
import { fetchItemsByUserIdAsync } from '../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { fetchOrdersByUserIdAsync, fetchUserInfoAsync } from "../features/user/userSlice";



export default function Home() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserInfoAsync());
		dispatch(fetchOrdersByUserIdAsync(user.id));
		dispatch(fetchItemsByUserIdAsync());

	}, [dispatch, user]);

	console.log('user in home ', user);

	return (		
		<>
			<Navbar>
				<ProductList />
			</Navbar>
		</>		
	)
}