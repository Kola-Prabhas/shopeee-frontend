import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, StarIcon } from '@heroicons/react/20/solid'

import { fetchBrandsAsync, fetchCategoriesAsync, fetchProductsByFilterAsync, selectAllProducts, selectBrands, selectCategories, selectTotalItems } from '../productSlice';

import { ITEMS_PER_PAGE } from '../../../app/constants';
import Pagination from '../../components/Pagination';

// import { getDiscountprice } from '../../../services/common';

import ProductGrid from './productGrid';
import MobileFilter from './MobileFilter';
import DesktopFilter from './DesktopFilter';





function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function ProductList() {
	const dispatch = useDispatch();

	const products = useSelector(selectAllProducts);
	const totalItems = useSelector(selectTotalItems);
	const categories = useSelector(selectCategories);
	const brands = useSelector(selectBrands);


	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [filter, setFilter] = useState({
		category: [],
		brand: []
	});
	const [sort, setSort] = useState({});
	const [page, setPage] = useState(1);


	const sortOptions = [
		{ name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
		{ name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
		{ name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
	]

	const filters = [
		{
			id: 'brand',
			name: 'Brands',
			options: brands
		},
		{
			id: 'category',
			name: 'Category',
			options: categories,
		},
	]



	function handleFilter(e, section, option) {
		const newFilter = { ...filter };

		if (e.target.checked) {
			newFilter[section.id] = [...newFilter[section.id], option.value];
		} else {
			newFilter[section.id] = newFilter[section.id].filter(value => value !== option.value);
		}

		setFilter(newFilter);
	}

	function handleSort(option) {
		const newSort = {
			_sort: option.sort,
			_order: option.order
		}
		setSort(newSort);
	}

	

	const handlePage = (idx) => () => setPage(idx);



	useEffect(() => {
		const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
		dispatch(fetchProductsByFilterAsync({ filter, pagination, sort }));

	}, [dispatch, filter, sort, page]);


	useEffect(() => {
		setPage(1);
	}, [filter, sort]);


	useEffect(() => {
		dispatch(fetchBrandsAsync());
		dispatch(fetchCategoriesAsync());
	}, [dispatch]);


	return (
		<div>
			<div>
				<div className="bg-white">
					<div>
						{/* Mobile filter dialog */}
						<MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filter={filter} handleFilter={handleFilter} filters={filters} />						

						<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="flex items-baseline justify-end border-b border-gray-200 pb-6 pt-4">
								{/* <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1> */}

								<div className="flex items-center">
									<Menu as="div" className="relative inline-block text-left">
										<div>
											<Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
												Sort
												<ChevronDownIcon
													className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
													aria-hidden="true"
												/>
											</Menu.Button>
										</div>

										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
												<div className="py-1">
													{sortOptions.map((option) => (
														<Menu.Item key={option.name}>
															{({ active }) => (
																<p
																	onClick={() => handleSort(option)}
																	className={classNames(
																		option.current ? 'font-medium text-gray-900' : 'text-gray-500',
																		active ? 'bg-gray-100' : '',
																		'block px-4 py-2 text-sm'
																	)}
																>
																	{option.name}
																</p>
															)}
														</Menu.Item>
													))}
												</div>
											</Menu.Items>
										</Transition>
									</Menu>

									<button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
										<span className="sr-only">View grid</span>
										<Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
									</button>
									<button
										type="button"
										className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
										onClick={() => setMobileFiltersOpen(true)}
									>
										<span className="sr-only">Filters</span>
										<FunnelIcon className="h-5 w-5" aria-hidden="true" />
									</button>
								</div>
							</div>



							<section aria-labelledby="products-heading" className="pb-24 pt-6">
								<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
									{/* Desktop Filters */}
									<DesktopFilter filter={filter} handleFilter={handleFilter} filters={filters}/>
									

									{/* Product grid */}
									<div className="lg:col-span-3">
										<ProductGrid products={products}/>
									</div>
								</div>
							</section>

							{/* Page numbers */}
							{totalItems > 10 && <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
								<Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems} />
							</div>}						

						</main>
					</div>
				</div>
			</div>
		</div>
	);
}








