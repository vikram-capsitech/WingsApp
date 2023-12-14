import React from "react";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  TextField,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider from "../../Components/Hook-Form/FormProvider";
import RHFTextField from "../../Components/Hook-Form/RHFTextField";
import RHFAutocomplete from "../../Components/Hook-Form/RHFAutocomplete";
import { requestHandler } from "../../Utils";
import { createGroupChat, getAvailableUsers } from "../../Api";
import { SearchUserInput } from "../../Components/SearchAsync";
import { Theme } from "emoji-picker-react";
import { setCurrentChat } from "../../redux/slices/chat";
import { dispatch } from "../../redux/store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...(props as any)} />;
});

const CreateGroupForm = ({ handleClose }: any) => {
  const [data, setData] = React.useState<any>({
    name: "",
    participants: [],
  });

  const onSubmit = async () => {
    debugger;
    try {
      //  API Call
      console.log("DATA", data);
      // await requestHandler(
      //   // Callback to create a user chat
      //   async () => await createGroupChat(data),
      //   null, // Callback to handle loading state
      //   // Success callback
      //   (res) => {
      //     debugger;
      //     const { data } = res; // Extract data from response
      //     // If chat already exists with the selected user
      //     if (res.statusCode === 200) {
      //       // setSelectedChat(data);
      //       dispatch(setCurrentChat(data) as any);
      //       // navigate(`/app/${data?._id}`);
      //       return;
      //     }
      //     // Execute the onSuccess function with received data
      //   },
      //   alert // Use the alert as the error handler
      // );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack spacing={3}>
      <TextField
        name="name"
        label="Title"
        value={data?.name}
        onChange={(e: any) => {
          setData((data: any) => ({
            ...data,
            name: e.currentTarger?.value,
          }));
        }}
      />
      <SearchUserInput
        name="participants"
        placeholder="Members"
        isMulti={true}
        border={`1px solid lightgray`}
        onChange={async (newValue: any) => {
          setData((data: any) => ({
            ...data,
            participants: newValue,
          }));
          //if user is creating normal chat just get a single user
        }}
        style={{ width: 210 }}
      />
      <Stack
        spacing={2}
        direction={"row"}
        alignItems="center"
        justifyContent={"end"}
      >
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit}>
          Create
        </Button>
      </Stack>
    </Stack>
  );
};

const CreateGroup = ({ open, handleClose }: any) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition as any}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <DialogTitle>{"Create New Group"}</DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        {/* Create Group Form */}
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
