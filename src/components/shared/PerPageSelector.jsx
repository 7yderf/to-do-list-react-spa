
import React, { useState, useEffect } from "react";
import "@/assets/sass/custom/perpage.scss";

export const PerPageSelector = ({ perPage, getPage, setPerPage, total }) => {
  const [itemsPerPage, setItemsPerPage] = useState(perPage);

  useEffect(() => {
    setItemsPerPage(perPage);
  }, [perPage]);

  const handleChange = (event) => {
    const value = Number(event.target.value);
    getPage(1);
    setPerPage(value);
    setItemsPerPage(value);
  };

  return (
    <div className="custom-table__perpage">
      <strong>Ver</strong>
      <label>
        <select
          name="kt_customers_table_length"
          className="custom-table__perpage-label form-select form-select-sm form-select-solid"
          value={itemsPerPage}
          onChange={handleChange}
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="50">50</option>
        </select>
      </label>
      <strong>por página</strong>
    </div>
  );
}


