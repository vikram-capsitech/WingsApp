import { getAvailableUsers } from "../Api";
import { requestHandler } from "../Utils";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";

export const SearchUserInput = ({
  onChange,
  value,
  placeholder,
  isMulti = false,
  border = "none",
}: any) => {
  const _loadSuggestions = (query: string, callback: any) => {
    requestHandler(
      // Callback to fetch available users
      async () => await getAvailableUsers(query),
      null, // No loading setter callback provided
      // Success callback
      (res) => {
        if (res.data) {
          const opt = res.data.map((r: any) => {
            return {
              label: r.username,
              value: r._id,
              email: r.email,
              pic: r.pic,
            };
          });
          callback(opt); // Set users data or an empty array if data is absent
        } else {
          callback([]); // Set users data or an empty array if data is absent
        }
      },
      alert // Use the alert as the error handler
    );
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
            minHeight: 35,
            fontSize: 12,
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            fontSize: 13,
          }),
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            display: "none",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            marginTop: 1,
            fontSize: 12,
          }),
          option: (base) => ({
            ...base,
            padding: "4px 10px",
            fontSize: 12,
          }),
          loadingIndicator: (base) => ({
            ...base,
            display: "none",
          }),
        }}
      />
    </>
  );
};
