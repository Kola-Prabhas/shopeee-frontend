import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from 'react-loader-spinner'


import {
	fetchCategoriesAsync,
	selectAllCategories,
} from '../categorySlice';


import {
	fetchBrandsAsync,
	selectAllBrands,
} from '../brandSlice';

import { useFetchProductsByFilterQuery } from '../../product/productQueryAPI';


import ProductGrid from './productGrid';
import MobileFilter from '../../../components/MobileFilter';
import DesktopFilter from '../../../components/DesktopFilter';
import ProductsSort from './productsSort';


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
	const [sort, setSort] = useState({});
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
		//d error
	} = useFetchProductsByFilterQuery({
		filter,
		pagination: { _page: page, _per_page: ITEMS_PER_PAGE },
		sortOptions: sort,
	});


	const products = data?.products;
	const totalItems = data?.totalItems;


	// used to reset page to 1 when filter or sort changes
	useEffect(() => {
		setPage(1);
	}, [filter, sort]);


	useEffect(() => {
		dispatch(fetchBrandsAsync());
		dispatch(fetchCategoriesAsync());
	}, [dispatch]);

	

	return (
		<>
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
								<ProductGrid products={products} />
							)}
						</div>
					</div>

					{totalItems > 10 && <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
						<Pagination
							page={page}
							handlePage={handlePage}
							totalItems={totalItems}
						/>
					</div>}
				</main>
			</div>
		</>
	);
}








