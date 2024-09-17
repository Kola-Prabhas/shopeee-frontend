import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchBrandsAsync,
	fetchCategoriesAsync,
	fetchProductsByFilterAsync,
	selectAllProducts,
	selectBrands,
	selectCategories,
	selectTotalItems
} from '../productSlice';

import ProductGrid from './productGrid';
import MobileFilter from '../../../components/MobileFilter';
import DesktopFilter from '../../../components/DesktopFilter';
import ProductsSort from './productsSort';


import { ITEMS_PER_PAGE } from '../../../app/constants';
import Pagination from '../../../components/Pagination';
import { sortOptions } from '../../../services/sortOptions';


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
					<div className="lg:col-span-3">
						<ProductGrid products={products} />
					</div>
				</div>

				{totalItems > 10 && <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
					<Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalItems} />
				</div>}
			</main>
		</div>
	);
}








