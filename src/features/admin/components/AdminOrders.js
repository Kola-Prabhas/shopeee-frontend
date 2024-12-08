import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	fetchAllOrdersAsync,
	selectTotalOrders,
	selectOrdersStatus,
	updateOrderAsync
} from "../../order/orderSlice";

import { ThreeDots } from 'react-loader-spinner'

import Pagination from "../../../components/Pagination";
import AdminOrdersTable from "./AdminOrdersTable";

import { ITEMS_PER_PAGE } from '../../../app/constants';

import toast from 'react-hot-toast';



function AdminOrders() {
	const [page, setPage] = useState(1);
	const totalOrders = useSelector(selectTotalOrders);
	const ordersStatus = useSelector(selectOrdersStatus);

	const [editableOrderId, setEditableOrderId] = useState(-1);
	const [sortOptions, setSortOptions] = useState({ _sort: '', _order: 'asc' });
	const dispatch = useDispatch();


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

		dispatch(updateOrderAsync(update))
			.unwrap()
			.then(data => {
				toast.success('Order updated successfully');
			})
			.catch(err => {
				toast.error(err.message || 'Failed to update order');
			});
		
		
		setEditableOrderId(-1);
	}


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
		const pagination = {
			_page: page,
			_per_page: ITEMS_PER_PAGE
		};

		dispatch(fetchAllOrdersAsync({
			pagination,
			sortOptions,
			admin: true
		}));

	}, [dispatch, page, sortOptions])



	const handlePage = (idx) => () => setPage(idx);


	if (ordersStatus === 'loading') {
		return (
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
		)
	}

	if (totalOrders === 0) {
		<div className='min-h-[50vh] flex items-center justify-center'>
			<p className="text-xl text-indigo-500 font-bold">No Orders Placed</p>
		</div>
	}


	return (
		<div className="px-4 bg-gray-100 font-sans">
			<div className="bg-white shadow-md rounded my-6">
				<AdminOrdersTable
					page={page}
					editableOrderId={editableOrderId}
					sortOptions={sortOptions}
					handleSort={handleSort}
					handleEdit={handleEdit}
					handleUpdate={handleUpdate}
				/>
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
	)
}

export default AdminOrders;