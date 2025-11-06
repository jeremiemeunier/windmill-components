import React from "react";

export interface BaseBlockProps {
  id: string;
  label?: string;
  size?: number;
  tagline?: React.ReactNode;
  children: React.ReactNode;
  required: boolean;
}

export interface InputBlockProps {
  children: React.ReactNode;
  error?: string;
  maxLength?: number;
  className?: string;
  dataIsLoading?: boolean;
}

export interface RadioCheckboxBlockProps {
  children: React.ReactNode;
  error?: string;
  gridSize?: number;
  className?: string;
}

export interface SelectBlockProps {
  children: React.ReactNode;
  error?: string;
  className?: string;
  dataIsLoading?: boolean;
}
