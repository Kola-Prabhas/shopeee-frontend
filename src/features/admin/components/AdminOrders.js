import { useSelector, useDispatch } from "react-redux";
import { fetchAllOrdersAsync, selectOrders, selectOrdersStatus, selectTotalOrders, updateOrderAsync } from "../../order/orderSlice";
import { useEffect, useState } from "react";
import { PencilIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { ThreeDots } from 'react-loader-spinner'
import { ITEMS_PER_PAGE } from '../../../app/constants';
import Pagination from "../../../components/Pagination";


function AdminOrders() {
	const [page, setPage] = useState(1);
	const [editableOrderId, setEditableOrderId] = useState(-1);
	const [sortOptions, setSortOptions] = useState({ _sort: '', _order: 'asc' });
	const dispatch = useDispatch();
	const orders = useSelector(selectOrders);
	const totalOrders = useSelector(selectTotalOrders);

	const ordersStatus = useSelector(selectOrdersStatus);

	console.log('orders ', orders);

	// const orders = []
	// const ordersStatus = 'loading';


	function handleEdit(order) {
		if (editableOrderId === order.id) {
			setEditableOrderId(-1);
			return;
		}

		setEditableOrderId(order.id);
	}


	function handleUpdate(e, order) {
		const update = {
			id: order.id,
			status: e.target.value
		};

		dispatch(updateOrderAsync(update));
		setEditableOrderId(-1);
	}


	function setColor(status) {
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

	const handlePage = (idx) => () => setPage(idx);


	function handleSort(id) {
		let _order;
		if (sortOptions._sort === id) {
			_order = sortOptions._order === 'asc' ? 'desc' : 'asc';
		} else {
			_order = 'asc';
		}

		const newSortOptions = {
			_sort: id,
			_order
		}

		setSortOptions(newSortOptions);
	}




	useEffect(() => {
		const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
		dispatch(fetchAllOrdersAsync({ pagination, sortOptions, admin: true }));

		console.log('Sort options', sortOptions);
	}, [dispatch, page, sortOptions])



	return ordersStatus === 'loading' && orders.length === 0 ? (
		<div className='min-h-[100vh] flex items-center justify-center'>
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
	) : (orders.length > 0 ? (
		<div className="px-4 bg-gray-100 font-sans">
			<div className="bg-white shadow-md rounded my-6">
				<table className="min-w-full table-auto">
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
								Order Status
							</th>
							<th className="py-3 px-1 text-center">
								Payment Method
							</th>
							<th
								className="py-3 px-1 text-center flex gap-2 cursor-pointer"
								onClick={() => handleSort('createdAt')}
							>
								Order Time
								{sortOptions._order === 'desc' && sortOptions._sort === 'createdAt' && <ArrowUpIcon className="w-4 h-4" />}
								{sortOptions._order === 'asc' && sortOptions._sort === 'createdAt' && <ArrowDownIcon className="w-4 h-4" />}
							</th>
							{/* <th
								className="py-3 px-1 text-center border border-black flex"
								onClick={() => handleSort('updatedAt')}
							>
								Last Updated
								{sortOptions._order === 'desc' && <ArrowUpIcon className="w-4 h-4" />}
								{sortOptions._order === 'asc' && <ArrowDownIcon className="w-4 h-4" />}
							</th> */}
							<th className="py-3 px-1 text-center">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="text-gray-600 text-xs font-light">
						{orders.map(order => {
							const address = order.selectedAddress;

							return (
								<tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
									<td className="py-3 px-1 text-left whitespace-nowrap">
										<div className="flex items-center">
											<span className="font-medium">
												#{order.id}
											</span>
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
														<strong>{item.product.title}</strong> ${item.product.price} x {item.quantity}
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
										<div>{address.name} </div>
										<div>{address.street}</div>
										<div>{address.city}</div>
										<div>{address.state}</div>
										<div>{address.pinCode}</div>
										<div>{address.phone}</div>
										<div>{address.email}</div>
									</td>
									<td className="py-3 px-1 text-center">
										{editableOrderId === order.id ? (
											<select
												className="border-gray-300 rounded-2xl"
												value={order.status}
												onChange={(e) => handleUpdate(e, order)}
											>
												<option value="pending">Pending</option>
												<option value="dispatched">Dispatched</option>
												<option value="delivered">Delivered</option>
												<option value="cancelled">Cancelled</option>
											</select>
										) : (
											<span className={`${setColor(order.status)} py-1 px-3 rounded-full text-xs`}>
												{order.status}
											</span>
										)}
									</td>
									<td className="py-3 px-1 text-center">
										<div className="flex items-center justify-center">
											{order.selectedPaymentMethod}
										</div>
									</td>
									<td className="py-3 px-1 text-center">
										<div className="flex items-center justify-center">
											{new Date(order.createdAt).toLocaleString()}
										</div>
									</td>
									{/* <td className="py-3 px-1 text-center">
										<div className="flex items-center justify-center">
											{new Date(order.updatedAt).toLocaleString()}
										</div>
									</td> */}
									<td className="py-3 px-1 text-center">
										{ordersStatus === 'loading' ? (
											<ThreeDots
												visible={true}
												height="40"
												width="40"
												color="#4F46E5"
												radius="8"
												ariaLabel="three-dots-loading"
												wrapperStyle={{}}
												wrapperClass=""
											/>
										) : (
											<div className="flex item-center justify-center *:cursor-pointer">
												<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
													<PencilIcon onClick={() => handleEdit(order)} className="size-[20px]"></PencilIcon>
												</div>
											</div>
										)}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
				<Pagination
					page={page}
					setPage={setPage}
					handlePage={handlePage}
					totalItems={totalOrders}
				/>
			</div>
		</div>
	) : (
		<div className='min-h-[50vh] flex items-center justify-center'>
			<p className="text-xl text-indigo-500 font-bold">No Orders Placed</p>
		</div>
	))
}

export default AdminOrders;