import React from 'react';
import { clsx } from 'clsx';

function PaginationBase({ currentPage, totalPage, onChangePage }) {
  if (totalPage <= 1) return null;

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPage && page !== currentPage) {
      onChangePage(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(
          <button
            key={i}
            className={clsx(
              'w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium',
              currentPage === i
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            )}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      const delta = 2; 
      const rangeStart = Math.max(1, currentPage - delta);
      const rangeEnd = Math.min(totalPage, currentPage + delta);

      if (rangeStart > 1) {
        pages.push(
          <button
            key={1}
            className={clsx(
              'w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium',
              currentPage === 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            )}
            onClick={() => handleClick(1)}
          >
            1
          </button>
        );
        if (rangeStart > 2) {
          pages.push(
            <span key="start-ellipsis" className="w-8 h-8 flex items-center justify-center">
              ...
            </span>
          );
        }
      }

      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(
          <button
            key={i}
            className={clsx(
              'w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium',
              currentPage === i
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            )}
            onClick={() => handleClick(i)}
          >
            {i}
          </button>
        );
      }

      if (rangeEnd < totalPage) {
        if (rangeEnd < totalPage - 1) {
          pages.push(
            <span key="end-ellipsis" className="w-8 h-8 flex items-center justify-center">
              ...
            </span>
          );
        }
        pages.push(
          <button
            key={totalPage}
            className={clsx(
              'w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium',
              currentPage === totalPage
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            )}
            onClick={() => handleClick(totalPage)}
          >
            {totalPage}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
        disabled={currentPage === 1}
        onClick={() => handleClick(currentPage - 1)}
      >
        &larr;
      </button>

      {renderPageNumbers()}

      <button
        className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
        disabled={currentPage === totalPage}
        onClick={() => handleClick(currentPage + 1)}
      >
        &rarr;
      </button>
    </div>
  );
}

export default PaginationBase;
