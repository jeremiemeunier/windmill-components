import React, { createContext, useContext } from "react";
import type { ComponentProps } from "./component.types";

type PaginationContextValue = Omit<ComponentProps, "children">;

const PaginationContext = createContext<PaginationContextValue | null>(null);

function usePagination() {
  const context = useContext(PaginationContext);

  if (!context) {
    throw new Error(
      "Les sous-composants Pagination doivent être dans <Pagination>.",
    );
  }

  return context;
}

export { PaginationContext, usePagination };
