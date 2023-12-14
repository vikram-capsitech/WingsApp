import React from "react";
import {
  Dialog,
  Slide,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import SettingColorPresets from "../../../Components/Settings/Drawer/SettingColorPresets";
import SettingFullscreen from "../../../Components/Settings/Drawer/SettingFullscreen";
import useSettings from "../../../Hooks/useSettings";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...(props as any)} />;
});

const ThemeDialog = ({ open, handleClose }: any) => {
  const { onResetSetting } = useSettings();
  return (
    <>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition as any}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ mb: 2 }}>{"Choose Theme"}</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="light"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="system"
                control={<Radio />}
                label="System Default"
              />
            </RadioGroup>
          </FormControl>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Presets</Typography>
              <SettingColorPresets />
            </Stack>
            <SettingFullscreen />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onResetSetting}>Reset</Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ThemeDialog;
