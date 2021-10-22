import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { useField } from 'formik';

function AutoCompleteSelect(props) {
  // id,
  // data,
  // getOptionLabel,
  // value,
  // onChange,
  // inputValue,
  // onInputChange,
  // --------------------
  // id={id}
  // options={data}
  // getOptionLabel={getOptionLabel}
  // value={value}
  // onChange={onChange}
  // inputValue={inputValue}
  // onInputChange={onInputChange}

  const { inputLabel, name, onChange, ...rest } = props;
  const fields = useField(name);
  const [field, meta, setter] = fields;
  // console.log('Fields', fields);
  const { touched, error } = meta;
  const isError = touched && error && true;
  // return 'Ok';
  // console.log('fieldfield', fields);
  // console.log("object")
  // console.log(field.name, 'metameta', meta);
  console.log(field.name, 'XXXXXXXXXXXX', fields);
  const handleChange = (e, newValue) => {
    console.log('handleChangehandleChange');
    const value = newValue ? newValue : { id: '', label: '' };
    if (newValue) {
      setter.setError(undefined);
    }
    setter.setTouched(true, false);
    field.onChange({
      ...e,
      target: {
        name: field.name,
        value: value,
      },
    });
    onChange(e, newValue);
  };
  const handleBlur = (e) => {
    console.log('handleBlurhandleBlur');
    setter.setTouched(true, false);
  };
  React.useEffect(() => {
    if (rest.value.id && rest.value.label) setter.setValue(rest.value, false);
  }, []);
  return (
    <Autocomplete
      {...rest}
      onChange={handleChange}
      onHighlightChange={handleBlur}
      isOptionEqualToValue={(option, value) => true}
      renderInput={(params) => (
        <TextField
          {...params}
          label={inputLabel}
          size="small"
          margin="normal"
          helperText={isError ? error.id : null}
          error={isError}
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}
export default React.memo(AutoCompleteSelect);
