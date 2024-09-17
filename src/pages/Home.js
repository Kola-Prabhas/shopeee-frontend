// import { useEffect } from 'react';
// import { fetchItemsByUserIdAsync } from '../features/cart/cartSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectUser } from '../features/auth/authSlice';
// import { fetchOrdersByUserIdAsync, fetchUserInfoAsync } from "../features/user/userSlice";
import ProductList from "../features/product-list/components/productList";



export default function Home() {
	// const user = useSelector(selectUser);
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(fetchUserInfoAsync());
	// 	dispatch(fetchOrdersByUserIdAsync());
	// 	dispatch(fetchItemsByUserIdAsync());
	// }, [dispatch, user]);

	return (
		<ProductList />
	)
}