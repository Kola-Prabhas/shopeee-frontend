export default function UserAddress({
	address,
	isPending,
	onDelete,
	onEdit
}) {
	return (
		<div className='relative max-w-[800px] my-4 px-4 py-2 border border-gray-400 rounded-lg'>
			{isPending && <div className='z-10 absolute inset-0 bg-gray-200/30 cursor-not-allowed'/>}
			<h2 className='text-xl font-semibold mb-6'>Address</h2>
			<div className='absolute right-2 top-[10px] flex items-center gap-[10px]'>
				<button
					onClick={onEdit}
				>
					<img src='/edit.svg' alt="Edit" />
				</button>
				<button
					onClick={onDelete}
				>
					<img src='/trash.svg' alt="Delete" />
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 *:space-y-[2px]">
				<div>
					<p className="text-gray-700 font-medium">State</p>
					<p className="font-semibold text-gray-900">{address.state}</p>
				</div>
				<div>
					<p className="text-gray-700 font-medium">City</p>
					<p className="font-semibold text-gray-900">{address.city}</p>
				</div>
				<div>
					<p className="text-gray-700 font-medium">Street</p>
					<p className="font-semibold text-gray-900">{address.street}</p>
				</div>
				<div>
					<p className="text-gray-700 font-medium">Pincode</p>
					<p className="font-semibold text-gray-900">{address.pinCode}</p>
				</div>
			</div>
		</div>
	)
}