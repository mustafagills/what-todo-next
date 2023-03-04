"use client";

import { postRequest, putRequest } from "@/network/axios";
import { GenericErrorResponse, Todo } from "@/types";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AxiosError, AxiosResponse } from "axios";
import * as React from "react";
import { useMutation } from "react-query";

interface EditTodoModalProps {
  updated: boolean;
  setUpdated: (value: boolean) => void;
  editModalVisible: boolean;
  setEditModalVisible: (value: boolean) => void;
  selectedTodo: Todo | null;
  setSelectedTodo: (value: Todo | null) => void;
}

export const EditTodoModal = (props: EditTodoModalProps) => {
  const {
    editModalVisible,
    updated,
    setUpdated,
    setEditModalVisible,
    selectedTodo,
    setSelectedTodo,
  } = props;

  const editTodo = useMutation<
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

  const handleEditTodo = React.useCallback(() => {
    editTodo.mutate({
      id: selectedTodo?.id || "",
      title: selectedTodo?.title || "",
      details: selectedTodo?.details || "",
      isCompleted: selectedTodo?.isCompleted || false,
    } as Todo);

    setEditModalVisible(false);
  }, [editTodo, setEditModalVisible, selectedTodo]);

  const onCloseAddTodo = React.useCallback(() => {
    setEditModalVisible(false);
    setSelectedTodo(null);
  }, [setEditModalVisible, setSelectedTodo]);

  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={editModalVisible}
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
          Edit Todo
        </Typography>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          sx={{ width: "100%", margin: 1 }}
          defaultValue={selectedTodo?.title}
          onChange={(e) => {
            if (selectedTodo) {
              setSelectedTodo({ ...selectedTodo, title: e.target.value });
            }
          }}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          sx={{ width: "100%", margin: 1 }}
          defaultValue={selectedTodo?.details}
          onChange={(e) => {
            if (selectedTodo) {
              setSelectedTodo({ ...selectedTodo, details: e.target.value });
            }
          }}
        />
        <Button variant="contained" color="info" onClick={handleEditTodo}>
          Edit
        </Button>
      </Box>
    </Modal>
  );
};
