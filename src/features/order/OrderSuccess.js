import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentOrder } from '../order/orderSlice';
import { selectCartItems } from "../cart/cartSlice";
import { selectUserInfo } from "../user/userSlice";


export default function OrderSuccess() {
	const params = useParams();
	const user = useSelector(selectUserInfo);
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	useEffect(() => {
		dispatch(resetCurrentOrder());
	}, [user, dispatch, cartItems]);


	return (
		<>
			{!params.id && <Navigate to="/" replace={true}></Navigate>}
			
			<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<p className="text-base font-semibold text-indigo-600">Order placed successfully!</p>
					<h1 className="mt-4 sm:text-3xl font-bold tracking-tight text-gray-900">order Id #{params.id}</h1>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link
							to="/user-orders"
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							My Orders
						</Link>
					</div>
				</div>
			</main>
		</>
	)
};