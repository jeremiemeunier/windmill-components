export interface SubmitProps {
  // The size prop defines the size of the submit button. It can be specified in pixels or any valid CSS unit.
  size?: number;
  // The loading prop indicates whether the submit button should display a loading state or not.
  loading: boolean;
  // The label prop defines the text to be displayed on the submit button.
  label: string;
  // The locked prop indicates whether the submit button should be disabled or not.
  locked?: boolean;
  // The children prop allows you to pass additional elements or components to be rendered inside the submit button.
  className?: string;
  // Defines the size of the submit button. Can be either "s-sm" for small or "s-lg" for large.
  children?: React.ReactNode;
  // The buttonSize prop allows you to specify the predefined size of the submit button. It can be either "s-sm" for small or "s-lg" for large.
  buttonSize?: "s-sm" | "s-lg";
  // The orientation prop defines the layout direction of the submit button and its children. It can be either "col" for column or "row" for row.
  orientation?: "col" | "row";
}
