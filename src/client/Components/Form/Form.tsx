import React, { ReactChild, ReactChildren } from "react";
import { useForm } from "react-hook-form";
// import { Form } from "semantic-ui-react";

interface ICustomForm<T> {
  onSubmit: (data: T) => void,
  defaultValues: T | {},
  children: ReactChild | ReactChildren,
}

const CustomForm = <T extends {}>({ onSubmit, defaultValues = {}, children }: ICustomForm<T>) => {
  const formMethods = useForm({});
  const { handleSubmit } = formMethods;
  let toRender;
  if(Array.isArray(children)) {
    toRender = children.map(child => {
      if(child.props.name) {
        return React.createElement(child.type, {
          ...{
            ...child.props,
            register: formMethods.register,
            key: child.props.name,
          },
        });
      } else {
        return child;
      }
    });
  } else {
    toRender = children;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {toRender}
    </form>
  );
};

export default CustomForm;
