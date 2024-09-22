import Product from './product';

export default function ProductGrid({ products }) {

	return (
		<div className="bg-white">
			<div className="ml-auto max-w-2xl lg:max-w-7xl">
				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
					{products?.map((product) => (
						<Product key={product.id}  product={product} />
					))}
				</div>
			</div>
		</div>
	);
}