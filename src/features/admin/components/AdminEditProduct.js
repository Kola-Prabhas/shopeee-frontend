import {
	selectCategories,
	selectBrands,
	updateProductAsync,
	selectProductById,
	fetchProductByIdAsync,
	selectProductStatus
} from '../../product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThreeDots } from 'react-loader-spinner';

import Modal from '../../../components/Modal';



export default function AdminEditProduct() {
	const [open, setOpen] = useState(false);
	const categories = useSelector(selectCategories);
	const brands = useSelector(selectBrands);
	const product = useSelector(selectProductById);

	const productStatus = useSelector(selectProductStatus);

	// console.log('product status ', productStatus);
	console.log('product ', product);

	const params = useParams();

	const sortedCategories = categories.slice().sort((a, b) => (a.value).localeCompare(b.value));
	const sortedBrands = brands.slice().sort((a, b) => (a.value).localeCompare(b.value));

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm();

	const dispatch = useDispatch();


	function setInitialValues() {
		setValue('title', product.title);
		setValue('description', product.description);
		setValue('category', product.category);
		setValue('brand', product.brand);
		setValue('price', product.price);
		setValue('discountPercentage', product.discountPercentage);
		setValue('stock', product.stock);
		setValue('thumbnail', product.thumbnail);
		setValue('image1', product.images[0])
		setValue('image2', product.images[1])
		setValue('image3', product.images[2])
		setValue('image4', product.images[3])
	}


	function handleToggleDelete() {
		const newProduct = { ...product };
		newProduct.deleted = !product.deleted;
		dispatch(updateProductAsync(newProduct));
	}


	useEffect(() => {
		dispatch(fetchProductByIdAsync(params.id));
	}, [dispatch, params.id]);

	useEffect(() => {
		if (product) {
			setInitialValues();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product]);




	return (
		productStatus === 'loading' || !product ? (
			<div className='min-h-[100vh] flex items-center justify-center'>
				<ThreeDots
					visible={true}
					height="80"
					width="80"
					color="#4F46E5"
					radius="10"
					ariaLabel="three-dots-loading"
					wrapperStyle={{}}
					wrapperClass=""
				/>
			</div>
		) : (
			<form
				className='md:w-[60%] max-w-[1000px] py-8 mx-auto'
				onSubmit={handleSubmit(data => {
					const newProduct = { ...data };

					const images = [];

					if (data.image1) {
						images.push(data.image1);
					}

					if (data.image2) {
						images.push(data.image2);
					}

					if (data.image3) {
						images.push(data.image3);
					}

					if (data.image4) {
						images.push(data.image4);
					}

					delete newProduct.image1;
					delete newProduct.image2;
					delete newProduct.image3;
					delete newProduct.image4;

					newProduct.images = images;
					newProduct.stock = +newProduct.stock;
					newProduct.price = +newProduct.price;
					newProduct.discountPercentage = + newProduct.discountPercentage;
					newProduct.id = product.id;
					newProduct.rating = product.rating;

					dispatch(updateProductAsync(newProduct));
				})}
			>
				<div className="space-y-12 px-6  ">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base md:text-xl font-bold leading-7 text-gray-900">Edit product details</h2>
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="col-span-full">
								<label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
									Product Name
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
										<input
											type="text"
											{...register('title', { required: 'Name is required' })}
											id="title"
											autoComplete="title"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
								{errors.title && <p className='text-red-600 font-semibold'>{errors.title.message}</p>}
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
								{errors.description && <p className='text-red-600 font-semibold'>{errors.description.message}</p>}
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
								{errors.category && <p className='text-red-600 font-semibold'>{errors.category.message}</p>}
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
								{errors.brand && <p className='text-red-600 font-semibold'>{errors.brand.message}</p>}
							</div>
							<div className="sm:col-span-2">
								<label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
									Price
								</label>
								<div className="mt-2">
									<input
										type="text"
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
								{errors.price && <p className='text-red-600 font-semibold'>{errors.price.message}</p>}
							</div>

							<div className="sm:col-span-2">
								<label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
									Discount
								</label>
								<div className="mt-2">
									<input
										type="text"
										{...register('discountPercentage', {
											required: 'Discount is required',
											min: 0,
											max: 99
										})}
										step="any"
										id="discountPercentage"
										autoComplete="discountPercentage"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
								{errors.discountPercentage && <p className='text-red-600 font-semibold'>{errors.discountPercentage.message}</p>}
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
								{errors.stock && <p className='text-red-600 font-semibold'>{errors.stock.message}</p>}
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
								{errors.thumbnail && <p className='text-red-600 font-semibold'>{errors.thumbnail.message}</p>}
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
								{errors.image1 && <p className='text-red-600 font-semibold'>{errors.image1.message}</p>}
							</div>
							<div className="col-span-full">
								<label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
									Image 2
								</label>
								<div className="mt-2">
									<input
										type="text"
										{...register('image2')}
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
										{...register('image3')}
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
										{...register('image4')}
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
					<button
						type="button"
						className="w-[50px] text-sm font-semibold leading-6 text-gray-900"
						onClick={setInitialValues}
					>
						Reset
					</button>
					<button
						onClick={product.deleted? handleToggleDelete: () => setOpen(true)}
						type='button'
						className={`w-[125px] rounded-md ${product.deleted ? 'text-indigo-600 border border-indigo-600' : 'bg-red-600 text-white'} px-3 py-2 text-sm font-semibold shadow-sm ${product.deleted ? 'hover:bg-gray-100' : 'hover:bg-red-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
					>
						{product.deleted ? 'Restore' : 'Delete'}
					</button>

					{/* <Link to='/admin'> */}
					<button
						type="submit"
						className="w-[75px] rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Save
					</button>
					{/* </Link> */}


				</div>
				<Modal
					open={open}
					setOpen={setOpen}
					title={`Delete ${product.title}`}
					message='Are you sure? Do you want to delete this item?'
					cancelOption='Cancel'
					confirmOption='Delete'
					cancelAction={() => setOpen(false)}
					confirmAction={() => handleToggleDelete()}
				/>
			</form>
		)
	)
}