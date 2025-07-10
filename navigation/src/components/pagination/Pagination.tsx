import React from "react";
import { PaginationProps } from "./Pagination.types";

const Pagination: React.FC<PaginationProps> = ({
  pages = 1,
  page,
  setPage,
  sticky,
}) => {
  return (
    <div
      className={`teaui pagination ${
        sticky
          ? `position-sticky top-${sticky} ms-top-${sticky} xs-top-${sticky}`
          : ""
      }`}
    >
      <div className="teaui cta-container format-group">
        <button
          onClick={(event) => {
            event.preventDefault();
            setPage(page - 1);
          }}
          disabled={page - 1 < 1 ? true : false}
          className="teaui cta level-secondary format-icon-only"
          title="Page précédente"
        >
          <i className="icon teaui-icon-chevron-left"></i>
        </button>

        {pages ? (
          <div className="teaui pagination-select">
            <select
              value={page}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                const target = event.target as HTMLSelectElement;
                setPage(parseInt(target.value));
              }}
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
            <i className="icon teaui-icon-carret-down"></i>
          </div>
        ) : null}

        <button
          onClick={(event) => {
            event.preventDefault();
            setPage(page + 1);
          }}
          disabled={page + 1 > pages ? true : false}
          className="teaui cta level-secondary format-icon-only"
          title="Page suivante"
        >
          <i className="icon teaui-icon-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
