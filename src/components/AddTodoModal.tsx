"use client";

import { postRequest } from "@/network/axios";
import { GenericErrorResponse, Todo } from "@/types";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { useMutation } from "react-query";

interface AddTodoModalProps {
  updated: boolean;
  setUpdated: (value: boolean) => void;
  addModalVisible: boolean;
  setAddModalVisible: (value: boolean) => void;
}

export const AddTodoModal = (props: AddTodoModalProps) => {
  const { addModalVisible, updated, setUpdated, setAddModalVisible } = props;

  const [todoTitle, setTodoTitle] = React.useState("");
  const [todoDesc, setTodoDesc] = React.useState("");

  const createTodo = useMutation<
    AxiosResponse<Todo>,
    AxiosError<GenericErrorResponse>,
    Todo
  >((body) => postRequest(`/tasks`, body), {
    onSuccess: (response, variables) => {
      setUpdated(!updated);
    },
    onError: (err, variables) => {
      // console.log("mutation error", variables, err);
    },
  });

  const handleAddTodo = React.useCallback(() => {
    createTodo.mutate({
      title: todoTitle,
      details: todoDesc,
      isCompleted: false,
    } as Todo);

    setAddModalVisible(false);
  }, [createTodo, todoTitle, todoDesc, setAddModalVisible]);

  const onCloseAddTodo = React.useCallback(() => {
    setAddModalVisible(false);
  }, [setAddModalVisible]);

  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={addModalVisible}
      onClose={onCloseAddTodo}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          flex: 0.5,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Todo
        </Typography>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{ width: "100%", margin: 1 }}
          onChange={(e) => {
            setTodoTitle(e.target.value);
          }}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          sx={{ width: "100%", margin: 1 }}
          onChange={(e) => {
            setTodoDesc(e.target.value);
          }}
        />
        <Button variant="contained" color="success" onClick={handleAddTodo}>
          Add
        </Button>
      </Box>
    </Modal>
  );
};
