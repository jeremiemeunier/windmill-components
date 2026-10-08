import type { ReactNode } from "react";

export type TableRow = Record<string, any>;

export interface TableProps<Row extends TableRow = TableRow> {
  headings: {
    key: string;
    label: string;
    render?: (value: unknown, row: Row, rowIndex: number) => ReactNode;
  }[];
  rows: Row[];
  onHoverActions?: (row: Row, rowIndex: number) => ReactNode;
}
