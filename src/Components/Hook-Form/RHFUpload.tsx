import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { FormHelperText } from "@mui/material";
//
import { UploadAvatar } from "../upload";

// ----------------------------------------------------------------------

RHFUploadAvatar.propTypes = {
  name: PropTypes.string,
} as any;

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ value, name, ...other }: any) {
  const { control }: any = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <div>
          <UploadAvatar
            accept={{
              "image/*": [],
            }}
            error={!!error}
            file={value}
            {...other}
          />

          {!!error && (
            <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
