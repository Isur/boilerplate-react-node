import React, { useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, TextField, Switch, FormControlLabel, FormControl, Select, MenuItem, FormHelperText, InputLabel, RootRef, FormLabel } from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./Input.scss";

interface IBaseInput {
  name: string,
  type?: string,
  validationSchema?: IValidationSchema,
  required?: boolean,
  label?: string,
  error?: string,
  onChange?: (name: string, data: string | number | Date | boolean) => void,
  register?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  options?: {
    value: string,
    text: string,
  }[],
}

interface IInput extends IBaseInput {
  placeholder?: string,
  pattern?: string,
  min?: string,
  max?: string,
  step?: string,
}

interface ICheckbox extends IBaseInput {
  type: "checkbox",
  labelChecked: string,
}
interface ISelect extends IBaseInput {
  type: "select",
  options: {
    value: string,
    text: string,
  }[],
  setValue: (field: string, value: string | number | boolean | (string | number | boolean)[]) => void,
}

interface ITextArea extends IBaseInput {
  type: "textarea",
  rows?: number,
  placeholder?: string,
}

interface IDateTime extends IBaseInput {
  type: "datetime",
}

type ICustom = ITextArea | IInput | ICheckbox | ISelect | IDateTime;

interface IValidationSchema {
  [key: string]: unknown,
}
interface IControlled {
  control: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  val?: Date | string | number | boolean,
}
interface IClassicInput extends Partial<IInput>, IControlled { }
interface ITextAreaInput extends Partial<ITextArea>, IControlled { }
interface ICheckboxInput extends Partial<ICheckbox>, IControlled { }
interface ISelectInput extends Partial<ISelect>, IControlled { }
interface IDateTimeInput extends Partial<IDateTime>, IControlled { }

const CustomInput = ({ name, label, validationSchema = {}, type = "text", options, ...props }: ICustom) => {
  const { register, errors, setValue, control, getValues } = useFormContext();
  const val = getValues()[name];
  // @ts-ignore
  const error = errors[name] ? errors[name].message : null;
  const rest = { name, ...props };
  const onChange = (name: string, data: string | number | Date | boolean) => { return props.onChange ? props.onChange(name, data) : null; };
  if(type === "checkbox") {
    return classicCheckbox({ register, label, error, type, validationSchema, control, val, onChange, ...rest });
  }
  if(type === "select") {
    return classicSelect({ register, setValue, label, error, options, control, val, onChange, ...rest });
  }
  if(type === "datetime") {
    return dateTimePicker({ register, label, error, validationSchema, options, val, control, onChange, ...rest });
  }
  return classicInput({ register, label, error, validationSchema, type, control, val, onChange, ...rest });
};

const classicInput = ({ register, label, error, validationSchema, type, control, onChange, ...rest }: IClassicInput) => {
  const { name } = rest;
  return (
    <TextField {...rest}
               fullWidth
               type={type}
               name={name}
               onChange={data => onChange(name, data.target.value)}
               inputRef={register(validationSchema)}
               error={!!error}
               label={label}
               multiline={type === "textarea"}
               helperText={error ? error : null} />
  );
};

const classicCheckbox = ({ register, label, error, validationSchema, control, type, onChange, ...rest }: ICheckboxInput) => {
  const [state, setState] = React.useState(false);
  const { name, labelChecked } = rest;
  return (
    <FormControl>
      <input onChange={data => onChange(name, data.target.value)} name={name} ref={register} type="checkbox" className="faked" readOnly checked={state} />
      <FormControlLabel control={
        <Switch checked={state} onChange={() => { setState(!state); onChange(name, !state); }} />
      }
                        label={state ? labelChecked : label} />
    </FormControl>
  );
};

const classicSelect = ({ register, setValue, label, error, options, control, onChange, ...rest }: ISelectInput) => {
  const { name } = rest;
  const [val, setVal] = React.useState(options[0].value);
  return (
    <FormControl fullWidth>
      <input value={val} name={name} ref={register} className="faked" readOnly />
      {label && <InputLabel> {label} </InputLabel>}
      <Select value={val} onChange={ev => { setVal(ev.target.value as string); onChange(name, ev.target.value as string); }}>
        {options.map((opt, key) => <MenuItem key={key} value={opt.value}>{opt.text}</MenuItem>)}
      </Select>
      {error && <FormLabel> {error} </FormLabel>}
    </FormControl>
  );
};

const dateTimePicker = ({ register, label, error, validationSchema, options, control, onChange, val, ...rest }: IDateTimeInput) => {
  const [state, setState] = React.useState(new Date(val as string));
  const { name } = rest;
  return (
    <>
      <input value={state.toISOString()} name={name} ref={register(validationSchema)} className="faked" readOnly />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker label={label} name={name} {...rest} value={state} onChange={date => { setState(date); onChange(name, date); }} />
      </MuiPickersUtilsProvider>
      {error && <FormLabel error> {error} </FormLabel>}</>
  );
};

export default CustomInput;
