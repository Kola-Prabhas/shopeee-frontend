import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';

export default function AdminProduct({ product }) {
	return (
		<div>
			<Link to={`/product-details/${product.id}`} key={product.id}>
				<div className="group relative border-2 border-gray-200 p-2">
					<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  group-hover:opacity-75 lg:h-60">
						<img
							src={product.thumbnail}
							alt={product.title}
							className="h-full w-full object-cover object-center lg:h-full lg:w-full"
						/>
					</div>
					<div className="mt-4 flex justify-between">
						<div className='flex-grow-0'>
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
							<p className="text-sm font-medium text-gray-900">${product.discountPrice.toFixed(2)}</p>
						</div>
					</div>
					{product.deleted && <p className='text-sm text-center font-bold text-red-500'>Product Deleted!</p>}
					{product.stock <= 0 && <p className='text-sm my-2 text-center font-bold text-red-500'>Product out of stock!</p>}
				</div>
			</Link>
			
			<Link to={`/admin/edit-product/${product.id}`}>
				<button
					type="button"
					className="rounded hover:bg-indigo-600 p-2 mt-2 text-sm font-semibold text-white shadow-sm bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Edit Product
				</button>
			</Link>
		</div>
	)
}