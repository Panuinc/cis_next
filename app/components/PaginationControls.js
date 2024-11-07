// PaginationControls.js
import React from "react";
import { Pagination } from "@nextui-org/react";

const PaginationControls = ({
  itemsPerPage,
  handleItemsPerPageChange,
  currentPage,
  totalItems,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <label>แสดง:</label>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="ml-2 p-1 border rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span> รายการต่อหน้า</span>
      </div>
      <Pagination
        total={Math.ceil(totalItems / itemsPerPage)}
        page={currentPage}
        onChange={(page) => handlePageChange(page)}
        color="primary"
        className="custom-pagination"
        boundaries={1}
        siblings={2}
        showControls
        next="Next"
        previous="Previous"
      />
    </div>
  );
};

export default PaginationControls;
