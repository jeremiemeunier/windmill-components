export interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pages?: number;
  sticky?: number;
}
