export interface ComponentProps {
  children: React.ReactNode;
  // current page number
  page: number;
  // function to update the current page
  setPage: (page: number) => void;
  // function to update the number of rows per page
  setPageSize?: (size: number) => void;
  // total number of pages available
  allPages: number;
  config?: {
    sticky?: {
      // whether sticky is enabled
      key: boolean;
      // distance from the top when sticky is enabled
      top: number;
    };
    prevNextLabel?: {
      // whether to show the label for the previous or next button
      key: boolean;
      // label text for the previous or next button
      // first line is for the previous button, second line is for the next button
      value: string[];
    };
    firstLastLabel?: {
      // whether to show the label for the first or last button
      key: boolean;
      // label text for the first or last button
      // first line is for the first button, second line is for the last button
      value: string[];
    };
    // button can be grouped together
    buttonGroup?: boolean;
    // array of available row options for pagination
    rowsAvailable?: number[];
    rowsLabel?: string;
    // number of page buttons to display before rendering ellipsis
    renderEllipsis?: number;
  };
}

export interface PaginationPrevNextProps {}

export interface PaginationSelectProps {}

export interface PaginationItemProps {}

export interface PaginationRowsProps {}

export interface PaginationFirstLastProps {}
