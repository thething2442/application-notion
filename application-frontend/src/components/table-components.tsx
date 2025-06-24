"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, X,Pencil } from "lucide-react";
import { useUser } from "@clerk/nextjs"; // Corrected: Added missing import

export const DatabaseProject = () => {
  const { user } = useUser(); // Corrected: Moved hook call inside the component

  // State for the project title, editable directly
  const [title, setTitle] = useState(`${user?.firstName} Table's ${Pencil}` );
  // State for table headers, also editable
  const [headers, setHeaders] = useState(["Column A", "Column B", "Column C", "Actions"]);
  // State for table rows, where each row is an array of strings
  const [rows, setRows] = useState([
    ["", "", ""], // Data for Column A, B, C. Actions column is handled separately.
    ["", "", ""],
  ]);

  // Ref for the editable title element
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Update a specific header's value
  const updateHeader = (index: number, value: string) => {
    const updated = [...headers];
    updated[index] = value;
    setHeaders(updated);
  };

  // Update a specific cell's value in the table body
  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const updated = [...rows];
    // Ensure the row and column exist before attempting to update
    if (updated[rowIndex] && updated[rowIndex][colIndex] !== undefined) {
      updated[rowIndex][colIndex] = value;
      setRows(updated);
    }
  };

  // Add a new empty row to the table
  const addRow = () => {
    // Add a new row filled with empty strings for the data columns
    setRows([...rows, Array(headers.length - 1).fill("")]); // Exclude the "Actions" column
  };

  // Delete a specific row from the table
  const deleteRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // Handle blur event for the title to save changes
  const handleTitleBlur = () => {
    if (titleRef.current) {
      setTitle(titleRef.current.innerText.trim());
    }
  };

  return (
    <div className="p-4 border rounded-lg space-y-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h3
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleBlur}
          className="text-xl font-bold px-2 border-b border-gray-300 pb-1 rounded"
        >
          {title}
        </h3>
        <Button variant="outline" size="sm" onClick={addRow}>
          <Plus className="w-4 h-4 mr-2" />
          Add Row
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>
                <input
                  value={header}
                  onChange={(e) => updateHeader(index, e.target.value)}
                  className="w-full bg-transparent px-2 py-1 border rounded text-sm"
                />
              </TableHead>
            ))}
            {/* The "Actions" TableHead is already correctly placed */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row: string[], rowIndex: number) => (
            <TableRow key={rowIndex}>
              {row.map((cell: string, colIndex: number) => (
                <TableCell key={colIndex}>
                  <input
                    value={cell}
                    onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                    className="w-full bg-transparent px-2 py-1 border rounded text-sm"
                  />
                </TableCell>
              ))}
              {/* Corrected: The "Actions" TableCell is now inside the TableRow for each row */}
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                  onClick={() => deleteRow(rowIndex)} // rowIndex is correctly scoped here
                >
                  <X className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
