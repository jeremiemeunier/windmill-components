import React from "react";
import { PaginationProps } from "./Pagination.types";

const Pagination: React.FC<PaginationProps> = ({
  pages = 1,
  page,
  setPage,
  sticky,
  noSelect,
}) => {
  return (
    <div
      className={`windmillui pagination ${
        sticky
          ? `position-sticky top-${sticky} ms-top-${sticky} xs-top-${sticky}`
          : ""
      }`}
    >
      <div className="windmillui cta-container format-group">
        <button
          onClick={(event) => {
            event.preventDefault();
            setPage(page - 1);
          }}
          disabled={page - 1 < 1 ? true : false}
          className="windmillui cta level-secondary format-icon-only"
          title="Page précédente"
        >
          <i className="icon windmill-icon-chevron-left"></i>
        </button>

        {pages && !noSelect ? (
          <div className="windmillui pagination-select">
            <select
              value={page}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                const target = event.target as HTMLSelectElement;
                setPage(parseInt(target.value));
              }}
              disabled={pages === 1 ? true : false}
            >
              {(() => {
                const options: React.ReactNode[] = [];
                for (let i = 1; i <= pages; i++) {
                  options.push(
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                }
                return options;
              })()}
            </select>
            <i className="icon windmill-icon-carret-down"></i>
          </div>
        ) : null}

        <button
          onClick={(event) => {
            event.preventDefault();
            setPage(page + 1);
          }}
          disabled={page + 1 > pages ? true : false}
          className="windmillui cta level-secondary format-icon-only"
          title="Page suivante"
        >
          <i className="icon windmill-icon-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
