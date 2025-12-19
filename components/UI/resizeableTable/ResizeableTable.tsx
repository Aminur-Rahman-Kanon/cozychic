"use client";
import { useEffect, useRef, useState } from "react";
import InputField from "./inputField/inputField";

const columns = [
    { label: "Id", key: "id", width: 180 },
    { label: "Name", key: "name", width: 100 },
    { label: "Slug", key: "slug", width: 100 },
    { label: "Tags", key: "tags", width: 100 },
    { label: "Description", key: "description", width: 100 },
    { label: "Category", key: "category", width: 150 },
    { label: "Base Price", key: "basePrice", width: 150 },
    { label: "Multi Price?", key: "multiPrice", width: 150 },
    { label: "Ingredient Options", key: "ingredientsOption", width: 120 },
    { label: "Image URL", key: "imageUrl", width: 150 },
    { label: "Category Id", key: "categoryId", width: 140 },
    { label: "Active", key: "active", width: 250 },
    { label: "Is Popular", key: "isPopular", width: 250 },
    { label: "Is Special", key: "isSpecial", width: 250 }
];

export default function ResizableTable({ data }) {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [colWidths, setColWidths] = useState({});
  const [tableData, setTableData] = useState({});

  useEffect(() => {

  }, [])

  if (!data || !data.length) return;

  const startResizing = (index, e) => {
    e.preventDefault();

    const startX = e.clientX;
    const colElement = tableRef.current?.querySelector(`[data-col="${index}"]`) as HTMLElement | null;
    const startWidth = colElement?.offsetWidth || 100;

    const onMouseMove = (moveEvent) => {
    const newWidth = startWidth + (moveEvent.clientX - startX);

    setColWidths((prev) => ({
      ...prev,
      [index]: Math.max(newWidth, 80),
    }));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table ref={tableRef} className="min-w-max table-fixed">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                data-col={i}
                className="relative px-3 py-2 text-left font-medium text-sm border-b border-r"
                style={{ width: colWidths[i] || col.width || 100 }}
              >
                {col.label.toUpperCase()}

                <div
                  onMouseDown={(e) => startResizing(i, e)}
                  className="absolute top-0 right-0 h-full w-1 cursor-col-resize select-none"
                />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rIndex) => (
            <tr key={rIndex} className="border-b hover:bg-gray-50">
              {columns.map((col, cIndex) => (
                <td
                  key={cIndex}
                  className="px-3 py-2 text-sm border-r truncate"
                  style={{ width: colWidths[cIndex] || 100, height: '100px' }}
                >
                  <InputField disabled={cIndex === 0} inputData={row[col.key]} column={col.key} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
