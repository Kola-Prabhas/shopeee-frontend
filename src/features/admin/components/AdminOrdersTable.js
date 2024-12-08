import { useSelector } from "react-redux";
import { selectOrders, selectUpdateOrderStatus } from '../../order/orderSlice';
import { PencilIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";



export default function AdminOrdersTable({
	editableOrderId,
	sortOptions,
	handleSort,
	handleEdit,
	handleUpdate,
}) {
	const orders = useSelector(selectOrders);
	const updateOrderStatus = useSelector(selectUpdateOrderStatus);

	function getColorByOrderStatus(status) {
		switch (status) {
			case "pending":
				return 'bg-purple-200 text-purple-600';
			case "dispatched":
				return 'bg-yellow-200 text-yellow-600';
			case "delivered":
				return 'bg-green-200 text-green-600';
			case "cancelled":
				return 'bg-red-200 text-red-600';
			default:
				return 'bg-purple-200 text-purple-600';
		}
	}


	return (
		<table className="relative min-w-full table-auto">
			{updateOrderStatus === 'loading' && <div className='absolute inset-0 bg-gray-100/10 z-10 cursor-not-allowed' />}
			<thead>
				<tr className="bg-gray-200 text-gray-600 uppercase text-xs leading-normal">
					<th className="py-3 px-1 text-left">
						Order
					</th>
					<th className="py-3 px-1 text-left">
						Items
					</th>
					<th
						className="py-3 px-1 text-center flex items-center gap-2 cursor-pointer"
						onClick={() => handleSort('totalPrice')}
					>
						Total Amount
						{sortOptions._order === 'desc' && sortOptions._sort === 'totalPrice' && <ArrowUpIcon className="w-4 h-4" />}
						{sortOptions._order === 'asc' && sortOptions._sort === 'totalPrice' && <ArrowDownIcon className="w-4 h-4" />}
					</th>
					<th className="py-3 px-1 text-center">
						Shipping Address
					</th>
					<th className="py-3 px-1 text-center">
						Status
					</th>
					<th className="py-3 px-1 text-center">
						Payment
					</th>
					<th
						className="py-3 px-1 text-center cursor-pointer"
						onClick={() => handleSort('createdAt')}
					>
						<div className='flex justify-center'>
							<p>Order Time</p>
							{sortOptions._order === 'desc' && sortOptions._sort === 'createdAt' && <ArrowUpIcon className="w-4 h-4" />}
							{sortOptions._order === 'asc' && sortOptions._sort === 'createdAt' && <ArrowDownIcon className="w-4 h-4" />}
						</div>
					</th>
					<th
						className="py-3 px-1 text-center cursor-pointer"
						onClick={() => handleSort('updatedAt')}
					>
						<div className='flex justify-center'>
							<p>Last Updated</p>
							{sortOptions._order === 'desc' && sortOptions._sort === 'updatedAt' && <ArrowUpIcon className="w-4 h-4" />}
							{sortOptions._order === 'asc' && sortOptions._sort === 'updatedAt' && <ArrowDownIcon className="w-4 h-4" />}
						</div>
					</th>
					<th className="py-3 px-1 text-center">
						Edit
					</th>

				</tr>
			</thead>
			<tbody className="text-gray-600 text-xs font-semibold">
				{orders?.map(order => {
					const address = order.selectedAddress;

					return (
						<tr
							key={order.id}
							className="border-b border-gray-200 hover:bg-gray-100"
						>
							<td className="py-3 px-1 text-left whitespace-nowrap">
								<div className="flex items-center">
									#{order.id}
								</div>
							</td>
							<td className="py-3 px-1 text-left">
								{order.items.map(item => {
									return (
										<div className="flex items-center my-2">
											<div className="mr-2">
												<img
													className="w-6 h-6 rounded-full"
													src={item.product.thumbnail}
													alt='item'
												/>
											</div>
											<span>
												<span className='font-bold'>{item.product.title}</span> ${item.product.price} x {item.quantity}
											</span>
										</div>
									)
								})}
							</td>
							<td className="py-3 px-1 text-center">
								<div className="flex items-center justify-center">
									${order.totalPrice.toFixed(2)}
								</div>
							</td>
							<td className="py-3 px-1 text-center space-y-1">
								{address && typeof address !== 'string' ? (
									<>
										<p>{address.state}</p>
										<p>{address.city}</p>
										<p>{address.street}</p>
										<p>{address.pinCode}</p>
									</>
								) : (
									<p>N/A</p>
								)}
							</td>
							<td className="py-3 px-1 text-center">
								{editableOrderId === order.id ? (
									<select
										className="border-gray-300 rounded-2xl text-xs"
										value={order.status}
										onChange={(e) => handleUpdate(e, order)}
									>
										<option value="pending">Pending</option>
										<option value="dispatched">Dispatched</option>
										<option value="delivered">Delivered</option>
										<option value="cancelled">Cancelled</option>
									</select>
								) : (
									<span className={`${getColorByOrderStatus(order.status)} py-1 px-3 rounded-full text-xs`}>
										{order.status}
									</span>
								)}
							</td>
							<td className="py-3 px-1 text-center">
								<div className="flex items-center justify-center">
									{order.paymentStatus}
								</div>
							</td>
							<td className="py-3 px-1 text-center">
								<div className="flex items-center justify-center">
									{new Date(order.createdAt).toLocaleString()}
								</div>
							</td>
							<td className="py-3 px-1 text-center">
								<div className="flex items-center justify-center">
									{new Date(order.updatedAt).toLocaleString()}
								</div>
							</td>
							<td className="py-3 px-1 text-center">
								<div className="flex item-center justify-center *:cursor-pointer">
									<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
										<PencilIcon onClick={() => handleEdit(order)} className="size-[20px]"></PencilIcon>
									</div>
								</div>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}