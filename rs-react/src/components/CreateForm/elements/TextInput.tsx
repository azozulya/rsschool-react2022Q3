import React from 'react';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import { TCreateFormValues } from '../CreateForm.types';
import style from '../CreateForm.module.css';

type TTextInputProps = {
  name: Path<TCreateFormValues>;
  label: string;
  type: 'text' | 'date';
  register: UseFormRegister<TCreateFormValues>;
  params: Record<string, string>;
  error: FieldError | undefined;
};

export const TextInput = ({ type, name, label, register, params, error }: TTextInputProps) => {
  return (
    <div className={style.formElement}>
      <label className={style.label}>
        {label}:
        <input
          autoComplete="off"
          type={type}
          className={style.inp}
          {...register(name, { ...params })}
        />
      </label>
      {error && (
        <span role="alert" className={`${style.error} ${style.errorAbsolute}`}>
          {error.message}
        </span>
      )}
    </div>
  );
};

export default TextInput;
