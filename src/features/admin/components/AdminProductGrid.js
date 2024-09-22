import { Link } from 'react-router-dom';
import AdminProduct from './AdminProduct';

export default function AdminProductGrid({ products }) {
	return (
		<div className="bg-white space-y-4">
		 <Link to='/admin/product-form'>
				<button
					type="button"
					className="rounded block hover:bg-green-600 p-2 ml-auto text-sm font-semibold text-white shadow-sm bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Add New Product
				</button>
			</Link>
			<div className="mx-auto max-w-2xl lg:max-w-7xl">
				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
					{products?.map((product) => (
						<AdminProduct key={product.id} product={product} />
					))}
				</div>
			</div>
		</div>
	);
}