import React, { useEffect, useRef } from "react";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let linkHovered = false;

    const move = (e: MouseEvent) => {
      if (linkHovered) return;
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const over = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;
      linkHovered = true;
      const rect = link.getBoundingClientRect();
      cursor.style.left = rect.left - 4 + "px";
      cursor.style.top = rect.top - 4 + "px";
      cursor.style.width = rect.width + 8 + "px";
      cursor.style.height = rect.height + 8 + "px";
      cursor.style.borderRadius = "4px";
      cursor.style.transform = "translate(0, 0)";
    };

    const out = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;
      linkHovered = false;
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursor.style.borderRadius = "50%";
      cursor.style.transform = "translate(-50%, -50%)";
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 12,
        height: 12,
        border: "2px solid black",
        borderRadius: "50%",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        transition:
          "width 0.2s, height 0.2s, border-radius 0.2s, left 0.1s, top 0.1s",
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;
