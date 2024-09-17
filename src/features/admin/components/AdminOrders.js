import { useSelector, useDispatch } from "react-redux";
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from "../../order/orderSlice";
import { useEffect, useState } from "react";
import { EyeIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

import { ITEMS_PER_PAGE } from '../../../app/constants';
import Pagination from "../../../components/Pagination";


function AdminOrders() {
	const [page, setPage] = useState(1);
	const [editableOrderId, setEditableOrderId] = useState(-1);
	const [sortOptions, setSortOptions] = useState({ _sort: '', _order: 'asc' });
	const dispatch = useDispatch();
	const orders = useSelector(selectOrders);
	const totalOrders = useSelector(selectTotalOrders);





	console.log('orders', orders);
	// console.log('page', page);



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

		console.log('update ', update);

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



	return (
		<div className="overflow-x-auto">
			<div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
				<div className="w-full max-w-7xl">
					<div className="bg-white shadow-md rounded my-6">
						<table className="min-w-max w-full table-auto">
							<thead>
								<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
									<th className="py-3 px-6 text-left">
										Order
									</th>
									<th className="py-3 px-6 text-left">
										Items
									</th>
									<th
										className="py-3 px-6 text-center flex  gap-2"
										onClick={() => handleSort('totalPrice')}
									>
										Total Amount
										{sortOptions._order === 'asc' && <ArrowUpIcon className="w-4 h-4"></ArrowUpIcon>}
										{sortOptions._order === 'desc' && <ArrowDownIcon className="w-4 h-4"></ArrowDownIcon>}
									</th>
									<th className="py-3 px-6 text-center">
										Shipping Address
									</th>
									<th className="py-3 px-6 text-center">
										Status
									</th>
									<th className="py-3 px-6 text-center">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="text-gray-600 text-sm font-light">
								{orders.map(order => {
									const address = order.selectedAddress;

									return (
										<tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
											<td className="py-3 px-6 text-left whitespace-nowrap">
												<div className="flex items-center">
													<span className="font-medium">
														#{order.id}
													</span>
												</div>
											</td>
											<td className="py-3 px-6 text-left">
												{
													order.items.map(item => {
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
													})
												}

											</td>
											<td className="py-3 px-6 text-center">
												<div className="flex items-center justify-center">
													${order.totalPrice}
												</div>
											</td>
											<td className="py-3 px-6 text-center space-y-1">
												<div>{address.name} </div>
												<div>{address.street}</div>
												<div>{address.city}</div>
												<div>{address.state}</div>
												<div>{address.pinCode}</div>
												<div>{address.phone}</div>
												<div>{address.email}</div>
											</td>
											<td className="py-3 px-6 text-center">
												{editableOrderId === order.id ? (
													<select value={order.status}  onChange={(e) => handleUpdate(e, order)}>
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
											<td className="py-3 px-6 text-center">
												<div className="flex item-center justify-center *:cursor-pointer">
													<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
														<EyeIcon className="h-6 w-6"></EyeIcon>
													</div>
													<div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
														<PencilIcon onClick={() => handleEdit(order)} className="h-6 w-6"></PencilIcon>
													</div>
												</div>
											</td>
										</tr>
									)
								})
								}

							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
				<Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders} />
			</div>
		</div>


	);
}

export default AdminOrders;