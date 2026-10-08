import React from "react";

export interface CheckboxProps {
  name: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  tagline?: React.ReactNode;
  defaultChecked?: boolean;
  error?: string;
  children?: React.ReactNode;
}
