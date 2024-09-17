import Navbar from "../components/Navbar";
import AdminProductList from "../features/admin/components/AdminProductList";


import { useEffect } from 'react';
import { fetchItemsByUserIdAsync } from '../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { fetchOrdersByUserIdAsync, fetchUserInfoAsync } from "../features/user/userSlice";



export default function AdminHome() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchItemsByUserIdAsync(user.id));
		dispatch(fetchOrdersByUserIdAsync(user.id));
		dispatch(fetchUserInfoAsync(user.id))
	}, [dispatch, user]);


	return (
		<AdminProductList />
	)
}