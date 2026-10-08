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

  return (
    <SimpleBar style={{ maxWidth: "100%", minWidth: "100%" }}>
      <table className="table-root">
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index}>{heading.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onMouseEnter={() => setHoveredRowIndex(rowIndex)}
              onMouseLeave={() => setHoveredRowIndex(null)}
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
              {hoveredRowIndex === rowIndex && onHoverActions && (
                <div className="table-hover-actions">
                  <div className="actions">{onHoverActions(row, rowIndex)}</div>
                </div>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </SimpleBar>
  );
};
