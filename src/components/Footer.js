function Footer() {
	return (
		<div className="bg-gray-900 text-white py-10">
			<div className="text-center">
				<h3 className="text-3xl mb-3"> Download our SwiftStore app </h3>
				<p> Where Quality Meets Convenience – Shop Smarter, Live Better!. </p>
				<div className="flex justify-center my-10">
					<div className="flex items-center border rounded-lg px-4 py-2 w-52 mx-2">
						<img
							src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
							alt='PlayStore'
							className="w-7 md:w-8"
						/>
						<div className="text-left ml-3">
							<p className="text-xs text-gray-200">Download on </p>
							<p className="text-sm md:text-base"> Google Play Store </p>
						</div>
					</div>
					<div className="flex items-center border rounded-lg px-4 py-2 w-44 mx-2">
						<img
							src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
							alt='AppStore'
							className="w-7 md:w-8"
						/>
						<div className="text-left ml-3">
							<p className="text-xs text-gray-200">Download on </p>
							<p className="text-sm md:text-base"> Apple Store </p>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-10 flex justify-center items-center text-sm text-gray-400">
				<p>
					{" "}
					© SwiftStore, 2024.{" "}
				</p>
			</div>
		</div>
	);
}

export default Footer;