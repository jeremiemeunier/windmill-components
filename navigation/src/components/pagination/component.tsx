import React, { useId } from "react";
import { PaginationContext, usePagination } from "./context";
import type {
  ComponentProps,
  PaginationPrevNextProps,
  PaginationSelectProps,
  PaginationItemProps,
  PaginationRowsProps,
  PaginationFirstLastProps,
} from "./component.types";

export const component: React.FC<ComponentProps> & {
  PaginationPrevious: React.FC<PaginationPrevNextProps>;
  PaginationNext: React.FC<PaginationPrevNextProps>;
  PaginationSelect: React.FC<PaginationSelectProps>;
  PaginationItem: React.FC<PaginationItemProps>;
  PaginationRows: React.FC<PaginationRowsProps>;
  PaginationFirst: React.FC<PaginationFirstLastProps>;
  PaginationLast: React.FC<PaginationFirstLastProps>;
} = ({ children, page, setPage, setPageSize, allPages, config }) => {
  const buildClassName = () => {
    const str: string[] = ["pagination-root"];

    if (config?.buttonGroup) {
      str.push("cta-container", "format-group");
    }

    return str.join(" ");
  };

  return (
    <PaginationContext.Provider
      value={{ page, setPage, setPageSize, allPages, config }}
    >
      <div
        className={buildClassName()}
        style={
          config?.sticky?.key
            ? { position: "sticky", top: `${config.sticky.top}px`, zIndex: 1 }
            : undefined
        }
      >
        {children}
      </div>
    </PaginationContext.Provider>
  );
};

const PaginationPrevious: React.FC<PaginationPrevNextProps> = () => {
  const { page, setPage, config } = usePagination();

  const buildClassName = () => {
    const str: string[] = [
      "cta",
      "level-secondary",
      "pagination-prev-next",
      "pagination-previous",
    ];

    if (config?.prevNextLabel?.key && config.prevNextLabel.value[0]) {
      str.push(`format-icon-left`);
    } else {
      str.push(`format-icon-only`);
    }

    return str.join(" ");
  };

  return (
    <button
      type="button"
      className={buildClassName()}
      title={config?.prevNextLabel?.value[0] ?? "Previous page"}
      onClick={() => setPage(Math.max(page - 1, 1))}
      disabled={page <= 1}
    >
      <i className="icon ti ti-chevron-left"></i>
      {config?.prevNextLabel?.key && config.prevNextLabel.value[0] ? (
        <span>{config.prevNextLabel.value[0]}</span>
      ) : null}
    </button>
  );
};
component.PaginationPrevious = PaginationPrevious;

const PaginationNext: React.FC<PaginationPrevNextProps> = () => {
  const { page, setPage, allPages, config } = usePagination();

  const buildClassName = () => {
    const str: string[] = [
      "cta",
      "level-secondary",
      "pagination-prev-next",
      "pagination-next",
    ];

    if (config?.prevNextLabel?.key && config.prevNextLabel.value[1]) {
      str.push(`format-icon-right`);
    } else {
      str.push(`format-icon-only`);
    }

    return str.join(" ");
  };

  return (
    <button
      type="button"
      className={buildClassName()}
      title={config?.prevNextLabel?.value[1] ?? "Next page"}
      onClick={() => setPage(Math.min(page + 1, allPages ?? 1))}
      disabled={page >= (allPages ?? 1)}
    >
      <i className="icon ti ti-chevron-right"></i>
      {config?.prevNextLabel?.key && config.prevNextLabel.value[1] ? (
        <span>{config.prevNextLabel.value[1]}</span>
      ) : null}
    </button>
  );
};
component.PaginationNext = PaginationNext;

const PaginationFirst: React.FC<PaginationFirstLastProps> = () => {
  const { page, setPage, config } = usePagination();

  const buildClassName = () => {
    const str: string[] = [
      "cta",
      "level-secondary",
      "pagination-prev-next",
      "pagination-previous",
    ];

    if (config?.firstLastLabel?.key && config.firstLastLabel.value[0]) {
      str.push(`format-icon-left`);
    } else {
      str.push(`format-icon-only`);
    }

    return str.join(" ");
  };

  return (
    <button
      type="button"
      className={buildClassName()}
      title={config?.firstLastLabel?.value[0] ?? "First page"}
      onClick={() => setPage(1)}
      disabled={page <= 1}
    >
      <i className="icon ti ti-chevron-left-pipe"></i>
      {config?.firstLastLabel?.key && config.firstLastLabel.value[0] ? (
        <span>{config.firstLastLabel.value[0]}</span>
      ) : null}
    </button>
  );
};
component.PaginationFirst = PaginationFirst;

const PaginationLast: React.FC<PaginationFirstLastProps> = () => {
  const { page, setPage, allPages, config } = usePagination();

  const buildClassName = () => {
    const str: string[] = [
      "cta",
      "level-secondary",
      "pagination-prev-next",
      "pagination-next",
    ];

    if (config?.firstLastLabel?.key && config.firstLastLabel.value[1]) {
      str.push(`format-icon-right`);
    } else {
      str.push(`format-icon-only`);
    }

    return str.join(" ");
  };

  return (
    <button
      type="button"
      className={buildClassName()}
      title={config?.firstLastLabel?.value[1] ?? "Last page"}
      onClick={() => setPage(allPages ?? 1)}
      disabled={page >= (allPages ?? 1)}
    >
      <i className="icon ti ti-chevron-right-pipe"></i>
      {config?.firstLastLabel?.key && config.firstLastLabel.value[1] ? (
        <span>{config.firstLastLabel.value[1]}</span>
      ) : null}
    </button>
  );
};
component.PaginationLast = PaginationLast;

const PaginationSelect: React.FC<PaginationSelectProps> = () => {
  const { page, setPage, allPages } = usePagination();

  return (
    <div className="pagination-select">
      <select
        id={useId()}
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
        name="paginationSelect"
        disabled={allPages === undefined || allPages <= 1}
      >
        {Array.from({ length: allPages ?? 1 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <i className="icon ti ti-caret-down"></i>
    </div>
  );
};
component.PaginationSelect = PaginationSelect;

const PaginationItem: React.FC<PaginationItemProps> = () => {
  const { page, setPage, allPages, config } = usePagination();

  const totalPages = Math.max(allPages ?? 1, 0);
  const maxPageButtons = Math.max(3, Math.floor(config?.renderEllipsis ?? 5));
  const pageNumbers =
    totalPages <= maxPageButtons
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : (() => {
          const middleCount = maxPageButtons - 2;
          const firstMiddlePage = Math.max(
            2,
            Math.min(
              page - Math.floor(middleCount / 2),
              totalPages - middleCount,
            ),
          );
          return [
            1,
            ...Array.from({ length: middleCount }, (_, index) => firstMiddlePage + index),
            totalPages,
          ];
        })();

  const buildClassName = (pageNumber: number) => {
    const str: string[] = ["cta", "format-carret", "pagination-page-unit"];

    if (page === pageNumber) {
      str.push("level-secondary");
    } else {
      str.push("level-tertiary");
    }

    return str.join(" ");
  };

  return (
    <>
      {pageNumbers.map((pageNumber, index) => (
        <React.Fragment key={pageNumber}>
          {index > 0 && pageNumber - pageNumbers[index - 1] > 1 && (
            <span className="pagination-ellipsis" aria-hidden="true">
              …
            </span>
          )}
          <button
            type="button"
            className={buildClassName(pageNumber)}
            onClick={() => setPage(pageNumber)}
            aria-current={page === pageNumber ? "page" : undefined}
          >
            <span>{pageNumber}</span>
          </button>
        </React.Fragment>
      ))}
    </>
  );
};
component.PaginationItem = PaginationItem;

const PaginationRows: React.FC<PaginationRowsProps> = () => {
  const { config, setPageSize } = usePagination();
  const id = useId();

  if (!setPageSize) {
    console.error("PaginationRows: No setPageSize function provided.");
    return null;
  }

  if (!config?.rowsAvailable) {
    console.error("PaginationRows: No rowsAvailable configuration found.");
    return null;
  }

  if (!config.rowsAvailable.length || config.rowsAvailable.length < 2) {
    console.error("PaginationRows: Insufficient rowsAvailable configuration.");
    return null;
  }

  return (
    <div className="pagination-rows">
      <span>{config?.rowsLabel ?? "Rows per page:"}</span>
      <div className="pagination-select">
        <select
          id={id}
          name="paginationRows"
          disabled={!config?.rowsAvailable?.length}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {config?.rowsAvailable?.map((row) => (
            <option key={row} value={row}>
              {row}
            </option>
          ))}
        </select>
        <i className="icon ti ti-caret-down"></i>
      </div>
    </div>
  );
};
component.PaginationRows = PaginationRows;
