import React from 'react';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import { IMG_EMPTY } from '../../../utils/constants';
import { TCreateFormValues } from '../CreateForm.types';
import style from '../CreateForm.module.css';

type TFileInputProps = {
  label: Path<TCreateFormValues>;
  register: UseFormRegister<TCreateFormValues>;
  params: Record<string, string>;
  error: FieldError | undefined;
  currentValue: FileList | string | null;
};

export const FileInput = ({ label, register, params, error, currentValue }: TFileInputProps) => {
  const avatarImgUrl = currentValue?.length && URL.createObjectURL((currentValue as FileList)?.[0]);

  return (
    <div className={style.fileUploadWrapper}>
      <div className={style.filePreview}>
        {avatarImgUrl ? (
          <img src={avatarImgUrl} className={style.avatarPreview} data-testid="avatarPreview" />
        ) : (
          IMG_EMPTY
        )}
      </div>

      <label htmlFor="avatar" className={style.file}>
        <input
          type="file"
          aria-label="Choose avatar"
          accept=".jpg, .jpeg, .png"
          className={style.fileInp}
          {...register(label, { ...params })}
        />

        <button className={style.fileCustom}>Choose file</button>
      </label>

      {error && (
        <span role="alert" className={style.error}>
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FileInput;
