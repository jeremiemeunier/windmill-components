import React, { useEffect, useRef, useState } from "react";
import { CustomCursorProps } from "./CustomCursor.types";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const CustomCursor: React.FC<CustomCursorProps> = ({
  targets = "a, button, [data-cursor-target]",
  padding = 6,
  borderWidth = 2,
  borderColor = "black",
  radius = 6,
  idleSize = 18,
  smoothness = { movement: 0.25, resize: 0.25 },
  zIndex = 9999,
  disableOnTouch = true,
  className,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  // Dernier mouse pos (réfs pour éviter re-render)
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  // État “cadre actif” (màj seulement quand on entre/sort d’une cible)
  const [activeRect, setActiveRect] = useState<DOMRect | null>(null);

  // Positions/tailles animées (interne)
  const anim = useRef({
    x: 0,
    y: 0,
    w: idleSize,
    h: idleSize,
  });

  // Guard SSR / touch
  const disabled =
    typeof window === "undefined" || (disableOnTouch && isTouchDevice());

  // Mets à jour le rect actif au survol
  useEffect(() => {
    if (disabled) return;

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      const matched = t.closest(targets);
      if (matched) {
        const rect = (matched as HTMLElement).getBoundingClientRect();
        setActiveRect(rect);
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      const matched = t.closest(targets);
      if (matched) {
        // On ne vérifie pas `relatedTarget` -> simple: on reset
        setActiveRect(null);
      }
    };

    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [targets, disabled]);

  // Suivi souris (sans re-render)
  useEffect(() => {
    if (disabled) return;

    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [disabled]);

  // Boucle rAF pour animer position/tailles
  useEffect(() => {
    if (disabled) return;

    let raf = 0;
    const moveLerp = smoothness.movement ?? 0.25;
    const sizeLerp = smoothness.resize ?? 0.25;

    const tick = () => {
      const frame = frameRef.current;
      const dot = dotRef.current;

      // Cible: centre + taille
      let targetX: number;
      let targetY: number;
      let targetW: number;
      let targetH: number;

      if (activeRect) {
        targetW = activeRect.width + padding * 2;
        targetH = activeRect.height + padding * 2;
        targetX = activeRect.left + activeRect.width / 2;
        targetY = activeRect.top + activeRect.height / 2;
      } else {
        targetW = idleSize;
        targetH = idleSize;
        targetX = mouseX.current;
        targetY = mouseY.current;
      }

      // Interpolation
      anim.current.x += (targetX - anim.current.x) * moveLerp;
      anim.current.y += (targetY - anim.current.y) * moveLerp;
      anim.current.w += (targetW - anim.current.w) * sizeLerp;
      anim.current.h += (targetH - anim.current.h) * sizeLerp;

      // Applique styles
      if (frame) {
        frame.style.transform = `translate(${
          anim.current.x - anim.current.w / 2
        }px, ${anim.current.y - anim.current.h / 2}px)`;
        frame.style.width = `${anim.current.w}px`;
        frame.style.height = `${anim.current.h}px`;
        frame.style.borderRadius = activeRect ? `${radius}px` : "50%";
        frame.style.opacity = "1";
      }
      if (dot) {
        // Le petit point n'est visible qu'en mode idle
        dot.style.transform = `translate(${mouseX.current - idleSize / 2}px, ${
          mouseY.current - idleSize / 2
        }px)`;
        dot.style.opacity = activeRect ? "0" : "1";
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeRect, idleSize, padding, radius, smoothness, disabled]);

  // Styles inline pour éviter d’imposer un CSS global
  if (disabled) return null;

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex,
      }}
      aria-hidden
    >
      {/* point idle */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: idleSize,
          height: idleSize,
          borderRadius: "50%",
          border: `${borderWidth}px solid ${borderColor}`,
          opacity: cursorVisible ? 1 : 0,
          transition: "opacity 120ms ease",
          willChange: "transform, opacity",
        }}
      />
      {/* cadre animé */}
      <div
        ref={frameRef}
        style={{
          position: "fixed",
          width: idleSize,
          height: idleSize,
          border: `${borderWidth}px solid ${borderColor}`,
          transform: "translate(-9999px, -9999px)",
          transition: "opacity 120ms ease",
          willChange: "transform, width, height, border-radius, opacity",
        }}
      />
    </div>
  );
};

export default CustomCursor;
