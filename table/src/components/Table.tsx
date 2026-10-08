import { TableProps, TableRow } from "./Table.types";
import { useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export const component = <Row extends TableRow>({
  headings,
  rows,
  onHoverActions,
}: TableProps<Row>) => {
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | null>(null);

  return (
    <SimpleBar style={{ maxWidth: "100%", minWidth: "100%" }}>
      <table className="table-root">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index}>{heading.label}</th>
            ))}
            {onHoverActions && (
              <th>
                <span className="sr-only">Row actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              tabIndex={onHoverActions ? 0 : undefined}
              onMouseEnter={() => setHoveredRowIndex(rowIndex)}
              onMouseLeave={() => setHoveredRowIndex(null)}
              onTouchStart={() => setHoveredRowIndex(rowIndex)}
              onFocus={() => setFocusedRowIndex(rowIndex)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                  setFocusedRowIndex(null);
                }
              }}
            >
              {headings.map((heading, colIndex) => {
                const value = row[heading.key];

                return (
                  <td key={colIndex}>
                    {heading.render
                      ? heading.render(value, row, rowIndex)
                      : String(value ?? "")}
                  </td>
                );
              })}
              {onHoverActions && (
                <td
                  className="table-hover-actions"
                  style={{
                    visibility:
                      hoveredRowIndex === rowIndex || focusedRowIndex === rowIndex
                        ? "visible"
                        : "hidden",
                  }}
                  aria-label="Row actions"
                >
                  <div className="actions">{onHoverActions(row, rowIndex)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </SimpleBar>
  );
};
