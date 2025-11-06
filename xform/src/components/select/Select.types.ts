import React from "react";

export interface SelectProps {
  name: string;
  label?: string;
  size?: number;
  disabled?: boolean;
  tagline?: React.ReactNode;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  error?: string;
  children: React.ReactNode;
}
