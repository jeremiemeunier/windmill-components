import React from "react";

export interface XSubmitProps {
  label?: string;
  disabled?: boolean;
  className?: string;
  appearance?: "primary" | "secondary" | "danger";
  children?: React.ReactNode;
}
