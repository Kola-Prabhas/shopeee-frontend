import { selectCategories, selectBrands, addProductAsync } from '../../product-list/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


export default function AdminProductForm() {
	const categories = useSelector(selectCategories);
	const brands = useSelector(selectBrands);

	const sortedCategories = categories.slice().sort((a, b) => (a.value).localeCompare(b.value));
	const sortedBrands = brands.slice().sort((a, b) => (a.value).localeCompare(b.value));

	const {
		register,
		handleSubmit,
		reset,
	} = useForm();

	const dispatch = useDispatch();

	return (
		<form
			className='md:w-[60%] max-w-[1000px] py-8 mx-auto'
			onSubmit={handleSubmit(data => {
				const newProduct = { ...data };

				const images = [data.image1, data.image2, data.image3, data.image4];

				delete newProduct.image1;
				delete newProduct.image2;
				delete newProduct.image3;
				delete newProduct.image4;

				newProduct.rating = 0;
				newProduct.images = images;
				newProduct.stock = +newProduct.stock;
				newProduct.price = +newProduct.price;
				newProduct.discountPercentage = + newProduct.discountPercentage;


				dispatch(addProductAsync(newProduct));
				console.log(newProduct);
			})}
		>
			<div className="space-y-12 px-6  ">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base md:text-xl font-bold leading-7 text-gray-900">Enter new product details</h2>
					{/* <p className="mt-1 text-sm leading-6 text-gray-600">
						This information will be displayed publicly so be careful what you share.
					</p> */}

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="col-span-full">
							<label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
								Product Name
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
									<input
										type="text"
										{...register('title', {required: 'Name is required'})}
										id="title"
										autoComplete="title"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>

						<div className="col-span-full">
							<label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
								Description
							</label>
							<div className="mt-2">
								<textarea
									id="description"
									{...register('description', { required: 'Description is required' })}
									rows={3}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									defaultValue={''}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="border-b border-gray-900/10 pb-12">

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
								Category
							</label>
							<div className="mt-2">
								<select
									id="category"
									{...register('category', {
										required: 'Category is required',
										validate: value => value !== 'none'
									})}
									autoComplete="category"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option value='none'>-- select category --</option>

									{
										sortedCategories.map(item => {
											return <option key={item.id} value={item.value}>{item.label}</option>
										})
									}
									
								</select>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
								Brand
							</label>
							<div className="mt-2">
								<select
									id="brand"
									{...register('brand', {
										required: 'Brand is required',
										validate: value => value !== 'none'
									 })}
									autoComplete="brand"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
								>
									<option value='none'>-- select brand --</option>
									{
										sortedBrands.map((item, index) => {
											return <option key={item.id} value={item.value}>{item.label}</option>
										})
									}
								</select>
							</div>
						</div>
						<div className="sm:col-span-2">
							<label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
								Price
							</label>
							<div className="mt-2">
								<input
									type="number"
									{...register('price', {
										required: 'Price is required',
										min: 1,
										max: 10000										
									})}

									id="price"
									autoComplete="price"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
								Discount
							</label>
							<div className="mt-2">
								<input
									type="number"
									{...register('discountPercentage', {
										required: 'Discount is required',
										min: 0,
										max: 99
									})}
									id="discountPercentage"
									autoComplete="discountPercentage"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
								Stock
							</label>
							<div className="mt-2">
								<input
									id="stock"
									{...register('stock', {
										required: 'Stock is required',
										min: 0,
									})}
									type="number"
									autoComplete="stock"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						

						<div className="col-span-full">
							<label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
								Thumbnail
							</label>
							<div className="mt-2">
								<input
									type="text"
									{...register('thumbnail', { required: 'Thumbnail is required' })}
									id="thumbnail"
									autoComplete="thumbnail"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="col-span-full">
							<label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
								Image 1 
							</label>
							<div className="mt-2">
								<input
									type="text"
									{...register('image1', { required: 'Image1 is required' })}
									id="image1"
									autoComplete="image1"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="col-span-full">
							<label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
								Image 2
							</label>
							<div className="mt-2">
								<input
									type="text"
									{...register('image2', { required: 'Image2 is required' })}
									id="image2"
									autoComplete="image2"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="col-span-full">
							<label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                Image 3
							</label>
							<div className="mt-2">
								<input
									type="text"
									{...register('image3', { required: 'Image3 is required' })}
									id="image3"
									autoComplete="image3"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="col-span-full">
							<label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
								Image 4
							</label>
							<div className="mt-2">
								<input
									type="text"
									{...register('image4', { required: 'Image4 is required' })}
									id="image4"
									autoComplete="image4"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>

				
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<Link to='/admin'>
					<button
						type="button"
						className="w-[50px] text-sm font-semibold leading-6 text-gray-900"
						onClick={reset}
					>
						Cancel
					</button>
				</Link>
				
				<button
					type="submit"
					className="w-[75px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Save
				</button>
			</div>
		</form>
	)
}