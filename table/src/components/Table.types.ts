import type { ReactNode } from "react";

export type TableRow = Record<string, any>;

export interface TableProps<Row extends TableRow = TableRow> {
  checkableActions?: {
    fn: (selectedRows: Row[], rowIndex?: number) => Promise<boolean>;
    label: string;
    icon: string;
    disabled?: boolean;
  }[];
  headings: {
    key: string;
    label: string;
    render?: (value: unknown, row: Row, rowIndex: number) => ReactNode;
  }[];
  rows: Row[];
  onHoverActions?: (row: Row, rowIndex: number) => ReactNode;
}
