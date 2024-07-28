import React, { useState } from 'react';
import PaginationMain from './PaginationMain';
export default function Pagination({ data, className, pageSize = 15 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  const listData = data?.slice(firstPageIndex, lastPageIndex);
  return (
    <PaginationMain
      className={className}
      pageSize={pageSize}
      currentPage={currentPage}
      totalCount={listData?.length}
      onPageChange={(page) => setCurrentPage(page)}
    />
  );
}
