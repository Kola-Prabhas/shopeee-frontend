export default function ShippingDetails({ address }) {
	return (
		<div>
			<h2 className="text-lg sm:text-xl font-semibold">Delivery</h2>
			{address && typeof address !== 'string'? (
				<>
					<p className="mt-1 truncate font-semibold max-sm:text-sm text-gray-900/50">{address?.state}, {address?.city}</p>
					<p className="mt-1 truncate font-semibold max-sm:text-sm text-gray-900/50">{address?.street}, {address?.pinCode}</p>
				</>
			) : (
				<p className="max-w-[225px] mt-1 font-semibold max-sm:text-xs text-gray-900/50">
					Oops! Looks like address has been deleted by you
				</p>	
			)}
		</div >
	)
}