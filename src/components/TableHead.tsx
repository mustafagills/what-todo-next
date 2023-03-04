"use client";

import * as React from "react";

import { HeadCell } from "../types";

import { TableCell, TableRow } from "@mui/material";

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "All Todos",
  },
  {
    id: "description",
    label: "Description",
  },
  {
    id: "done",
    label: "Actions",
  },
];

interface TableProps {}

const TableHead = (props: TableProps) => {
  return (
    <TableRow>
      {headCells.map((headCell) => (
        <TableCell key={headCell.id}>{headCell.label}</TableCell>
      ))}
    </TableRow>
  );
};

export default TableHead;
