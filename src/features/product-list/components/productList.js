import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, StarIcon } from '@heroicons/react/20/solid'

import { fetchBrandsAsync, fetchCategoriesAsync, fetchProductsByFilterAsync, selectAllProducts, selectBrands, selectCategories, selectTotalItems } from '../productSlice';

import { ITEMS_PER_PAGE } from '../../../app/constants';
import Pagination from '../../components/Pagination';

import { getDiscountprice } from '../../../services/common';






function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function ProductList() {
	const dispatch = useDispatch();

	const products = useSelector(selectAllProducts);
	const totalItems = useSelector(selectTotalItems);
	const categories = useSelector(selectCategories);
	const brands = useSelector(selectBrands);

	console.log('products ', products);

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
				<div className="bg-white border border-red-800">
					<div>
						{/* Mobile filter dialog */}
						<MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filter={filter} handleFilter={handleFilter} filters={filters} />						

						<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
								<h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

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



function MobileFilter({ mobileFiltersOpen, setMobileFiltersOpen, filter, handleFilter, filters}) {

	return (
		<Transition.Root show={mobileFiltersOpen} as={Fragment}>
			<Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
				<Transition.Child
					as={Fragment}
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 z-40 flex">
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="translate-x-full"
					>
						<Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
							<div className="flex items-center justify-between px-4">
								<h2 className="text-lg font-medium text-gray-900">Filters</h2>
								<button
									type="button"
									className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
									onClick={() => setMobileFiltersOpen(false)}
								>
									<span className="sr-only">Close menu</span>
									<XMarkIcon className="h-6 w-6" aria-hidden="true" />
								</button>
							</div>

							{/* Filters */}
							<form className="mt-4 border-t border-gray-200">


								{filters.map((section) => (
									<Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
										{({ open }) => (
											<>
												<h3 className="-mx-2 -my-3 flow-root">
													<Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
														<span className="font-medium text-gray-900">{section.name}</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusIcon className="h-5 w-5" aria-hidden="true" />
															) : (
																<PlusIcon className="h-5 w-5" aria-hidden="true" />
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel className="pt-6">
													<div className="space-y-6">
														{section.options.map((option, optionIdx) => (
															<div key={option.value} className="flex items-center">
																<input
																	id={`filter-mobile-${section.id}-${optionIdx}`}
																	name={`${section.id}[]`}
																	defaultValue={option.value}
																	type="checkbox"
																	onChange={(e) => handleFilter(e, section, option)}
																	defaultChecked={filter[section.id]?.includes(option.value)}
																	className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
																/>
																<label
																	htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																	className="ml-3 min-w-0 flex-1 text-gray-500"
																>
																	{option.label}
																</label>
															</div>
														))}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</form>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

function DesktopFilter({ filter, handleFilter, filters }) {
	console.log('filters ', filter);


	return (
		<form className="hidden lg:block">

			{filters.map((section) => (
				<Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
					{({ open }) => (
						<>
							<h3 className="-my-3 flow-root">
								<Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
									<span className="font-medium text-gray-900">{section.name}</span>
									<span className="ml-6 flex items-center">
										{open ? (
											<MinusIcon className="h-5 w-5" aria-hidden="true" />
										) : (
											<PlusIcon className="h-5 w-5" aria-hidden="true" />
										)}
									</span>
								</Disclosure.Button>
							</h3>
							<Disclosure.Panel className="pt-6">
								<div className="space-y-4">
									{section.options.map((option, optionIdx) => {
										return (<div key={option.value} className="flex items-center">
											<input
												id={`filter-${section.id}-${optionIdx}`}
												name={`filter-${section.id}-${optionIdx}`}
												defaultValue={option.value}
												type="checkbox"
												onChange={(e) => handleFilter(e, section, option)}
												defaultChecked={filter[section.id]?.includes(option.value)}
												className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
											/>
											<label
												htmlFor={`filter-${section.id}-${optionIdx}`}
												className="ml-3 text-sm text-gray-600"
											>
												{option.label}
											</label>
										</div>)
									})}
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			))}
		</form>
	)
}








function ProductGrid({ products }) {
	

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 border border-black">
				{/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
					{products.map((product) => (
						<Link to={`/product-details/${product.id}`} key={product.id}>
							<div  className="group relative border-2 border-gray-200 p-2">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  group-hover:opacity-75 lg:h-60">
									<img
										src={product.thumbnail}
										alt={product.title}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<a href={product.thumbnail}>
												<span aria-hidden="true" className="absolute inset-0" />
												{product.title}
											</a>
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											<StarIcon className='w-5 h-5 inline' />
											<span className='align-bottom'>{product.rating}</span>
										</p>
									</div>
									<div>
										<p className="text-sm font-medium line-through text-gray-400">${product.price}</p>
										<p className="text-sm font-medium text-gray-900">${getDiscountprice(product.price, product.discountPercentage)}</p>
									</div>
									
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	)

}