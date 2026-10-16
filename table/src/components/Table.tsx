import { Popover } from "@jeremiemeunier/popover";
import { Checkbox } from "@jeremiemeunier/form";
import type { TableProps, TableRow } from "./Table.types";
import { useState, useRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export const component = <Row extends TableRow>({
  headings,
  rows,
  checkableActions,
  onHoverActions,
}: TableProps<Row>) => {
  const tableRef = useRef<HTMLTableElement | null>(null);

  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
  const [checkedRows, setCheckedRows] = useState<Set<number>>(new Set());

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    rows.forEach((_, rowIndex) => {
      const checkbox = tableRef.current?.querySelector<HTMLInputElement>(
        `input[name="row-${rowIndex}"]`,
      );

      if (checkbox) {
        checkbox.checked = isChecked;
      }

      setCheckedRows(isChecked ? new Set(rows.map((_, i) => i)) : new Set());
    });
  };

  const handleCheckRow = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
  ) => {
    const isChecked = event.target.checked;

    setCheckedRows((prev) => {
      const newCheckedRows = new Set(prev);
      if (isChecked) {
        newCheckedRows.add(rowIndex);
      } else {
        newCheckedRows.delete(rowIndex);
      }
      return newCheckedRows;
    });

    const allCheckboxes =
      tableRef.current?.querySelectorAll<HTMLInputElement>(
        `input[name^="row-"]`,
      );

    if (allCheckboxes) {
      const selectAllCheckbox =
        tableRef.current?.querySelector<HTMLInputElement>(
          `input[name="select-all"]`,
        );

      if (selectAllCheckbox) {
        selectAllCheckbox.indeterminate =
          Array.from(allCheckboxes).some((checkbox) => checkbox.checked) &&
          !Array.from(allCheckboxes).every((checkbox) => checkbox.checked);

        selectAllCheckbox.checked = Array.from(allCheckboxes).every(
          (checkbox) => checkbox.checked,
        );
      }
    }
  };

  return (
    <SimpleBar style={{ maxWidth: "100%", minWidth: "100%" }}>
      <table ref={tableRef} className="table-root">
        <thead>
          <tr>
            {checkableActions && (
              <>
                <th style={{ width: "56px" }}>
                  <Checkbox
                    name="select-all"
                    onChange={handleCheckAll}
                    className="aspect-nolabel"
                  />
                </th>
              </>
            )}
            {checkedRows.size > 0 && checkableActions && (
              <th colSpan={headings.length}>
                <div className="table-check-actions">
                  <Popover>
                    <Popover.Trigger className="cta level-secondary format-icon-left">
                      <span>Actions</span>
                      <i className="icon ti ti-list"></i>
                    </Popover.Trigger>
                    <Popover.Content className="popover-menu as-pa8 s-md">
                      <ul className="nav-list">
                        {checkableActions.map((action, index) => (
                          <li key={index}>
                            <button
                              onClick={async () => {
                                const success = await action.fn(
                                  Array.from(checkedRows).map((i) => rows[i]),
                                );

                                if (success) {
                                  setCheckedRows(new Set());
                                  const allCheckboxes =
                                    tableRef.current?.querySelectorAll(
                                      'input[type="checkbox"]',
                                    );
                                  allCheckboxes?.forEach((checkbox) => {
                                    (checkbox as HTMLInputElement).checked =
                                      false;
                                  });
                                }
                              }}
                              disabled={action.disabled}
                              className="nav-item"
                            >
                              <span>{action.label}</span>
                              <i className={`icon ti ${action.icon}`}></i>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Popover.Content>
                  </Popover>
                  <span>
                    {checkedRows.size} sélectionné
                    {checkedRows.size > 1 ? "s" : ""}
                  </span>
                </div>
              </th>
            )}
            {checkedRows.size === 0 &&
              headings.map((heading, index) => (
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
              {checkableActions && (
                <td>
                  <Checkbox
                    name={`row-${rowIndex}`}
                    className="aspect-nolabel"
                    onChange={(event) => handleCheckRow(event, rowIndex)}
                  />
                </td>
              )}
              {hoveredRowIndex === rowIndex && onHoverActions ? (
                <td
                  className="table-hover-actions-cell"
                  colSpan={headings.length}
                >
                  <div className="table-hover-actions">
                    <div className="actions">
                      {onHoverActions(row, rowIndex)}
                    </div>
                  </div>
                </td>
              ) : (
                headings.map((heading, colIndex) => {
                  const value = row[heading.key];

                  return (
                    <td key={colIndex}>
                      {heading.render
                        ? heading.render(value, row, rowIndex)
                        : String(value ?? "")}
                    </td>
                  );
                })
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </SimpleBar>
  );
};
