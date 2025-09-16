'use client';

import { useState } from 'react';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { TablePaginationProps } from '@/types';

const TablePagination = ({
  paginationOptions,
  pageSize,
  onPageChange,
}: TablePaginationProps) => {
  const { count = 0, current_page = 1 } = paginationOptions;

  const [currentPage, setCurrentPage] = useState(
    paginationOptions?.current_page ?? 1
  );
  const totalPages = paginationOptions?.num_pages ?? 1;

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // Calculate the range of page numbers to display
  const getVisiblePageNumbers = () => {
    const pagesToShow = 3;
    let start = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let end = start + pagesToShow - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - pagesToShow + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  const visiblePageNumbers = getVisiblePageNumbers();
  const showFirstPage = visiblePageNumbers[0] > 1;
  const showLastPage =
    visiblePageNumbers[visiblePageNumbers?.length - 1] < totalPages;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      onPageChange?.(pageNumber);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
      <div className="text-sm text-gray-700">
        Showing {(current_page - 1) * (pageSize || 10) + 1} to{' '}
        {Math.min(current_page * (pageSize || 10), count)} of {count} results
      </div>

      <div className="flex items-center space-x-1">
        {/* First page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(1)}
          disabled={!canGoPrevious}
          className="h-8 w-8 p-0"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={!canGoPrevious}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {/* Show first page and ellipsis if needed */}
          {showFirstPage && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                className="h-8 w-8 p-0"
              >
                1
              </Button>
              {visiblePageNumbers[0] > 2 && (
                <span className="px-2 text-sm text-gray-500">...</span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {visiblePageNumbers.map((number) => (
            <Button
              key={number}
              variant={currentPage === number ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(number)}
              className="h-8 w-8 p-0"
            >
              {number}
            </Button>
          ))}

          {/* Show ellipsis and last page if needed */}
          {showLastPage && (
            <>
              {visiblePageNumbers[visiblePageNumbers?.length - 1] <
                totalPages - 1 && (
                <span className="px-2 text-sm text-gray-500">...</span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                className="h-8 w-8 p-0"
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        {/* Next page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={!canGoNext}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last page button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={!canGoNext}
          className="h-8 w-8 p-0"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
export default TablePagination;
