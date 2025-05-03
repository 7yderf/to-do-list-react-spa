
import React from "react";
import "@/assets/sass/custom/paginator.scss";

export const  Paginator = ({
  currentPage,
  from,
  lastPage,
  perPage,
  to,
  total,
  getPage,
}) => {
  const maxVisiblePages = 5;

  const visiblePageNumbers = React.useMemo(() => {
    const pages = [];
    const startPage = Math.max(1, Number(currentPage) - 2);
    const endPage = Math.min(Number(lastPage), Number(currentPage) + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, lastPage]);

  const showStartEllipsis = Number(currentPage) > 3;
  const showEndEllipsis = Number(currentPage) < Number(lastPage) - 2;

  return (
    <ul className="pagination">
      <li
        className={`page-item ${Number(currentPage) === 1 ? "disabled" : ""}`}
        onClick={() => Number(currentPage) !== 1 && getPage(1)}
      >
        <a href="#" className="page-link">
          «
        </a>
      </li>

      <li
        className={`page-item previous ${
          Number(currentPage) === 1 ? "disabled" : ""
        }`}
        onClick={() =>
          Number(currentPage) !== 1 && getPage(Number(currentPage) - 1)
        }
      >
        <a href="#" className="page-link">
          ‹
        </a>
      </li>

      {showStartEllipsis && (
        <>
          <li
            className={`page-item ${
              Number(currentPage) === 1 ? "active" : ""
            }`}
            onClick={() => getPage(1)}
          >
            <a href="#" className="page-link">
              1
            </a>
          </li>
          <li className="page-item disabled">
            <a href="#" className="page-link">
              ...
            </a>
          </li>
        </>
      )}

      {visiblePageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item ${
            Number(currentPage) === number ? "active" : ""
          }`}
          onClick={() => getPage(number)}
        >
          <a href="#" className="page-link">
            {number}
          </a>
        </li>
      ))}

      {showEndEllipsis && (
        <>
          <li className="page-item disabled">
            <a href="#" className="page-link">
              ...
            </a>
          </li>
          <li
            className={`page-item ${
              Number(currentPage) === Number(lastPage) ? "active" : ""
            }`}
            onClick={() => getPage(Number(lastPage))}
          >
            <a href="#" className="page-link">
              {lastPage}
            </a>
          </li>
        </>
      )}

      <li
        className={`page-item next ${
          Number(currentPage) === Number(lastPage) ? "disabled" : ""
        }`}
        onClick={() =>
          Number(currentPage) !== Number(lastPage) &&
          getPage(Number(currentPage) + 1)
        }
      >
        <a href="#" className="page-link">
          ›
        </a>
      </li>

      <li
        className={`page-item ${
          Number(currentPage) === Number(lastPage) ? "disabled" : ""
        }`}
        onClick={() =>
          Number(currentPage) !== Number(lastPage) && getPage(Number(lastPage))
        }
      >
        <a href="#" className="page-link">
          »
        </a>
      </li>
    </ul>
  );
}


