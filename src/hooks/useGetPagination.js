import { useMemo } from 'react';

function useGetPagination({
	currentPage,
	pageSize,
	totalItems,
	siblingCount
}) {
	const pagination = useMemo(() => {
		const totalPages = Math.ceil(totalItems / pageSize);

		// 5 = firstElem, lastElem, currentElem 2 dots
		const totalPageNumbers = 2 * siblingCount + 5;

		if (totalPages <= totalPageNumbers) {
			return Array.from({ length: totalPages }).map((_, idx) => idx + 1);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

		// const showLeftDots = leftSiblingIndex > siblingCount;
		const showLeftDots = leftSiblingIndex > 2;
		// const showRightDots = rightSiblingIndex < totalPages - siblingCount;
		const showRightDots = rightSiblingIndex < totalPages - 1;

		if (showLeftDots && !showRightDots) {
			const leftElement = totalPages - (2 * siblingCount + 3) + 1
			const range = Array.from({ length: 2 * siblingCount + 3 })
				.map((_, idx) => idx + leftElement);

			return [1, '...', ...range];
		}

		if (!showLeftDots && showRightDots) {
			const range = Array.from({ length: 2 * siblingCount + 3 })
				.map((_, idx) => idx + 1);

			return [...range, '...', totalPages]
		}


		if (showLeftDots && showRightDots) {
			const range = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 })
				.map((_, idx) => idx + leftSiblingIndex)

			return [1, '...', ...range, '...', totalPages]
		}
	},
		[currentPage, totalItems, pageSize, siblingCount]
	);

	return pagination
}

export default useGetPagination;