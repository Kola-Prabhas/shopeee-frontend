import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from 'react-loader-spinner';
import toast from 'react-hot-toast';

import {
	fetchCategoriesAsync,
	selectAllCategories,
} from '../../product/categorySlice';

import {
	fetchBrandsAsync,
	selectAllBrands,
} from '../../product/brandSlice';


import { useFetchProductsByFilterQuery } from '../../product/productQueryAPI';


import AdminProductGrid from './AdminProductGrid';
import MobileFilter from '../../../components/MobileFilter';
import DesktopFilter from '../../../components/DesktopFilter';
import ProductsSort from '../../product/components/productsSort';


import { ITEMS_PER_PAGE } from '../../../app/constants';
import Pagination from '../../../components/Pagination';
import { sortOptions } from '../../../services/sortOptions';


export default function ProductList() {
	const dispatch = useDispatch();

	const categories = useSelector(selectAllCategories);
	const brands = useSelector(selectAllBrands);

	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [filter, setFilter] = useState({
		category: [],
		brand: []
	});
	const [sort, setSort] = useState({ _sort: '', order: '' });
	const [page, setPage] = useState(1);


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

	const handlePage = (idx) => () => setPage(idx);

	const {
		data,
		isLoading,
		isFetching,
		error
	} = useFetchProductsByFilterQuery({
		filter,
		pagination: { _page: page, _per_page: ITEMS_PER_PAGE },
		sortOptions: sort,
		admin: true
	});


	const products = data?.products;
	const totalItems = data?.totalItems;


	// used to reset page to 1 when filter or sort chnages
	useEffect(() => {
		setPage(1);
	}, [filter, sort]);


	useEffect(() => {
		dispatch(fetchBrandsAsync());
		dispatch(fetchCategoriesAsync());
	}, [dispatch]);

	if (error) {
		toast.error(error);
	}


	return (
		<div className="bg-white">
			<MobileFilter
				mobileFiltersOpen={mobileFiltersOpen}
				setMobileFiltersOpen={setMobileFiltersOpen}
				filter={filter}
				setFilter={setFilter}
				filters={filters}
			/>

			<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<ProductsSort
					setSort={setSort}
					sortOptions={sortOptions}
					setMobileFiltersOpen={setMobileFiltersOpen}
				/>

				<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 pb-24 pt-6">
					<DesktopFilter
						filter={filter}
						setFilter={setFilter}
						filters={filters}
					/>
					<div className="relative lg:col-span-3">
						{isFetching && !isLoading && (
							<div className='absolute inset-0 z-10 bg-gray-200/15 cursor-not-allowed' />
						)}
						{isLoading ? (
							<div className='h-[100px] flex items-center justify-center'>
								<Grid
									visible={true}
									height="80"
									width="80"
									color="#4F46E5"
									ariaLabel="grid-loading"
									radius="12.5"
									wrapperStyle={{}}
									wrapperClass="grid-wrapper"
								/>
							</div>
						) : (
							<AdminProductGrid products={products} />
						)}
					</div>
				</div>

				{totalItems > 10 && <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
					<Pagination
						page={page}
						setPage={setPage}
						handlePage={handlePage}
						totalItems={totalItems}
					/>
				</div>}
			</main>
		</div>
	);
}



// function ProductGrid({ products }) {
// 	return (
// 		<div className="bg-white">
// 			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 border border-black">
// 				{/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}

// 				<Link to='/admin/product-form'>
// 					<button
// 						type="button"
// 						className="rounded block hover:bg-green-600 p-2 ml-auto text-sm font-semibold text-white shadow-sm bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
// 					>
// 						Add New Product
// 					</button>
// 				</Link>


// 				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
// 					{products.map((product) => (
// 						<div className=''>
// 							<Link to={`/product-details/${product.id}`} key={product.id}>
// 								<div className="group relative border-2 border-gray-200 p-2">
// 									<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  group-hover:opacity-75 lg:h-60">
// 										<img
// 											src={product.thumbnail}
// 											alt={product.title}
// 											className="h-full w-full object-cover object-center lg:h-full lg:w-full"
// 										/>
// 									</div>
// 									<div className="mt-4 flex justify-between">
// 										<div>
// 											<h3 className="text-sm text-gray-700">
// 												<a href={product.thumbnail}>
// 													<span aria-hidden="true" className="absolute inset-0" />
// 													{product.title}
// 												</a>
// 											</h3>
// 											<p className="mt-1 text-sm text-gray-500">
// 												<StarIcon className='w-5 h-5 inline' />
// 												<span className='align-bottom'>{product.rating}</span>
// 											</p>
// 										</div>
// 										<div>
// 											<p className="text-sm font-medium line-through text-gray-400">${product.price}</p>
// 											<p className="text-sm font-medium text-gray-900">${Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
// 										</div>
// 									</div>
// 									{product.deleted && <p className='text-sm text-center font-bold text-red-500'>Product Deleted!</p>}
// 									{product.stock <= 0 && <p className='text-sm my-2 text-center font-bold text-red-500'>Product out of stock!</p>}
// 								</div>
// 							</Link>
// 							<Link to={`/admin/edit-product/${product.id}`}>
// 								<button
// 									type="button"
// 									className="rounded hover:bg-indigo-600 p-2 mt-2 text-sm font-semibold text-white shadow-sm bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
// 								>
// 									Edit Product
// 								</button>
// 							</Link>

// 						</div>

// 					))}
// 				</div>


// 			</div>
// 		</div>
// 	)

// }