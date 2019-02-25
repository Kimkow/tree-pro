import React from 'react';
import { form, control, button  } from 'react-validation';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
const Form = ({ getValues, validate, validateAll, showError, hideError, children, ...props }) => ( // destruct non-valid props
  <form {...props}>{children}</form>
);
const InputN = ({ error, isChanged, isUsed, ...props }) => (
  <FormControl error={ isChanged && isUsed && !!error } fullWidth>
    <InputLabel>{props.label}</InputLabel>
    <Input {...props} />
    <FormHelperText>{ isChanged && isUsed && error }</FormHelperText>
  </FormControl>
);
const ButtonN = ({ hasErrors, ...props }) => {
  return (
    <Button {...props} disabled={hasErrors} />
  );
};
export const MyValidationButton = button(ButtonN);
export const MyValidationForm = form(Form);
export const MyValidationInput = control(InputN);