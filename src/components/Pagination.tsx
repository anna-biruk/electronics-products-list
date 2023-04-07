import React from 'react';

type Props = {
  handlePageChange: (pageNumber: number) => void;
  pageNumber: number;
};
const Pagination = ({ handlePageChange, pageNumber }: Props) => {
  return (
    <div className="flex flex-col items-center mt-3 mb-10">
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          disabled={pageNumber === 1}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => handlePageChange(pageNumber - 1)}
        >
          Previous
        </button>

        <button
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => handlePageChange(pageNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
