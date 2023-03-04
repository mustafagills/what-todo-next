"use client";
import * as React from "react";

import { default as MUIToolbar } from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Fab } from "@mui/material";
import { postRequest } from "../network/axios";
import { AxiosResponse } from "axios";
import { Todo } from "../types";

interface TableToolbarProps {}

export const TableToolbar = (props: TableToolbarProps) => {
  return (
    <MUIToolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
        align="center"
      >
        What Todo Next?
      </Typography>
    </MUIToolbar>
  );
};
