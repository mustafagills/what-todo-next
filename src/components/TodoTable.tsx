"use client";

import * as React from "react";
import styles from "@/styles/Home.module.css";

import { deleteRequest, getRequest, putRequest } from "@/network/axios";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";

import { GenericErrorResponse, GetTasksResponse, Todo } from "@/types";

import {
  ButtonGroup,
  Checkbox,
  CircularProgress,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import { EmptyRows } from "./EmptyRows";

interface TodoTableProps {
  updated: boolean;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  rowsPerPage: number;
  onClickEditTodo: (value: Todo) => void;
  rows: Todo[];
  setRows: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoTable = (props: TodoTableProps) => {
  const {
    updated,
    setUpdated,
    page,
    rowsPerPage,
    onClickEditTodo,
    rows,
    setRows,
  } = props;

  const getTodos = useMutation<
    AxiosResponse<GetTasksResponse>,
    AxiosError<GenericErrorResponse>
  >(() => getRequest(`/tasks`), {
    onSuccess: (response) => {
      setRows(response.data.results);
    },
    onError: (err, variables) => {
      // console.log("mutation error", variables, err);
    },
  });

  React.useEffect(() => {
    getTodos.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  const checkTodo = useMutation<
    AxiosResponse<Todo>,
    AxiosError<GenericErrorResponse>,
    Todo
  >((body) => putRequest(`/tasks/${body.id}`, body), {
    onSuccess: () => {
      setUpdated(!updated);
    },
    onError: (err, variables) => {
      // console.log("mutation error", variables, err);
    },
  });

  const deleteTodo = useMutation<
    AxiosResponse<Todo>,
    AxiosError<GenericErrorResponse>,
    number
  >((id) => deleteRequest(`/tasks/${id}`), {
    onSuccess: () => {
      setUpdated(!updated);
    },
    onError: (err, variables) => {
      // console.log("mutation error", variables, err);
    },
  });

  const handleCheckboxClick = React.useCallback(
    (row: Todo) => {
      checkTodo.mutate({
        ...row,
        isCompleted: !row.isCompleted,
      });
    },
    [checkTodo]
  );

  const handleDeleteTodo = React.useCallback(
    (id: number) => {
      deleteTodo.mutate(id);
    },
    [deleteTodo]
  );

  const onClickDeleteTodo = React.useCallback(
    (id: number) => {
      handleDeleteTodo(id);
    },
    [handleDeleteTodo]
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // if (getTodos.isLoading) {
  //   return <CircularProgress />;
  // }

  return rows.length ? (
    <Table aria-labelledby="tableTitle" size="medium">
      <TableBody>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => {
            return (
              <TableRow
                hover
                aria-checked={row.isCompleted}
                tabIndex={-1}
                key={row.title}
                selected={row.isCompleted}
              >
                <TableCell padding="checkbox">
                  {!checkTodo.isLoading ? (
                    <Checkbox
                      color="success"
                      checked={row.isCompleted}
                      onClick={() => handleCheckboxClick(row)}
                    />
                  ) : (
                    <CircularProgress size={20} sx={{ marginRight: 3 }} />
                  )}
                </TableCell>
                <TableCell component="th" scope="row" padding="none">
                  {row.title}
                </TableCell>
                <TableCell sx={{ width: "100%" }} align="center">
                  {row.details.length > 10
                    ? row.details.slice(0, 10).concat("...")
                    : row.details}
                </TableCell>
                <TableCell align="center">
                  <ButtonGroup sx={{ flexDirection: "row" }}>
                    <Fab
                      size="small"
                      color="info"
                      aria-label="edit"
                      onClick={() => onClickEditTodo(row)}
                    >
                      <EditIcon />
                    </Fab>
                    <Fab
                      size="small"
                      color="error"
                      aria-label="cancel"
                      onClick={() => onClickDeleteTodo(row.id)}
                    >
                      <CancelIcon />
                    </Fab>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            );
          })}
        <EmptyRows emptyRows={emptyRows} />
      </TableBody>
    </Table>
  ) : (
    <div className={styles.notodos}>
      <p>No Todos</p>
    </div>
  );
};
