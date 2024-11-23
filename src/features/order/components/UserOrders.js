import { useGetUserOrdersQuery } from '../orderQueryApi';
import Order from './Order';

import { ThreeDots } from 'react-loader-spinner'


export default function UserOrders() {
	const { data: orders, isLoading } = useGetUserOrdersQuery();


	return (
		<>
			<h1 className="text-4xl my-4 font-bold tracking-tight text-gray-800 text-center">My Orders</h1>
			{isLoading? (
				<div className='min-h-[100vh] mt-[-100px] flex items-center justify-center'>
					<ThreeDots
						visible={true}
						height="80"
						width="80"
						color="#4F46E5"
						radius="10"
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				</div>
			) : (
				orders?.map(order => {
					return <Order key={order.id} order={order} />
				}))
			}
			{orders?.length === 0 && <h3 className="mt-20 mb-[50vh] text-2xl font-semibold tracking-tight text-indigo-500 text-center">You don't have any orders. Order something to see them here</h3>}
		</>
	);
}
