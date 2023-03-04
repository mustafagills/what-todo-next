"use client";

import { Button } from "@mui/material";
import * as React from "react";

interface AddTodoButtonProps {
  onClick: () => void;
}

export const AddTodoButton = (props: AddTodoButtonProps) => {
  const { onClick } = props;
  return (
    <Button
      variant="contained"
      color="success"
      sx={{ margin: 1 }}
      onClick={onClick}
    >
      Add Todo
    </Button>
  );
};
