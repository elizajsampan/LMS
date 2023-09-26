import { useEffect, useState } from "react";

function usePaginate(items, pageSize) {
  const pagesCount = Math.ceil(items.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState(items);

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
    setPaginatedItems(items.slice(startIndex, end));
  }, [currentPage, items, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  return {
    pagesCount,
    currentPage,
    paginatedItems,
    handlePageChange,
  };
}

export default usePaginate;
