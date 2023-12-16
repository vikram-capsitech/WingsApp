import React from "react";
// form
import { Avatar, Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser } from "../../../redux/slices/auth";
import { showSnackbar } from "../../../redux/slices/app";
import AxiosService from "../../../Api/Service";
// import { UpdateUserProfile } from "../../../redux/slices/app";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [receiver, setReceiver] = React.useState<any>();
  const inputRef = React.useRef<any>(null);
  const [edit, setEdit] = React.useState<boolean>(false);

  React.useEffect(() => {
    const getUserDetail = async () => {
      await AxiosService.get(`/api/user/${user._id}`, user.token)
        .then((res: any) => {
          if (res.result) {
            setReceiver(res.result);
          }
        })
        .catch((error: any) => {
          console.error(error.message);
          dispatch(
            showSnackbar({
              severity: "error",
              message: "Error in fetching the details",
            }) as any
          );
        });
    };
    getUserDetail();
  }, [user._id, user.token]);

  const postDetails = (pics: any) => {
    if (pics === undefined) {
      dispatch(
        showSnackbar({
          severity: "error",
          message: "Please Select an Image!",
        }) as any
      );
      return;
    }
    console.log(pics);
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
          setReceiver((r: any) => ({ ...r, pic: data?.url?.toString() }));
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(
        showSnackbar({
          severity: "error",
          message: "Please Select an Image!",
        }) as any
      );
      return;
    }
  };

  const handleSubmit = async () => {
    await AxiosService.post(
      `/api/user/${user._id}/update`,
      receiver,
      user.token
    )
      .then((res: any) => {
        if (res.result) {
          // setReceiver(res.result);
          const value = user;
          value.name = res.result.name;
          value.email = res.result.email;
          value.pic = res.result.pic;
          dispatch(UpdateUser(value) as any);
          dispatch(
            showSnackbar({
              severity: "success",
              message: "updates succesfully",
            }) as any
          );
        }
      })
      .catch(() => {
        dispatch(
          showSnackbar({
            severity: "error",
            message: "Error in fetching the details",
          }) as any
        );
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <Stack
          spacing={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* {values.pic && ( */}
          <Avatar
            src={`${receiver?.pic}`}
            sx={{ width: 100, height: 100 }}
            alt={receiver?.name}
          />
          {/* )} */}
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
            disabled={!edit}
            onClick={() => {
              inputRef.current.click();
            }}
            sx={{ width: 150, height: 30 }}
          >
            Upload Image
          </Button>
        </Stack>

        <TextField
          size="small"
          disabled={!edit}
          name="name"
          value={receiver?.name}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setReceiver((r: any) => ({ ...r, name: value }));
          }}
        />
        <TextField
          size="small"
          name="email"
          disabled={!edit}
          value={receiver?.email}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setReceiver((r: any) => ({ ...r, email: value }));
          }}
        />
        {/* <TextField
          size="small"
          name="number"
          value={receiver?.number}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setReceiver((r: any) => ({ ...r, number: value }));
          }}
        /> */}
        <TextField
          size="small"
          name="about"
          placeholder="About"
          multiline
          rows={4}
          disabled={!edit}
          value={receiver?.about}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setReceiver((r: any) => ({ ...r, about: value }));
          }}
        />
        {edit ? (
          <>
            <Stack
              direction={"row"}
              justifyContent="end"
              style={{ justifyContent: "space-between" }}
            >
              <Button
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                color="primary"
                size="small"
                type="submit"
                variant="contained"
                onClick={() => {
                  handleSubmit();
                }}
                // loading={isSubmitSuccessful || isSubmitting}
              >
                Save
              </LoadingButton>
            </Stack>
          </>
        ) : (
          <>
            <Stack direction={"row"} justifyContent="end">
              <Button
                color="inherit"
                size="small"
                variant="contained"
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default ProfileForm;
