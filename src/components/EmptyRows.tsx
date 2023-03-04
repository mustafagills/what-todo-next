"use client";

import { TableCell, TableRow } from "@mui/material";
import * as React from "react";

interface EmptyRowsProps {
  emptyRows: number;
}

export const EmptyRows = (props: EmptyRowsProps) => {
  const { emptyRows } = props;
  return emptyRows > 0 ? (
    <TableRow
      style={{
        height: 53 * emptyRows,
      }}
    >
      <TableCell colSpan={6} />
    </TableRow>
  ) : null;
};
