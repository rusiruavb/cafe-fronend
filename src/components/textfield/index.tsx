import { TextField } from '@mui/material';
import React from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';

export type TextInputProps = {
  name: string;
  label: string;
  errors: FieldErrors<FieldValues>;
  helperText?: string;
  isError?: boolean;
  isMultiLine?: boolean;
  maxRows?: number;
  register: (name: string, options?: any) => any;
  validationSchema: {};
};

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <TextField
      {...props.register(props.name, props.validationSchema)}
      variant="filled"
      label={props.label}
      helperText={props.errors && props.errors[props.name]?.message}
      FormHelperTextProps={{ style: { marginLeft: 0 } }}
      style={{ marginBottom: 24 }}
      error={props.errors && !!props.errors[props.name]}
      multiline={props.isMultiLine}
      rows={props.maxRows}
      maxRows={props.maxRows}
      focused
      fullWidth
    />
  );
};

export default TextInput;
