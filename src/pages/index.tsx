"use client";

import * as React from "react";
import { TableToolbar } from "../components/TableToolbar";
import { AddTodoModal } from "@/components/AddTodoModal";
import { TodoTable } from "@/components/TodoTable";

import {
  Box,
  TableContainer,
  TablePagination,
  Paper,
  Button,
} from "@mui/material";
import { AddTodoButton } from "@/components/AddTodoButton";
import { Todo } from "@/types";
import { EditTodoModal } from "@/components/EditTodoModal";

export default function Home() {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState<Todo[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [addModalVisible, setAddModalVisible] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);

  const [updated, setUpdated] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onClickAddTodo = React.useCallback(() => {
    setAddModalVisible(true);
  }, []);

  const onClickEditTodo = React.useCallback((row: Todo) => {
    setSelectedTodo(row);
    setEditModalVisible(true);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ flex: 0.5, width: "100%" }}>
        <TableToolbar />
        <TableContainer>
          <AddTodoButton onClick={onClickAddTodo} />
          <AddTodoModal
            addModalVisible={addModalVisible}
            setAddModalVisible={setAddModalVisible}
            updated={updated}
            setUpdated={setUpdated}
          />
          <EditTodoModal
            editModalVisible={editModalVisible}
            setEditModalVisible={setEditModalVisible}
            updated={updated}
            setUpdated={setUpdated}
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
          />
          <TodoTable
            rows={rows}
            setRows={setRows}
            updated={updated}
            setUpdated={setUpdated}
            page={page}
            rowsPerPage={rowsPerPage}
            onClickEditTodo={onClickEditTodo}
          />
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
