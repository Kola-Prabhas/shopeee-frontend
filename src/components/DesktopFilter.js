import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux';
import { selectBrandsStatus } from '../features/product/brandSlice';
import { selectCategoriesStatus } from '../features/product/categorySlice';

import AddBrandCategoryForm from './addBrandCategoryForm';

import { TailSpin } from 'react-loader-spinner';

import { getUserRole } from '../features/auth/utils/getUserRole';



export default function DesktopFilter({ filter, setFilter, filters }) {
	const brandsStatus = useSelector(selectBrandsStatus);
	const categoriesStatus = useSelector(selectCategoriesStatus);

	const userRole = getUserRole();


	function handleFilter(e, section, option) {
		const newFilter = { ...filter };

		if (e.target.checked) {
			newFilter[section.id] = [...newFilter[section.id], option.value];
		} else {
			newFilter[section.id] = newFilter[section.id].filter(value => value !== option.value);
		}
		setFilter(newFilter);
	}



	return (
		<div className="hidden lg:block">
			{filters.map((section) => {
				const sectionName = section.name;
				const isBrandSection = sectionName === 'Brand';
				const isLoading = isBrandSection ? brandsStatus === 'loading' : categoriesStatus === 'loading';


				return (
					<Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
						{({ open }) => (
							<>
								<h3 className="-my-3 flow-root">
									<Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
										<span className="font-medium text-gray-900">{sectionName}</span>
										<span className="ml-6 flex items-center">
											{open ? (
												<MinusIcon className="h-5 w-5" aria-hidden="true" />
											) : (
												<PlusIcon className="h-5 w-5" aria-hidden="true" />
											)}
										</span>
									</Disclosure.Button>
								</h3>

								{userRole === 'admin' && (
									<AddBrandCategoryForm
										sectionName={sectionName}
									/>
								)}

								<Disclosure.Panel className="pt-6">
									{isLoading ? (
										<div className='mt-2 flex items-center justify-center'>
											<TailSpin
												visible={true}
												height="50"
												width="50"
												color="#4F46E5"
												ariaLabel="tail-spin-loading"
												radius="1"
												wrapperStyle={{}}
												wrapperClass=""
											/>
										</div>
									) : (
										<div className="space-y-4">
											{section.options.map((option, optionIdx) => {
												return (
													<div key={option.value} className="flex items-center">
														<input
															id={`filter-${section.id}-${optionIdx}`}
															name={`filter-${section.id}-${optionIdx}`}
															defaultValue={option.value}
															type="checkbox"
															onChange={(e) => handleFilter(e, section, option)}
															defaultChecked={filter[section.id]?.includes(option.value)}
															className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
														/>
														<label
															htmlFor={`filter-${section.id}-${optionIdx}`}
															className="ml-3 text-sm text-gray-600"
														>
															{option.label}
														</label>
													</div>
												)
											})}
										</div>
									)}
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				)
			})}
		</div>
	)
}