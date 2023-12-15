import React from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  TextField,
} from "@mui/material";

import { SearchUserInput } from "../../Components/SearchAsync";
import { dispatch } from "../../redux/store";
import AxiosService from "../../Api/Service";
import { useSelector } from "react-redux";
import { showSnackbar } from "../../redux/slices/app";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...(props as any)} />;
});

const CreateGroupForm = ({ handleCancel }: any) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const inputRef = React.useRef<any>(null);
  const [values, setValues] = React.useState<{
    pic: string | undefined;
    name: string;
    users: any[];
  }>({
    pic: undefined,
    name: "",
    users: [],
  });
  const { user } = useSelector((state: any) => state.auth);

  const onSubmit = async () => {
    const val = {
      ...values,
      users: JSON.stringify(
        values.users.map((user: any) => {
          return user?.id;
        })
      ),
    };
    await AxiosService.post(`/api/chat/group`, val, user.token)
      .then((res: any) => {
        debugger;
        if (res.result) {
          setValues(res.result);
          setLoading(false);
          handleCancel(res.result);
        }
      })
      .catch((error: any) => {
        console.error(error.message);
        setLoading(false);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };

  const postDetails = (pics: any) => {
    if (pics === undefined) {
      dispatch(
        showSnackbar({ severity: "error", message: "Please Select an Image!" })
      );
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "yrwqilwz");
      data.append("cloud_name", "resume00");
      fetch("https://api.cloudinary.com/v1_1/resume00/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setValues((r: any) => ({ ...r, pic: data?.url?.toString() }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(
        showSnackbar({ severity: "error", message: "Please Select an Image!" })
      );
      return;
    }
  };

  return (
    <Stack spacing={3}>
      {values.pic && (
        <div style={{ display: "flex" }}>
          <Avatar src={`${values.pic}`} />
        </div>
      )}
      <input
        ref={inputRef}
        style={{ display: "none" }}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.currentTarget?.files && e.currentTarget.files?.length > 0) {
            postDetails(e.currentTarget.files[0]);
          }
          e.currentTarget.value = "";
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          inputRef.current.click();
        }}
      >
        Upload Image
      </Button>
      <TextField
        name="name"
        label="Title"
        value={values?.name}
        onChange={(e: any) => {
          const value = e.currentTarget.value;
          setValues((u: any) => ({ ...u, name: value }));
        }}
      />
      <SearchUserInput
        name="participants"
        placeholder="Members"
        isMulti={true}
        border={`1px solid lightgray`}
        onChange={async (newValue: any) => {
          setValues((v: any) => ({
            ...v,
            users: JSON.stringify(newValue.map((u: any) => u.key)),
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
        <Button onClick={handleCancel}>Cancel</Button>
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
