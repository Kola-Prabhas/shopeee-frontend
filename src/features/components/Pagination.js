import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { ITEMS_PER_PAGE } from '../../app/constants';





export default function Pagination({ page, setPage, handlePage, totalItems }) {

	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);


	function itemsShown() {
		if (page !== Math.ceil(totalItems / ITEMS_PER_PAGE)) {
			return page * ITEMS_PER_PAGE;
		}
		
		return totalItems;
	}


	return (
		<>
			<div className="flex flex-1 justify-between sm:hidden">
				<div
					onClick={handlePage(page > 1 ? page - 1 : page)}
					className={`${page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
				>
					Previous
				</div>
				<div
					onClick={handlePage(page < totalPages ? page + 1 : page)}
					className={`${page === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'} relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50`}
				>
					Next
				</div>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-700">
						Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{itemsShown()}</span> of{' '}
						<span className="font-medium">{totalItems}</span> results
					</p>
				</div>
				<div>
					<nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
						<div
							onClick={handlePage(page > 1 ? page - 1 : page)}
							className={`${page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
						>
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						</div>
						{/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
						{
							Array.from({ length: totalPages }).map((val, idx) => {
								return (
									<div
										key={idx}
										onClick={handlePage(idx + 1)}
										aria-current="page"
										className={`relative z-10 inline-flex items-center ${idx + 1 === page ? 'bg-indigo-600 text-white' : 'text-gray-400'}  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer`}
									>
										{idx + 1}
									</div>

								)
							})
						}


						<div
							onClick={handlePage(page < totalPages ? page + 1 : page)}
							className={`${page === Math.ceil(totalItems / ITEMS_PER_PAGE) ? 'cursor-not-allowed' : 'cursor-pointer'} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
						>
							<span className="sr-only">Next</span>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
						</div>
					</nav>
				</div>
			</div>
		</>
	)
}