import { useForm } from 'react-hook-form';


export default function AddressForm({
	submitAction,
	cancelAction,
	address
}) {
	const defaultValues = address;

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({defaultValues});



	return (
		<form
			onSubmit={handleSubmit(address => {
				submitAction(address)
				cancelAction();
			})}
			className='max-w-[800px] border border-gray-400 p-4 rounded-md my-2'
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-6 *:space-y-[4px] *:flex *:flex-col">
				<div>
					<label
						htmlFor='state'
						className="text-gray-700 font-medium"
					>
						State
					</label>
					<input
						type='text'
						id='state'
						{...register('state', { required: 'State is Required!' })}
						className="rounded-[4px] border-gray-400 font-semibold focus:ring-0"
					/>
					{errors.state && <p className='text-xs font-semibold text-red-600'>{errors.state.message}</p>}
				</div>
				<div>
					<label
						htmlFor='city'
						className="text-gray-700 font-medium"
					>
						City
					</label>
					<input
						type='text'
						id='city'
						{...register('city', { required: 'City is Required!' })}
						className="rounded-[4px] border-gray-400 font-semibold focus:ring-0"
					/>
					{errors.city && <p className='text-xs font-semibold text-red-600'>{errors.city.message}</p>}
				</div>
				<div>
					<label
						htmlFor='street'
						className="text-gray-700 font-medium"
					>
						Street
					</label>
					<input
						type='text'
						id='street'
						{...register('street', { required: 'Street is required!' })}
						className="rounded-[4px] border-gray-400 font-semibold focus:ring-0"
					/>
					{errors.street && <p className='text-xs font-semibold text-red-600'>{errors.street.message}</p>}
				</div>
				<div>
					<label
						htmlFor='pinCode'
						className="text-gray-700 font-medium"
					>
						Pincode
					</label>
					<input
						type='text'
						id='pinCode'
						{...register('pinCode', { required: 'Pincode is required!' })}
						className="rounded-[4px] border-gray-400 font-semibold focus:ring-0"
					/>
					{errors.pinCode && <p className='text-xs font-semibold text-red-600'>{errors.pinCode.message}</p>}
				</div>
			</div>

			<div className='flex gap-1 mt-4'>
				<button
					type='button'
					onClick={cancelAction}
					className='ml-auto text-sm bg-red-600 text-white px-4 py-2 rounded-[4px]'
				>
					Cancel
				</button>
				<button
					type='submit'
					className='text-sm bg-indigo-600 text-white px-4 py-2 rounded-[4px]'
				>
					Submit
				</button>
			</div>
		</form>
	)
}