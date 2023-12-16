import AsyncSelect from "react-select/async";
import { debounce } from "lodash";
import AxiosService from "../Api/Service";
import { useSelector } from "react-redux";
import { showSnackbar } from "../redux/slices/app";
import { dispatch } from "../redux/store";
import { useTheme } from "@mui/material";

export const SearchUserInput = ({
  onChange,
  value,
  placeholder,
  isMulti = false,
  border = "none",
  height = 35,
}: any) => {
  const { user } = useSelector((state: any) => state.auth);
  const theme = useTheme();

  const _loadSuggestions = (query: string, callback: any) => {
    AxiosService.get(`/api/user?search=${query}`, user.token)
      .then((res: any) => {
        if (res.result) {
          const opt = res.result.map((r: any) => {
            return {
              label: r.username,
              value: r._id,
              email: r.email,
              pic: r.pic,
            };
          });
          callback(opt);
        } else {
          callback([]);
        }
      })
      .catch((error: any) => {
        callback([]);
        dispatch(showSnackbar({ severity: "error", message: error.message }));
      });
  };

  const loadSuggestions = debounce(_loadSuggestions, 300);

  return (
    <>
      <AsyncSelect
        defaultOptions
        value={value}
        placeholder={placeholder}
        loadOptions={loadSuggestions}
        onChange={(value: any) => {
          onChange(value);
        }}
        isMulti={isMulti}
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: border,
            borderRadius: 8,
            minHeight: height,
            fontSize: theme.typography.fontSize,
            backgroundColor: `${theme.palette.background}FF`,
            color: theme.palette.text.primary,
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            fontSize: theme.typography.fontSize + 1,
            color: theme.palette.text.primary,
          }),
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            display: "none",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            marginTop: 1,
            fontSize: theme.typography.fontSize,
            backgroundColor: `${theme.palette.background.default}`,
            zIndex: 1,
          }),
          option: (base, { isSelected }) => ({
            ...base,
            padding: "4px 10px",
            fontSize: theme.typography.fontSize,
            color: theme.palette.text.primary,
            backgroundColor: isSelected ? theme.palette.primary.dark : "",
            ":hover": {
              backgroundColor: `${theme.palette.primary.light}80`,
            },
          }),
          loadingIndicator: (base) => ({
            ...base,
            display: "none",
          }),
          input: (base) => ({
            ...base,
            color: theme.palette.text.primary,
            fontSize: theme.typography.fontSize,
          }),
          singleValue: (styles) => ({
            ...styles,
            color: theme.palette.text.primary,
            fontSize: theme.typography.fontSize,
          }),
        }}
      />
    </>
  );
};
