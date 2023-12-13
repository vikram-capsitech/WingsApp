import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { Formik, FormikHelpers, FormikValues } from "formik";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../../Components/Hook-Form/FormProvider";
import { RHFTextField, RHFUploadAvatar } from "../../../Components/Hook-Form";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { AuthInitialState } from "../../../redux/slices/auth";
import { requestHandler } from "../../../Utils";
// import { UpdateUserProfile } from "../../../redux/slices/app";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const { user } = useSelector((state: any) => state.auth as AuthInitialState);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatar: Yup.string()
      .required("Avatar is required")
      .nullable(true as any),
  });

  const defaultValues = {
    firstName: user?.username,
    about: user?.about,
    avatar: user?.pic,
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  }: any = methods;

  const values = watch();

  const onSubmit = async (data: any) => {
    try {
      //   Send API request
      console.log("DATA", data);
      // dispatch(
      //   UpdateUserProfile({
      //     firstName: data?.firstName,
      //     about: data?.about,
      //     avatar: file,
      //   })
      // );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];

      setFile(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <RHFUploadAvatar
            name="avatar"
            maxSize={3145728}
            onDrop={handleDrop}
          />

          <RHFTextField
            helperText={"This name is visible to your contacts"}
            name="firstName"
            label="First Name"
          />
          <RHFTextField multiline rows={4} name="about" label="About" />

          <Stack direction={"row"} justifyContent="end">
            <LoadingButton
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              // loading={isSubmitSuccessful || isSubmitting}
            >
              Save
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
};

export default ProfileForm;
