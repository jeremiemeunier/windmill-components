type Smoothness = {
  movement?: number;
  resize?: number;
};

export type CustomCursorProps = {
  targets?: string;
  padding?: number;
  borderWidth?: number;
  borderColor?: string;
  radius?: number;
  idleSize?: number;
  smoothness?: Smoothness;
  zIndex?: number;
  disableOnTouch?: boolean;
  className?: string;
};
