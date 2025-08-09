type Smoothness = {
  movement?: number; // 0..1 (plus petit = plus lissé)
  resize?: number; // 0..1
};

export type CustomCursorProps = {
  /** Sélecteurs des éléments à encadrer */
  targets?: string;
  /** Padding ajouté autour du cadre */
  padding?: number;
  /** Épaisseur du cadre */
  borderWidth?: number;
  /** Couleur du cadre (CSS color) */
  borderColor?: string;
  /** Rayon des coins lorsque encadré */
  radius?: number;
  /** Diamètre du curseur idle (hors target) */
  idleSize?: number;
  /** Lissage des mouvements/redimensionnements */
  smoothness?: Smoothness;
  /** z-index du curseur */
  zIndex?: number;
  /** Désactive sur mobile/touch par défaut */
  disableOnTouch?: boolean;
  /** Classe supplémentaire pour personnaliser via CSS */
  className?: string;
};
