
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAddBrandStatus, addBrandAsync } from '../features/product/brandSlice';
import { selectAddCategoryStatus, addCategoryAsync } from '../features/product/categorySlice';

import toast from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';


export default function AddBrandCategoryForm({ sectionName }) {
	const [input, setInput] = useState('');

	const dispatch = useDispatch();
	const addBrandStatus = useSelector(selectAddBrandStatus);
	const addCategoryStatus = useSelector(selectAddCategoryStatus);

	const isBrandSection = sectionName === 'Brand';
	const isLoading = isBrandSection ? addBrandStatus === 'loading' : addCategoryStatus === 'loading';


	function handleSubmit(e, label) {
		e.preventDefault();
		e.stopPropagation();

		if (!label) {
			toast.error('Please enter a value');

			return;
		}


		if (isBrandSection) {
			const brand = { label, value: label };

			dispatch(addBrandAsync(brand))
				.unwrap()
				.then(() => {
					toast.success('Brand added successfully');

					setInput('');
				})
				.catch(e => {
					const message = e.message;
					toast.error(message || 'Failed to add brand');
				});

			return;
		}

		const value = label.split(' ').join('-').toLowerCase();
		const category = { label, value };

		dispatch(addCategoryAsync(category))
			.unwrap()
			.then(() => {
				toast.success('Category added successfully')
			})
			.catch(e => {
				const message = e.message;
				toast.error(message || 'Failed to add category');
			});
	}

	return (
		<form
			className='flex justify-between gap-2 mt-4'
			onSubmit={(e) => handleSubmit(e, input)}
		>
			<input
				type='text'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder={`Add new ${sectionName}`}
				className='w-full text-sm rounded border-gray-200'
			/>
			<button
				type='submit'
				disabled={isLoading}
				className='px-4 text-sm font-medium rounded text-white bg-indigo-500 hover:bg-indigo-600'
			>
				{isLoading ? (
					<TailSpin
						visible={true}
						height="26"
						width="26"
						color="#FFFFFF"
						ariaLabel="tail-spin-loading"
						radius="1"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				) : (
					'Add'
				)}
			</button>
		</form>
	)
}