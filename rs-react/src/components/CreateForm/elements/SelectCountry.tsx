import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { Path } from 'react-hook-form/dist/types/path';
import { TCreateFormValues } from '../CreateForm.types';
import { COUNTRIES } from '../../../utils/constants';
import style from '../CreateForm.module.css';

type TSelectCountryProps = {
  name: Path<TCreateFormValues>;
  label: string;
  register: UseFormRegister<TCreateFormValues>;
  params: Record<string, string>;
  error: FieldError | undefined;
};

const countries = COUNTRIES.map((country, idx) => (
  <option key={country + idx} value={country}>
    {country}
  </option>
));

export const SelectCountry = ({ name, label, register, params, error }: TSelectCountryProps) => {
  return (
    <div className={style.formElement}>
      <label className={style.label}>
        {label}
        <select {...register(name, { ...params })} className={style.select}>
          <option></option>
          {countries}
        </select>
      </label>
      {error && (
        <span role="alert" className={`${style.error} ${style.errorAbsolute}`}>
          {error.message}
        </span>
      )}
    </div>
  );
};

export default SelectCountry;
